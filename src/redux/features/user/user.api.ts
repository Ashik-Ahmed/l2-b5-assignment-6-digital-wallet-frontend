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
        })
    })
})

export const { useUpdateUserProfileMutation } = userApi;