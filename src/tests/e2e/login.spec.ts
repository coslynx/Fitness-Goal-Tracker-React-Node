import { test, expect, Page } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { AuthPage } from '../../pages/AuthPage';
import { DashboardPage } from '../../pages/DashboardPage';

test.describe('Login', () => {
  let page: Page;
  let authPage: AuthPage;
  let loginPage: LoginPage;
  let dashboardPage: DashboardPage;

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
    authPage = new AuthPage(page);
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    await page.goto('/');
  });

  test.afterEach(async () => {
    await page.close();
  });

  test('should navigate to login page', async () => {
    await authPage.navigateToLogin();
    await expect(loginPage.emailInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();
  });

  test('should display error message for invalid credentials', async () => {
    await authPage.navigateToLogin();
    await loginPage.setEmail('test@example.com');
    await loginPage.setPassword('invalidpassword');
    await loginPage.login();
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('Invalid email or password');
  });

  test('should successfully login and redirect to dashboard', async () => {
    await authPage.navigateToLogin();
    await loginPage.setEmail('test@example.com');
    await loginPage.setPassword('password');
    await loginPage.login();
    await expect(dashboardPage.welcomeMessage).toBeVisible();
    await expect(dashboardPage.welcomeMessage).toContainText('Welcome, Test User!');
  });

  test('should handle login errors and display error message', async () => {
    await authPage.navigateToLogin();
    await loginPage.setEmail('test@example.com');
    await loginPage.setPassword('invalidpassword');
    await loginPage.login();
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('Invalid email or password');
  });
});