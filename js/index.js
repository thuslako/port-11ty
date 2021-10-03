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

(()=>{
  console.log('My portfolio')
})()
