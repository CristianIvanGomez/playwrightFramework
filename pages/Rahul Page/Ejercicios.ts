import { expect } from '@playwright/test';
import type { Locator, Page } from '@playwright/test';

export class Ejercicios {
readonly page: Page;
	constructor(Cartpage: Page) {
    this.page = Cartpage;
  }

async twoSum (): Promise<void> {
	
	 //twoSums([1,7,5,3], 9)
	 let numToSum: number[] = [1,7,5,3]
	 let target = 6;

	 for (let i=0; i < numToSum.length; i++){

		for (let j = i +1; j< numToSum.length; j++){
			const numberOne = numToSum[j]!
			const numberTwo = numToSum[i]!
			let result = numberOne + numberTwo;
			if(result === target){
				console.log("los numeros: "+numToSum[i]+" y "+ numToSum[j]+ " dan el total de: "+target)
			}
		}
	 }
	}

	async containsDuplicate ():Promise<void> {
		let arrayDuplicate: [string, string, string, string] = ["Oso","Gato","Rorro","Rorro"];
		for(let i = 0; i < arrayDuplicate.length; i++){
			
			for(let j = i + 1; j < arrayDuplicate.length; j++){
				if(arrayDuplicate[j]===arrayDuplicate[i]){
				console.log("el valor duplicado es: "+ arrayDuplicate[j])
				break;
				}
			}
			

		}
	}

	async closestToZero(numbers: number[]): Promise<number> {

    let result = numbers[0]!;

    for (const current of numbers) {
        if (Math.abs(current) < Math.abs(result)) {
            result = current;
        }
    }
	console.log(result);
    return result;
}
	
 async evenOrOdd(numberOne: number): Promise<string>{
	let Even = 'Is Even'
	let Odd = 'Is Odd'
	if(numberOne % 2 === 0){
		console.log("number: "+Even)
		return Even;
	} else {
		console.log("number: "+Odd)
		return Odd;
	}

	
 }


}


// # Curso progresivo: Resolución de problemas de programación (TypeScript)

// Objetivo: agilizar tu capacidad de reconocer patrones y resolver problemas típicos de entrevistas técnicas, yendo de menor a mayor dificultad. Cada fase tiene una lista de problemas clásicos (nombres estándar de la industria, los puedes buscar en LeetCode/HackerRank para practicarlos con test cases reales) más el patrón/técnica que debes reconocer.

// **Cómo usar este curso:**
// - No pases a la siguiente fase hasta resolver el 80% de los problemas de la fase actual en menos de 20-25 minutos cada uno, sin ver la solución.
// - Primero resuelve "a fuerza bruta", luego optimiza. La entrevista evalúa tu proceso, no solo el resultado final.
// - Después de resolver cada problema, escribe en una línea el patrón que usaste (ej. "two pointers", "sliding window", "BFS"). Esto entrena el reconocimiento rápido de patrones, que es lo que realmente agiliza tu pensamiento.

// ---

// ## Fase 0 — Fundamentos de TypeScript para entrevistas
// Antes de resolver problemas, asegúrate de dominar rápido estas herramientas del lenguaje (no son "problemas", son sintaxis que debes tener automática):

// - `Map`, `Set`, arrays y sus métodos (`map`, `filter`, `reduce`, `sort`, `slice`, `splice`)
// - Desestructuración y spread operator
// - Tipado de funciones, interfaces básicas, `type` vs `interface`
// - Recursión simple (factorial, fibonacci)

// ---

// ## Fase 1 — Arrays y Strings (nivel básico)
// **Patrones clave:** iteración, hashmap para frecuencia/búsqueda, two pointers básico.

// 1. Two Sum
// 2. Contains Duplicate
// 3. Valid Anagram
// 4. Reverse String
// 5. Palindrome Check
// 6. FizzBuzz
// 7. Best Time to Buy and Sell Stock
// 8. Majority Element
// 9. Move Zeroes
// 10. Merge Two Sorted Arrays (in-place)

// ---

// ## Fase 2 — Two Pointers y Sliding Window
// **Patrones clave:** reducir complejidad O(n²) a O(n) usando dos punteros o ventana deslizante.

// 1. Valid Palindrome (con punteros desde ambos extremos)
// 2. Two Sum II (array ordenado)
// 3. Container With Most Water
// 4. 3Sum
// 5. Longest Substring Without Repeating Characters
// 6. Minimum Size Subarray Sum
// 7. Sliding Window Maximum (introducción, se puede resolver fuerza bruta primero)
// 8. Longest Repeating Character Replacement

// ---

// ## Fase 3 — Hashmaps y Frecuencias (nivel intermedio)
// **Patrones clave:** usar `Map`/`Record` para conteo, agrupación y lookup O(1).

// 1. Group Anagrams
// 2. Top K Frequent Elements
// 3. Longest Consecutive Sequence
// 4. Subarray Sum Equals K
// 5. Valid Sudoku
// 6. Ransom Note

// ---

// ## Fase 4 — Pilas (Stacks) y Colas (Queues)
// **Patrones clave:** reconocer cuándo un problema necesita orden LIFO/FIFO (paréntesis, historial, procesamiento secuencial).

// 1. Valid Parentheses
// 2. Min Stack
// 3. Evaluate Reverse Polish Notation
// 4. Daily Temperatures (monotonic stack)
// 5. Implement Queue using Stacks
// 6. Next Greater Element

// ---

// ## Fase 5 — Recursión y Backtracking
// **Patrones clave:** construir/probar soluciones paso a paso y "deshacer" (backtrack) cuando no funcionan.

// 1. Fibonacci (recursivo vs memoizado)
// 2. Generate Parentheses
// 3. Subsets
// 4. Permutations
// 5. Combination Sum
// 6. Word Search
// 7. N-Queens (opcional, ya es avanzado dentro de esta fase)

// ---

// ## Fase 6 — Listas Enlazadas (Linked Lists)
// **Patrones clave:** punteros rápido/lento, reversión, manejo de nodos.

// 1. Reverse Linked List
// 2. Merge Two Sorted Lists
// 3. Linked List Cycle (Floyd's algorithm)
// 4. Remove Nth Node From End of List
// 5. Reorder List
// 6. Add Two Numbers

// ---

// ## Fase 7 — Árboles Binarios (Trees) y BFS/DFS
// **Patrones clave:** recursión en árboles, recorridos in-order/pre-order/post-order, BFS por niveles.

// 1. Maximum Depth of Binary Tree
// 2. Invert Binary Tree
// 3. Same Tree
// 4. Binary Tree Level Order Traversal (BFS)
// 5. Validate Binary Search Tree
// 6. Lowest Common Ancestor of a BST
// 7. Diameter of Binary Tree
// 8. Serialize and Deserialize Binary Tree (avanzado dentro de la fase)

// ---

// ## Fase 8 — Grafos (Graphs)
// **Patrones clave:** BFS/DFS en grafos, matrices como grafos implícitos, detección de ciclos.

// 1. Number of Islands
// 2. Clone Graph
// 3. Course Schedule (detección de ciclo, topological sort)
// 4. Pacific Atlantic Water Flow
// 5. Rotting Oranges (BFS multi-fuente)
// 6. Graph Valid Tree

// ---

// ## Fase 9 — Programación Dinámica (Dynamic Programming)
// **Patrones clave:** identificar subproblemas repetidos, memoización, tabulación.

// 1. Climbing Stairs
// 2. House Robber
// 3. Coin Change
// 4. Longest Increasing Subsequence
// 5. Longest Common Subsequence
// 6. Word Break
// 7. Unique Paths
// 8. Edit Distance

// ---

// ## Fase 10 — Búsqueda Binaria y Ordenamiento Avanzado
// **Patrones clave:** dividir el espacio de búsqueda a la mitad, ordenar antes de resolver.

// 1. Binary Search (implementación base)
// 2. Search in Rotated Sorted Array
// 3. Find Minimum in Rotated Sorted Array
// 4. Kth Largest Element in an Array
// 5. Merge Intervals
// 6. Insert Interval

// ---

// ## Fase 11 — Heaps / Priority Queues y Tries
// **Patrones clave:** obtener el mínimo/máximo eficientemente, estructuras de prefijos.

// 1. Kth Largest Element in a Stream
// 2. Top K Frequent Elements (revisitado con heap)
// 3. Merge K Sorted Lists
// 4. Implement Trie (Prefix Tree)
// 5. Design Add and Search Words Data Structure

// ---

// ## Fase 12 — Nivel entrevista "senior" / mixto
// **Patrones clave:** combinar dos o más patrones anteriores en un solo problema, optimización bajo restricciones de tiempo/espacio.

// 1. LRU Cache (hashmap + linked list)
// 2. Trapping Rain Water (two pointers avanzado)
// 3. Sliding Window Maximum (resuelto con deque, óptimo)
// 4. Word Ladder (BFS sobre strings)
// 5. Median of Two Sorted Arrays
// 6. Alien Dictionary (topological sort sobre caracteres)

// ---

// ## Ritmo sugerido
// - 2-3 problemas por día, de la misma fase, hasta dominarla.
// - Repite fases anteriores una vez por semana para no perder velocidad ("spaced repetition").
// - Cuando ya resuelves una fase de memoria, cronométrate: el objetivo final es resolver problemas de nivel Fase 1-6 en menos de 15 minutos y Fase 7-11 en menos de 30 minutos.

// ¿Quieres que empecemos ahora mismo con el problema #1 de la Fase 1 en TypeScript, con explicación de fuerza bruta y luego la versión optimizada?