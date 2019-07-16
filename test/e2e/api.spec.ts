import getEndpoint from './getEndpoint';
import Axios from 'axios';

it('get api should return `hello lambda`', async () => {
  const url: string = await getEndpoint('/');
  console.log(`endpoint is ${url}`);
  const result: string = await Axios.get(url).then(res => res.data);
  expect(result).toEqual('Hello lambda');
}, 60000);
