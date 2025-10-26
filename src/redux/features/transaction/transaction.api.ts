import { baseApi } from "@/redux/baseApi";

const transactionApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllTransactions: builder.query({
            query: (filterData) => ({
                url: `/transactions`,
                method: "GET",
                params: filterData
            }),
            providesTags: ["TRANSACTION"],
        }),
    })
});

export const { useGetAllTransactionsQuery } = transactionApi;