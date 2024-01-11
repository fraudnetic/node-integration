import Collector from '../helpers/collector';
export default interface ServerConfigurationInterface {
    servers: string[];
    secure?: boolean;
}
export interface qObject {
    [key: string]: string | number | boolean | string[] | number[] | boolean[] | undefined | undefined[] | qObject | qObject[];
}
export type FraudneticInterface = Collector;
