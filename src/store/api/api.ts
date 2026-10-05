import { Project, State, Tag, User } from "../../../generated/prisma/client";
import {
  Board,
  Issue,
  IssueData,
  ProjectData,
  UpdateIssueRequest,
} from "../types";
import { apiService } from "./apiService";

export const api = apiService.injectEndpoints({
  endpoints: (builder) => ({
    getIssues: builder.query<Issue[], number>({
      query: (id: number) => `issues?userId=${id}`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Issue" as const, id })),
              { type: "Issue", id: "LIST" },
            ]
          : [{ type: "Issue", id: "LIST" }],
    }),
    getIssue: builder.query<IssueData, number>({
      query: (id: number) => `issues/issue?issueId=${id}`,
      providesTags: (result, error, id) => [{ type: "Issue", id }],
    }),
    getTags: builder.query<Tag[], void>({
      query: () => "tags",
    }),
    getStates: builder.query<State[], void>({
      query: () => "states",
    }),
    getUsers: builder.query<User[], void>({
      query: () => "users",
    }),
    getUser: builder.query<User, string>({
      query: (id: string) => `users/user?sessionId=${id}`,
      providesTags: () => ["User"],
    }),
    getProjects: builder.query<Project[], void>({
      query: () => "explorer/projects",
    }),
    getProject: builder.query<ProjectData, number>({
      query: (id: number) => `explorer/project?projectId=${id}`,
      providesTags: () => ["Project"],
    }),
    getFeature: builder.query({
      query: (id: number) => `explorer/feature?featureId=${id}`,
    }),
    getBoard: builder.query<Board[], void>({
      query: () => "states/board",
      providesTags: () => ["Board"],
    }),
    getIsAuth: builder.query<boolean, string>({
      query: (sessionId: string) => `session/auth?sessionId=${sessionId}`,
    }),
    updateIssue: builder.mutation<Issue, UpdateIssueRequest>({
      query: ({ id, ...patch }) => ({
        url: `issues/issue/${id}`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Issue", id },
        { type: "Issue", id: "LIST" },
        "Project",
        "Board",
      ],
    }),
    updateSession: builder.mutation({
      query: ({ username, ...patch }) => ({
        url: `session/${encodeURIComponent(username)}`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: () => ["User"],
    }),
    deleteSession: builder.mutation({
      query: ({ sessionId }) => ({
        url: `session/delete/${encodeURIComponent(sessionId)}`,
        method: "DELETE",
      }),
      invalidatesTags: () => ["User"],
    }),
  }),
});

export const {
  useGetIssuesQuery,
  useGetIssueQuery,
  useGetTagsQuery,
  useGetStatesQuery,
  useGetUsersQuery,
  useGetUserQuery,
  useGetFeatureQuery,
  useGetProjectsQuery,
  useGetProjectQuery,
  useGetBoardQuery,
  useGetIsAuthQuery,
  useUpdateIssueMutation,
  useUpdateSessionMutation,
  useDeleteSessionMutation,
} = api;
