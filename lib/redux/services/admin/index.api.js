import { addTokenToRequest } from "@/utils";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    return addTokenToRequest(headers, { getState });
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  try {
    let result = await baseQuery(args, api, extraOptions);
    if (result?.error?.status === 403) {
      // * Implement logic for restricted access
      return { data: { data: null, error: result.error } };
    } else if (
      result?.error?.status === 401 &&
      result.error.data.message == "Unauthorized"
    ) {
      // * Implement logic for Wrong Auth Token or session get expired from Backend
      // signOut({ callbackUrl: "/", redirect: false });
      toast.error("Login Session Expire");
      return { data: { data: null, error: result.error } };
    } else if (result?.error) {
      return { error: result.error };
    }
    // * Return the response
    return { data: result?.data };
  } catch (error) {
    return { error };
  }
};

export const adminApi = createApi({
  reducerPath: "adminApi",
  refetchOnFocus: false,
  refetchOnMountOrArgChange: false,
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User_Manage","inventory_Manage","Tacking_Manage","fund_Distribution"],
  endpoints: (builder) => ({}),
});

export const {} = adminApi;
