/*
 * Heap - Data Structure
 * Copyright(c) 2021 Jeová Pereira Gomes (@jeovazero <contato@jeova.ninja>)
 * MIT Licensed
 */

const parentOf = (x: number) => Math.floor(x / 2)
const firstChildOf = (x: number) => x * 2

type Compare<Data> = (a: Data, b: Data) => boolean

export function Heap<Data>(compare: Compare<Data>) {
  const queue: Array<Data> = []

  const shakeUp = () => {
    let child = queue.length

    while (child >= 2 && compareNodes(child, parentOf(child))) {
      swap(parentOf(child), child)
      child = parentOf(child)
    }
  }

  const shakeDown = (index: number) => {
    let parent = index

    const len = queue.length
    const lenHalf = Math.floor(len / 2)

    while (parent <= lenHalf) {
      let firstChild = firstChildOf(parent)
      const secondChild = firstChild + 1

      if (firstChild < len && compareNodes(secondChild, firstChild)) {
        firstChild++
      }

      if (compareNodes(firstChild, parent)) {
        swap(firstChild, parent)
        parent = firstChild
      }
      else break
    }
  }

  const swap = (a: number, b: number) => {
    const x = queue[a - 1]
    queue[a - 1] = queue[b - 1]
    queue[b - 1] = x
  }

  const compareNodes = (a: number, b: number) =>
    compare(queue[a - 1], queue[b - 1])

  return {
    makeHeap: () => {
      for (let i = Math.floor(queue.length / 2); i >= 1; i--) shakeDown(i)
    },
    extract: () => {
      const max = queue[0] // not safe
      const last = queue.pop()
      if (queue.length > 0 && last !== undefined) {
        queue[0] = last
      }
      shakeDown(1)
      return max
    },
    add: (x: Data) => {
      queue.push(x)
      shakeUp()
    },
    print: () => {
      console.log(queue)
    },
    size: () => queue.length
  }
}
