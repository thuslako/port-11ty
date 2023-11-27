// class Lightbox that will generate a lightbox gallery from the images from .slide elements on page
// adding keyboard arrow key navigation and closing lightbox on click outside of image

class Lightbox {
  constructor() {
    this.lightbox = document.getElementById("lightbox");
    this.slides = [];
    this.slideImages = new Map();
    this.selectedImage = null;
    this.lightbox.addEventListener("click", (e) => {
      const lightboxImg = document.querySelector("#lightbox img");
      if (e.target === lightboxImg) return;
      this.lightbox.classList.remove("lightbox-open");
      this.lightbox.innerHTML = "";
      document.body.classList.remove("no-scroll");
    });

    this.lightboxContent = document.createElement("div");
    this.lightboxContent.classList.add("lightbox-content");
    this.lightboxClose = document.createElement("button");
    this.lightboxClose.classList.add("lightbox-close");
    this.lightboxClose.innerHTML = `<ion-icon name="close"></ion-icon>`;
    this.lightboxImg = document.createElement("img");
    this.lightboxContent.appendChild(this.lightboxImg);
    this.lightbox.appendChild(this.lightboxClose);
    this.lightbox.appendChild(this.lightboxContent);

    this.isLoaded()
  }

  init() {
    this.navigate();
    this.toggleInfoBtn();
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

  isLoaded() {
    const check = setInterval(() => {
      if (document.readyState === "complete") {
        this.slides = [...document.getElementsByClassName("slide")];
        this.slides = this.slides.slice(1);
        if (this.hadImages()) {
          // console.log("loaded");
          this.init();
          clearInterval(check);
        }
      }
    }, 100);
  }

  hadImages() {
    return (
      this.slides.filter((slide) => {
        return slide.getElementsByTagName("img");
      }).length == this.slides.length
    );
  }

  addListeners() {
    if (!this.hadImages()) return;

    for (let i = 0; i < this.slides.length; i++) {
      const slide = this.slides[i];
      const images = slide.getElementsByTagName("img");
      const image = images[0];
      const imageID = this.getfileId(image.currentSrc);
      if (imageID)
        this.slideImages.set(imageID, {
          next:
            i == this.slides.length - 1
              ? this.getFileUrl(this.slides[0].querySelector("img"))
              : this.getFileUrl(this.slides[i + 1].querySelector("img")),
          prev:
            i === 0
              ? this.getFileUrl(
                  this.slides[this.slides.length - 1].querySelector("img")
                )
              : this.getFileUrl(this.slides[i - 1].querySelector("img")),
        });
      image.addEventListener("click", (e) => {
        e.preventDefault();
        this.selectedImage = imageID;
        this.lightbox.classList.add("lightbox-open");
        document.body.classList.add("no-scroll");
        this.lightboxImg.src = image.currentSrc;
      });
    }
  }

  navigate() {
    //case switch for document key events
    document.addEventListener(
      "keydown",
      (e) => {
        e.preventDefault();
        switch (e.code) {
          case "ArrowRight":
            this.gallery("right");
            break;
          case "ArrowLeft":
            this.gallery("left");
            break;
          case "Space":
            this.closeLightbox();
            break;
          case "Escape":
            this.closeLightbox();
            break;
        }
      },
      false
    );
  }
  getfileId(url) {
    const regex = /\/assets\/(.*)-\d+\.webp/;
    let id = url.match(regex);
    return id ? id[1] : false;
  }

  getFileUrl(element) {
    return element.currentSrc;
  }

  gallery(direction) {
    if (this.slideImages.has(this.selectedImage)) {
      const _image = this.slideImages.get(this.selectedImage);
      switch (direction) {
        case "right":
          this.lightboxImg.src = _image.next;
          this.selectedImage = this.getfileId(_image.next);
          break;
        case "left":
          this.lightboxImg.src = _image.prev;
          this.selectedImage = this.getfileId(_image.prev);
          break;
        default:
          break;
      }
    }
  }
  closeLightbox() {
    this.lightbox.classList.remove("lightbox-open");
    document.body.classList.remove("no-scroll");
  }
}

export default Lightbox;
