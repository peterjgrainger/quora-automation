import { DEPLOYMENT_TYPES } from "./deployment-types";
import { LoggerInterface } from "./logger-interface";

export interface UserConfig {
    username: string
    password: string
    deploymentType?: DEPLOYMENT_TYPES,
    logger?: LoggerInterface
}