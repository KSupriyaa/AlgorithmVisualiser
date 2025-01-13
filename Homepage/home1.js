let preveiwContainer = document.querySelector('.products-preview');
let previewBox = preveiwContainer.querySelectorAll('.preview');

document.querySelectorAll('.products-container .product').forEach(product =>{
  product.onclick = () =>{
    preveiwContainer.style.display = 'flex';
    let name = product.getAttribute('data-name');
    previewBox.forEach(preview =>{
      let target = preview.getAttribute('data-target');
      if(name == target){
        preview.classList.add('active');
      }
    });
  };
});

previewBox.forEach(close =>{
  close.querySelector('.fa-times').onclick = () =>{
    close.classList.remove('active');
    preveiwContainer.style.display = 'none';
  };
});


/* Type writers code */

var messageArray=["Algorithms"];
var textposition=0;
var speed = 80;
 
typewriter=() => {
    document.querySelector("#message").innerHTML=messageArray[0].substring(0,textposition)+"<span>\u25ae</span>";
    if(textposition++ !== messageArray[0].length)
    setTimeout(typewriter,speed)
}

window.addEventListener("load",typewriter);

