import { expect, test } from "@playwright/test";
import { ContactPage } from "../pageObjects/contact.po.js"; // make sure this points to your ContactPage
import { LoginPage } from "../pageObjects/login.po.js";
import { ContactPage as EditContactPage } from "../pageObjects/editContact.po.js"; // make sure this points to your EditContactPage
const testData = require("../fixtures/contactFixtures.json");

test.beforeEach(async ({ page }) => {
  await page.goto("/");

  const login = new LoginPage(page);
  await login.login("pranavkarmacharya@gmail.com", "pranavkarmacharya123");
  await login.verifyValidlogin();

  const contact = new ContactPage(page);
  await contact.verifyValidContact();
});

test.describe("Edit contact tests", () => {
  test("Edit Contact", async ({ page }) => {
    const edit = new EditContactPage(page);

    const {
      FirstName,
      LastName,
      DateofBirth,
      Email,
      Phone,
      StreetAddress1,
      StreetAddress2,
      City,
      StateofProvince, 
      postalCode,
      Country,
    } = testData.editContact;

    await edit.addContact(
      FirstName,
      LastName,
      DateofBirth,
      Email,
      Phone,
      StreetAddress1,
      StreetAddress2,
      City,
      StateofProvince,
      postalCode,
      Country
    );

    await edit.verifyValidContact();
  });
});
