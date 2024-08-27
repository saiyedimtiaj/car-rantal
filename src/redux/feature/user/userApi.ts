import { baseApi } from "@/redux/api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => ({
        url: "/auth",
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    updateUserRole: builder.mutation({
      query: (data) => ({
        url: `/auth/role/${data?.id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
    getUser: builder.query({
      query: () => ({
        url: "/auth/current-user",
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    updateUserProfile: builder.mutation({
      query: (data) => ({
        url: `/auth/update-profile`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useUpdateUserRoleMutation,
  useGetUserQuery,
  useUpdateUserProfileMutation,
} = userApi;
