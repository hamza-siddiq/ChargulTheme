if (!customElements.get('slide-show')) {
  class SlideShow extends HTMLElement {
    constructor() {
      super();
      this.state = {
        initialized: false,
        currentIndex: 0,
      };
      this.options = {};
      this.callbacks = {};
    }

    connectedCallback() {
      if (!this.state.initialized) {
        this.init();
      }
    }

    init() {
      this.parseDataset();
      this.setupDOMReferences();
      this.createFlickityInstance();
      this.setupEventListeners();
      this.state.initialized = true;
    }

    parseDataset() {
      const booleanAttributes = ['dots', 'fade', 'wrapAround', 'adaptiveHeight'];
      const numberAttributes = ['autoplay'];

      booleanAttributes.forEach(attr => {
        this.options[attr] = this.dataset[attr] === 'true';
      });

      numberAttributes.forEach(attr => {
        const value = parseInt(this.dataset[attr], 10);
        this.options[attr] = isNaN(value) ? false : value;
      });

      this.options.align = this.dataset.align === 'center' ? 'center' : 'left';
      this.options.rightToLeft = document.dir === 'rtl';
    }

    setupDOMReferences() {
      this.slides = this.querySelectorAll('.carousel__slide');
      this.prevButton = this.querySelector('.flickity-prev');
      this.nextButton = this.querySelector('.flickity-next');
    }

    createFlickityInstance() {
      const args = this.getFlickityArgs();
      this.flickity = new Flickity(this, args);
    }

    getFlickityArgs() {
      const baseArgs = {
        cellSelector: '.carousel__slide',
        prevNextButtons: false,
        ...this.options,
      };

      const specificArgs = this.getSpecificArgs();
      return { ...baseArgs, ...specificArgs };
    }

    getSpecificArgs() {
      const classListContains = (className) => this.classList.contains(className);

      if (classListContains('image-with-text-slideshow__image')) {
        return {
          draggable: false,
          asNavFor: this.closest('.image-with-text-slideshow').querySelector('.image-with-text-slideshow__content')
        };
      }

      if (classListContains('collection-grid__carousel') || classListContains('main-slideshow')) {
        return this.getAnimatedArgs();
      }

      if (classListContains('products')) {
        return {
          wrapAround: false,
          on: { ready: () => this.centerArrows() }
        };
      }

      return {};
    }

    getAnimatedArgs() {
      if (document.body.classList.contains('animations-true') && typeof gsap !== 'undefined') {
        return {
          on: {
            ready: () => this.animateSlides(this.state.currentIndex),
            change: (index) => {
              const prevIndex = this.state.currentIndex;
              this.state.currentIndex = index;
              this.animateSlides(index, prevIndex);
            },
            scroll: classListContains('collection-grid__carousel') ? this.handleCollectionGridScroll.bind(this) : null
          }
        };
      }
      return {};
    }

    setupEventListeners() {
      if (this.prevButton) {
        this.prevButton.addEventListener('click', () => this.flickity.previous());
      }
      if (this.nextButton) {
        this.nextButton.addEventListener('click', () => this.flickity.next());
      }

      if (Shopify.designMode) {
        this.addEventListener('shopify:block:select', this.handleShopifyBlockSelect.bind(this));
      }

      window.addEventListener('resize', this.handleResize.bind(this));
    }

    handleShopifyBlockSelect(event) {
      const index = Array.from(this.slides).indexOf(event.target);
      if (index !== -1) {
        this.flickity.select(index);
      }
    }

    handleResize() {
      if (this.classList.contains('products')) {
        this.centerArrows();
      }
      this.flickity.resize();
    }

    handleCollectionGridScroll(progress) {
      requestAnimationFrame(() => {
        const flkSlideWidth = this.querySelector('.collection-card').clientWidth + 25;
        const extraWindowSpace = this.getBoundingClientRect().left;

        this.slides.forEach((slide, j) => {
          const slideOffset = slide.getBoundingClientRect().left;
          const relativeOffset = slideOffset - extraWindowSpace;

          if (relativeOffset < 0) {
            const scale = 1 + (relativeOffset / 1200);
            const opacity = 1 + (relativeOffset / 200);
            const translateX = -relativeOffset;
            const rotate = -relativeOffset / 10;
            const zIndex = relativeOffset + 5 < 0 ? 5 : 10;

            gsap.set(slide.querySelector('.collection-card--inner'), {
              transform: `perspective(1000px) translateX(${translateX}px) rotateY(${rotate}deg) translateZ(0)`,
              opacity: opacity,
              zIndex: zIndex
            });

            gsap.set(slide.querySelector('.collection-card__link'), {
              transform: `scale(${scale}) translateZ(0)`
            });
          } else {
            gsap.set(slide.querySelector('.collection-card--inner'), {
              clearProps: 'all'
            });
            gsap.set(slide.querySelector('.collection-card__link'), {
              clearProps: 'all'
            });
          }
        });
      });
    }

    animateSlides(currentIndex, previousIndex) {
      if (previousIndex !== undefined) {
        this.animateReverse(previousIndex);
      }

      const slide = this.slides[currentIndex];
      const timeline = slide.timeline || this.createSlideTimeline(slide);

      timeline.restart();
    }

    animateReverse(index) {
      const slide = this.slides[index];
      if (slide.timeline) {
        slide.timeline.reverse();
      }
    }

    createSlideTimeline(slide) {
      const timeline = gsap.timeline({ paused: true });
      
      const content = slide.querySelector('.slideshow__slide-content');
      const subheading = slide.querySelector('.subheading');
      const heading = slide.querySelector('h1');
      const paragraph = slide.querySelector('p:not(.subheading)');
      const buttons = slide.querySelectorAll('.button');

      timeline.to(content, { duration: 0, autoAlpha: 1 });

      if (subheading) {
        timeline.fromTo(subheading, { opacity: 0 }, { duration: 0.5, opacity: 0.6 }, 0);
      }

      if (heading) {
        const headingLines = heading.querySelectorAll('.line-child div');
        timeline.from(headingLines, {
          duration: 0.5 + ((headingLines.length - 1) * 0.05),
          yPercent: 100,
          stagger: 0.05
        }, 0);
      }

      if (paragraph) {
        timeline.from(paragraph, { duration: 0.5, opacity: 0, y: '20px' }, 0);
      }

      if (buttons.length) {
        timeline.fromTo(buttons, { opacity: 0 }, { duration: 0.5, opacity: 1, stagger: 0.05 }, '-=0.4');
      }

      slide.timeline = timeline;
      return timeline;
    }

    centerArrows() {
      if (!this.prevButton || !this.nextButton) return;

      const firstCell = this.flickity.cells[0];
      const image = firstCell.element.querySelector('.product-featured-image');
      const imageHeight = image ? image.clientHeight : 0;

      const maxHeight = Math.max(...this.flickity.cells.map(cell => cell.size.height));

      if (maxHeight > imageHeight) {
        const difference = (maxHeight - imageHeight) / -2;
        const transform = `translateY(${difference}px)`;
        this.prevButton.style.transform = transform;
        this.nextButton.style.transform = transform;
      } else {
        this.prevButton.style.transform = '';
        this.nextButton.style.transform = '';
      }
    }
  }

  customElements.define('slide-show', SlideShow);
}