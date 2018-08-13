import { launch } from "puppeteer";
import { config } from './config';

export async function findQuestion(question:string) {

    const browser = await launch(config.launchConfig);
    const page = await browser.newPage();

    const sanitisedQuestion = question.replace(/[^a-zA-Z0-9\s]/g, '')
                                      .replace(/\s/g, '-')
    await page.goto(`${config.quora_url}/${sanitisedQuestion}`)

    const url = page.url()
    let firstAnswer = 'No answer found yet, try again later'
    if(!url.includes('unanswered')) {
        const answer = await page.evaluate(() => document.querySelector('div[id$="answer"]:first-of-type >div>div:nth-of-type(2)').textContent)
        firstAnswer = answer.replace(question, '')   
    }

    await browser.close();

    return Promise.resolve(firstAnswer);
}