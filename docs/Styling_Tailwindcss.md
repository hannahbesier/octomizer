# Styling and TailwindCss
## Tailwindcss 
I used Tailwind to bring the CSS closer to the HTML. This can be a bit messy at times, but I like having quick access to CSS and the very short Tailwind CSS styles.
```
<div className="flex flex-row gap-4 h-50 w-full bg-black pl-10 pr-10 text-white"/>
```
This is the same:
```
div {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    height: 12.5rem;
    width: 100%;
    backgroundColor: #000000;
    padding-left: 2.5rem;
    paddingRight: 2.5rem;
    color: #ffffff;
}
```

## Custom UI components 
Design systems like Material Design have their limitations in terms of what you can configure. So I decided to build my own library and document it in Storybook. This gives me full freedom to define props, component structure and CSS.

## Storybook
Even before I used them in my Next.js app, I used this tool to document and test my custom UI components. Using stories allows me to add different sets of props to view the same component in different states.
```
// stories/Button.stories.tsx
export const Primary: Story = {
  args: {
    primary: true,
    size: "medium",
    label: 'Button',
  },
};
```

## Styleguide 
Flat design is boring. So I wanted to try something different. Skeuomorphic design, with its realistic-looking buttons, can be a bit overbearing. I used Neumorphism, which is a balance between the two, as it is realistic but clean and minimalist.

## Darkmode and colors
I used a global.css file to define some CSS variables for dark and light modes. For every color in light mode, there is a corresponding color in dark mode.
```
// styles/global.css
:root {
  --color-background: #f0f0f0;
  --color-foreground: #0a0a0a;
  ...
}
.dark {
  --color-background: #0a0a0a;
  --color-foreground: #ffffff;
  ...
}
@theme {
  --color-background: var(--color-background);
  --color-foreground: var(--color-foreground);
  ...
}
```
So, I can use these variables in Tailwind to apply both the dark and light mode colors simultaneously. In light mode, the background is white and the text color is black. In dark mode, it's the opposite.
```
<div className="bg-background color-foreground ...">Hello world</div>
```

The primary color was chosen to highlight elements on both themes in a similar way. The primaryLight color is only used in contexts where the primary color does not contrast enough with the background, such as text color. The limited color palette makes the app more clean and focused on content rather than colorful UI design.

## Responsive Design
I mainly used the flexbox concept for the responsive design. For this, I used `flex-col` to render items vertically and `flex-row` to render items horizontally.
```
<div className="flex flex-row gap-4 justity-center w-full"> 
    <p>item1</p>
    <p>item2</p>
    <p>item3</p>
</div> 
// View: |       item1  item2  item3       |
```
But every page has its own structure. For example, the home page uses the grid concept like this:
```
<div className="grid grid-cols-2">
    <p>item1</p>
    <p>item2</p>
    <p>item3</p>
</div>
// View: |   item1  item2    |
         |   item3           |
```
To handle different device resolutions, I used the mobile-first approach, which is supported by Tailwind. In this case, the 'sm' breakpoint prefix defines a width of 200 for every resolution over 640px, and 100 for every resolution below 640px.
```
<div className="w-100 sm:w-200"/>
```
I often just used this differentiation of mobile and above 640px. The Explorer and Issue Edit have a sidebar which is closed on mobile and open on desktop. However, the user can still open and close them in both cases. Additionally, I implemented a feature whereby, if the user resizes the browser to a small resolution, the behaviour switches to the mobile version and the sidebar closes. To achieve this, I wrote the useMobile function in /lib, which is a custom hook. This uses the JavaScript window.matchMedia function to detect the media resolution and the addEventListener function to track changes.