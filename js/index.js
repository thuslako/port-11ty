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
   if(copyEmail)copyEmail.addEventListener("click", copyText, false);

  // toggle gallery info button

  const galleryInfobtns = document.getElementsByClassName("info-btn");
  galleryInfobtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.target.parentElement.classList.toggle("info-btn-open");
    });
    btn.addEventListener("mouseover", (e) => {
      e.target.parentElement.classList.add("info-btn-open");
    });
    btn.addEventListener("mouseout", (e) => {
      e.target.parentElement.classList.remove("info-btn-open");
    });
  });

  // album lightbox
  // const album = document.getElementsByClassName("album");

})();
