# Sorting visualizer

Takes your javascript code, applies it to a random array of numbers and visualises the changes step by step.

![Quick sort](https://github.com/vicrazumov/sort-viz/raw/master/sort-viz.gif "Quick sort")

## What's interesting?
1. it uses [JS Proxies](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) to register each transformation of an array, that will become a frame in animation
2. it moves the execution of a customer script to a [separate thread](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers) in order to keep the main thread unlocked (e.g., if you need to sort 10M items) **Pay attention: running 3rd party code this way is insecure.**
3. it creates a web worker with a custom code on the fly by using a [Blob API](https://developer.mozilla.org/en-US/docs/Web/API/Blob).

## Usage
1. clone the repo and run a static [http-server](https://www.npmjs.com/package/http-server) from this folder
2. by default, it uses a quick sort algorithm. You can update this in `index.html`.
3. by default, it uses an array of 1000 random numbers. Adjust that in `index.js`
