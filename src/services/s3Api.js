import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const s3Api = createApi({
  reducerPath: 's3Api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://stru4net.s3.eu-north-1.amazonaws.com/', // replace this with your bucket endpoint
  }),
  endpoints: (builder) => ({
    getBridgeData: builder.query({
      query: () => 'data.json',
    }),
  }),
});

export const { useGetBridgeDataQuery } = s3Api;
