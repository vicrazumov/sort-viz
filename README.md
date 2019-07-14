# Sorting visualizer

Takes your javascript code, applies it to a random array of numbers and visualises the changes step by step.

![Quick sort](https://github.com/vicrazumov/sort-viz/raw/master/sort-viz.gif "Quick sort")

## What's interesting?
1. it uses [JS Proxies](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) to register each transformation of an array, that will become a frame in animation
2. it moves the execution of a customer script to a [separate thread](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers) in order to keep the main thread unlocked (e.g., if you need to sort 10M items)
3. it creates a web worker with a custom code on the fly by using a [Blob API](https://developer.mozilla.org/en-US/docs/Web/API/Blob).