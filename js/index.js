(()=>{
  const toggleClass= (el, className) => { el.classList.toggle(className)}; 
  document.querySelector('.nav_').addEventListener('click', event => {
     toggleClass(document.querySelector('.footer_nav'), 'open-nav');
     toggleClass(document.querySelector('.nav-toggle'), 'close-nav');
     toggleClass(document.querySelector('html'), 'opened-drawer');
  });

  document.querySelectorAll('.has_submenu').forEach( menu => {
    menu.addEventListener('click', event => {
        toggleClass(event.target.nextElementSibling, 'toggle-submenu');
        const condAria = event.target.nextElementSibling.getAttribute('aria-expanded');
        condAria == 'false'? event.target.nextElementSibling.setAttribute('aria-expanded', true) : event.target.querySelector('.submenu_').setAttribute('aria-expanded', false);
    });
  });  
})()