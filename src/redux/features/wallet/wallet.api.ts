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
    }),
});

export const { useGetWalletBalanceQuery } = walletApi;