import Axios from 'axios';

const httpclient = {
  GET: ({ url, headers }) => Axios.get(url, { headers }),
  POST: ({ url, body, headers }) => Axios.post(url, body, { headers }),
  PUT: ({ url, body, headers }) => Axios.put(url, body, { headers }),
  PATCH: ({ url, body, headers }) => Axios.patch(url, body, { headers }),
  DELETE: ({ url, body, headers }) => Axios.delete(url, { data: body }, { headers }),
};

export default httpclient;
