// class Lightbox that will generate a lightbox gallery from the images from .slide elements on page
// adding keyboard arrow key navigation and closing lightbox on click outside of image

class Lightbox {
  constructor() {
    this.lightbox = document.getElementById("lightbox");
    this.slides = [...document.getElementsByClassName("slide")];
    this.slideImages = new Map();
    this.currentImage = null;
    this.lightbox.addEventListener("click", (e) => {
      const lightboxImg = document.querySelector("#lightbox img");
      if (e.target === lightboxImg) return;
      this.lightbox.classList.remove("lightbox-open");
      this.lightbox.innerHTML = "";
      document.body.classList.remove("no-scroll");
    });
    document.addEventListener("keyup", (e) => {
      if (e.key === "Escape") {
        this.lightbox.classList.remove("lightbox-open");
        this.lightbox.innerHTML = "";
        document.body.classList.remove("no-scroll");
      }
    });
  }

  init() {
    if (this.slides.length) {
      this.slides.shift();
      for (let i = 0; i < this.slides.length; i++) {
        const slide = this.slides[i];
        const images = slide.getElementsByTagName("img");
        const image = images[0];
        const imageID = this.getfileId(image.currentSrc);
        if(imageID){
            this.slideImages.set(imageID, {
            next: (i == (this.slides.length-1)? this.slides[0]: this.slides[i+1]),
            prev: (i == 0? this.slides[this.slides.length-1]: this.slides[i-1])
          });
        }
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
          this.currentImage = imageID;
          lightboxContent.appendChild(lightboxImg);
          this.lightbox.appendChild(lightboxClose);
          this.lightbox.appendChild(lightboxContent);
        });
        
      }
    }
    this.navigate();
  }


  navigate() {
    //case switch for document key events
    document.addEventListener('keydown',(e) => {
      e.preventDefault();
      if(!this.lightbox.classList.contains("lightbox-open")) return;
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
    const id = url.match(regex);
    return id? id[1] : null;
  }

  gallery(direction) {
    const _images = this.slideImages
    const lightboxImg = document.querySelector("#lightbox img");
    const _currentImage = this.getfileId(lightboxImg.src);
    if(_images.has(_currentImage)){
      const _image = _images.get(_currentImage);
      let nextImage;
      switch (direction) {
        case 'right':
          nextImage = _image.next;
          break;
        case 'left':
          nextImage = _image.prev;
          break;
      }
      lightboxImg.src = nextImage.querySelector("img").currentSrc;
    }
  }
  closeLightbox() {
    this.lightbox.classList.remove("lightbox-open");
    this.lightbox.innerHTML = "";
    document.body.classList.remove("no-scroll");
  }
}

export default Lightbox;