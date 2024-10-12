import { Result } from '../../common/Result';
import { User } from '../../users/User';

export interface Goal {
  id: string;
  type: string;
  target: number;
  deadline: Date;
  progress: number;
  userId: string;
  isCompleted(): boolean;
}

export class Goal implements Goal {
  id: string;
  type: string;
  target: number;
  deadline: Date;
  progress: number;
  userId: string;

  constructor(
    id: string,
    type: string,
    target: number,
    deadline: Date,
    progress: number,
    userId: string,
  ) {
    this.id = id;
    this.type = type;
    this.target = target;
    this.deadline = deadline;
    this.progress = progress;
    this.userId = userId;
  }

  isCompleted(): boolean {
    return this.progress >= this.target;
  }
}