import { baseApi } from "@/redux/baseApi";

const agentApi = await baseApi.injectEndpoints({
    endpoints: (builder) => ({
        cashIn: builder.mutation({
            query: (cashInData: { phone: string; amount: number }) => ({
                url: `/agents/cash-in`,
                method: "POST",
                data: cashInData,
            }),
            invalidatesTags: ["WALLET", "TRANSACTION"],
        }),
        cashOutByAgent: builder.mutation({
            query: (cashOutData: { phone: string; amount: number }) => ({
                url: `/agents/cash-out`,
                method: "POST",
                data: cashOutData,
            }),
            invalidatesTags: ["WALLET", "TRANSACTION"],
        }),
    })
});

export const { useCashInMutation, useCashOutByAgentMutation } = agentApi;