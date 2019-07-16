import Axios from 'axios';

const baseRestapi = 'http://localhost:4567/restapis/';

export default async (path: string): Promise<string> => {
  return await Axios.get(baseRestapi)
    .then(res => {
      return res.data['item'][0]['id'];
    })
    .then(id => `${baseRestapi}${id}/local/_user_request_${path}`)
    .catch(err => {
      console.error(err);
      return '';
    });
};
