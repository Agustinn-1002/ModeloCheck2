// ----- IMPORTANTE -----

// IMPORTANTE!: Para este checkpoint se les brindarán las implementaciones ya realizadas en las
// homeworks de Queue, LinkedLis y BinarySearchTree. Sobre dicha implementación van a tener que agregar nuevos
// métodos o construir determinadas funciones explicados más abajo. Pero todos los métodos ya implementados
// en las homeworks no es necesario que los vuelvan a definir.

const { Queue, Node, LinkedList, BinarySearchTree } = require("./DS.js");

// ----------------------

// ----- Recursión -----

// EJERCICIO 1
// Implementar la función countArray: a partir de un array en el cual cada posición puede ser un único
// número u otro array anidado de números, determinar la suma de todos los números contenidos en el array.
// El array será recibido por parámetro.
// Ejemplo:
//    const array = [1, [2, [3,4]], [5,6], 7];
//    countArray(array); --> Debería devolver 28 (1 + 2 + 3 + 4 + 5 + 6 + 7)
// Pista: utilizar el método Array.isArray() para determinar si algun elemento de array es un array anidado
// [Para más información del método: https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Array/isArray]

var countArray = function (array) {
  let forReturn = 0;
  for (i of array) {
    if (Array.isArray(i)) forReturn += countArray(i);
    else forReturn += i;
  }
  return forReturn;
};

// EJERCICIO 2
// Secuencia inventada: f(n) = (f(n-1) + f(n-2) + f(n-3)) x 2
// Donde las primeras tres posiciones son dadas por el array recibido por parametro y a partir de
// la siguiente se calcula como la suma de los 3 números anteriores multiplicados por dos.
// array es un arreglo de 3 posiciones que puede contener números o strings, aquellas posiciones que
// sean números debemos dejarlas tal cual están pero las que tengan strings debemos calcular su cantidad
// de caracteres para usarlos en la secuencia.
// Por ejemplo si recibimos: ["Franco", 1, "Henry"] deberíamos tener los siguientes 3 valores iniciales
// de la secuencia f(0) = 6, f(1) = 1 y f(2) = 5 (Ya que "Franco" tiene 6 caracteres y "Henry", 5)
// A partir de ahí la cuarta posición sería  (6 + 1 + 5) * 2 = 24 y así sucesivamente
// La función secuenciaHenry debe devolver el enésimo numero de la serie, por ejemplo para el array
// antes mencionado:
// secuencia: 6, 1, 5, 24, 60, 178, 524
// secuenciaHenry(0) // 6  ya que el elemento de la posición 0 es cero
// secuenciaHenry(1) // 1 ya que el elemento de la posición 1 es 1
// secuenciaHenry(6) // 524 ya que el elemento de la posición 6 es 524
// Para números negativos de n debe devolver false
function secuenciaHenry(array, n) {
  //limpiamos el array
  for (let i = 0; i < array.length; i++) {
    if (typeof array[i] === "string") array[i] = array[i].length;
  }
  // devolvemos el n si pertenece al array, y filtramos los negativos [condiciones stop]
  if (n < 0) return false;
  if (n < array.length - 1) return array[n];
  //incrementamos el largo del array en 1 utilizando la funcion dada
  let aL = array.length;
  let resu = (array[aL - 3] + array[aL - 2] + array[aL - 1]) * 2;
  array.push(resu);
  //aplicamos recursion hasta que lleguemos a generar el n pedido y lo devolvemos
  return secuenciaHenry(array, n);
}

// ---------------------

// ----- LinkedList -----

// EJERCICIO 3
// Implementar el método size dentro del prototype de LinkedList que deberá retornar el tamaño actual de
// la LinkedList. En el caso de que la lista se encuentre vacía deberá retornar cero.
// Ejemplo:
//    var lista = new LinkedList();
//    lista.size(); --> 0
//    lista.add(1);
//    lista.size(); --> 1
//    lista.add(2);
//    lista.add(3);
//    lista.size(); --> 3

LinkedList.prototype.size = function () {
  // Tu código aca:
  if (!this.head) return 0;
  let node = this.head;
  let forReturn = 1;
  while (node.next) {
    node = node.next;
    forReturn++;
  }
  return forReturn;
};

// EJERCICIO 4
// Implementar el método removeFromPos dentro del prototype de LinkedList que deberá remover un elemento de
// la posición indicada ("pos" será la posición del elemento a remover).
// En el caso de que la posición en la que se quiera hacer el remove no sea válida (Supere el tamaño de
// la lista actual o sea un número negativo) debe devolver false.
// Si el nodo fue removido correctamente devolver el valor del nodo.
// Aclaración: la posición cero corresponde al head de la LinkedList
// Ejemplo 1:
//    Suponiendo que la lista actual es: Head --> [1] --> [2] --> [3] --> [4]
//    lista.removeFromPos(2);
//    Ahora la lista quedaría: Head --> [1] --> [2] --> [4] y la función debería haber devuelto el valor 3
// Ejemplo 2:
//    Suponiendo que se pide una posición inválida: removeFromPos(8) --> false

LinkedList.prototype.removeFromPos = function (pos) {
  // si pos es invalida devolvemos false
  let size = this.size();
  if (pos > size || pos < 0) return false;
  // si tanto size como pos son 0 devolvemos null
  if (size === 0 && pos === 0) return null;
  //generamos la variable donde devolveremos el valor del nodo elminado
  let forReturn;
  let node = this.head;
  let act = 0;
  //nos movemos hasta el nodo anterior al que debe ser removido
  while (act < pos - 1) {
    node = node.next;
    act++;
  }
  // si pos es 0 la condicion es especial por lo tanto lo resolvemos en esta linea
  if (pos === 0) {
    forReturn = node.value;
    this.head = this.head.next;
  } else {
    forReturn = node.next.value;
    node.next = node.next.next;
  }
  return forReturn;
};

// EJERCICIO 5
// Implementar la función orderLinkedList que ordene los elementos de la lista pasada por parámetro
// y retorne una nueva lista con dichos elementos ya ordenados.
// Ejemplo:
//    Lista original: Head --> 4 --> 13 --> 1 --> 10 --> null
//    Lista nueva luego de aplicar el order: Head --> 1 --> 4 --> 10 --> 13 --> null
// IMPORTANTE: Pueden usar algun método de ordenamiento ya visto para tener un arreglo ordenado y a
// partir de él construir la nueva lista ordenada

var orderLinkedList = function (linkedList) {
  //convertimos la lista a array
  let array = [];
  node = linkedList.head;
  while (node) {
    array.push(node.value);
    node = node.next;
  }
  // la ordenamos usando el metodo sort
  array = array.sort((a, b) => a - b);
  //creamos la nueva lista
  forReturn = new LinkedList();
  while (array.length > 0) forReturn.add(array.shift());
  //retornamos
  return forReturn;
};

// ----------------------

// ----- QUEUE -----

// EJERCICIO 6
// Implementar la función controlAcces: a partir de una Queue que va a recibir como paráemtro que tiene
// en cada posición un objeto que va a representar a una persona y tiene la siguiente forma:
// {
//   fullname: "Franco Etcheverri",
//   age: 26,
//   ticket: {
//     number: 1,
//     event: "Tomorrowland"
//   }
// }
// La idea es ir verificando uno a uno si la primer persona de la cola tiene los requisitos necesarios para
// ingresar al evento correspondiente (también recibido por parámetro). Los requisitos que debe cumplir son:
// - Ser mayor de 18 años (18 inclusive es válido)
// - Tener un ticket que corresponda con el evento (prop event de ticket)
// - Que no haya ingresado ya otra persona al evento con ese mismo número de ticket
// Finalmente la función debe devolver un arreglo con todos los nombres de las personas que pudieron ingresar
// Importante!: Aquellas personas que no cumplan con los requisitos para ingresar deben ser removidos de la cola

var controlAcces = function (queue, event) {
  // Tu código aca:
  // creamos las variables que almacenan tickets y personas admitidas
  let admitted = [];
  let tickets = [];
  //vaciamos la queue
  while (queue.size() != 0) {
    let person = queue.dequeue();
    // revisamos si es mayor de edad y si esta en el evento correspondiente
    if (person["age"] >= 18 && person["ticket"]["event"] === event) {
      let ok = true;
      //revisamos que el n de ticket no se haya usado antes
      for (ticket of tickets) {
        if (person["ticket"]["number"] === ticket) ok = false;
      }
      //si pasa las condiciones anteriores lo admitimos sumandolo a las listas
      if (ok) {
        admitted.push(person);
        tickets.push(person["ticket"]["number"]);
      }
    }
  }
  //volvemos a llenar la queue con los asistentes y armamos el array de nombres para retornar
  let forReturn = [];
  for (person of admitted) {
    forReturn.push(person["fullname"]);
    queue.enqueue(person);
  }
  return forReturn;
};

// ---------------

// ----- BST -----

// EJERCICIO 7
// Implementar la función generateBST para que a partir de un array recibido como parametro
// genere un BinarySearchTree. Devolver dicho arbol generado.
// Ejemplo:
//    - array(16,6,23,2,17,31,14,5);
//    - arbol generado:
//             16
//          /      \
//        6         23
//      /  \       /   \
//     2    14    17    31
//      \
//       5

var generateBST = function (array) {
  forReturn = new BinarySearchTree(array.shift());
  for (i of array) forReturn.insert(i);
  return forReturn;
};

// ---------------

// Ejercicio 8
// Dado un arreglo ordenado, encontrar el índice de un elemento específico pasado como parámetro
// utilizando el método conocido como búsqueda binaria. En el caso de que el número buscado no se encuentre
// en el array devolver -1.
// Para mayor información sobre dicho método:
//    - https://www.khanacademy.org/computing/computer-science/algorithms/binary-search/a/binary-search
//    - https://en.wikipedia.org/wiki/Binary_search_algorithm
// Ejemplo:
//    array = [1,2,3,4,5,6,7,8,9,10];
//    binarySearch(array, 2) --> Devolvería 1 ya que array[1] = 2
//    [Donde 2 sería el número sobre el cuál queremos saber su posición en el array]

var binarySearch = function (array, target) {
  //elegimos como indice la mitad del array
  let play = Math.ceil(array.length / 2);
  //si el indice es el numero buscado lo devolvemos
  if (array[play] === target) return play;
  //final de la recursion, el array tiene un unico valor
  if (array.length === 1) {
    if (array[0] === target) return 0;
    else return -1;
  }
  //añadimos lostIndice para no perder el indice en la recusion
  let lostIndice = 0;
  //dividimos el array
  if (array[play] < target) {
    array = array.slice(play + 1, array.length);
    lostIndice = play + 1;
  } else array = array.slice(0, play);
  // realizamos la recursion
  let result = binarySearch(array, target);
  // si el resultado es -1 retornar -1 sino retornar la suma de los indices
  if (result === -1) return -1;
  else return result + lostIndice;
};

// EJERCICIO 9
// Ordená un arreglo de números usando un bubble sort pero con algunas particularidades.
// El nuevo arreglo debe ser devuelto.
// El algortimo va a recibir un arreglo de objetos de la siguiente forma:
// {
//   name: "Notebook",
//   price: 1200,
//   review: 8
// }
// Esos objetos deben ser ordenados en función de lo que indique los siguientes parámetros
// "firstOrd", "secondOrd" los cuales van a tener alguna de las propiedades del objeto anterior
// para saber cual va a ser la que debemos tomar para el ordenamiento. La "secondOrd" se usa en los
// casos en los cuales para la "firstOrd" tengan el mismo valor.
// var array = [
//   {name: "Notebook", price: 1200, review: 8},
//   {name: "Smartphone", price: 300, review: 9},
//   {name: "TV", price: 800, review: 1},
//   {name: "PS5", price: 1200, review: 7}
// ]
// Ejemplo 1:
// specialSort(array, "price") --> Debería quedar:
// [
//   {name: "Smartphone", price: 300, review: 9},
//   {name: "TV", price: 800, review: 1},
//   {name: "Notebook", price: 1200, review: 8}
//   {name: "PS5", price: 1200, review: 7}
// ]
// Ejemplo 2:
// specialSort(array, "price", "review") --> Debería quedar:
// [
//   {name: "Smartphone", price: 300, review: 9},
//   {name: "TV", price: 800, review: 1},
//   {name: "PS5", price: 1200, review: 7},
//   {name: "Notebook", price: 1200, review: 8}
// ]
// (Siempre el ordenamiento es de menor a mayor sea cual fuera la propiedad indicada para el orden)

var specialSort = function (array, firstOrd, secondOrd) {
  // Tu código aca:
  for (let i = 0; i < array.length; i++) {
    for (let j = 1; j < array.length - i; j++) {
      if (array[j - 1][firstOrd] > array[j][firstOrd]) {
        [array[j - 1], array[j]] = [array[j], array[j - 1]];
      }
      if (array[j - 1][firstOrd] === array[j][firstOrd]) {
        if (array[j - 1][secondOrd] > array[j][secondOrd]) {
          [array[j - 1], array[j]] = [array[j], array[j - 1]];
        }
      }
    }
  }
  return array;
};

// ----- Closures -----

// EJERCICIO 10
// Implementar la función closureGreeting que recibe un parámetro (prefix) mediante closures debe permitir
// generar nuevas funciones de saludo dejando fijo siempre el prefijo indicado.
// Ejemplo 1:
//    var hiGreeting = closureGreeting("Hi");
//    hiGreeting("Franco");  --> Devolverá "Hi Franco, you are number 1"
//    hiGreeting("Toni"); --> Devolverá "Hi Toni, you are number 2"
// Ejemplo 2:
//    var helloGreeting = closureGreeting("Hello");
//    helloGreeting("Franco");  --> Devolverá "Hello Franco, you are number 1"
//    helloGreeting("Toni"); --> Devolverá "Hello Toni, you are number 2"
// IMPORTANTE: Prestar atención a los espacios, comas y demás caracteres ya que tiene que el string
// debe coincidir en todos sus caracteres para que el test pase correctamente

function closureGreeting(prefix) {
  let num = 0;
  return function (name){
    num++;
    return `${prefix} ${name}, you are number ${num}`;
  }
}

// ------------------

// ----- EXTRA CREDIT -----

// Implementar una función que a partir de un String recibido como parámetro
// genere todos los posibles anagramas de ese String y retorne un arreglo con ellos.
// Los parámetros extra "array" e "index" son opcionales y pueden ser utilizados para
// resolver este problema de forma recursiva
// Extra-Extra credit: Sacar las palabras duplicados del array final.
// Ejemplo:
//    const anagrams = allAnagrams('abc');
//    console.log(anagrams); // [ 'abc', 'acb', 'bac', 'bca', 'cab', 'cba' ]

var allAnagrams = function (string, array = [], index = []) {
  // generamos una variable donde cortaremos la string y la haremos array
  let arrayAux = [];
  // loop para la recursion
  for(let i = 0; i < string.length ; i++){
    // pusheamos el indice actual
    index.push(string[i]);
    //condicion de stop, cuando tenemos todos los indices posibles y solo queda una letra.
    if (string.length === 1) {
      //pusheamos al array general
      array.push(index.join(""));
      //limpiamos el indice
      index.pop();
      //retornamos
      return "Pushed";
    }
    // cortamos el string y lo guardamos (de no ser posible ya hubo return arriba)
    arrayAux = string.split("");
    arrayAux.splice(i,1);
    // recursion para seguir acumulando indices hasta ya no ser posible y pushear el anagrama
    allAnagrams(arrayAux.join(""),array,index);
    // limpiamos el ultimo indice, vuelve el for y volvemos a generar una nueva combinacion
    index.pop();
  }
  // sacamos las palabras duplicadas
  for(let i = 0;i<array.length;i++){
    for(let j = 0;j<array.length;j++){
      if(array[i] === array[j] && i != j){
        array.splice(j,1);
      }
    }
  }
  // retornamos :)
  return array;
};
module.exports = {
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
  orderLinkedList,
};
