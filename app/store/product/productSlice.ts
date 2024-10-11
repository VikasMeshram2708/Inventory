import { createProductSchema } from "@/app/models/ProductSchema";
import {
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";

export const productSlice = createApi({
  reducerPath: "Product",
  tagTypes: ["Product"],
  baseQuery: fetchBaseQuery({ baseUrl: "/api/p" }),
  endpoints: (builder) => ({
    addNewProduct: builder.mutation({
      query: (value: createProductSchema) => ({
        url: "/add",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: value,
      }),
      transformResponse: (response: { message: string }) => {
        return response;
      },
      transformErrorResponse: ({ data }: FetchBaseQueryError) => {
        return (
          (data as { message?: string })?.message ||
          "An unexpected error occurred."
        );
      },
    }),
  }),
});

export const { useAddNewProductMutation } = productSlice;
