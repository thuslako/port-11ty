gsap.registerPlugin(ScrollTrigger);
const slides = gsap.utils.toArray(".slide");
const gallery = document.getElementById("_gallery");

gsap.to(slides, {
  xPercent: -100 * (slides.length - 1),
  ease: "none",
  scrollTrigger: {
    trigger: ".gallery",
    pin: true,
    pinSpacing: "margin",
    scrub: 0.1,
    end: `+=${gallery.offsetWidth}`,
  },
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
