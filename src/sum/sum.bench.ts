/* eslint-disable unicorn/no-array-reduce */

import { suite, add, complete, cycle, save } from "benny"
import { sum } from "./sum.js"

// Implementation 1
const sumWithForLoop = sum

// Implementation 2
const sumWithEntriesForLoop = (input: number[] = []) => {
  let output = 0

  for (const [index, item] of input.entries()) {
    const isItemNaN = typeof item !== "number" || Number.isNaN(item)

    if (isItemNaN) {
      throw new TypeError(
        `[sum] item not a number (index: ${index} value: "${item}")`
      )
    }

    output = output + item
  }

  return output
}

// Implementation 3
const sumWithReverseWhileLoop = (input: number[] = []) => {
  let output = 0
  let index = input.length

  while (index-- > 0) {
    const item = input[index]
    const isItemNaN = typeof item !== "number" || Number.isNaN(item)

    if (isItemNaN) {
      throw new TypeError(
        `[sum] item not a number (index: ${index} value: "${item}")`
      )
    }

    output = output + item
  }

  return output
}

// Implementation 4
const sumWithReduce = (input: number[] = []) =>
  input.reduce((acc, item, index) => {
    const isItemNaN = typeof item !== "number" || Number.isNaN(item)

    if (isItemNaN) {
      throw new TypeError(
        `[sum] item not a number (index: ${index} value: "${item}")`
      )
    }

    return acc + item
  }, 0)

// Implementation 5
const sumWithReverseForLoop = (input: number[] = []) => {
  let output = 0

  for (let index = input.length - 1; index >= 0; index--) {
    const item = input[index]
    const isItemNaN = typeof item !== "number" || Number.isNaN(item)

    if (isItemNaN) {
      throw new TypeError(
        `[sum] item not a number (index: ${index} value: "${item}")`
      )
    }

    output = output + item
  }

  return output
}

suite(
  "sum: add together all items inside an array",

  add("[1] 'for' loop", () => {
    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9]

    sumWithForLoop(data)
  }),
  add("[2] entries 'for' loop", () => {
    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9]

    sumWithEntriesForLoop(data)
  }),
  add("[3] reverse 'while' loop", () => {
    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9]

    sumWithReverseWhileLoop(data)
  }),
  add("[4] reduce", () => {
    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9]

    sumWithReduce(data)
  }),
  add("[5] reverse 'for' loop", () => {
    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9]

    sumWithReverseForLoop(data)
  }),

  cycle(),
  complete(),

  save({ file: "sum", version: "1.0.0" }),
  save({ file: "sum", format: "chart.html" })
)
