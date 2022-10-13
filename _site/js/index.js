(() => {
  const copyText = (btn) => {
    const content = btn.target.getAttribute("data-copy");
    if (!content) return;
    navigator.clipboard.writeText(content);
    btn.target.children[0].classList.add("show");
    setTimeout(() => {
      btn.target.children[0].classList.toggle("show");
    }, 2000);
  };
  document
    .getElementById("copy-email")
    .addEventListener("click", copyText, false);
  console.log("My portfolio");
})();
