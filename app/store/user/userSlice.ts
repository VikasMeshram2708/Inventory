import { loginSchema, signUpSchema } from "@/app/models/UserSchema";
import {
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";

export const userSlice = createApi({
  reducerPath: "User",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/u" }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    // Sign Up
    createNewUser: builder.mutation({
      query: (value: signUpSchema) => ({
        url: "/signup",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: value,
      }),
      transformResponse: (response: { message: string }) => {
        return response.message || "User Registered Successfully";
      },
      transformErrorResponse: ({ data }: FetchBaseQueryError) => {
        return (data as { message?: string })?.message || "An Error Occured";
      },
    }),

    // Login

    loginUser: builder.mutation({
      query: (value: loginSchema) => ({
        url: "/login",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: value,
      }),
      transformResponse: (response: { message: string }) => {
        return response.message || "User Logged In Successfully";
      },
      transformErrorResponse: ({ data }: FetchBaseQueryError) => {
        return (data as { message?: string })?.message || "An Error Occured";
      },
    }),
  }),
});

export const { useCreateNewUserMutation, useLoginUserMutation } = userSlice;
