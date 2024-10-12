import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'; // import: axios 1.7.7
import { AuthToken } from '../../../domain/auth/AuthToken'; // import: src/core/domain/auth/AuthToken.ts
import { User } from '../../../domain/users/User'; // import: src/core/domain/users/User.ts
import { Result } from '../../../domain/common/Result'; // import: src/core/domain/common/Result.ts
import { Error } from '../../../domain/common/Error'; // import: src/core/domain/common/Error.ts
import { API_BASE_URL } from '../../../infrastructure/database/config'; // import: src/core/infrastructure/database/config.ts

interface ApiOptions {
  baseURL?: string;
  headers?: AxiosRequestConfig['headers'];
}

const createApiService = (options: ApiOptions): AxiosInstance => {
  const { baseURL = API_BASE_URL, headers } = options;
  const instance = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  });

  instance.interceptors.request.use((config) => {
    // Add authorization token to request headers if available
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      return response.data;
    },
    (error) => {
      // Handle API errors
      // Log the error
      console.error('API Error:', error);

      // Throw a custom error if needed
      throw new Error('API Error: ' + error.message);
    }
  );

  return instance;
};

export const apiService = createApiService({
  // Optional: Add custom headers or baseURL if necessary
});

// Authentication API
export const registerUser = async (userData: User): Promise<Result<User>> => {
  try {
    const response = await apiService.post('/auth/register', userData);
    return Result.Ok(response);
  } catch (error) {
    return Result.Err(new Error('Registration failed: ' + error.message));
  }
};

export const loginUser = async (credentials: { email: string; password: string }): Promise<Result<AuthToken>> => {
  try {
    const response = await apiService.post('/auth/login', credentials);
    return Result.Ok(response);
  } catch (error) {
    return Result.Err(new Error('Login failed: ' + error.message));
  }
};

export const logoutUser = async (): Promise<Result<void>> => {
  try {
    localStorage.removeItem('token');
    return Result.Ok(undefined);
  } catch (error) {
    return Result.Err(new Error('Logout failed: ' + error.message));
  }
};

export const getUserByToken = async (token: string): Promise<Result<User>> => {
  try {
    const response = await apiService.get('/users/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return Result.Ok(response);
  } catch (error) {
    return Result.Err(new Error('Error retrieving user data: ' + error.message));
  }
};

// Goals API
export const createGoal = async (goal: Goal, userId: string): Promise<Result<Goal>> => {
  try {
    const response = await apiService.post(`/goals`, goal, {
      headers: {
        'user-id': userId,
      },
    });
    return Result.Ok(response);
  } catch (error) {
    return Result.Err(new Error('Error creating goal: ' + error.message));
  }
};

export const getGoalsByUserId = async (userId: string): Promise<Result<Goal[]>> => {
  try {
    const response = await apiService.get(`/goals`, {
      headers: {
        'user-id': userId,
      },
    });
    return Result.Ok(response);
  } catch (error) {
    return Result.Err(new Error('Error fetching goals: ' + error.message));
  }
};

export const updateGoal = async (goal: Goal): Promise<Result<Goal>> => {
  try {
    const response = await apiService.put(`/goals/${goal.id}`, goal);
    return Result.Ok(response);
  } catch (error) {
    return Result.Err(new Error('Error updating goal: ' + error.message));
  }
};

export const deleteGoal = async (goalId: string): Promise<Result<void>> => {
  try {
    await apiService.delete(`/goals/${goalId}`);
    return Result.Ok(undefined);
  } catch (error) {
    return Result.Err(new Error('Error deleting goal: ' + error.message));
  }
};

export const getGoalProgress = async (goalId: string, userId: string): Promise<Result<number>> => {
  try {
    const response = await apiService.get(`/goals/${goalId}/progress`, {
      headers: {
        'user-id': userId,
      },
    });
    return Result.Ok(response);
  } catch (error) {
    return Result.Err(new Error('Error fetching goal progress: ' + error.message));
  }
};

export const updateGoalProgress = async (goalId: string, userId: string, progress: number): Promise<Result<void>> => {
  try {
    await apiService.put(`/goals/${goalId}/progress`, { progress }, {
      headers: {
        'user-id': userId,
      },
    });
    return Result.Ok(undefined);
  } catch (error) {
    return Result.Err(new Error('Error updating goal progress: ' + error.message));
  }
};