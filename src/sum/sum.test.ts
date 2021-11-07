import test from "tape"
import { sum } from "./sum.js"

test("sum: add together all items inside an array", t => {
  t.plan(3)

  t.equal(sum(), 0, "given [empty input array] should [return 0]")

  t.equal(
    sum([2, 0 - 1]),
    1,
    "given [multiple items] should [return the correct sum]"
  )

  t.throws(
    () => {
      // @ts-ignore-next
      sum([1, "3"])
    },
    {
      // @ts-ignore-next
      message: `[sum] item not a number (index: 1 value: "3")`,
    },
    "given [an item is not a number] should [trow]"
  )
})
