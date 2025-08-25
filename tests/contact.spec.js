import { expect, test } from "@playwright/test";
import { ContactPage } from "../pageObjects/contact.po.js";
import { LoginPage } from "../pageObjects/login.po.js";
const { authenticateUser, createEntity, getEntity, validateEntity } = require("../helper.spec.js");
const testData = require("../fixtures/contactFixtures.json");
const loginTestData = require("../fixtures/loginFixtures.json");

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  const login = new LoginPage(page);
  await login.login(loginTestData.validLogin.username, loginTestData.validLogin.password);
  await login.verifyValidlogin();
});

test.describe("Valid contact tests", () => {
  test("Valid Contact", async ({ page }) => {
    const contact = new ContactPage(page);

    await contact.addContact(
      testData.validContact.FirstName,
      testData.validContact.LastName,
      testData.validContact.DateofBirth,
      testData.validContact.Email,
      testData.validContact.Phone,
      testData.validContact.StreetAddress1,
      testData.validContact.StreetAddress2,
      testData.validContact.City,
      testData.validContact.StateofProvience,
      testData.validContact.postalCode,
      testData.validContact.Country
    );

    await contact.verifyValidContact();
  });

  test("Contact Edit test", async ({ page, request }) => {
    const Data = {
      firstName: "John",
      lastName: "Doe",
      birthdate: "1990-06-30",
      email: "jhondoe@gmail.com",
      phone: "9898989898",
      street1: "Address1",
      city: "City1",
      stateProvience: "State1",
      postalCode: "12345",
      country: "Nepal",
    };
    const contact = new ContactPage(page);
    let accessToken = await authenticateUser(
      loginTestData.validLogin.username,
      loginTestData.validLogin.password,
      { request }
    );
    await createEntity(Data, accessToken, "/contacts", { request });
    page.reload();
    await contact.viewCreatedContact();
    await contact.contactEdit(testData.contactEdit.firstName);
    await contact.validateContactCreated(
      testData.contactEdit.firstName,
      testData.contact.lastName,
      testData.validContact.DateofBirth,
      testData.validContact.Email,
      testData.validContact.Phone,
      testData.validContact.StreetAddress1,
      testData.validContact.StreetAddress2,
      testData.validContact.City,
      testData.validContact.StateofProvience,
      testData.validContact.postalCode,
      testData.validContact.Country
    );
  });

  test.only("Contact Delete test", async ({ page, request }) => {
    const Data = {
      firstName: "John",
      lastName: "Doe",
      birthdate: "1990-06-30",
      email: "jhondoe@gmail.com",
      phone: "9898989898",
      street1: "Address1",
      city: "City1",
      stateProvience: "State1",
      postalCode: "12345",
      country: "Nepal",
    };
    const contact = new ContactPage(page);
    let accessToken = await authenticateUser(
      loginTestData.validLogin.username,
      loginTestData.validLogin.password,
      { request }
    );
    await createEntity(Data, accessToken, "/contacts", { request });
    page.reload();
    await contact.verifyValidContact();
    const id = await getEntity(accessToken, "/contacts", "200", { request });
    await contact.contactDelete();
    await validateEntity(accessToken, `/contacts/${id}`, "200", { request });
  });
});
