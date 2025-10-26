import { baseApi } from "@/redux/baseApi";

const walletApi = await baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getWalletBalance: builder.query({
            query: () => ({
                url: `/wallets/balance`,
                method: "GET",
            }),
            providesTags: ["WALLET"],
        }),
        cashOut: builder.mutation({
            query: (cashOutData: { phone: string; amount: number }) => ({
                url: `/wallets/cash-out`,
                method: "POST",
                data: cashOutData,
            }),
            invalidatesTags: ["WALLET"],
        }),
    }),
});

export const { useGetWalletBalanceQuery, useCashOutMutation } = walletApi;