// admin.api.js
import { adminApi } from "./index.api";

export const trackingManagementApi = adminApi.injectEndpoints({
  endpoints: (builder) => ({
    getTrackingList: builder.query({
      query: ({ type, page, limit }) => {
        const baseUrl = `/admin/transaction/list`;
        const params = new URLSearchParams();
    
        if (type) params.append("type", type);
        params.append("page", page);
        params.append("limit", limit);
    
        return {
          url: `${baseUrl}?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["Tacking_Manage"],
    }),

    

    // ===
  }),
  overrideExisting: false,
});

export const { useGetTrackingListQuery } =
trackingManagementApi;
