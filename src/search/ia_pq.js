/*!
 * PriorityQueue - Data Structure - JS
 * Copyright(c) 2018 Jeová Pereira Gomes (@jeovazero <contato@jeova.ninja>)
 * MIT Licensed
 */

function PQ () {
  var queue = []
  this.up = function () {
    var filho = queue.length
    var pai = x => Math.floor(x / 2)
    // Enquanto o filho nao chegar na raiz
    // e o filho for menor que o pai
    while (filho >= 2 && compare(filho, pai(filho)) === true) {
      swap(pai(filho), filho)
      filho = pai(filho)
    }
  }
  this.down = function (index) {
    var pai = index
    var filho = x => x * 2

    var f1

    var f2
    var len = queue.length
    var lenHalf = Math.floor(len / 2)
    while (pai <= lenHalf) {
      f1 = filho(pai)
      f2 = f1 + 1
      if (f1 < len && compare(f2, f1) === true) f1++
      if (compare(f1, pai) === true) {
        swap(f1, pai)
        pai = f1
      } else break
    }
  }
  this.maxHeap = function () {
    for (var i = Math.floor(queue.length / 2); i >= 1; i--) this.down(i)
  }
  this.extract = function () {
    var max = queue[0]
    var last = queue.pop()
    if (queue.length > 0) {
      queue[0] = last
    }
    this.down(1)
    return max
  }
  this.add = function (x) {
    queue.push(x)
    this.up()
  }
  function swap (a, b) {
    var x = queue[a - 1]
    queue[a - 1] = queue[b - 1]
    queue[b - 1] = x
  }
  function compare (a, b) {
    return queue[a - 1].custo < queue[b - 1].custo
  }
  this.get = function () {
    return console.log(queue)
  }
  this.size = function () {
    return queue.length
  }
}

module.exports.PQ = PQ
