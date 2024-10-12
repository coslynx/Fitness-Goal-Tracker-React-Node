# Fitness Goal Tracker: Architecture Overview

## 1. Core Architectural Principles

* **Domain-Driven Design (DDD):** The application is structured according to DDD principles, with well-defined domain models (`User`, `Goal`) that encapsulate business logic. 
* **Layered Architecture:** The application follows a layered architecture, separating concerns into domain (`src/core/domain`), infrastructure (`src/core/infrastructure`), and presentation (`src/core/presentation`) layers.
* **Dependency Injection (DI):**  DI is used extensively to decouple components, promoting testability and flexibility. 
* **Separation of Concerns:** Each file and component focuses on a specific responsibility, promoting modularity and maintainability.

## 2. Key Components

**Domain Layer (`src/core/domain`)**

* **User:**  Represents a user of the application. Includes properties like `email`, `password`, `name`, `goals`, and `progress`.
* **UserRepository:**  Defines the interface for interacting with the database for User data. 
* **Goal:** Represents a user's fitness goal. Includes properties like `type`, `target`, `deadline`, `progress`, and `userId`.
* **GoalRepository:** Defines the interface for interacting with the database for Goal data.
* **AuthProvider:**  Defines the interface for authentication providers (e.g., Google, Facebook).
* **AuthToken:**  Represents an authentication token.
* **AuthService:**  Handles authentication logic, including user registration, login, and session management.
* **Common:**  Includes shared data structures like `Error` and `Result` for consistent error handling and asynchronous operations.

**Infrastructure Layer (`src/core/infrastructure`)**

* **Database:**  Provides a connection to the MongoDB database.
* **GoalModel:**  Maps the `Goal` domain model to the MongoDB schema.
* **UserModel:** Maps the `User` domain model to the MongoDB schema.
* **GoogleAuthProvider:**  Implements authentication with Google.
* **FacebookAuthProvider:** Implements authentication with Facebook.

**Presentation Layer (`src/core/presentation`)**

* **Web:**
    * **Routes:**
        * **auth:**  Handles authentication pages (Login, Register).
        * **dashboard:**  Handles the dashboard page and user profile.
        * **goals:** Handles goal list and goal creation/editing pages.
        * **progress:** Handles progress visualization components.
    * **Components:**
        * **Atoms:**  Basic UI components (Button, Input, Typography).
        * **Molecules:**  Composite components (FormField, NavItem).
        * **Organisms:**  Complex UI elements (Header, Sidebar, Footer).
        * **Templates:**  Layout components (DashboardLayout, AuthLayout).
    * **Hooks:**  Custom hooks for state management and application logic (useAuth, useForm, useGoalStore).
    * **Services:**  Services for API interactions (api, auth).
    * **Utils:**  Helper functions and utility methods (formatters, validators).
* **API:**  
    * **Controllers:**  API controllers for handling requests (AuthController, UserController).
    * **Middlewares:**  Middleware functions for request handling (AuthMiddleware, ErrorHandler).
    * **Models:**  API models for data serialization (User).
    * **Routes:** API routes for specific endpoints (AuthRoutes, UserRoutes).
    * **Services:**  Services for backend logic (AuthService, UserService).
    * **Utils:**  Backend utilities (Logger, Encryption).

### 3. Data Flow

The following diagram illustrates the primary data flow within the application:

```
                                 UI (Next.js)
                                        |
                                  [API Service]
                                        |
                                      [Auth Service]
                                        |
                                      [Auth Provider]
                                        |
                                      [Google/Facebook]
                                        |
                              [User Repository]
                                        |
                                      [Database]
                                        |
                              [Goal Repository]
                                        |
                                      [Database]
                                        |
                                 [Goal Service]
                                        |
                                  [API Service]
                                        |
                                 UI (Next.js)
```

### 4. Technology Stack

**Frontend:**

* **React**: Core UI library.
* **Next.js**:  Framework for building server-side rendered and statically generated applications.
* **Tailwind CSS**: Utility-first CSS framework for rapid styling.
* **Zustand**: State management library for simple state management.

**Backend:**

* **Node.js**: Runtime environment.
* **Express.js**: Framework for building RESTful APIs.
* **MongoDB**:  NoSQL database for storing user and goal data.
* **MongoDB Atlas:** Managed cloud database service.

**Other Tools:**

* **Jest**: Testing framework.
* **ESLint**:  Linting tool.
* **Prettier**: Code formatter.
* **Sentry**: Error tracking and monitoring.
* **Axios**: HTTP client for making API requests.

### 5. Scalability and Future-Proofing

The application is designed for scalability with:

* **Serverless architecture:** Utilizing AWS Lambda or Vercel functions for dynamic scaling.
* **Scalable database:**  Leveraging MongoDB Atlas for high availability and automatic scaling.
* **Optimized data models:** Ensuring efficient database queries and data access.
* **Modular code:**  Promoting easier maintenance, updates, and additions of new features. 

The application is also future-proofed with:

* **Dependency injection:**  Facilitating easy integration of new components and services.
* **Clear API contracts:** Enabling the development of independent modules and packages.
* **Extensible design patterns:**  Allowing for the addition of new authentication providers, data sources, or UI features. 

### 6. Security

The application prioritizes security with:

* **Robust authentication:**  Implementing secure password hashing and multi-provider authentication.
* **Secure API endpoints:**  Using HTTPS for encrypted communication and verifying tokens.
* **Data validation and sanitization:**  Implementing input validation and data sanitization to prevent attacks.
* **Regular security audits:**  Performing security reviews to identify and mitigate vulnerabilities.

### 7. Development Process

* **Agile methodology:**  Utilizing agile development practices with short sprints and continuous feedback.
* **Continuous Integration/Continuous Deployment (CI/CD):**  Implementing CI/CD for automated testing, building, and deployment.
* **Comprehensive testing:**  Conducting unit testing, integration testing, end-to-end testing, and performance testing. 

### 8. Deployment

The application will be deployed on a cloud platform like AWS or Vercel, providing scalability, reliability, and high availability. 

### Conclusion

This architectural overview provides a high-level understanding of the Fitness Goal Tracker application. The application is designed to be scalable, secure, and maintainable, with a focus on a streamlined development process and a user-centric experience.