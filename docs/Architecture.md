# Architecture:
- Client Layer: Next.js with a nested React components hierarchy and state management.
- API client layer: Redux React Toolkit (RTK) query: HTTP request and response, client-side caching, loading/error state, side effects via tag-based cache invalidation and automated refetching.
- API layer: Next.js route handlers: RESTful endpoints, HTTP method and request handling, HTTP status codes
- Data access layer: Prisma client, mutations, queries and type-safe database access.
- Database: PostgreSQL database: tables, relations and indexes.

## Client layer 
Next.js is a framework that uses the nested component system described [here](/docs/React.md).It also provides a routing system. In the /app folder, there are files that define a global layout in `layout.tsx`, a file that handles 404 errors in `not-found.tsx`, and a file for the home page in `page.tsx`. All other pages are defined in the folder-file system.
```
- login
  - page.tsx
```
The page.tsx file is a route that can be used with Next.js navigation to create links between pages.
```
// app/MainHeader.tsx
const router = useRouter();
...
<Button onClick={() => router.push("/login")} .../>
```

### State Management
Local state vs. Redux state vs. database state. The database always contains the true state of the app's data. Therefore, neither the Redux state nor the local state is a copy of the database data. The local state of components using the React hook 'useState' just contains states that are used locally, such as input states or component-specific states, e.g. whether the sidebar is open. The Redux state is used for saving the explorer content, for example. This means that if a user opens a specific project or feature path and returns to the explorer later, the path and content will still be open. 

```
const [value, setValue] = useState("initialValue"); // local saved state
const {data, isloading, error} = useGetIssuesQuery(); // get data via API from server-side and database
const valueSelector = useSelector(getValue); // get data from redux store
```

### Redux
Redux is a library for managing global state on the client side, allowing information to be stored and retrieved. In layout.tsx, a provider provides the Redux store to child components:
```
<Provider store={store}>{children}</Provider>
```
Some slices define and hold the state of the store. In my case, there is only one slice, called 'worldSlice'. This defines the initial state, i.e. the state at initial render, and the reducers that set the state.
```
// lib/store.tsx
const worldSlice = createSlice({
  name: "wolrdData",
  initialState: exampleStore,
  reducers: {...}
});

export const store = configureStore({
  reducer: {
    worldSlice: worldSlice.reducer,
    [api.reducerPath]: api.reducer},
   // ... middleware ... for rtk query
});
```
You can retrieve some state from the store via the Redux selector. The Redux store exports this state, or an explicit state, as a slice.
```
// child component 
const explorerContentSelector = useSelector(explorerContent);

// store.tsx
export const explorerContent = (state: RootState) =>
  state.worldSlice.explorerContent;
```
You can retrieve the state of a store slice using the useDispatch function.
```
// child component
const user = {...};
const dispatch = useDispatch();
function handleLogin() {
    dispatch(setUser(user));
}
```
In the store.tsx file, I defined the setUser function, which uses the payload user to change the state.
```
// lib/store.tsx
... createSlice({
    ...
    reducers: {
        setUser: (state, action: PayloadAction<User>) {
            state.user = action.payload;
        }
    }
})
```
## API client layer
### RTK Query
RTK Query, an add-on included in Redux Toolkit, is used for fetching and caching data. It allows developers to define client-side API endpoints and automatically manages the caching of the retrieved data. I used the createApi function to define the API configuration, including the baseQuery and the individual endpoints.
```
// api/apiService.ts
export const apiService = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
  }),
  ...
});
```
I defined all the injected endpoints in just one file. This is not the best approach for large projects, but it is useful for this small example project to have everything in one place. The queries define API GET requests, for example using the endpoint `users/user`.
```
// api/api.ts
export const api = apiService.injectEndpoints({
  endpoints: (builder) => ({
      getUser: builder.query<User, void>({
      query: () => `users/user`,
      providesTags: () => ["User"],
    }),
  })})
  ```
The useGetUserQuery function provides access to the response via a hook in the components.
```
const { data: currentUser } = useGetUserQuery();
```

Mutations in RTK Query are used to perform operations that modify data on the server. They allow developers to define API requests with different HTTP methods, such as POST, PUT, or PATCH, and include a request body if required. The query arguments are used to construct the request URL and body.

The invalidatesTags property is used to invalidate cached data associated with the User tag. As a result, active queries that provide this tag, such as getUser, are automatically refetched after the createSession mutation succeeds.
  ```
  // api/api.ts
    createSession: builder.mutation({
      query: ({ username, ...patch }) => ({
        url: `session/user/${encodeURIComponent(username)}`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: () => ["User"],
    }),
```
The login component uses the 'useCreateSessionQuery' hook to set data and retrieve the status of requests.
```
// app/login/page.tsx
const [createSession, { isLoading }] = useCreateSessionMutation();
  async function handleLogin() {
    try {
      await createSession({ username: username, password: password }).unwrap();
    } ...
  }
```


## API layer
### Next.js api routes
Next.js allows you to create API routes to handle HTTP requests simply by creating a folder in the file system.
```
- api
  - users
    - route.ts
```
The HTTP request is handled as GET, PATCH or DELETE in route.ts.
```
export async function GET() {...}
```
This can also be used to generate dynamic API routes and send parameters alongside them.
```
- api
  - issues
    - issue
      - [id]
        - route.ts
```
```
// api/issues/issue/[id]/route.ts
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {...}
```
### Savety and validation
To protect against CSRF, I use origin validation in the API layer on every request using `validateOrigin.ts`. This checks whether the origin of the request is the same as the one defined in an environment variable. If not, the origin is unauthorized.
```
if (!APP_ORIGIN || APP_ORIGIN !== origin) {
  return NextResponse.json(
    {message: "Unauthorized origin"},
    {status: 403})
} return null;
```
This function is used at the start of the HTTP request handler.
```
const originError = validateOrigin(request);
if (originError) {
    return originError;
}
```
### User validation
For user validation with every HTTP request handler, I used the session ID stored in the cookies after logging in. The `getSessionCookies()` function retrieves the session ID from the cookies on the server side with Next.js.

## Data access layer
### Prisma
Prisma is a type-safe database access tool (in my case, Postgres). I used it to define a data model and create a schema in `/prisma/schema.prisma`. Each table is defined in a model containing columns with their data type and attributes such as ID, uniqueness, relationships and defaults.
```
// prisma/schema.prisma
model Issue {
  id          Int      @id @default(autoincrement())
  name        String   @unique
  storypoints Int
  markdown    String

  stateId Int?
  state   State? @relation(fields: [stateId], references: [id])
...
}
model State {
  id     Int     @id @default(autoincrement())
  name   String  @unique

  issues Issue[]
}
```
The Prisma ORM enables access to the database without the need to use SQL directly. This makes the results of CRUD operations (create, read, update and delete) type safe. For reading, the functions `findMany()`, `findFirst()` and `findUnique()` are available.
```
// api\session\user\[username]\route.ts
user = await prisma.user.findUnique({
  where: { email: username },
  select: {
    id: true,
    name: true,
    password: true,
  },
});
```
For create there is `create()`, `createManyAndReturn()` or `createMany()`
```
// api\session\user\[username]\route.ts
const session = await prisma.session.create({
  data: {
    id: crypto.randomUUID(),
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
    userId: user?.id,
  },
});
```
For update there is `update()`, `updateMany()` or `updateManyAndReturn()`
```
// api/issues/issue/[id]/route.ts
const issue = await prisma.issue.update({
  where: { id: Number(id) },
  data: {...}
})
```
For delete there is `delete()` or `deleteMany()`
```
// api/session/auth/route.ts
await prisma.session.deleteMany({
  where: { id: sessionId },
});
```
## Database
I used a Postgres database which is defined in `prisma/schema.prisma`. To set up a Prisma client to access with it the database I used:
```
generator client {
  provider = "prisma-client"
  output   = "../generated/prisma"
}
```
The use of PostgreSQL is defined as follows:
```
datasource db {
  provider = "postgresql"
}
```
I defined the related tables:
- User: to define all users 
- Session: to allow user auth
- Project: parent of feature and issues
- Feature: parent of other features or issues, child of project
- Issue: child of feature or projects
- Tag: can be related to different issues
- State: issues have a state 