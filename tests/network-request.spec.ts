import { expect, test } from '@playwright/test';

test('can retrieve a random fact', async ({ page }) => {
  await page.goto('/network-request');

  await page.getByRole('button').filter({ hasText: /get/i }).first().click();

  const factContainer = page.locator('.fact-container, [data-testid="fact"], p').first();
  await expect(factContainer).not.toBeEmpty({ timeout: 40000 });
  await expect(page.getByText(/loading|cargando/i)).not.toBeVisible();

});
