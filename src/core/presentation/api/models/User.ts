import { User } from '../../../domain/users/User'; // import: src/core/domain/users/User.ts
import { Result } from '../../../domain/common/Result'; // import: src/core/domain/common/Result.ts
import { Error } from '../../../domain/common/Error'; // import: src/core/domain/common/Error.ts
import { UserDto } from '../../../presentation/web/types/user'; // import: src/core/presentation/web/types/user.ts

export class User {
  id: string;
  email: string;
  password?: string;
  name: string;
  goals: User['goals'];
  progress: User['progress'];

  constructor(userData: UserDto) {
    this.id = userData.id;
    this.email = userData.email;
    this.name = userData.name;
    this.goals = [];
    this.progress = [];
  }

  addGoal(goal: User['goals'][0]): void {
    this.goals.push(goal);
  }

  removeGoal(goalId: string): void {
    this.goals = this.goals.filter((goal) => goal.id !== goalId);
  }

  updateGoal(goal: User['goals'][0]): void {
    const goalIndex = this.goals.findIndex((g) => g.id === goal.id);
    if (goalIndex !== -1) {
      this.goals[goalIndex] = goal;
    }
  }

  updateProgress(progress: User['progress']): void {
    this.progress = progress;
  }

  getCompletedGoals(): User['goals'][0][] {
    return this.goals.filter((goal) => goal.isCompleted());
  }
}