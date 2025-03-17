import { expect, test } from '@playwright/test';

test('details of all individuals are displayed', async ({ page }) => {
  await page.goto('/table');
  await expect(page.locator('table')).toBeVisible();
  const rows = page.locator('table tbody tr');
  const rowCount = await rows.count();
  expect(rowCount).toBeGreaterThan(0);
  await expect(rows.first().locator('td').first()).toBeVisible();

});

test('can view the full details of an individual', async ({ page }) => {
  await page.goto('/table');
  await expect(page.locator('table')).toBeVisible();
  await page.locator('table tbody tr').first().locator('a').first().click();
  await page.waitForURL('**/table/**');
  await expect(page.locator('table')).not.toBeVisible();
  await page.getByRole('link', { name: 'Table' }).click();
  await expect(page.locator('table')).toBeVisible();

});
