import { baseApi } from "@/redux/baseApi";

export const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        updateUserProfile: builder.mutation({
            query: ({ userId, ...userData }: { userId: string;[key: string]: any }) => ({
                url: `/user/${userId}`,
                method: "PATCH",
                data: userData,
            }),
            invalidatesTags: ["USER"],
        }),
        changePassword: builder.mutation({
            query: ({ userId, ...passwordData }: { userId: string;[key: string]: any }) => ({
                url: `/user/change-password/${userId}`,
                method: "PATCH",
                data: passwordData,
            }),
            invalidatesTags: ["USER"],
        }),
    })
})

export const { useUpdateUserProfileMutation, useChangePasswordMutation } = userApi;