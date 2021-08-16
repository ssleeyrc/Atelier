import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  vus: 1000,
  duration: '10s',
};

export default function () {
  http.get('http://localhost:3000/reviews?product_id=23');
  sleep(1);
};
