import { logInUser, logOutUser } from "@/redux/feature/auth/authSlice";
import {
  BaseQueryApi,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store"; // Import your action to update the token in the store

const baseQuery = fetchBaseQuery({
  baseUrl: "https://assingment-3-eight.vercel.app/api",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("authorization", `${token}`);
    }

    return headers;
  },
});

const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  FetchBaseQueryError
> = async (args, api, extraOptions): Promise<any> => {
  let result = await baseQuery(args, api, extraOptions);
  console.log(result?.error?.status);
  if (result?.error?.status === 401 || result?.error?.status === 500) {
    console.log("send refresh");
    const refreshResult = await fetch(
      "https://assingment-3-eight.vercel.app/api/auth/refresh-token",
      {
        method: "POST",
        credentials: "include",
      }
    );

    const data = await refreshResult.json();
    if (data?.data) {
      const user = (api.getState() as RootState).auth.user;
      api.dispatch(
        logInUser({
          user: user,
          token: data?.data,
        })
      );
    } else {
      api.dispatch(logOutUser());
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  tagTypes: ["user", "booking", "car"],
  baseQuery: baseQueryWithRefreshToken,
  endpoints: () => ({}),
});

export const {} = baseApi;
