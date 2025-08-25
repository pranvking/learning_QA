import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.pinterest.com/login');
});

test("login using valid informations", async ({ page }) => {
    await page.locator("//input[@placeholder='Email']").click();
    

});
