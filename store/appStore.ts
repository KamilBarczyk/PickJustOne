import { create } from 'zustand';

export interface Task {
  id: string;
  text: string;
  isRest?: boolean;
}

interface AppState {
  // State
  tasks: Task[];
  
  // Actions
  setTasks: (tasks: Task[]) => void;
  addTask: (task: Task) => void;
  removeTask: (id: string) => void;
  updateTask: (id: string, text: string) => void;
  clearTasks: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  // Initial state
  tasks: [],
  
  // Actions
  setTasks: (tasks: Task[]) => set({ tasks }),
  
  addTask: (task: Task) => set((state) => ({
    tasks: [...state.tasks, task],
  })),
  
  removeTask: (id: string) => set((state) => ({
    tasks: state.tasks.filter((task: Task) => task.id !== id),
  })),
  
  updateTask: (id: string, text: string) => set((state) => ({
    tasks: state.tasks.map((task: Task) =>
      task.id === id && !task.isRest ? { ...task, text } : task
    ),
  })),
  
  clearTasks: () => set({ tasks: [] }),
}));
