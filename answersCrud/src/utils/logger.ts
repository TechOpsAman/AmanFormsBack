/* eslint-disable no-console */
import { inspect } from 'util';
import { SeverityLevel } from './severityLevel';

export const logger = {
  log: (severityLevel: SeverityLevel, message: string, additionalInfo?: any): void => {
    console.log(`[${severityLevel}]: ${message}`);
    if (additionalInfo !== undefined) {
      console.log(inspect(additionalInfo, {
        showHidden: false, depth: null, colors: true, breakLength: 100,
      }));
    }
  },
};