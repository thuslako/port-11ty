import Lightbox from "./gallery.js";
(function () {
  const copyText = (btn) => {
    const content = btn.target.getAttribute("data-copy");
    if (!content) return;
    navigator.clipboard.writeText(content);
    btn.target.children[0].classList.add("show");
    setTimeout(() => {
      btn.target.children[0].classList.remove("show");
    }, 2000);
  };
  const copyEmail = document.getElementById("copy-email")
  if (copyEmail) copyEmail.addEventListener("click", copyText, false);

  // toggle gallery info button
  const galleryInfobtns = document.getElementsByClassName("info-btn");
  if(galleryInfobtns.length) galleryInfobtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.target.classList.add("info-btn-open");
      setTimeout(() => {
        e.target.classList.remove("info-btn-open");
      }, 2000);
    });
  });



  const lightbox = document.getElementById("lightbox");
  const slides = [...document.getElementsByClassName("slide")];
  if (lightbox && slides.length) {
    const lightbox = new Lightbox();
    lightbox.init();
  }

})();
