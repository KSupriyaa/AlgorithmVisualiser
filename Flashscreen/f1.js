var messageArray=["<p> Algorithms are central objects of every nontrivial computer Application <br/>  but their analysis and design is a great challenge. <br/>In addition to the Mathematical and   Empirical analysis of algorithms,<br/> there is yet a third way to study algorithms, i.e. Algorithm Visualization.<br/><br/> AlgoViz illustrates how algorithm works in a graphical way and shows<br> step by step process with bar graphical animation and compares them <br/> on the basis of their space and time complexity. "];
var textposition=0;
var speed = 80;
 
typewriter=() => {
    document.querySelector("#message").innerHTML=messageArray[0].substring(0,textposition)+"<span>\u25ae</span>";
    if(textposition++ !== messageArray[0].length)
    setTimeout(typewriter,speed)
}

window.addEventListener("load",typewriter);


