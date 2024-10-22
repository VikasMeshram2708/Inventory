import {
  createProductSchema,
  queryProductSchema,
} from "@/app/models/ProductSchema";
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
    // Fetch All Products
    fetchAll: builder.query<Product[], void>({
      query: () => "/all",
      providesTags: ["Product"],
      transformResponse: (response: { products: Product[] }) =>
        response?.products,
    }),
    // Add New Product
    addNewProduct: builder.mutation({
      query: (value: createProductSchema) => ({
        url: "/add",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: value,
      }),
      invalidatesTags: ["Product"],
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
    // filter products
    filterProducts: builder.mutation<Product[], queryProductSchema>({
      query: (data: queryProductSchema) => ({
        url: "/search",
        method: "POST",
        headers: {
          "Content-Type": "application/json", 
        },
        body: JSON.stringify(data),
      }),

      transformResponse: (response: { products: Product[] }) => {
        return response?.products;
      },

      transformErrorResponse: ({ data }) => {
        return (
          (data as { message: string })?.message || "An unknown error ocurred"
        );
      },
    }),
  }),
});

export const {
  useAddNewProductMutation,
  useFetchAllQuery,
  useFilterProductsMutation,
} = productSlice;
