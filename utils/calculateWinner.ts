import { Task } from '../store/appStore';

/**
 * Calculates winner from comparison choices
 * Winner is the task that was chosen most frequently
 * 
 * Algorithm:
 * 1. Count how many times each task was chosen
 * 2. Find task with highest count
 * 3. If tie, return first task with max count
 */
export function calculateWinner(choices: Task[]): Task | null {
  if (choices.length === 0) {
    return null;
  }

  // Count votes for each task
  const voteCount = new Map<string, number>();
  
  choices.forEach((task) => {
    const currentCount = voteCount.get(task.id) || 0;
    voteCount.set(task.id, currentCount + 1);
  });

  // Find task with maximum votes
  let maxVotes = 0;
  let winner: Task | null = null;

  voteCount.forEach((count, taskId) => {
    if (count > maxVotes) {
      maxVotes = count;
      // Find the task object from choices
      winner = choices.find((task) => task.id === taskId) || null;
    }
  });

  return winner;
}
