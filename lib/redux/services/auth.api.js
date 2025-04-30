import { addTokenToRequest } from "@/utils";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    return addTokenToRequest(headers, { getState });
  },
});


export const authApi = createApi({
  reducerPath: "authApi",
  refetchOnFocus: false,
  refetchOnMountOrArgChange: false,
  baseQuery, // <- use the custom baseQuery here
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
    }),
    forgetPassword: builder.mutation({
      query: (body) => ({
        url: "/auth/forget-password",
        method: "POST",
        body,
      }),
    }),
    verifyOtp: builder.mutation({
      query: (body) => ({
        url: "/auth/verify",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useLoginMutation,useForgetPasswordMutation , useVerifyOtpMutation} = authApi;
 