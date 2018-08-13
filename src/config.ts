const dev = {

    launchConfig: undefined

}

const production = {

    launchConfig: {
            executablePath: '/usr/bin/chromium-browser',
            args: ['--disable-dev-shm-usage', '--no-sandbox', '--headless', '--disable-gpu']    
    }

}

const common = {
    username: process.env.QUORA_USERNAME,
    password: process.env.QUORA_PASSWORD,
    quora_url: 'https://www.quora.com'
}

const lookup = {
    dev,
    production
}

export const config = Object.assign(common, lookup[process.env.NODE_ENV || 'dev'])

