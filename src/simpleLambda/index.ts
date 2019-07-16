import { Context, Callback } from 'aws-lambda';

export function handler(event: {}, context: Context, callback: Callback) {
  console.log('hello lambda', event, context);
  callback(null, {
    statusCode: '200',
    body: 'Hello lambda',
  });
}
