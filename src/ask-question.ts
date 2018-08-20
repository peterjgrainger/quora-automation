import {launch} from 'puppeteer';
import { launchConfig } from './config';
import { UserConfig } from './user-config';

export async function addQuestion(question: string, userConfig: UserConfig) {
    const browser = await launch(launchConfig(userConfig.deploymentType));
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36')

    await page.goto('https://www.quora.com');
    try {
        await page.type('input[tabindex="1"][name="email"]', userConfig.username);
        await page.type('input[tabindex="2"][name="password"]', userConfig.password);
        await page.keyboard.press('Tab')
        await page.keyboard.press('Enter')
        await page.waitForNavigation()
        await page.click('a.deny_push_notif-button')
        await page.click('a.LookupBarAskQuestionModalButton')
        await page.waitForSelector(`textarea[placeholder='Start your question with "What", "How", "Why", etc.']`)
        await page.type(`textarea[placeholder='Start your question with "What", "How", "Why", etc.']`, question)
        const existsBefore = !!(await page.$('div.QuestionAddFailed'));
        console.log('exists before', existsBefore);
        await page.click('a[id$="submit"]')

        try {
          await page.waitForSelector('div.QuestionAddFailed', {
            visible: true,
            timeout: 2000
          })

          const answer = await page.evaluate(() => document.querySelector('div.QuestionAddFailed').textContent)

          await browser.close()
          return Promise.resolve(answer.replace('✕', ''))
        } catch(error) {
          console.log('error', error)
          await page.waitForSelector('div.AskToAnswerHeader')
          await page.click('span.modal_close')
          await browser.close()
          return Promise.resolve('Successfully added question')
        }
        
        
      } catch(error) {
        console.error(error);
        await browser.close()
        return Promise.reject(error.message || 'Something went wrong')
      } 
}

