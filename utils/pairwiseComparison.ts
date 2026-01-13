import { Task } from '../store/appStore';

/**
 * Generates all possible pairs from a list of tasks
 * 
 * For n tasks, generates n * (n - 1) / 2 pairs
 * Example: [A, B, C] -> [[A, B], [A, C], [B, C]]
 * 
 * @param tasks - Array of tasks to generate pairs from
 * @returns Array of task pairs
 */
export function generateAllPairs(tasks: Task[]): [Task, Task][] {
  const pairs: [Task, Task][] = [];
  
  // Generate all unique pairs (each task compared with every other task exactly once)
  for (let i = 0; i < tasks.length; i++) {
    for (let j = i + 1; j < tasks.length; j++) {
      pairs.push([tasks[i], tasks[j]]);
    }
  }
  
  return pairs;
}

/**
 * Shuffles an array using Fisher-Yates algorithm
 * Creates a new array to avoid mutating the original
 * 
 * Why Fisher-Yates?
 * - Simple and efficient O(n)
 * - Uniformly random distribution
 * - Easy to understand and defend in interviews
 * 
 * @param array - Array to shuffle
 * @returns New shuffled array
 */
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]; // Create a copy to avoid mutation
  
  for (let i = shuffled.length - 1; i > 0; i--) {
    // Pick a random index from 0 to i
    const j = Math.floor(Math.random() * (i + 1));
    
    // Swap elements
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  return shuffled;
}

/**
 * Generates randomized pairs for comparison
 * 
 * This is the main function used in the app:
 * 1. Generates all possible pairs
 * 2. Shuffles them for randomness
 * 
 * @param tasks - Array of tasks to generate pairs from
 * @returns Shuffled array of task pairs
 */
export function generateRandomizedPairs(tasks: Task[]): [Task, Task][] {
  const allPairs = generateAllPairs(tasks);
  return shuffleArray(allPairs);
}
