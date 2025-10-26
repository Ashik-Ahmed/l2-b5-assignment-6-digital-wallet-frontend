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
            invalidatesTags: ["WALLET", "TRANSACTION"],
        }),
        sendMoney: builder.mutation({
            query: (sendMoneyData: { phone: string; amount: number }) => ({
                url: `/wallets/send-money`,
                method: "POST",
                data: sendMoneyData,
            }),
            invalidatesTags: ["WALLET", "TRANSACTION"],
        }),
    }),
});

export const { useGetWalletBalanceQuery, useCashOutMutation, useSendMoneyMutation } = walletApi;