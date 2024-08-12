/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const fetcher = (url: any) => fetch(url).then(r => r.json())
