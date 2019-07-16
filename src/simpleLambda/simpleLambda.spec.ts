import { handler } from './index';
import { createContext } from '../../test/unit/mocked-lambda-context';

interface Result {
  statusCode: string;
  body: string;
}
it('simple lambda should response `hello lambda`', () => {
  const callback = jest.fn();
  handler({}, createContext(), callback);
  expect(callback).toBeCalledTimes(1);
  const response: Result = callback.mock.calls[0][1];
  expect(response.statusCode).toBe('200');
  expect(response.body).toContain('Hello lambda');
});
