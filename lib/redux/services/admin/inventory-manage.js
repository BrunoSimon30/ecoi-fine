import { adminApi } from "./index.api";

export const inventoryManagementApi = adminApi.injectEndpoints({
  endpoints: (builder) => ({
    getInventoryList: builder.query({
      query: ({ page, limit }) => ({
        url: `/admin/inventory/list?page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["inventory_Manage"],
    }),
    deleteInventoryItem: builder.mutation({
      query: (id) => ({
        url: `/admin/inventory/destroy/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["inventory_Manage"], // refresh list after delete
    }),
    updateInventoryItem: builder.mutation({
      query: ({ id, data }) => ({
        url: `/admin/inventory/update/${id}`, // ID passed in the URL
        method: "PUT", // Use PUT to update the resource
        body: data, // Send the product data in the body
      }),
      invalidatesTags: ["inventory_Manage"], // Refresh list after update
    }),
    // Add new product to inventory
    addInventoryItem: builder.mutation({
      query: (data) => ({
        url: "/admin/inventory/add", // Endpoint for adding a product
        method: "POST", // Use POST to add a new product
        body: data, // Send the product data in the body
      }),
      invalidatesTags: ["inventory_Manage"], // Refresh list after adding
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetInventoryListQuery,
  useDeleteInventoryItemMutation,
  useUpdateInventoryItemMutation,
  useAddInventoryItemMutation, // Export the mutation hook
} = inventoryManagementApi;
