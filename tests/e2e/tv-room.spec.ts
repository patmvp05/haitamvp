import { test, expect } from '@playwright/test';

test.describe('Hotel TV Guest Screen E2E Tests', () => {
  test('renders seeded demo room /tv/101 with guest name, room number, and checkout date', async ({
    page,
  }) => {
    await page.goto('/tv/101');

    // Verify room number
    await expect(page.getByText('ROOM 101')).toBeVisible();

    // Verify guest name
    await expect(page.getByRole('heading', { level: 1 })).toContainText('David');

    // Verify checkout label and time
    await expect(page.getByText('Checkout', { exact: true })).toBeVisible();
    await expect(page.getByText(/11:00 AM/i)).toBeVisible();
  });

  test('renders Room Not Found screen for nonexistent room /tv/999', async ({ page }) => {
    await page.goto('/tv/999');

    await expect(page.getByRole('heading', { name: 'Room Not Found' })).toBeVisible();
    await expect(
      page.getByText("We couldn't find this room. Please contact reception at"),
    ).toBeVisible();
  });

  test('renders hotel systems unavailable fallback screen when Supabase is unreachable', async ({
    page,
  }) => {
    // Navigate to a room request that simulates an unreachable/failing database backend
    await page.goto('/tv/offline');

    await expect(page.getByRole('heading', { name: "We'll be right back" })).toBeVisible();
    await expect(
      page.getByText("We can't reach the hotel systems right now. Please contact reception at"),
    ).toBeVisible();

    const tryAgainButton = page.getByRole('button', { name: 'Try Again' });
    await expect(tryAgainButton).toBeVisible();
  });

  test('supports keyboard D-pad navigation (Tab / Shift+Tab) across all actionable elements with visible focus state', async ({
    page,
  }) => {
    await page.goto('/tv/101');

    const wifiCard = page.getByRole('link', { name: 'Wi-Fi details' });
    const receptionCard = page.getByRole('link', { name: 'Contact reception' });
    const moviesCard = page.getByRole('link', { name: 'Watch movies' });

    await expect(wifiCard).toBeVisible();
    await expect(receptionCard).toBeVisible();
    await expect(moviesCard).toBeVisible();

    // Tab to first focusable element (Wi-Fi)
    await page.keyboard.press('Tab');
    await expect(wifiCard).toBeFocused();

    // Tab to second focusable element (Reception)
    await page.keyboard.press('Tab');
    await expect(receptionCard).toBeFocused();

    // Tab to third focusable element (Movies)
    await page.keyboard.press('Tab');
    await expect(moviesCard).toBeFocused();

    // Shift+Tab backwards navigation to Reception
    await page.keyboard.press('Shift+Tab');
    await expect(receptionCard).toBeFocused();

    // Shift+Tab backwards navigation to Wi-Fi
    await page.keyboard.press('Shift+Tab');
    await expect(wifiCard).toBeFocused();
  });
});
