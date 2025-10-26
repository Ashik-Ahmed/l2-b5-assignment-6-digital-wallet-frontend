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
    }),
})

export const { useCashInMutation } = agentApi;