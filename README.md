# README

## The project

This is a web-app for project management that is designed for use by small development teams.

- Fully **responsive** for web and mobile

- **Dark** and **light** mode available

- **User authentication**: (login, logout via sessions saved in the database, use cookies to remember login with session ID)

- Home screen **dashboard**: view personal related current issues, team members and to-do issues (more in in planning)

- Team **issue board**: Drag and drop issues to manage their state

- Projects: explore and select all projects, features, issues in a **tree hierarchy**

- My issues: view and open personal issues

- **Edit issue**: using markdown (xss save), tags, story points, assign to team member

<p>
  <img src="public\img\IssueEditWhite.png" width="65%" />
  <img src="public\img\IssueEditMobile.png" width="15%" />
</p>
<p>
  <img src="public\img\IssueBoardBlack.png" width="65%" />
  <img src="public\img\IssueBoardBlackMobile.png" width="15%" />
</p>

## Getting started

### Use this command to start the app in your terminal:

    npm run dev

Server-side debugging: // https://nextjs.org/docs/app/guides/debugging

    npm run dev -- --inspect

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Use this command to start the app and access it on your local network (for testing on mobile):

    npm run dev -- --host 0.0.0.0

### Start Storybook and view UI styleguide

    npm run storybook

The storybook app will open automatically in your browser. If not:

[http://localhost:6006](http://localhost:6006)

### Start Prisma studio and view database

    npx prisma studio

The prisma studio app will open automatically in your browser. If not:

[http://localhost:51212](http://localhost:51212/)


## The technology

- [React.js](https://react.dev/) - nested component rendering using props - local state management via hooks - conditional rendering - event handling - markup with JSX

- [Next.js]((https://nextjs.org/docs)) - Routing - Route handlers - server side components

- [TypeScript](https://www.typescriptlang.org/) - types for less bugs

- [Redux.js](https://redux.js.org/) + RTK query - state management - data fetching via API service and caching

- [Storybook](https://storybook.js.org/) - UI component testing - styleguide documentation

- [Prisma](https://www.prisma.io/postgres) - PostgreSQL access

- [Tailwind.css](https://tailwindcss.com/) - CSS styling - theming

- [dnd kit](https://dndkit.com/) - drag and drop toolkit

- [js cookies](https://dev.to/codeparrot/react-cookies-a-complete-guide-to-managing-cookies-in-react-applications-3cd3) - Cookie management -> change to next js cookies

- [Carbon Design System Icons](https://v10.carbondesignsystem.com/guidelines/icons/library/) - IMB icon set

## The to-dos

- Add and delete projects, features, issues

- Issue comments via live chat - using websockets

- Pagination

- Global Error handling / Error messages: https://nextjs.org/docs/app/api-reference/file-conventions/error#global-error

- 404 

- Lazy loading check

- Use Streaming: https://nextjs.org/docs/app/guides/streaming

- Next cookies: https://nextjs.org/docs/app/api-reference/functions/cookies

- Feature and project description

- Issue templates

- Admin user, dev user, read user roles

- Add and delete users

- Feature due date / sprints / analyse storypoints

- Issue priority attribute

- Explorer sorting, filtering by name, tags, state, assignedTo, ...

- Handle long names

## Prisma development

after changing prisma/schema.prisma in development do

  `npx prisma migrate dev`

if you already deployed use

  `npx prisma migrate deploy`

automaticly prisma generate happens, but you can do it manual too

  `npx prisma generate`

and restart the next app with 

  `npm run dev`

