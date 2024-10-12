import { Goal } from '../../../../src/core/domain/goals/Goal';
import { GoalService } from '../../../../src/core/domain/goals/GoalService';
import { GoalRepository } from '../../../../src/core/domain/goals/GoalRepository';
import { Result, Ok, Err } from '../../../../src/core/domain/common/Result';
import { User } from '../../../../src/core/domain/users/User';
import { MongoGoalRepository } from '../../../../src/core/domain/goals/GoalRepository';
import { Database } from '../../../../src/core/infrastructure/database/Database';
import { GoalModel } from '../../../../src/core/infrastructure/database/GoalModel';

describe('GoalService', () => {
  let goalService: GoalService;
  let goalRepository: GoalRepository;
  let database: Database;
  let goalModel: GoalModel;

  beforeEach(() => {
    database = new Database({ url: process.env.DATABASE_URL });
    goalModel = new GoalModel(database);
    goalRepository = new MongoGoalRepository(database, goalModel);
    goalService = new GoalService(goalRepository);
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

    const createGoalResult = await goalService.createGoal(goal, userId);

    expect(createGoalResult.isOk).toBe(true);
    expect(createGoalResult.value).toEqual(expect.objectContaining({
      id: expect.any(String),
      type: 'Weight Loss',
      target: 10,
      deadline: new Date('2024-12-31'),
      progress: 0,
      userId,
    }));
  });

  it('should retrieve goals by user ID', async () => {
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

    await goalService.createGoal(goal1, userId);
    await goalService.createGoal(goal2, userId);

    const goalsResult = await goalService.getGoalsByUserId(userId);

    expect(goalsResult.isOk).toBe(true);
    expect(goalsResult.value).toEqual(expect.arrayContaining([
      expect.objectContaining({
        id: expect.any(String),
        type: 'Weight Loss',
        target: 10,
        deadline: new Date('2024-12-31'),
        progress: 0,
        userId,
      }),
      expect.objectContaining({
        id: expect.any(String),
        type: 'Muscle Gain',
        target: 15,
        deadline: new Date('2025-01-15'),
        progress: 0,
        userId,
      }),
    ]));
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

    const createGoalResult = await goalService.createGoal(goal, userId);
    expect(createGoalResult.isOk).toBe(true);

    goal.target = 15;
    goal.deadline = new Date('2025-01-01');

    const updateGoalResult = await goalService.updateGoal(goal, userId);

    expect(updateGoalResult.isOk).toBe(true);
    expect(updateGoalResult.value).toEqual(expect.objectContaining({
      id: expect.any(String),
      type: 'Weight Loss',
      target: 15,
      deadline: new Date('2025-01-01'),
      progress: 0,
      userId,
    }));
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

    const createGoalResult = await goalService.createGoal(goal, userId);
    expect(createGoalResult.isOk).toBe(true);

    const deleteGoalResult = await goalService.deleteGoal(goal.id, userId);

    expect(deleteGoalResult.isOk).toBe(true);
  });

  it('should retrieve goal progress', async () => {
    const userId = 'user123';
    const goal: Goal = {
      id: 'goal1',
      type: 'Weight Loss',
      target: 10,
      deadline: new Date('2024-12-31'),
      progress: 5,
      userId,
      isCompleted: () => {
        return false;
      },
    };

    const createGoalResult = await goalService.createGoal(goal, userId);
    expect(createGoalResult.isOk).toBe(true);

    const goalProgressResult = await goalService.getGoalProgress(goal.id, userId);

    expect(goalProgressResult.isOk).toBe(true);
    expect(goalProgressResult.value).toBe(5);
  });

  it('should update goal progress', async () => {
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

    const createGoalResult = await goalService.createGoal(goal, userId);
    expect(createGoalResult.isOk).toBe(true);

    const updateGoalProgressResult = await goalService.updateGoalProgress(
      goal.id,
      userId,
      7
    );

    expect(updateGoalProgressResult.isOk).toBe(true);
  });

  it('should check if a goal is completed', async () => {
    const userId = 'user123';
    const goal: Goal = {
      id: 'goal1',
      type: 'Weight Loss',
      target: 10,
      deadline: new Date('2024-12-31'),
      progress: 10,
      userId,
      isCompleted: () => {
        return false;
      },
    };

    const createGoalResult = await goalService.createGoal(goal, userId);
    expect(createGoalResult.isOk).toBe(true);

    const isGoalCompletedResult = await goalService.isGoalCompleted(
      goal.id,
      userId
    );

    expect(isGoalCompletedResult.isOk).toBe(true);
    expect(isGoalCompletedResult.value).toBe(true);
  });

  it('should retrieve a goal by ID', async () => {
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

    const createGoalResult = await goalService.createGoal(goal, userId);
    expect(createGoalResult.isOk).toBe(true);

    const getGoalByIdResult = await goalService.getGoalById(goal.id, userId);

    expect(getGoalByIdResult.isOk).toBe(true);
    expect(getGoalByIdResult.value).toEqual(goal);
  });

  it('should handle errors during goal creation', async () => {
    const userId = 'user123';
    const goal: Goal = {
      id: 'goal1',
      type: 'Weight Loss',
      target: 0, // Invalid target value
      deadline: new Date('2024-12-31'),
      progress: 0,
      userId,
      isCompleted: () => {
        return false;
      },
    };

    const createGoalResult = await goalService.createGoal(goal, userId);

    expect(createGoalResult.isOk).toBe(false);
    expect(createGoalResult.error).toBeDefined();
  });

  it('should handle errors during goal retrieval', async () => {
    const userId = 'user123';
    const getGoalsResult = await goalService.getGoalsByUserId(userId);

    expect(getGoalsResult.isOk).toBe(false);
    expect(getGoalsResult.error).toBeDefined();
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

    const updateGoalResult = await goalService.updateGoal(goal, userId);

    expect(updateGoalResult.isOk).toBe(false);
    expect(updateGoalResult.error).toBeDefined();
  });

  it('should handle errors during goal deletion', async () => {
    const userId = 'user123';
    const goalId = 'goal1';

    const deleteGoalResult = await goalService.deleteGoal(goalId, userId);

    expect(deleteGoalResult.isOk).toBe(false);
    expect(deleteGoalResult.error).toBeDefined();
  });

  it('should handle errors during goal progress retrieval', async () => {
    const userId = 'user123';
    const goalId = 'goal1';

    const getGoalProgressResult = await goalService.getGoalProgress(
      goalId,
      userId
    );

    expect(getGoalProgressResult.isOk).toBe(false);
    expect(getGoalProgressResult.error).toBeDefined();
  });

  it('should handle errors during goal progress update', async () => {
    const userId = 'user123';
    const goalId = 'goal1';

    const updateGoalProgressResult = await goalService.updateGoalProgress(
      goalId,
      userId,
      7
    );

    expect(updateGoalProgressResult.isOk).toBe(false);
    expect(updateGoalProgressResult.error).toBeDefined();
  });

  it('should handle errors during goal completion check', async () => {
    const userId = 'user123';
    const goalId = 'goal1';

    const isGoalCompletedResult = await goalService.isGoalCompleted(
      goalId,
      userId
    );

    expect(isGoalCompletedResult.isOk).toBe(false);
    expect(isGoalCompletedResult.error).toBeDefined();
  });

  it('should handle errors during goal retrieval by ID', async () => {
    const userId = 'user123';
    const goalId = 'goal1';

    const getGoalByIdResult = await goalService.getGoalById(goalId, userId);

    expect(getGoalByIdResult.isOk).toBe(false);
    expect(getGoalByIdResult.error).toBeDefined();
  });
});