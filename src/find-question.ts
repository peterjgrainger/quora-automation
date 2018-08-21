import { launch } from "puppeteer";
import { launchConfig } from './config';
import { DEPLOYMENT_TYPES } from "./deployment-types";

export async function findQuestion(question:string, deploymentType?: DEPLOYMENT_TYPES) {
    const browser = await launch(launchConfig(deploymentType));

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