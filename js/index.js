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
  const copyEmail = document.getElementById("copy-email");
  if (copyEmail) copyEmail.addEventListener("click", copyText, false);

  // toggle gallery info button
  new Lightbox();
})();
