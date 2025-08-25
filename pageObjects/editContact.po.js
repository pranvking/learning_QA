const { expect } = require("@playwright/test");

exports.ContactPage = class ContactPage {
  constructor(page) {
    this.page = page;
    this.editContactButton = "//button[@id='edit-contact']";
    this.firstNameInput = "//input[@id='firstName']";
    this.lastNameInput = "//input[@id='lastName']";
    this.dateofBirthInput = "//input[@id='birthdate']";
    this.emailInput = "//input[@id='email']";
    this.phoneInput = "//input[@id='phone']";
    this.street1Input = "//input[@id='street1']";
    this.street2Input = "//input[@id='street2']";
    this.cityInput = "//input[@id='city']";
    this.stateProvinceInput = "//input[@id='stateProvince']";
    this.postalCodeInput = "//input[@id='postalCode']";
    this.countryInput = "//input[@id='country']";
    this.submitButton = '//button[@id="submit"]';
    this.cancelButton = '//button[@id="cancel"]';
    this.verifyEdit = '//span[@id="firstName"]';
  }

 async editContact(
  FirstName,
  LastName,
  DateofBirth,
  Email,
  Phone,
  StreetAddress1,
  StreetAddress2,
  City,
  State,
  PostalCode,
  Country
) {
  const editButton = this.page.locator(this.editContactButton);
  
  await editButton.waitFor({ state: "visible" });
  await editButton.scrollIntoViewIfNeeded();
  await editButton.click({ force: true });

  await this.page.locator(this.firstNameInput).fill(FirstName);
  await this.page.locator(this.lastNameInput).fill(LastName);
  await this.page.locator(this.dateofBirthInput).fill(DateofBirth);
  await this.page.locator(this.emailInput).fill(Email);
  await this.page.locator(this.phoneInput).fill(Phone);
  await this.page.locator(this.street1Input).fill(StreetAddress1);
  await this.page.locator(this.street2Input).fill(StreetAddress2);
  await this.page.locator(this.cityInput).fill(City);
  await this.page.locator(this.stateProvinceInput).fill(State);
  await this.page.locator(this.postalCodeInput).fill(PostalCode);
  await this.page.locator(this.countryInput).fill(Country);
  await this.page.locator(this.submitButton).click();
}


  async verifyEditContact(firstName) {
    await expect(this.page.locator(this.verifyEdit)).toHaveText(firstName);
  }
};
