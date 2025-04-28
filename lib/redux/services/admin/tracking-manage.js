// admin.api.js
import { adminApi } from "./index.api";

export const trackingManagementApi = adminApi.injectEndpoints({
  endpoints: (builder) => ({
    getTrackingList: builder.query({
      query: ({ page, limit }) => ({
        url: `/admin/transaction/list?page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["Tacking_Manage"],
    }),

    

    // ===
  }),
  overrideExisting: false,
});

export const { useGetTrackingListQuery } =
trackingManagementApi;
