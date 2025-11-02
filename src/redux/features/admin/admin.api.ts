/* eslint-disable @typescript-eslint/no-explicit-any */
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
        updateUserByAdmin: builder.mutation({
            query: ({ id, data }: { id: string; data: any }) => ({
                url: `/admin/users/${id}`,
                method: "PATCH",
                data: data,
                headers: {
                    "Content-Type": "application/json",
                },
            }),
            invalidatesTags: ["ALL_USER"],
        }),
        agentApprovalByAdmin: builder.mutation({
            query: ({ id, isApproved }: { id: string; isApproved: boolean }) => ({
                url: `/admin/agents/${id}/approve`,
                method: "PATCH",
                data: { isApproved },
                headers: {
                    "Content-Type": "application/json",
                },
            }),
            invalidatesTags: ["ALL_AGENT"],
        }),
    }),
})

export const { useGetAllTransactionsByAdminQuery, useGetAllUsersByAdminQuery, useGetAllAgentsByAdminQuery, useUpdateUserByAdminMutation, useAgentApprovalByAdminMutation } = adminApi