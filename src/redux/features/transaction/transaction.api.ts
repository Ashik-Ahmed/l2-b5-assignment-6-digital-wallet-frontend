import { baseApi } from "@/redux/baseApi";

const transactionApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllTransactions: builder.query({
            query: () => ({
                url: `/transactions`,
                method: "GET"
            }),
            providesTags: ["TRANSACTION"],
        }),
    })
});

export const { useGetAllTransactionsQuery } = transactionApi;