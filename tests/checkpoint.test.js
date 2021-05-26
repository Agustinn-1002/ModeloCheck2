const expect = require('chai').expect;

/* eslint-disable no-undef */
const {
  countArray,
  secuenciaHenry,
  LinkedList,
  Queue,
  controlAcces,
  binarySearch,
  allAnagrams,
  specialSort,
  closureGreeting,
  generateBST,
  orderLinkedList
} = require('../checkpoint.js');

describe('Checkpoint Tests', function() {

  describe('EJERCICIO 1: countArray', function() {
    it('Debería devolver 28 cuando el array es [1, [2, [3,4]], [5,6], 7]', function() {
      expect(countArray([1, [2, [3,4]], [5,6], 7])).to.equal(28);
    });
    it('Debería devolver 0 cuando el array está vacío', function() {
      expect(countArray([])).to.equal(0);
    });
  });

  describe('EJERCICIO 2: henryFibonacci', function() {
    it('Debería devolver 6 cuando n es 0 y array = ["Franco", 1, "Henry"]', function() {
      expect(secuenciaHenry(["Franco", 1, "Henry"], 0)).to.equal(6);
    });
    it('Debería devolver 1 cuando n es 1 y array = ["Franco", 1, "Henry"]', function() {
      expect(secuenciaHenry(["Franco", 1, "Henry"], 1)).to.equal(1);
    });
    it('Debería devolver 524 cuando n es 6 y array = ["Franco", 1, "Henry"]', function() {
      expect(secuenciaHenry(["Franco", 1, "Henry"], 6)).to.equal(524);
    });
    it('Debería devolver 756 cuando n es 7 y array = ["Asd", 1, "Hi"]', function() {
      expect(secuenciaHenry(["Asd", 1, "Hi"], 7)).to.equal(756);
    });
    it('Debería devolver false cuando n es negativo', function() {
      expect(secuenciaHenry(["Franco", 1, "Henry"], -3)).to.equal(false);
    });
  });

  describe('LinkedList', function() {
    var linkedList;

    beforeEach(function() {
      linkedList = new LinkedList();
    });

    it('EJERCICIO 3: size debe devolver el tamaño actual de la lista', function() {
      expect(linkedList.size()).to.equal(0);
      linkedList.add(1);
      linkedList.add(2);
      expect(linkedList.size()).to.equal(2);
      linkedList.add(3);
      expect(linkedList.size()).to.equal(3);
    });

    it('EJERCICIO 4: removeFromPos debe remover un nuevo nodo de la posición correcta', function() {
      expect(linkedList.removeFromPos(2)).to.equal(false);
      linkedList.add(1);
      linkedList.add(2);
      expect(linkedList.removeFromPos(1)).to.equal(2);
      expect(linkedList.head.value).to.equal(1);
      expect(linkedList.head.next).to.equal(null);
      linkedList.add(4);
      linkedList.add(6);
      expect(linkedList.removeFromPos(5)).to.equal(false);
      expect(linkedList.removeFromPos(0)).to.equal(1);
      expect(linkedList.head.value).to.equal(4);
      expect(linkedList.head.next.value).to.equal(6);
    });


    it('EJERCICIO 5: order debe devolver una nueva lista ordenada a partir de la original', function () {
      linkedList.add(4);
      linkedList.add(13);
      linkedList.add(1);
      linkedList.add(10);
      var orderedList = orderLinkedList(linkedList);
      expect(orderedList.remove()).to.equal(13);
      expect(orderedList.remove()).to.equal(10);
      expect(orderedList.remove()).to.equal(4);
      expect(orderedList.remove()).to.equal(1);
      expect(orderedList.remove()).to.equal(undefined);
    });
  });

  describe('EJERCICIO 6: controlAcces', function() {
    var queue = new Queue;

    queue.enqueue({fullname: "Franco Etcheverri", age: 26, ticket: {number: 1, event: "Tomorrowland"}});
    queue.enqueue({fullname: "Toni Tralice", age: 30, ticket: {number: 2, event: "Tomorrowland"}});
    queue.enqueue({fullname: "Agus Amani", age: 26, ticket: {number: 1, event: "Tomorrowland"}});
    queue.enqueue({fullname: "Leo Maglia", age: 40, ticket: {number: 3, event: "Recital Queen"}});
    queue.enqueue({fullname: "Bart Simpson", age: 10, ticket: {number: 3, event: "Tomorrowland"}});
    queue.enqueue({fullname: "Cosme Fulanito", age: 10, ticket: {event: "Tomorrowland"}});

    it('Debe devolver las personas que cumplen los requisitos para ingresar al evento', function() {
      expect(controlAcces(queue, "Tomorrowland")).to.deep.equal(["Franco Etcheverri", "Toni Tralice"]);

      queue.enqueue({fullname: "Franco Etcheverri", age: 26, ticket: {number: 1, event: "Tomorrowland"}});
      queue.enqueue({fullname: "Toni Tralice", age: 30, ticket: {number: 2, event: "Tomorrowland"}});
      queue.enqueue({fullname: "Agus Amani", age: 26, ticket: {number: 1, event: "Tomorrowland"}});
      queue.enqueue({fullname: "Leo Maglia", age: 40, ticket: {number: 3, event: "Recital Queen"}});
      queue.enqueue({fullname: "Bart Simpson", age: 10, ticket: {number: 3, event: "Tomorrowland"}});
      queue.enqueue({fullname: "Cosme Fulanito", age: 10, ticket: {event: "Tomorrowland"}});

      expect(controlAcces(queue, "Recital Queen")).to.deep.equal(["Leo Maglia"]);

      queue.enqueue({fullname: "Franco Etcheverri", age: 26, ticket: {number: 1, event: "Tomorrowland"}});
      queue.enqueue({fullname: "Toni Tralice", age: 30, ticket: {number: 2, event: "Tomorrowland"}});
      queue.enqueue({fullname: "Agus Amani", age: 26, ticket: {number: 1, event: "Tomorrowland"}});
      queue.enqueue({fullname: "Leo Maglia", age: 40, ticket: {number: 3, event: "Recital Queen"}});
      queue.enqueue({fullname: "Bart Simpson", age: 10, ticket: {number: 3, event: "Tomorrowland"}});
      queue.enqueue({fullname: "Cosme Fulanito", age: 10, ticket: {event: "Tomorrowland"}});
      queue.enqueue({fullname: "Leo Messi", age: 33, ticket: {number: 10, event: "Tomorrowland"}});
      expect(controlAcces(queue, "Tomorrowland")).to.deep.equal(["Franco Etcheverri", "Toni Tralice", "Leo Messi"]);
    });
  });

  describe('EJERCICIO 7: generateBST', function() {

    it('Debe generar un arbol correctamente a partir de un array', function() {
      var tree = generateBST([16,6,23,2,17,31,14,5]);
      expect(tree.value).to.equal(16);
      expect(tree.left.value).to.equal(6);
      expect(tree.left.left.value).to.equal(2);
      expect(tree.left.left.right.value).to.equal(5);
      expect(tree.left.right.value).to.equal(14);
      expect(tree.right.left.value).to.equal(17);
      expect(tree.right.right.value).to.equal(31);
    });

  });

  describe('EJERCICIO 8: binarySearch', function() {
    it('Debe devolver 1 para el arreglo [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] si busca el 2', function() {
      expect(binarySearch([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 2)).to.equal(1);
    });
    it('Debería devolver 4 para el arreglo [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] si busca el 5', function() {
      expect(binarySearch([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 5)).to.equal(4);
    });

    it('Debería devolver -1 si no encuentra el valor buscado en el arreglo', function() {
      expect(binarySearch([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 11)).to.equal(-1);
    });
  });


  describe('EJERCICIO 9: specialSort', function() {
    var arraySS = [
      {name: "Notebook", price: 1200, review: 8},
      {name: "Smartphone", price: 300, review: 9},
      {name: "TV", price: 800, review: 1},
      {name: "PS5", price: 1200, review: 7}
    ];
    var arraySSPrice = [
      {name: "Smartphone", price: 300, review: 9},
      {name: "TV", price: 800, review: 1},
      {name: "Notebook", price: 1200, review: 8},
      {name: "PS5", price: 1200, review: 7}
    ];

    var arraySSPriceReview = [
      {name: "Smartphone", price: 300, review: 9},
      {name: "TV", price: 800, review: 1},
      {name: "PS5", price: 1200, review: 7},
      {name: "Notebook", price: 1200, review: 8}
    ];

    var arraySSReview = [
      {name: "TV", price: 800, review: 1},
      {name: "PS5", price: 1200, review: 7},
      {name: "Notebook", price: 1200, review: 8},
      {name: "Smartphone", price: 300, review: 9}
    ];
    it('Debe retornar el arreglo ordenado', function() {
      expect(specialSort(arraySS, "price")).to.deep.equal(arraySSPrice);
      expect(specialSort(arraySS, "review")).to.deep.equal(arraySSReview);
      expect(specialSort(arraySS, "price", "review")).to.deep.equal(arraySSPriceReview);
    });
  });


  describe('EJERCICIO 10: closureGreeting', function() {
    it('La función generada debe retornar el saludo correspondiente tanto el nombre como el número de llegada', function() {
      var hiGreeting = closureGreeting("Hi");
      var helloGreeting = closureGreeting("Hello");
      expect(hiGreeting("Franco")).to.equal("Hi Franco, you are number 1");
      expect(hiGreeting("Toni")).to.equal("Hi Toni, you are number 2");
      expect(hiGreeting("Agus")).to.equal("Hi Agus, you are number 3");
      expect(helloGreeting("Franco")).to.equal("Hello Franco, you are number 1");
      expect(helloGreeting("Toni")).to.equal("Hello Toni, you are number 2");
    });
  });

  describe('EXTRA CREDIT: allAnagrams', function() {
    it('Debe retornar todos los anagramas posibles para "abc"', function() {
      expect(allAnagrams('abc')).to.deep.equal([ 'abc', 'acb', 'bac', 'bca', 'cab', 'cba' ]);
    });
    it('Extra-Extra - Debe retornar todos los anagramas posibles para "aab" sin repeticiones', function() {
      expect(allAnagrams('aab')).to.deep.equal(['aab', 'aba', 'baa']);
    });
  });
});
