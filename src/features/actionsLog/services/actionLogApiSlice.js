import { apiSlice } from "../../../services/api/apiSlice"

export const actionLogApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getActionLogList: builder.query({
      query: (params) => ({
        url: "/action-log",
        params,
      }),
      providesTags: (result, error, arg) => {
        if (result?.success && result?.actionList) {
          const actionLogList = result.actionList?.data

          return [
            { type: "ActionLogs", id: "LIST" },
            ...actionLogList.map(({ id }) => ({ type: "ActionLogs", id })),
          ]
        } else {
          return [{ type: "ActionLogs", id: "LIST" }]
        }
      },
      transformResponse: (response, meta, arg) => {
        if (response?.success && response?.actionList) {
          return response.actionList
        }
        return []
      },
    }),
    getActionLog: builder.query({
      query: (id) => ({
        url: `/action-log/${id}`,
      }),
      providesTags: (result, error, id) => [{ type: "ActionLogs", id }],
    }),
  }),
})

export const { useGetActionLogListQuery, useGetActionLogQuery } =
  actionLogApiSlice
