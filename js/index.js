gsap.registerPlugin(ScrollTrigger);
const slides = gsap.utils.toArray(".slide");
const gallery = document.getElementById("_gallery");
const album = gsap.to(slides, {
  xPercent: -100 * (slides.length - 1),
  ease: "none",
  y: "0",
  scrollTrigger: {
    trigger: ".gallery",
    start: "center 50%",
    end: "bottom top",
    pin: true,
    pinSpacing: "margin",
    scrub: 0.3,
    snap: {
      snapTo: 1 / (slides.length - 1),
      duration: 0.02,
      ease: "power2.inOut",
    },
    end: `+=${gallery.offsetWidth}`,
  },
});
slides.forEach((slide, i) => {
  gsap.set(slide.children[0], {
    css: {
      visibility: "hidden",
      width: "20%",
      height: "20%",
      "border-radius": "100%",
    },
    scale: 0.1,
  });
  gsap.to(slide.children[0], {
    css: {
      visibility: "visible",
      width: "100%",
      height: "100%",
      "border-radius": "0%",
    },
    scale: 1,
    duration: 1.5,
    scrollTrigger: {
      trigger: slide,
      containerAnimation: album,
      start: "left center",
      toggleActions: "play none none reset",
      id: i,
    },
  });
  ScrollTrigger.create({
    trigger: slide,
    containerAnimation: album,
    marker: true,
    start: () =>
      `top top-=${
        (slide.offsetLeft - window.innerWidth / 2) *
        (gallery.offsetWidth / (gallery.offsetWidth - window.innerWidth))
      }`,
    end: () =>
      `+=${
        slide.offsetWidth *
        (gallery.offsetWidth / (gallery.offsetWidth - window.innerWidth))
      }`,
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
