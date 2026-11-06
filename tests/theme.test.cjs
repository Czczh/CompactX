const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { test, before, after } = require('node:test');
const { chromium } = require('playwright');
const layout = require('./fixtures/layout.cjs');

const theme = readFileSync(process.env.THEME_FILE || 'CompactX.css', 'utf8');
let browser;

before(async () => {
  browser = await chromium.launch({
    executablePath: process.env.CHROMIUM_PATH,
    headless: true,
    args: ['--no-sandbox']
  });
});

after(async () => { await browser?.close(); });

async function fixture(current, compact = false) {
  const page = await browser.newPage({ viewport: { width: 1200, height: 800 } });
  await page.route('**/*', route => route.abort());
  await page.setContent(layout(current, compact));
  await page.addStyleTag({ content: theme });
  await page.addStyleTag({ content: ':root { --background-image: linear-gradient(red, blue); }' });
  return page;
}

for (const current of [false, true]) {
  const format = current ? 'current' : 'legacy';

  test(`${format}: wallpaper and structural layers remain transparent`, async () => {
    const page = await fixture(current);
    for (const id of ['app', 'innerApp', 'base', 'appContent', 'page', 'chatOuter', 'memberContainer', 'settings', 'settingsSidebarWrap', 'settingsContentWrap']) {
      assert.equal(await page.locator(`#${id}`).evaluate(el => getComputedStyle(el).backgroundColor), 'rgba(0, 0, 0, 0)', id);
    }
    assert.match(await page.locator('#wallpaper').evaluate(el => getComputedStyle(el).backgroundImage), /linear-gradient/);
    assert.equal(await page.locator('#gradient').evaluate(el => getComputedStyle(el).display), 'none');
    await page.close();
  });

  test(`${format}: independent panel settings and local overrides apply`, async () => {
    const page = await fixture(current);
    await page.addStyleTag({ content: `:root {
      --glass-main-chat-color: rgb(200 0 0); --glass-main-chat-opacity: 60%;
      --glass-member-list-color: rgb(0 200 0); --glass-member-list-opacity: 70%;
      --glass-dm-sidebar-color: rgb(0 0 200); --glass-dm-sidebar-opacity: 80%;
      --glass-settings-sidebar-color: rgb(200 200 0); --glass-settings-sidebar-opacity: 90%;
      --glass-settings-content-color: rgb(0 200 200); --glass-settings-content-opacity: 50%;
    }` });
    const actual = await page.evaluate(() => {
      const canvas = document.createElement('canvas');
      canvas.width = canvas.height = 1;
      const ctx = canvas.getContext('2d');
      return Object.fromEntries(['chatContent', 'members', 'sidebar', 'settingsSidebar', 'settingsContent'].map(id => {
        ctx.clearRect(0, 0, 1, 1);
        ctx.fillStyle = getComputedStyle(document.getElementById(id)).backgroundColor;
        ctx.fillRect(0, 0, 1, 1);
        return [id, Array.from(ctx.getImageData(0, 0, 1, 1).data)];
      }));
    });
    for (const [id, expected] of Object.entries({ chatContent: [200, 0, 0, 153], members: [0, 200, 0, 179], sidebar: [0, 0, 200, 204], settingsSidebar: [200, 200, 0, 230], settingsContent: [0, 200, 200, 128] })) {
      actual[id].forEach((value, index) => assert.ok(Math.abs(value - expected[index]) <= 1, `${id}: ${actual[id]}`));
    }
    assert.equal(await page.locator('#dm').evaluate(el => getComputedStyle(el).backgroundColor), 'rgba(0, 0, 0, 0)');
    assert.equal(await page.locator('#profile').evaluate(el => getComputedStyle(el).backgroundColor), 'rgb(101, 67, 33)');
    await page.close();
  });

  for (const compact of [false, true]) {
    test(`${format}: pronouns stay beside the name in ${compact ? 'compact' : 'cozy'} chat`, async () => {
      const page = await fixture(current, compact);
      const boxes = await page.evaluate(() => {
        const box = id => {
          const { x, y, width, height } = document.getElementById(id).getBoundingClientRect();
          return { x, y, width, height };
        };
        return { name: box('username'), pronouns: box('pronouns') };
      });
      assert.ok(boxes.pronouns.x > boxes.name.x + boxes.name.width);
      assert.ok(boxes.pronouns.y < boxes.name.y + boxes.name.height);
      assert.equal(await page.locator('#headerText').evaluate(el => getComputedStyle(el).display), 'inline');
      assert.equal(await page.locator('#headerText').evaluate(el => getComputedStyle(el, '::before').content), 'none');
      await page.locator('#username').evaluate(el => { el.textContent = 'A much longer display name that should wrap naturally'; });
      await page.setViewportSize({ width: 800, height: 800 });
      assert.equal(await page.locator('#chat').evaluate(el => el.scrollWidth <= el.clientWidth), true);
      await page.close();
    });
  }

  test(`${format}: server icon wrappers do not clip badges`, async () => {
    const page = await fixture(current);
    assert.equal(await page.locator('#serverItem').evaluate(el => getComputedStyle(el).overflow), 'visible');
    const { width, height } = await page.locator('#serverIcon').boundingBox();
    assert.equal(width, 48);
    assert.equal(height, 48);
    await page.close();
  });
}

test('the local settings file imports the shared theme before overrides', () => {
  const local = readFileSync('CompactX.theme.css', 'utf8');
  assert.ok(local.indexOf('@import') < local.indexOf(':root'));
  assert.match(local, /https:\/\/raw\.githubusercontent\.com\/Czczh\/CompactX\/main\/CompactX\.css/);
});
