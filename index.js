const DELAY = 1000

const printAfter = (n, delay) => {
  const startTime = new Date()
  while (true) {
    if (new Date() - startTime > delay) break
  }
  console.log(n)
}

/**
 * test if consecutive Promise block the render process
 */
const consecutivePromise = () => {
  for (let i = 0; i < 5; i++) {
    new Promise((resolve, reject) => {
      printAfter(i, DELAY)
    })
  }
}

/**
 * test if await setTimeout non-block the render process
 */
const trySTO = async () => {
  for (let i = 0; i < 5; i++) {
    await setTimeout(() => {}, 0)
    new Promise((resolve, reject) => {
      printAfter(i, DELAY)
      resolve()
    })
  }
}

/**
 * test if await setTimeout and await Promise non-block the render process
 */
const trySTO2 = async () => {
  for (let i = 0; i < 5; i++) {
    await new Promise((resolve, reject) => {
      setTimeout(() => resolve(), 0)
    })
    await new Promise((resolve, reject) => {
      printAfter(i, DELAY)
      resolve()
    })
  }
}

/**
 * test if await setTimeout and await Promise non-block the render process
 */
const stepByStep = async () => {
  let i = 0, end = 5
  function oneStep() {
    new Promise((resolve, reject) => {
      printAfter(i, DELAY)
      i++
      if (i <= end) {
        resolve()
      } else {
        reject('finish')
      }
    }).then(() => setTimeout(oneStep, 0), () => console.log('yeah')).catch((reason) => console.log('end', reason))
  }
  oneStep()
}




