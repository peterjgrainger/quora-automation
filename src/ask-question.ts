import {launch} from 'puppeteer';
import { config } from './config';

export async function addQuestion(question: string, username: string, password: string) {
    const browser = await launch(config.launchConfig);
    const page = await browser.newPage();
    await page.goto(config.quora_url);
    try {
        await page.type('input[tabindex="1"][name="email"]', config.username || username);
        await page.type('input[tabindex="2"][name="password"]', config.password || password);
        await page.keyboard.press('Tab')
        await page.keyboard.press('Enter')
        await page.waitForNavigation()
        await page.click('a.deny_push_notif-button')
        await page.click('a.LookupBarAskQuestionModalButton')
        await page.waitForSelector(`textarea[placeholder='Start your question with "What", "How", "Why", etc.']`)
        await page.type(`textarea[placeholder='Start your question with "What", "How", "Why", etc.']`, question)
        await page.click('a[id$="submit"]')
        await page.waitForSelector('div.AskToAnswerHeader')
        await page.click('span.modal_close')
        await page.waitFor(1000)
        return Promise.resolve('Successfully added question')
      } catch(error) {
        console.error(error);
        return Promise.reject(error.message || 'Something went wrong')
      }
}

