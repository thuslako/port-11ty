// class Lightbox that will generate a lightbox gallery from the images from .slide elements on page
// adding keyboard arrow key navigation and closing lightbox on click outside of image

class Lightbox {
  constructor() {
    this.lightbox = document.getElementById("lightbox");
    this.slides = [...document.getElementsByClassName("slide")];
    this.slideImages = new Map();
    this.lightbox.addEventListener("click", (e) => {
      const lightboxImg = document.querySelector("#lightbox img");
      if (e.target === lightboxImg) return;
      this.lightbox.classList.remove("lightbox-open");
      this.lightbox.innerHTML = "";
      document.body.classList.remove("no-scroll");
    });
  }

  init() {
    this.slides = this.slides.slice(1);
    this.navigate();
    this.addListeners();
  }

  toggleInfoBtn() {
    const galleryInfobtns = document.getElementsByClassName("info-btn");
    if (galleryInfobtns.length)
      galleryInfobtns.forEach((btn) => {
        btn.addEventListener("click", (e) => {
          e.preventDefault();
          e.target.classList.add("info-btn-open");
          setTimeout(() => {
            e.target.classList.remove("info-btn-open");
          }, 2000);
        });
      });
  }

  addListeners(){
    if (!this.slides.length) return;
    for (let i = 0; i < this.slides.length; i++) {
      const slide = this.slides[i];
      const images = slide.getElementsByTagName("img");
      const image = images[0];
      const imageID = this.getfileId(image.currentSrc);
      if (imageID) this.slideImages.set(imageID, {
        next: (i == (this.slides.length - 1) ? this.slides[0].querySelector("img").currentSrc : this.slides[i + 1].querySelector("img").currentSrc),
        prev: (i == 0 ? this.slides[this.slides.length - 1].querySelector("img").currentSrc : this.slides[i - 1].querySelector("img").currentSrc)
      });
      image.addEventListener("click", (e) => {
        e.preventDefault();
        const lightboxContent = document.createElement("div");
        lightboxContent.classList.add("lightbox-content");
        const lightboxClose = document.createElement("button");
        lightboxClose.classList.add("lightbox-close");
        lightboxClose.innerHTML = `<ion-icon name="close"></ion-icon>`;
        const lightboxImg = document.createElement("img");
        this.lightbox.classList.add("lightbox-open");
        document.body.classList.add("no-scroll");
        lightboxImg.src = image.currentSrc;
        lightboxContent.appendChild(lightboxImg);
        this.lightbox.appendChild(lightboxClose);
        this.lightbox.appendChild(lightboxContent);
      });

    }
  }


  navigate() {
    //case switch for document key events
    document.addEventListener('keydown', (e) => {
      e.preventDefault();
      switch (e.key) {
        case "ArrowRight":
          this.gallery('right');
          break;
        case "ArrowLeft":
          this.gallery('left');
          break;
        case "Escape":
          this.closeLightbox();
          break;
      }
    }, false);
  }
  getfileId(url) {
    const regex = /\/assets\/(.*)-\d+\.webp/;
    let id = url.match(regex)
    return id ? id[1] : false;
  }

  gallery(direction) {
    const lightboxImg = document.querySelector("#lightbox img");
    const _currentImage = this.getfileId(lightboxImg.src);
    if (this.slideImages.has(_currentImage)) {
      const _image = this.slideImages.get(_currentImage);
      switch (direction) {
        case 'right':
          lightboxImg.src = _image.next;
          break;
        case 'left':
          lightboxImg.src = _image.prev;
          break;
      }
    }
  }
  closeLightbox() {
    this.lightbox.classList.remove("lightbox-open");
    this.lightbox.innerHTML = "";
    document.body.classList.remove("no-scroll");
  }
}

export default Lightbox;