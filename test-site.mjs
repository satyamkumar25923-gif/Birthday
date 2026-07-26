import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
page.on('pageerror', (e) => console.error('PAGE:', e.message));

await page.goto('http://localhost:5173/index.html', { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForSelector('text=Celebrate With Me', { timeout: 45000 });
console.log('1 hero ok');
await page.getByRole('button', { name: 'Celebrate With Me' }).click();

for (let i = 1; i <= 5; i++) {
  await page.waitForSelector(`text=question ${i} of 5`, { timeout: 10000 });
  await page.locator('section button').first().click();
  await page.waitForTimeout(1200);
  console.log(`2 question ${i} ok`);
}

await page.waitForSelector('text=birthday memories', { timeout: 10000 });
console.log('3 memories ok');
await page.getByRole('button', { name: 'Your birthday wish awaits' }).click();

await page.waitForSelector('text=One more surprise', { timeout: 10000 });
console.log('4 wish ok');
await page.getByRole('button', { name: 'One more surprise' }).click();

await page.waitForSelector('text=Relive it all again', { timeout: 10000 });
console.log('5 surprise ok');
await page.locator('.star-clickable').first().click();
await page.waitForTimeout(500);
console.log('6 easter egg clicked');

await page.getByRole('button', { name: 'Relive it all again' }).click();
await page.waitForSelector('text=Celebrate With Me', { timeout: 10000 });
console.log('7 restart ok');

await page.getByRole('button', { name: 'Toggle dark and light mode' }).click();
const dark = await page.evaluate(() => document.documentElement.classList.contains('dark'));
console.log('8 dark mode:', dark);
console.log('ALL PASSED');

await browser.close();
