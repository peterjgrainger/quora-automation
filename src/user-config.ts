import { DEPLOYMENT_TYPES } from "./deployment-types";

export interface UserConfig {
    username: string
    password: string
    deploymentType?: DEPLOYMENT_TYPES
}