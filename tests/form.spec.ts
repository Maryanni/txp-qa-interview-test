import { faker } from '@faker-js/faker';
import { expect, test } from '@playwright/test';


test('can submit the form with minimal data', async ({ page }) => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const email = faker.internet.email();
  await page.goto('/form');


  await page.getByLabel('First name').fill(firstName);
  await page.getByLabel('Last name').fill(lastName);
  await page.getByLabel('Email address').fill(email);

  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByText(`${firstName} ${lastName}`)).toBeVisible();
  await expect(page.getByText(`${email}`)).toBeVisible();
});

test('cannot submit the form with an invalid email address', async ({ page }) => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const invalidEmail = 'invalid-email';
  await page.goto('/form');

  await page.getByLabel('First name').fill(firstName);
  await page.getByLabel('Last name').fill(lastName);
  await page.getByLabel('Email address').fill(invalidEmail);

  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByText('Please enter a valid email address')).toBeVisible();

  },
);
