// class Lightbox that will generate a lightbox gallery from the images from .slide elements on page
// adding keyboard arrow key navigation and closing lightbox on click outside of image

class Lightbox {
  constructor() {
    this.lightbox = document.getElementById("lightbox");
    this.slides = document.getElementsByClassName("slide");
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
    if (this.slides) {
      for (let i = 0; i < this.slides.length; i++) {
        const slide = this.slides[i];
        const images = slide.getElementsByTagName("img");
        for (let j = 0; j < images.length; j++) {
          const image = images[j];
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
            // lightboxContent.appendChild(lightboxClose);
            lightboxContent.appendChild(lightboxImg);
            this.lightbox.appendChild(lightboxContent);
          });
        }
      }
    }
  }
}

export default Lightbox;