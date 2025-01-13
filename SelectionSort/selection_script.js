// DOM elements
const barsContainer = document.getElementById("bars-container");
const randomizeArrayBtn = document.getElementById("randomize-array-btn");
const sortBtn = document.getElementById("sort-btn");
const speedSlider = document.getElementById("speed-slider");
// Global variables

let bars = [];
let arrayLength = 25;
let delay = calculateDelay(speedSlider.value);

// Generates a random array of the specified length
function generateRandomArray(length) {
    return Array.from({ length }, () => Math.floor(Math.random() * 400) + 10);
}

// Creates the bars in the DOM based on the provided array
function createBars(array) {
        barsContainer.innerHTML = "";
        bars = [];
        for (let i = 0; i < array.length; i++) {
            const bar = document.createElement("div");
            bar.className = "bar";
            bar.style.height = `${array[i]}px`;
            bar.style.width= '20px'
    
            const barText = document.createElement("span");
            barText.className = "bar-text";
            barText.innerText = array[i].toString();
            bar.appendChild(barText);
    
            barsContainer.appendChild(bar);
            bars.push(bar);
        }
    }
    


// Swaps two elements in the array and adds a delay
function swapElements(i, j) {
    return new Promise((resolve) => {
        const tempHeight = bars[i].style.height;
        bars[i].style.height = bars[j].style.height;
        bars[j].style.height = tempHeight;
        setTimeout(resolve, delay);
    });
}

// Sorts the bars using the selection sort algorithm and updates the colors
async function selectionSort() {
    sortBtn.disabled = true;
    randomizeArrayBtn.disabled = true;
    for (let x = 0; x < bars.length - 1; x++) {
        let index = x;
        for (let y = x + 1; y < bars.length; y++) {
            bars[index].style.backgroundColor = "blue";
            await sleep(delay);
            bars[y].style.backgroundColor = "red";
            if (parseInt(bars[y].style.height) < parseInt(bars[index].style.height)) {
                if (index !== x) { // reset previous selected bar color
                    bars[index].style.backgroundColor = "blue";
                }

                index = y;
            }

            bars[index].style.backgroundColor = "red";
            await sleep(delay);
            bars[y].style.backgroundColor = "blue";
            bars[index].style.backgroundColor = "blue";

        }

        await swapElements(x, index);
        updateBarText()
        bars[x].style.backgroundColor = "green"; // set sorted bar color

        await sleep(delay); // add a delay to visualize the swapping
    }

    bars[bars.length - 1].style.backgroundColor = "green"; // set the last bar color
    updateBarText();
    sortBtn.disabled = false;
    randomizeArrayBtn.disabled = false;
}

function updateBarText() {
    bars.forEach((bar) => {
        const barText = bar.querySelector(".bar-text");
        barText.innerText = bar.style.height.slice(0, -2); // Remove "px" from the height value
    });

}

function calculateDelay(speed) {
    return 2000 / speed;
}


// Utility function to add a delay
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function updateDelay() {
    delay = calculateDelay(speedSlider.value);
}

// Event listeners
randomizeArrayBtn.addEventListener("click", () => {
    const newArray = generateRandomArray(arrayLength);
    createBars(newArray);
});

sortBtn.addEventListener("click", () => {
    selectionSort();
});

speedSlider.addEventListener("input", updateDelay);
randomizeArrayBtn.addEventListener("click", () => {
    const newArray = generateRandomArray(arrayLength);
    createBars(newArray);
});

// Initial setup
createBars(generateRandomArray(arrayLength));
