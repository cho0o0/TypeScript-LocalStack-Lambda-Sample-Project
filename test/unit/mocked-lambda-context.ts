import { Context } from 'aws-lambda';

export function createContext(
  callbackWaitsForEmptyEventLoop: boolean = true,
  functionName: string = 'mocked-function-name',
  functionVersion: string = '$LATEST',
  region: string = 'us-west-1',
  account: string = 'mocked-account',
  alias: string | null = null,
  memoryLimitInMB: number = 128,
  awsRequestId: string = '7eb34e22-a617-11e9-a2a3-2a2ae2dbcce4',
  stream: string = 'ed0766daac614bd7a66e465b01beef7f',
  timeout: number = 3,
) {
  const start: Date = new Date();
  let end: Date;

  const context: Context = {
    callbackWaitsForEmptyEventLoop,
    functionName,
    functionVersion,
    invokedFunctionArn: `arn:aws:lambda:${region}:${account}:function:${functionName}:${alias || functionVersion}`,
    memoryLimitInMB,
    awsRequestId,
    logGroupName: `/aws/lambda/${functionName}`,
    logStreamName: `${start.toISOString().slice(0, 10)}/[${functionVersion}]/${stream}`,
    getRemainingTimeInMillis: () => {
      const endTime = end || Date.now();
      const remainingTime = timeout * 1000 - (endTime.getTime() - start.getTime());

      return Math.max(0, remainingTime);
    },
    succeed: (result: any) => {
      end = new Date();
      console.log(result);
    },
    fail: (err: Error) => {
      end = new Date();
      console.error(err);
    },
    done: (err: Error, result: any) => {
      if (err) {
        context.fail(err);
      }
      context.succeed(result);
    },
  };
  return context;
}
