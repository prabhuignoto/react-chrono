import { chromium, FullConfig } from '@playwright/test';
import fs from 'fs/promises';
import path from 'path';

async function globalSetup(config: FullConfig) {
  // Skip auth setup if running in CI without credentials
  if (process.env.CI && !process.env.TEST_USERNAME) {
    console.log('Skipping auth setup in CI without credentials');
    return;
  }

  const { baseURL } = config.projects[0].use;
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  try {
    // Navigate to login page
    await page.goto(`${baseURL}/login`);
    
    // Perform login
    await page.fill('#username', process.env.TEST_USERNAME || 'testuser');
    await page.fill('#password', process.env.TEST_PASSWORD || 'testpass');
    await page.click('button[type="submit"]');
    
    // Wait for successful login
    await page.waitForURL('**/dashboard');
    
    // Save storage state
    const authFile = path.join(__dirname, 'fixtures', 'auth.json');
    await fs.mkdir(path.dirname(authFile), { recursive: true });
    await page.context().storageState({ path: authFile });
    
    console.log('Authentication state saved');
  } catch (error) {
    console.error('Failed to setup authentication:', error);
  } finally {
    await browser.close();
  }
}

export default globalSetup;