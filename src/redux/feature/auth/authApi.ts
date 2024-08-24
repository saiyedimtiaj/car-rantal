import { baseApi } from "@/redux/api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (data) => ({
        url: "/auth/signup",
        body: data,
        method: "POST",
      }),
    }),
    loginUser: builder.mutation({
      query: (data) => ({
        url: "/auth/signin",
        body: data,
        method: "POST",
      }),
    }),
  }),
});

export const { useRegisterUserMutation, useLoginUserMutation } = authApi;
