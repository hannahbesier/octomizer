# Octomizer

Plan, organize, and document development projects. This is a web app for project management designed specifically for small development teams. You can view and edit tasks and organize them into projects and features.

Currently in development.

Try it here: [https://octomizer.vercel.app](https://octomizer.vercel.app)

View further documentation at [/docs](/docs).

## The project

- Fully **responsive** for desktop and mobile

- **Dark** and **light** mode available

- **User authentication**: (login, logout via sessions saved in the database, use cookies to remember login with session ID)

- Home screen **dashboard**: view personal related current issues, team members and to-do issues (more in planning)

- Team **issue board**: Drag and drop issues to manage their state

- Projects: explore and select all projects, features, issues in a **tree hierarchy**

- My issues: view and open personal issues

- **Edit issue**: using markdown (xss save), tags, story points, assign to team member

<p>
  <img src="public\img\IssueEditWhite.png" width="65%" />
  <img src="public\img\MIssueEditWhite.png" width="15%" />
</p>
<p>
  <img src="public\img\IssueEditBlack.png" width="65%" />
  <img src="public\img\MIssueEditBlack.png" width="15%" />
</p>

## The technology

- [React.js](https://react.dev/) - nested component rendering using props - local state management via hooks - conditional rendering - event handling - markup with JSX

- [Next.js](https://nextjs.org/docs) - Routing - Route handlers - server side components

- [TypeScript](https://www.typescriptlang.org/) - types for less bugs

- [Redux.js](https://redux.js.org/) + RTK query - state management - data fetching via API service and caching

- [Storybook](https://storybook.js.org/) - UI component testing - styleguide documentation

- [Prisma](https://www.prisma.io/postgres) - PostgreSQL access

- [Tailwind.css](https://tailwindcss.com/) - CSS styling - theming

- [dnd kit](https://dndkit.com/) - drag and drop toolkit

- [js cookies](https://dev.to/codeparrot/react-cookies-a-complete-guide-to-managing-cookies-in-react-applications-3cd3) - Cookie management -> change to next js cookies

- [Carbon Design System Icons](https://v10.carbondesignsystem.com/guidelines/icons/library/) - IMB icon set

## Getting started

If you haven't installed Git yet, you can do so [here](https://git-scm.com/install/windows)
. Open a terminal and check with 

    git -v

If you haven't installed node.js version 24 (storybook has currently issues with newer one), install it from [here](https://nodejs.org/en/download)
. Reopen the terminal and check with 

    npm -v 
    node -v

Choose a folder for this project in your terminal.
To clone the repository with HTTPS, use the following command in your terminal:  

    git clone https://github.com/hannahbesier/octomizer.git

Open the project in your terminal.
Install the project dependencies:

    npm install

Create a file called ```.env``` in the project next to README.md and enter ```DATABASE_URL=YOUR_DATABASE_URL_HERE```. To generate prisma files:

    npx prisma generate

You can fill in the database manually in prisma studio:
    
    npx prisma studio

### Use this command to start the app in your terminal:

    npm run dev

Server-side [debugging](https://nextjs.org/docs/app/guides/debugging)

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

## The to-dos

- Add and delete projects, features, issues

- Issue comments via live chat - using websockets

- Pagination

- [Global Error handling / Error messages](https://nextjs.org/docs/app/api-reference/file-conventions/error#global-error)

- Lazy loading check

- [Use Streaming](https://nextjs.org/docs/app/guides/streaming)

- [Next cookies](https://nextjs.org/docs/app/api-reference/functions/cookies)

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

