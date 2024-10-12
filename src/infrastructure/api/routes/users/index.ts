import { Router } from 'express'; // import: express 4.18.2
import { UserController } from '../controllers/UserController'; // import: src/core/presentation/api/controllers/UserController.ts
import { AuthMiddleware } from '../middlewares/AuthMiddleware'; // import: src/core/presentation/api/middlewares/AuthMiddleware.ts
import { AuthService } from '../../../domain/auth/AuthService'; // import: src/core/domain/auth/AuthService.ts
import { AuthProvider } from '../../../domain/auth/AuthProvider'; // import: src/core/domain/auth/AuthProvider.ts
import { GoogleAuthProvider } from '../../../infrastructure/auth/GoogleAuthProvider'; // import: src/core/infrastructure/auth/GoogleAuthProvider.ts
import { FacebookAuthProvider } from '../../../infrastructure/auth/FacebookAuthProvider'; // import: src/core/infrastructure/auth/FacebookAuthProvider.ts
import { UserRepository } from '../../../domain/users/UserRepository'; // import: src/core/domain/users/UserRepository.ts
import { MongoUserRepository } from '../../../domain/users/UserRepository'; // import: src/core/domain/users/UserRepository.ts
import { Database } from '../../../infrastructure/database/Database'; // import: src/core/infrastructure/database/Database.ts
import { UserModel } from '../../../infrastructure/database/UserModel'; // import: src/core/infrastructure/database/UserModel.ts
import { DatabaseConfig } from '../../../infrastructure/database/config'; // import: src/core/infrastructure/database/config.ts

const router = Router();

// Initialize database and services
const database = new Database({ url: process.env.DATABASE_URL }); // import: src/core/infrastructure/database/config.ts
const userModel = new UserModel(database);
const userRepository: UserRepository = new MongoUserRepository(database, userModel);
const googleAuthProvider = new GoogleAuthProvider();
const facebookAuthProvider: AuthProvider = googleAuthProvider; // or facebookAuthProvider
const authService = new AuthService(facebookAuthProvider, userRepository);
const authMiddleware = new AuthMiddleware(authService);
const userController = new UserController(new UserService(userRepository));

// User routes
router.post('/', userController.createUser);
router.get('/:id', authMiddleware.authenticate, userController.getUserById);
router.get('/', authMiddleware.authenticate, userController.getUsers);
router.put('/:id', authMiddleware.authenticate, userController.updateUser);
router.delete('/:id', authMiddleware.authenticate, userController.deleteUser);

export default router;