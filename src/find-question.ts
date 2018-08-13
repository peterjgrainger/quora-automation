import { launch } from "puppeteer";
import { launchConfig } from './config';
import { UserConfig } from "./user-config";

export async function findQuestion(question:string, userConfig: UserConfig) {

    const browser = await launch(launchConfig(userConfig.deploymentType));
    const page = await browser.newPage();

    const sanitisedQuestion = question.replace(/[^a-zA-Z0-9\s]/g, '')
                                      .replace(/\s/g, '-')
    await page.goto(`https://www.quora.com/${sanitisedQuestion}`)

    const url = page.url()
    let firstAnswer = 'No answer found yet, try again later'
    if(!url.includes('unanswered')) {
        const answer = await page.evaluate(() => document.querySelector('div[id$="answer"]:first-of-type >div>div:nth-of-type(2)').textContent)
        firstAnswer = answer.replace(question, '')   
    }

    await browser.close();

    return Promise.resolve(firstAnswer);
}