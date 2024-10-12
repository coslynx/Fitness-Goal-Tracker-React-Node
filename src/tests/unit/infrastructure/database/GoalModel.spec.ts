import { GoalModel } from '../../../../src/core/infrastructure/database/GoalModel'; // import: src/core/infrastructure/database/GoalModel.ts
import { Database } from '../../../../src/core/infrastructure/database/Database'; // import: src/core/infrastructure/database/Database.ts
import { Goal } from '../../../../src/core/domain/goals/Goal'; // import: src/core/domain/goals/Goal.ts
import { Result } from '../../../../src/core/domain/common/Result'; // import: src/core/domain/common/Result.ts
import { Error } from '../../../../src/core/domain/common/Error'; // import: src/core/domain/common/Error.ts
import { DatabaseConfig } from '../../../../src/core/infrastructure/database/config'; // import: src/core/infrastructure/database/config.ts

describe('GoalModel', () => {
  let goalModel: GoalModel;
  let database: Database;

  beforeEach(() => {
    database = new Database({ url: process.env.DATABASE_URL }); // import: src/core/infrastructure/database/config.ts
    goalModel = new GoalModel(database);
  });

  afterEach(async () => {
    await database.disconnect();
  });

  it('should create a new goal', async () => {
    const userId = 'user123';
    const goal: Goal = {
      id: 'goal1',
      type: 'Weight Loss',
      target: 10,
      deadline: new Date('2024-12-31'),
      progress: 0,
      userId,
      isCompleted: () => {
        return false;
      },
    };

    const createdGoal = await goalModel.create(goal, userId);

    expect(createdGoal).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        type: 'Weight Loss',
        target: 10,
        deadline: new Date('2024-12-31'),
        progress: 0,
        userId,
      })
    );
  });

  it('should find a goal by ID and user ID', async () => {
    const userId = 'user123';
    const goal: Goal = {
      id: 'goal1',
      type: 'Weight Loss',
      target: 10,
      deadline: new Date('2024-12-31'),
      progress: 0,
      userId,
      isCompleted: () => {
        return false;
      },
    };

    await goalModel.create(goal, userId);

    const foundGoal = await goalModel.findOne({ _id: goal.id, userId });

    expect(foundGoal).toEqual(goal);
  });

  it('should find goals by user ID', async () => {
    const userId = 'user123';
    const goal1: Goal = {
      id: 'goal1',
      type: 'Weight Loss',
      target: 10,
      deadline: new Date('2024-12-31'),
      progress: 0,
      userId,
      isCompleted: () => {
        return false;
      },
    };

    const goal2: Goal = {
      id: 'goal2',
      type: 'Muscle Gain',
      target: 15,
      deadline: new Date('2025-01-15'),
      progress: 0,
      userId,
      isCompleted: () => {
        return false;
      },
    };

    await goalModel.create(goal1, userId);
    await goalModel.create(goal2, userId);

    const goals = await goalModel.find({ userId });

    expect(goals).toEqual(expect.arrayContaining([goal1, goal2]));
  });

  it('should update a goal', async () => {
    const userId = 'user123';
    const goal: Goal = {
      id: 'goal1',
      type: 'Weight Loss',
      target: 10,
      deadline: new Date('2024-12-31'),
      progress: 0,
      userId,
      isCompleted: () => {
        return false;
      },
    };

    await goalModel.create(goal, userId);

    goal.target = 15;
    goal.deadline = new Date('2025-01-01');

    const updatedGoal = await goalModel.update(goal, userId);

    expect(updatedGoal).toEqual(goal);
  });

  it('should delete a goal', async () => {
    const userId = 'user123';
    const goal: Goal = {
      id: 'goal1',
      type: 'Weight Loss',
      target: 10,
      deadline: new Date('2024-12-31'),
      progress: 0,
      userId,
      isCompleted: () => {
        return false;
      },
    };

    await goalModel.create(goal, userId);

    await goalModel.deleteOne({ _id: goal.id, userId });

    const foundGoal = await goalModel.findOne({ _id: goal.id, userId });

    expect(foundGoal).toBeNull();
  });

  it('should handle errors during goal creation', async () => {
    const userId = 'user123';
    const goal: Goal = {
      id: 'goal1',
      type: 'Weight Loss',
      target: 10,
      deadline: new Date('2024-12-31'),
      progress: 0,
      userId,
      isCompleted: () => {
        return false;
      },
    };

    try {
      await goalModel.create(goal, userId);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toContain('Error creating goal');
    }
  });

  it('should handle errors during goal retrieval', async () => {
    const userId = 'user123';
    const goalId = 'goal1';

    try {
      await goalModel.findOne({ _id: goalId, userId });
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toContain('Error finding goal');
    }
  });

  it('should handle errors during goal update', async () => {
    const userId = 'user123';
    const goal: Goal = {
      id: 'goal1',
      type: 'Weight Loss',
      target: 10,
      deadline: new Date('2024-12-31'),
      progress: 0,
      userId,
      isCompleted: () => {
        return false;
      },
    };

    try {
      await goalModel.update(goal, userId);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toContain('Error updating goal');
    }
  });

  it('should handle errors during goal deletion', async () => {
    const userId = 'user123';
    const goalId = 'goal1';

    try {
      await goalModel.deleteOne({ _id: goalId, userId });
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toContain('Error deleting goal');
    }
  });
});