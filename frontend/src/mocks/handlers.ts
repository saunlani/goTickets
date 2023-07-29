import { rest } from 'msw';

const baseUrl: string = import.meta.env.VITE_BASE_API_URL as string;

export const handlers = [
  // Mocked response for GET /events
  rest.get(
    baseUrl + '/events',
    (_, res, ctx) => {
      let results = [
        { 'id':1, 'title':'Hello World', 'date': '01-12-2023', 'city': 'Berlin', 'tickets': [{ 'barcode': 'abc12345', 'firstName': 'Bernd', 'lastName': 'Schmidt' }] },
        { 'id':1, 'title':'Hello Universe', 'date': '01-12-2022', 'city': 'Hamburg', 'tickets': [{ 'barcode': '12345abc', 'firstName': 'Joe', 'lastName': 'Schmo' }] },
      ];
      const limit = _.url.searchParams.get('limit');
      if (limit) {
        const parsedLimit = parseInt(limit, 10);
        results = results.slice(0, parsedLimit);
      }
      return res(
        ctx.status(200),
        ctx.json(results),
      );
    },
  ),
];