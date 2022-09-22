gsap.registerPlugin(ScrollTrigger);
let maxWidth = 0;
const slides = gsap.utils.toArray(".slide");
const gallery = document.getElementById("_gallery");
const getMaxWidth = () => {
  maxWidth = 0;
  slides.forEach((slide) => {
    maxWidth += slide.offsetWidth;
  });
};
getMaxWidth();
ScrollTrigger.addEventListener("refreshInit", getMaxWidth);

gsap.to(slides, {
  x: () => `-${maxWidth - gallery.offsetWidth}`,
  ease: "none",
  scrollTrigger: {
    trigger: ".gallery",
    pin: true,
    scrub: true,
    span: 1 / (slides.length - 1),
    end: () => `+=${maxWidth}`,
    invalidateOnRefresh: true,
  },
});

slides.forEach((slide, i) => {
  ScrollTrigger.create({
    trigger: slide,
    start: () =>
      "top top-=" +
      (slide.offsetLeft - gallery.offsetWidth / 2) *
        (maxWidth / (maxWidth - gallery.offsetWidth)),
    end: () =>
      "+=" + slide.offsetWidth * (maxWidth / (maxWidth - gallery.offsetWidth)),
    toggleClass: { targets: slide, className: "active" },
  });
});

const copyText = (text) => {
  const content = text.getAttribute("data-copy");
  if (content) {
    navigator.clipboard.writeText(content);
    text.children[0].classList.add("show");
    setTimeout(() => {
      text.children[0].classList.toggle("show");
    }, 500);
  } else {
    return;
  }
};

console.log("My portfolio");
