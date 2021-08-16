import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  vus: 500,
  duration: '15s',
};

export default function () {
  http.get('http://localhost:3000/reviews/meta?product_id=23');
  sleep(1);
};
