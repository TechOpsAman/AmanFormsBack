import { logger } from './logger';
import { SeverityLevel } from './severityLevel';

export async function retry(maxRetries, fn, funcName): Promise<void> {
  return fn.catch((err) => {
    if (maxRetries <= 0) {
      throw err;
    }
    logger.log(
      SeverityLevel.Informational,
      `function ${funcName}() failed. retries left: ${maxRetries}`,
    );
    return retry(maxRetries - 1, fn, funcName);
  });
}
