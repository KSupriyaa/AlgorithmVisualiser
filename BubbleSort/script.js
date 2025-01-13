const barsContainer = document.getElementById("bars-container");
const randomizeArrayBtn = document.getElementById("randomize-array-btn");
const sortBtn = document.getElementById("sort-btn");
const speedSlider = document.getElementById("speed-slider");


// document.getElementById("play-btn").setAttribute("disabled", "true")
// var toggle = 0;
// function waitform(ms) {
//     return new Promise(resolve => {
//         setTimeout(() => { resolve('') }, ms);
//     })
// }

// function eventt() {
//     return new Promise(resolve => {
//         let playbtnclick = function () {
//             document.getElementById("pause-btn").removeAttribute("disabled")
//             document.getElementById("play-btn").setAttribute("disabled", "true")
//             document.getElementById("play-btn").removeEventListener("click", playbtnclick)
//             toggle = 0;
//             alert(toggle); //new
//              bubbleSort();
//             swapElements(j,j+1);
//             resolve("resolved");
//         }
//         document.getElementById("play-btn").addEventListener("click", playbtnclick)
//     })
// }

// document.getElementById("pause-btn").addEventListener("click", async function () {
//     toggle = 1;
//     alert(toggle)
//     document.getElementById("pause-btn").setAttribute("disabled", "true")
//     document.getElementById("play-btn").removeAttribute("disabled")
// })

// async function calculate() {
//     for (let a = 0; a < 10000; a++) {
//         document.getElementById("sec").innerHTML = a;
//         await waitform(1000);
//         await eventt();
//     }
// }



let bars = [];
let arrayLength = 25;
let delay = calculateDelay(speedSlider.value);


function generateRandomArray(length) {
    return Array.from({ length }, () => Math.floor(Math.random() * 400) + 10);
}

function createBars(array) {
    barsContainer.innerHTML = "";
    bars = [];
    for (let i = 0; i < array.length; i++) {
        const bar = document.createElement("div");

        bar.className = "bar";
        bar.style.height = `${array[i]}px`;
        bar.style.width = `20px`;
        const barText = document.createElement("span");
        barText.className = "bar-text";
        barText.innerText = array[i].toString();
        bar.appendChild(barText);

        barsContainer.appendChild(bar);
        bars.push(bar);
    }
}


function swapElements(i, j) {
    return new Promise((resolve) => {
        const tempHeight = bars[i].style.height;
        bars[i].style.height = bars[j].style.height;
        bars[j].style.height = tempHeight;
        setTimeout(resolve, delay);
    });
}

async function bubbleSort() {
    {
        sortBtn.disabled = true;
        randomizeArrayBtn.disabled = true;
      
        for (let i = 0; i < bars.length; i++) {
            for (let j = 0; j < bars.length - i - 1; j++) {
                bars[j].style.backgroundColor = "red";
                bars[j + 1].style.backgroundColor = "red";
                if (parseInt(bars[j].style.height) > parseInt(bars[j + 1].style.height)) {
                    // if (toggle == 1) {
                    //     await calculate(); 
                    //    while(toggle==1);
                    // }
                    //  if(toggle==0){ //new

                      await swapElements(j, j + 1);
                      updateBarText();
                    // }
                }
                bars[j].style.backgroundColor = "blue";
                bars[j + 1].style.backgroundColor = "blue";
            }
            bars[bars.length - i - 1].style.backgroundColor = "Green";
        }
        sortBtn.disabled = false;
        randomizeArrayBtn.disabled = false;
        updateBarText();
    }
}

function updateBarText() {
    bars.forEach((bar) => {
        const barText = bar.querySelector(".bar-text");
        barText.innerText = bar.style.height.slice(0, -2);
    });

}

randomizeArrayBtn.addEventListener("click", () => {
    const newArray = generateRandomArray(arrayLength);
    createBars(newArray);
});

sortBtn.addEventListener("click", () => {
    bubbleSort();
});



function calculateDelay(speed) {
    return 2000 / speed;
}

function updateDelay() {
    delay = calculateDelay(speedSlider.value);
}
speedSlider.addEventListener("input", updateDelay);
randomizeArrayBtn.addEventListener("click", () => {
    const newArray = generateRandomArray(arrayLength);
    createBars(newArray);
});



createBars(generateRandomArray(arrayLength));


function updateSpeed(value) {
    const speed = 1000 - value;
    speedSlider.setAttribute("data-speed", speed);
  }