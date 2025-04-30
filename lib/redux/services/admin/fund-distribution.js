import { adminApi } from "./index.api";

export const fundDistributionApi = adminApi.injectEndpoints({
  endpoints: (builder) => ({
    getFundList: builder.query({
      query: ({ page, limit }) => ({
        url: `/admin/funds/list?page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["fund_Distribution"], 
    }),
    addFunds: builder.mutation({
      query: (body) => ({
        url: `/admin/funds/add`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["fund_Distribution"], // So fund list auto-refreshes
    }),

  }), // ✅ This closing brace was missing
  overrideExisting: false,
});

export const { useGetFundListQuery ,useAddFundsMutation } = fundDistributionApi;
