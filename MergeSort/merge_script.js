const barsContainer = document.getElementById("bars-container");
const randomizeArrayBtn = document.getElementById("randomize-array-btn");
const sortBtn = document.getElementById("sort-btn");
const speedSlider = document.getElementById("speed-slider");

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
    bar.style.width = '20px';
    const barText = document.createElement("span");
    barText.className = "bar-text";
    barText.innerText = array[i].toString();
    bar.appendChild(barText);

    barsContainer.appendChild(bar);
    bars.push(bar);
  }
}

async function merge(left, mid, right) {
  const mergedArray = [];
  let i = left;
  let j = mid + 1;

  while (i <= mid && j <= right) {
    if (parseInt(bars[i].style.height) <= parseInt(bars[j].style.height)) {
      mergedArray.push(parseInt(bars[i].style.height));
      i++;
    } else {
      mergedArray.push(parseInt(bars[j].style.height));
      j++;
    }
  }

  while (i <= mid) {
    mergedArray.push(parseInt(bars[i].style.height));
    i++;
  }

  while (j <= right) {
    mergedArray.push(parseInt(bars[j].style.height));
    j++;
  }

  for (let k = left; k <= right; k++) {
    bars[k].style.height = `${mergedArray[k - left]}px`;
    bars[k].querySelector(".bar-text").innerText = mergedArray[k - left].toString();
    bars[k].style.backgroundColor = "green";
    await sleep(delay);
  }

  for (let k = left; k <= right; k++) {
    bars[k].style.backgroundColor = "blue";
  }
}

async function mergeSort(left, right) {
  if (left >= right) {
    return;
  }

  const mid = Math.floor((left + right) / 2);

  await mergeSort(left, mid);
  await mergeSort(mid + 1, right);

  await merge(left, mid, right);
}

async function Sort() {
  sortBtn.disabled = true;
  randomizeArrayBtn.disabled = true;

  await mergeSort(0, bars.length - 1);

  sortBtn.disabled = false;
  randomizeArrayBtn.disabled = false;
}

function updateBarText() {
  bars.forEach((bar) => {
    const barText = bar.querySelector(".bar-text");
    barText.innerText = bar.style.height.slice(0, -2); // Remove "px" from the height value
  });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

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

sortBtn.addEventListener("click", () => {
  Sort();
});

createBars(generateRandomArray(arrayLength));
