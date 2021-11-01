const copyText = (text)=>{
  const content = text.getAttribute('data-copy')
  if(content){
    navigator.clipboard.writeText(content);
    text.children[0].classList.add("show");
    setTimeout(()=>{text.children[0].classList.toggle("show");},1500)
  }
  else{
    return
  }
}
//light and dark mode toggle 
const btn = document.getElementById('btn-theme-toggle');
const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');


let mode = "dar"

btn.addEventListener("click",function(){
  const userPerference = document.documentElement.getAttribute('data-theme')
  const theme = userPerference === 'dark'?'light':'dark'
  document.documentElement.setAttribute('data-theme',theme)
  
},false);

(()=>{
  console.log('My portfolio')
  document.documentElement.setAttribute('data-theme',systemTheme.matches? 'dark':'light')
})()
