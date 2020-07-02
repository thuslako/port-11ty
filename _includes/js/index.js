(()=>{
  const toggleClass= (el, className) => { el.classList.toggle(className)}; 
  document.querySelector('.nav-toggle').addEventListener('click', event => {
     toggleClass(document.querySelector('.footer_nav'), 'open-nav');
  });
})()
