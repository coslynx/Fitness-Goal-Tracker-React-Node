import { Result } from '../../common/Result';
import { Goal } from '../../goals/Goal';

export interface User {
  id: string;
  email: string;
  password?: string;
  name: string;
  goals: Goal[];
  progress: any[];
}

export class User implements User {
  id: string;
  email: string;
  password?: string;
  name: string;
  goals: Goal[];
  progress: any[];

  constructor(
    id: string,
    email: string,
    password?: string,
    name: string,
    goals: Goal[] = [],
    progress: any[] = [],
  ) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.name = name;
    this.goals = goals;
    this.progress = progress;
  }

  addGoal(goal: Goal): void {
    this.goals.push(goal);
  }

  removeGoal(goalId: string): void {
    this.goals = this.goals.filter((goal) => goal.id !== goalId);
  }

  updateGoal(goal: Goal): void {
    const goalIndex = this.goals.findIndex((g) => g.id === goal.id);
    if (goalIndex !== -1) {
      this.goals[goalIndex] = goal;
    }
  }

  updateProgress(progress: any[]): void {
    this.progress = progress;
  }

  getCompletedGoals(): Goal[] {
    return this.goals.filter((goal) => goal.isCompleted());
  }
}