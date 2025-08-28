import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./axiosBaseQuery";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: axiosBaseQuery(),
  //   baseQuery: fetchBaseQuery({
  //     baseUrl: config.baseUrl,
  //     credentials: "include",
  //   }),
  tagTypes: ["USER", "AGENT", "GET_ALL_INFO", "GET_TRANSACTIONS_HISTORY","GET_ALL_ADMIN_DATA"],
  endpoints: () => ({}),
});