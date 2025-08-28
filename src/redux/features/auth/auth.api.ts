
import { baseApi } from "@/redux/baseApi";
import type { IResponse, ISendOtp, IVerifyOtp } from "@/types";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        data: userInfo,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["USER"],
    }),
    userRegister: builder.mutation({
      query: (userInfo) => ({
        url: "/user/register",
        method: "POST",
        data: userInfo,
      }),
    }),
    agentRegister: builder.mutation({
      query: (userInfo) => ({
        url: "/agent/register",
        method: "POST",
        data: userInfo,
      }),
    }),
    sendOtp: builder.mutation<IResponse<null>, ISendOtp>({
      query: (userInfo) => ({
        url: "/otp/send",
        method: "POST",
        data: userInfo,
      }),
    }),
    verifyOtp: builder.mutation<IResponse<null>, IVerifyOtp>({
      query: (userInfo) => ({
        url: "/otp/verify",
        method: "POST",
        data: userInfo,
      }),
    }),
    userInfo: builder.query({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
      providesTags: ["USER"],
    }),
    updateUser: builder.mutation({
      query: ({userInfo, id}) => ({
        url: `/user/update-user/${id}`,
        method: "PATCH",
        data : userInfo,
      }),
    }),
    changePassword: builder.mutation({
      query: (userInfo) => ({
        url: `/auth/change-password`,
        method: "POST",
        data : userInfo,
      }),
    }),
    getAllInfo: builder.query({
      query: () => ({
        url: "/wallet/getInfo",
        method: "GET",
      }),
      providesTags: ["GET_ALL_INFO"],
    }),
    addOrWithDraw: builder.mutation({
      query: (userInfo) => ({
        url: "/wallet/moneyActions",
        method: "POST",
        data : userInfo,
      }),
    }),
    sendMoney: builder.mutation({
      query: ({userInfo, id}) => ({
        url: `/wallet/sendMoney/${id}`,
        method: "POST",
        data : userInfo,
      }),
    }),
    getTransactionHistory : builder.query({
      query : (page) =>({
        url : `/wallet/transactionHistory?page=${page}`,
        method : "GET"
      }),
      providesTags : ["GET_TRANSACTIONS_HISTORY"]
    }),
    getAllInfoByAdmin : builder.query({
      query : ({view, filterBy, sortBy, limit, isVerified, walletStatus, page}) =>({
        url : `/admin/getData?view=${view}&filterBy=${filterBy}&sortBy=${sortBy}t&limit=${limit}&isVerified=${isVerified}&walletStatus=${walletStatus}&page=${page}`,
        method : "GET"
      }),
      providesTags : ["GET_ALL_ADMIN_DATA"]
    }),
    walletStatusChange: builder.mutation({
      query: ({action,id}) => ({
        url: `/admin/walletAction/${action}/${id}`,
        method: "PATCH",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useSendOtpMutation,
  useVerifyOtpMutation,
  useUserInfoQuery,
  useLogoutMutation,
  useUserRegisterMutation,
  useAgentRegisterMutation,
  useGetAllInfoQuery,
  useAddOrWithDrawMutation,
  useGetTransactionHistoryQuery,
  useUpdateUserMutation,
  useChangePasswordMutation,
  useSendMoneyMutation,
  useGetAllInfoByAdminQuery,
  useWalletStatusChangeMutation
} = authApi;
