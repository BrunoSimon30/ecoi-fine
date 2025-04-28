// admin.api.js
import { adminApi } from "./index.api";

export const userManagementApi = adminApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserList: builder.query({
      query: ({ page, limit }) => ({
        url: `/admin/user-list?page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["User_Manage"],
    }),

    updateUserStatus: builder.mutation({
      query: ({ userId, approval_status }) => ({
        url: `/admin/user-change-status/${userId}`,
        method: "POST",
        body: { approval_status },
      }),
      invalidatesTags: ["User_Manage"],
    }),

    // ===
  }),
  overrideExisting: false,
});

export const { useGetUserListQuery, useUpdateUserStatusMutation } =
  userManagementApi;
