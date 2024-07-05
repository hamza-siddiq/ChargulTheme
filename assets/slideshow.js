class SlideShow extends HTMLElement {
  constructor() {
    super();
  }

  initWhenFlickityAvailable() {
    if (typeof Flickity === 'undefined') {
      window.addEventListener('flickity:available', () => {
        this.initialize();
      }, { once: true });
    } else {
      this.initialize();
    }
  }

  initialize() {
    const slideshow = this;
    let dots = slideshow.dataset.dots === 'true';
    let slideshow_slides = Array.from(slideshow.querySelectorAll('.carousel__slide'));
    let autoplay = slideshow.dataset.autoplay == 'false' ? false : parseInt(slideshow.dataset.autoplay, 10);
    let align = slideshow.dataset.align == 'center' ? 'center' : 'left';
    let fade = slideshow.dataset.fade == 'true';
    let prev_button = slideshow.querySelector('.flickity-prev');
    let next_button = slideshow.querySelector('.flickity-next');
    let rightToLeft = document.dir === 'rtl';

    const args = {
      wrapAround: true,
      cellAlign: align,
      pageDots: dots,
      contain: true,
      fade: fade,
      autoPlay: autoplay,
      rightToLeft: rightToLeft,
      prevNextButtons: false,
      cellSelector: '.carousel__slide',
      lazyLoad: 2,
      on: {
        ready: () => {
          this.onSlideShowReady();
        },
        lazyLoad: (event, cell) => {
          this.onLazyLoad(event, cell);
        }
      }
    };

    // Image-with-text slideshow specific options
    if (slideshow.classList.contains('image-with-text-slideshow__image')) {
      args.draggable = false;
      args.asNavFor = slideshow.closest('.image-with-text-slideshow').querySelector('.image-with-text-slideshow__content');
    }

    if (slideshow.classList.contains('image-with-text-slideshow__content')) {
      args.adaptiveHeight = true;
    }

    // Main slideshow specific options
    if (slideshow.classList.contains('main-slideshow')) {
      if (slideshow.classList.contains('desktop-height-image') || slideshow.classList.contains('mobile-height-image')) {
        args.adaptiveHeight = true;
      }
      if (document.body.classList.contains('animations-true') && typeof gsap !== 'undefined') {
        this.prepareAnimations(slideshow);
        args.on.ready = () => {
          this.animateSlides(0, slideshow);
        };
        args.on.change = (index) => {
          let previousIndex = fizzyUIUtils.modulo(this.flkty.selectedIndex - 1, this.flkty.slides.length);
          this.animateReverse(previousIndex);
          this.animateSlides(index, slideshow);
        };
      }
    }

    // Initialize Flickity
    this.flkty = new Flickity(slideshow, args);

    // Setup navigation buttons
    if (prev_button) {
      prev_button.addEventListener('click', () => this.flkty.previous());
      next_button.addEventListener('click', () => this.flkty.next());
    }

    slideshow.dataset.initiated = 'true';

    if (Shopify.designMode) {
      slideshow.addEventListener('shopify:block:select', (event) => {
        let index = slideshow_slides.indexOf(event.target);
        this.flkty.select(index);
      });
    }
  }

  onSlideShowReady() {
    window.dispatchEvent(new Event('resize'));
  }

  onLazyLoad(event, cell) {
    const img = cell.querySelector('img');
    if (img) {
      img.classList.add('is-loaded');
    }
    this.flkty.resize();
  }

  prepareAnimations(slideshow) {
    if (!slideshow.dataset.animationsReady) {
      document.fonts.ready.then(() => {
        slideshow.querySelectorAll('.slideshow__slide').forEach((item, i) => {
          let tl = gsap.timeline({ paused: true });
          this.animations = this.animations || [];
          this.animations[i] = tl;

          tl.to(item.querySelector('.slideshow__slide-content'), {
            duration: 0,
            autoAlpha: 1
          });

          if (item.querySelector('.subheading')) {
            tl.fromTo(item.querySelector('.subheading'), 
              { opacity: 0 }, 
              { duration: 0.5, opacity: 0.6 }, 
              0
            );
          }

          if (item.querySelector('h1')) {
            let h1_duration = 0.5 + ((item.querySelectorAll('h1 .line-child div').length - 1) * 0.05);
            tl.from(item.querySelectorAll('h1 .line-child div'), {
              duration: h1_duration,
              yPercent: '100',
              stagger: 0.05
            }, 0);
          }

          if (item.querySelector('p:not(.subheading)')) {
            tl.from(item.querySelector('p:not(.subheading)'), {
              duration: 0.5,
              opacity: 0,
              y: '20px'
            }, 0);
          }

          if (item.querySelectorAll('.button')) {
            tl.fromTo(item.querySelectorAll('.button'), 
              { opacity: 0 }, 
              { duration: 0.5, opacity: 1, stagger: 0.05 }, 
              '-=0.4'
            );
          }
        });
      });
      slideshow.dataset.animationsReady = true;
    }
  }

  animateSlides(index, slideshow) {
    if (this.animations && this.animations[index]) {
      this.animations[index].restart();
    }
  }

  animateReverse(index) {
    if (this.animations && this.animations[index]) {
      this.animations[index].reverse();
    }
  }

  centerArrows(flickity, prev_button, next_button) {
    if (!flickity || !flickity.cells || flickity.cells.length === 0) return;

    let first_cell = flickity.cells[0];
    let max_height = 0;
    let image_height = first_cell.element.querySelector('.product-featured-image').clientHeight;

    flickity.cells.forEach((item) => {
      if (item.size.height > max_height) {
        max_height = item.size.height;
      }
    });

    if (max_height > image_height) {
      let difference = (max_height - image_height) / -2;

      if (prev_button) {
        prev_button.style.transform = `translateY(${difference}px)`;
      }
      if (next_button) {
        next_button.style.transform = `translateY(${difference}px)`;
      }
    }
  }
}

customElements.define('slide-show', SlideShow);