import { DEPLOYMENT_TYPES } from "./deployment-types";

const dockerConfig = {
            executablePath: '/usr/bin/chromium-browser',
            args: ['--disable-dev-shm-usage', '--no-sandbox', '--headless', '--disable-gpu']    

}

const localConfig = {
     args: ['--no-sandbox', '--disable-setuid-sandbox'] 
}

export function launchConfig(deploymentType: DEPLOYMENT_TYPES) {
    return deploymentType === DEPLOYMENT_TYPES.DOCKER ? dockerConfig : localConfig
}

