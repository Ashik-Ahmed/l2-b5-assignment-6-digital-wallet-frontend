import { baseApi } from "@/redux/baseApi";

const adminApi = await baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllTransactionsByAdmin: builder.query({
            query: (filterData) => ({
                url: `/admin/transactions`,
                method: "GET",
                params: filterData
            }),
            providesTags: ["ALL_TRANSACTION"],
        }),
        getAllUsersByAdmin: builder.query({
            query: (filterData) => ({
                url: `/admin/users`,
                method: "GET",
                params: filterData
            }),
            providesTags: ["ALL_USER"],
        }),
        getAllAgentsByAdmin: builder.query({
            query: (filterData) => ({
                url: `/admin/agents`,
                method: "GET",
                params: filterData
            }),
            providesTags: ["ALL_AGENT"],
        }),
    }),
})

export const { useGetAllTransactionsByAdminQuery, useGetAllUsersByAdminQuery, useGetAllAgentsByAdminQuery } = adminApi