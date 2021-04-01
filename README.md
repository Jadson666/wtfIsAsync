# wtfIsAsync

### Project Goal
demo all the most weird scenario about `Promise`, `async/await` or `blocking`

***

### Environment

mainly for Browser
for Node.js, you can take it as reference, but I am not sure the behavior is the same

### cases included for now

1. consecutive Promise using for loop block the main thread
2. consecutive Promise but add `await setTimeout(()=> {}, 0)` between each Promises block the main thread
3. base on case 2, add await each Promise, **not** blocking the main thread
4. use Promise chain and wrap next Promise into `await setTimeout(nextPromise, 0)`, **not** blocking the main thread
