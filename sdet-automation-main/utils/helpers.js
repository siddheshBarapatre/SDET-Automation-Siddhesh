module.exports = {
  async login(page, email, password) {
    await page.fill('input[name="email"]', email);
    await page.fill('input[name="password"]', password);
    await page.click('button:has-text("Login")');
  },
};