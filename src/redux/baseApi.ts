import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./axiosBaseQuery";

export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: axiosBaseQuery(),
    tagTypes: ["USER", "TRANSACTION", "ALL_TRANSACTION", "WALLET", "ALL_USER", "ALL_AGENT"],
    endpoints: () => ({}),
});
