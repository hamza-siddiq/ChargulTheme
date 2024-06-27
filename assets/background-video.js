/**
 *  @class
 *  @function BackgroundVideo
 */
if (!customElements.get('background-video')) {
  class BackgroundVideo extends HTMLElement {
    constructor() {
      super();
    }
    connectedCallback() {
      let _this = this;
      // Video Support.
      let video_container = this.querySelector('.background-video__iframe');
      if (video_container) {
        if (video_container.querySelector('iframe')) {
          video_container.querySelector('iframe').onload = function () {
            _this.videoPlay(video_container);
          };
        }
      }
      // Animation Support.
      this.prepareAnimations();
    }
    videoPlay(video_container) {
      setTimeout(() => {
        if (video_container.dataset.provider === 'youtube') {
          video_container.querySelector('iframe').contentWindow.postMessage(JSON.stringify({ event: "command", func: "playVideo", args: "" }), "*");
        } else if (video_container.dataset.provider === 'vimeo') {
          video_container.querySelector('iframe').contentWindow.postMessage(JSON.stringify({ method: "play" }), "*");
        }
      }, 10);
    }
prepareAnimations() {
  let section = this;

  // Create an Intersection Observer
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Wrap each word in a span element
        const heading = section.querySelector('.animated-heading');
        const headingText = heading.textContent.trim();
        const headingWords = headingText.split(' ');
        heading.innerHTML = headingWords.map(word => `<span class="word">${word}</span>`).join(' ');

        const text = section.querySelector('.animated-text');
        const textContent = text.textContent.trim();
        const textWords = textContent.split(' ');
        text.innerHTML = textWords.map(word => `<span class="word">${word}</span>`).join(' ');

        // Animate heading and text
        heading.classList.add('animate');
        text.classList.add('animate');

        // Animate each word with a delay
        const words = section.querySelectorAll('.word');
        words.forEach((word, index) => {
          word.style.animationDelay = `${index * 0.1}s`;
        });

        // Animate video lightbox modal button
        setTimeout(() => {
          section.querySelector('.video-lightbox-modal__button').classList.add('animate');
        }, words.length * 100);

        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  // Observe the section
  observer.observe(section);
}
  }
  customElements.define('background-video', BackgroundVideo);
}