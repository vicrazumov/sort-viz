const rand = (min, max) => Math.floor(Math.random() * (max - min)) + min

const canvas = document.getElementById('canvas')

// TODO: handle resizing
const canvasWidth = window.innerWidth * 0.50
const canvasHeight = window.innerHeight - 16

canvas.width = canvasWidth
canvas.height = canvasHeight

const ctx = canvas.getContext('2d')

ctx.moveTo(canvasWidth, canvasHeight)
ctx.lineTo(0, canvasHeight);
ctx.stroke();
ctx.lineTo(0, 0);
ctx.stroke()

const ITEMS_COUNT = 1000
const numbersTextArea = document.getElementById('numberArray')
const MIN_ITEM = 1
const MAX_ITEM = ITEMS_COUNT + 1
numbersTextArea.innerHTML = new Array(ITEMS_COUNT).fill(0).map((item, idx) => rand(MIN_ITEM, MAX_ITEM)).join(',')

const randomArray = numbersTextArea.innerHTML.split(',').map(item => parseInt(item, 10))

const GUTTER = 4
const ITEM_WIDTH = canvasWidth / ITEMS_COUNT - GUTTER
const NORMALIZED_ITEM_HEIGHT = canvasHeight / (MAX_ITEM - MIN_ITEM)

const draw = (arr, highlightIndex, highlightColor) => {
  ctx.fillStyle = 'white'
  ctx.fillRect(1, 0, canvasWidth - 1, canvasHeight - 1)

  arr.forEach((item, idx) => {
    ctx.fillStyle = 'silver'
    if (idx === highlightIndex) {
      ctx.fillStyle = highlightColor || 'red'
    }
    const height = item * NORMALIZED_ITEM_HEIGHT
    ctx.fillRect((GUTTER + ITEM_WIDTH) * idx, canvasHeight - height, ITEM_WIDTH, height)
  })
}

// const queue = []
// var arrayChangeHandler = {
//   set: function(target, property, value, receiver) {
//     target[property] = value;
//     queue.push({ property, value })

//     // you have to return true to accept the changes
//     return true;
//   }
// };

const drawArray = [...randomArray]
// var proxyToArray = new Proxy(randomArray, arrayChangeHandler);

draw(drawArray)


const blob = new Blob([
`var queue = []

var arrayChangeHandler = {
  set: function(target, property, value, receiver) {
    target[property] = value;
    queue.push({ property, value });

    // you have to return true to accept the changes
    return true;
  }
};

onmessage = function(e) {
  queue = [];

  var proxyToArray = new Proxy(e.data.array, arrayChangeHandler);

  var functionText = e.data.code;
  var functionFromText = new Function('return ' + functionText)
  functionFromText()(proxyToArray);

  postMessage(queue);
}`]);

var blobURL = window.URL.createObjectURL(blob)

var worker = new Worker(blobURL)
worker.onmessage = function(e) {
  const queue = e.data;
  tick(queue);
}

const functionText = document.getElementById('code').value
worker.postMessage({ code: functionText, array: randomArray })

let idx = 0

const tick = (queue) => {
  const item = queue[idx]
  if (item) {
    requestAnimationFrame(() => {
      drawArray[item.property] = item.value
      draw(drawArray, parseInt(item.property, 10), idx % 2 ? 'red' : 'blue')
      tick(queue)
    });
    idx++;
  } else {
    draw(drawArray)
  }
}
