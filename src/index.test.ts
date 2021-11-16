import test from "tape"
import { findWith, updateWith, removeWith, last } from "@asd14/m"

import { buildQueue } from "./index.js"

const buildCrudList = <T extends Record<string, unknown>>() => {
  let items: T[] = []

  return {
    items: () => items,
    create: (data: T): T => last((items = [...items, data])),
    read: (id: string): T => findWith({ id }, items),
    update: (id: string, data: T): T =>
      (items = updateWith({ id }, data, items)),
    remove: (id: string): T => (items = removeWith({ id }, items)),
  }
}

test("queue - reuse existing runnning promises (default)", async t => {
  const todosQueue = buildQueue()
  const todosList = buildCrudList()

  const createPromise1 = todosQueue.push({
    fn: todosList.create,
    params: [{ id: "1", value: "lorem" }],
  })

  const createPromise2 = todosQueue.push({
    fn: todosList.create,
    params: [{ id: "1", value: "lorem" }],
  })

  const createPromise3 = todosQueue.push({
    fn: todosList.create,
    params: [{ id: "2", value: "ipsum" }],
  })

  t.equal(
    createPromise1,
    createPromise2,
    "given [multiple .push with same fn and params] should [return same promise]"
  )

  t.notEqual(
    createPromise2,
    createPromise3,
    "given [multiple .push with same fn and different params] should [return different promises]"
  )

  await Promise.all([createPromise1, createPromise2, createPromise3]).then(
    ([result1, result2, result3]) => {
      t.deepEqual(
        { id: "1", value: "lorem" },
        result1,
        "given [1st job finished] should [resolve to correct value]"
      )

      t.equal(
        result1,
        result2,
        "given [1st and 2nd jobs finished from same fn and params] should [resolve to the same value]"
      )

      t.deepEqual(
        { id: "2", value: "ipsum" },
        result3,
        "given [3rd job finished from different fn and params] should [resolve to correct value]"
      )

      t.deepEqual(
        todosList.items(),
        [
          { id: "1", value: "lorem" },
          { id: "2", value: "ipsum" },
        ],
        "given [all jobs finished] should [resolve in the corect sequence]"
      )
    }
  )

  t.end()
})

test("queue - dont reuse existing", async t => {
  const todosQueue = buildQueue({ shouldReuseExisting: false })
  const todosList = buildCrudList()

  const createPromise1 = todosQueue.push({
    fn: todosList.create,
    params: [{ id: "1", value: "lorem" }],
  })

  const createPromise2 = todosQueue.push({
    fn: todosList.create,
    params: [{ id: "1", value: "lorem" }],
  })

  const createPromise3 = todosQueue.push({
    fn: todosList.create,
    params: [{ id: "2", value: "ipsum" }],
  })

  t.notEqual(
    createPromise1,
    createPromise2,
    "given [multiple .push with same fn and params] should [return different promises]"
  )

  t.notEqual(
    createPromise2,
    createPromise3,
    "given [multiple .push with same fn and different params] should [return different promises]"
  )

  await Promise.all([createPromise1, createPromise2, createPromise3]).then(
    ([result1, result2, result3]) => {
      t.deepEqual(
        { id: "1", value: "lorem" },
        result1,
        "given [1st job finished] should [resolve to correct value]"
      )

      t.notEqual(
        result1,
        result2,
        "given [1st and 2nd jobs finished from same fn and params] should [resolve to a different value]"
      )

      t.deepEqual(
        { id: "2", value: "ipsum" },
        result3,
        "given [3rd job finished from different fn and params] should [resolve to correct value]"
      )

      t.deepEqual(
        todosList.items(),
        [
          { id: "1", value: "lorem" },
          { id: "1", value: "lorem" },
          { id: "2", value: "ipsum" },
        ],
        "given [all jobs finished] should [resolve in the corect sequence]"
      )
    }
  )

  t.end()
})
