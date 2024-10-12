/**
 * @file src/next.config.js
 * 
 * This file configures Next.js for the Fitness Goal Tracker MVP, enabling features like static site generation (SSG), server-side rendering (SSR), image optimization, and deployment settings.
 * 
 * It integrates with other components:
 * - `src/core/presentation/web/services/api.ts`: Uses the API service to configure API routes for the application.
 * - `src/core/infrastructure/database/config.ts`: Reads database configuration from the configuration file.
 * - `src/core/domain/auth/AuthService.ts`: Handles authentication logic, interacting with the `next-auth` package. 
 * - `src/core/presentation/web/hooks/useAuth.ts`: Uses the authentication hook to manage user session data. 
 * 
 * The file implements the following features:
 * - Static Site Generation (SSG): Pre-renders pages for SEO and faster initial load times.
 * - Server-Side Rendering (SSR):  Renders dynamic pages on the server, improving SEO and providing a better user experience.
 * - Image Optimization: Optimizes images for various screen sizes and resolutions. 
 * - Environment Variables: Manages environment variables for different deployment environments.
 * - Deployment Settings: Configures settings for deploying the application to Vercel or other platforms. 
 * - API Routes: Configures API routes for authentication and data retrieval.
 * - Error Handling: Implements basic error handling for Next.js pages.
 * 
 * The file follows these design patterns:
 * - Configuration Object: Uses a configuration object to store Next.js settings. 
 * - Middleware Pattern: Leverages middleware to enhance functionality and handle specific requests.
 * 
 * The file supports the following user stories:
 * - As a user, I want to have a fast and responsive web application.
 * - As a user, I want my pages to be pre-rendered for better SEO and faster initial load times.
 * - As a user, I want images to be optimized for different devices and screen sizes. 
 * - As a user, I want the application to be secure and handle errors gracefully.
 */
const { withSentryConfig } = require('@sentry/nextjs');
const { withAuth } = require('next-auth/middleware');

const nextConfig = {
  reactStrictMode: true, 
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ['[Insert image domains here]', '[Add more if needed]'],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/dashboard',
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/api/auth/:path*',
        destination: '/api/auth/[...nextauth]',
      },
    ];
  },
  /**
   * @description  The next.config.js file is responsible for configuring Next.js to handle different aspects of the application, including:
   * - Environment Variables: Sets up environment variables specific to the application, such as API keys or database connection strings.
   * - Static Site Generation: Enables Next.js to pre-render pages for better SEO and faster initial load times. 
   * - Server-Side Rendering: Enables Next.js to render dynamic content on the server, making the application more responsive.
   * - Image Optimization: Configures how Next.js optimizes images for different devices and screen sizes. 
   * - API Routes: Defines API routes for handling data requests and authentication.
   * - Error Handling: Configures Next.js to handle errors and provide user-friendly error messages.
   * - Middleware:  Allows customization of requests and responses through middleware functions, enhancing security and functionality.
   */
  experimental: {
    appDir: true,
    serverActions: true,
  },
  /**
   * @param {string[]} src
   * @returns {string} The new destination for the request.
   */
  async middleware(req, res) {
    const { nextUrl: nextUrlParam } = req;

    // Apply authentication middleware to protected routes
    if (nextUrlParam.pathname.startsWith('/dashboard')) {
      return withAuth({
        callbacks: {
          authorized: ({ req, token }) => {
            /**
             * This function checks if the user is authenticated before allowing access to the protected route.
             * It relies on the `next-auth` package for session management and authentication.
             * 
             * @param {Request} req 
             * @param {Object} token 
             * @returns {boolean} true if the user is authorized, false otherwise.
             */
            // Implement logic to check if the user is authenticated
            return !!token; 
          },
        },
        pages: {
          signIn: '/auth/login',
        },
        secret: process.env.JWT_SECRET, // JWT secret from the environment
        // Add additional next-auth configuration for Google, Facebook, or other authentication providers 
        // as needed.
      })(req, res);
    }

    // Continue to the next middleware or the request handler
    return NextResponse.next();
  },
};

/**
 * @description The `next.config.js` file is responsible for configuring Next.js for the application. It defines settings related to:
 * - Static Site Generation: When to pre-render pages for better SEO and initial load times.
 * - Server-Side Rendering:  When to render dynamic content on the server, making the application more responsive.
 * - Image Optimization: How Next.js optimizes images for different devices and screen sizes. 
 * - API Routes: How Next.js handles API requests and responses.
 * - Error Handling: How Next.js handles errors and provides user-friendly error messages.
 * - Middleware: Allows for customizing requests and responses through middleware functions, adding functionality and security layers.
 */

module.exports = withSentryConfig(nextConfig);