# React
## JSX/TSX
Everything is on place. HTML and Javascript. In my case, it'S Typescript. So JSX/TSX allows to use Javascript in HTML syntax.
```
const user = "Paul";
return(
    ...
    <h1>{"Hello " + user}</h1> // View: Hello Paul
    <button onClick={() => handleLogout()}>Log out</button>
    ...
);
```

## Nested Components and Props
React uses functions to create components. This means that the entire application is organised in a tree-like hierarchy. 
```
export default function RootLayout({children}: Readonly<{children:ReactReactNode;}>) {
    return (<html lang="en">
    ...
    <body>{children}</body>
    </html>)
}
```
All children are React components that are stored in a folder in the page.tsx. 
```
app:
    - issueboard
        - page.tsx
    - login
        - page.tsx
```
The folder describes the route, while page.tsx contains the function. Using props enables information to be sent to the child component. Therefore, a component itself can also be a prop stored in children.
```
// in issueboard/page.tsx
export default function Issueboard() {
    return (
        <Droppable id="1">
            <Draggable/>
        </Droppable>
    )
}
// in issueboard/Droppable.tsx
function Droppable (props: {children: React.ReactNode;
  id: string;}) {
    return (
        <div key={props.id}>{props.children}</div>
    )
  }
```

## Conditional Rendering
You can also use js to render HTML based on some certain conditions.
```
<div>
{ isLoading ? 
    <p>Loading ...</p> // isLoading === true view: Loading ...
    : <p>Hello User</p> // isLoading === false view: Hello User
}
</div>
```
or
```
if (isLoading) {
    return (<Skeleton/>);
}
return (<Component/>);
```
## High order component HOC
A high order component is a React concept similar to high order functions in JavaScript. It is a component within a component that provides additional features for child components. I used this for a user authentication check. Every protected route.ts therefore has this high-order component to check whether the child can be rendered when the user has access to the content.
```
// lib/checkAuth.tsx
export default function checkAuth<P extends object>(
  Component: ComponentType<P>,
) {
  return function ProtectedComponent(props: P) {...}
}
// app/issueboard/page.tsx
function IssueBoard() {...}
export default checkAuth(IssueBoard);
```

## useState hook
``` 
const [value,setValue] = useState("initialValue");

...

<p>value</p>
<Button label="set value" onClick={() => setValue("newValue")}/>
```
I used the useState hook to create local states within the components. For example, to indicate whether the sidebar is open or to detect a mobile screen size. However, I also used them to store the state of input fields locally and view changes to them immediately, even though the server side is already operating. Normally, after a server failure, the components should render the old value again. However, this is not currently implemented, and a character is also accepted as a story point. 

## useEffect hook
useEffect is used to rerender the component when the value changes, and to perform additional actions that you can define within the useEffect function. I used it in combination with useGetQuery from RTK Query to trigger a rerender when the query changes and set a value.
```
useEffect(() => {
if (value) {
// do something, maybe something with value
}
},[value])
```

## useRef hook
The useRef hook allows you to store a variable that can be modified without triggering a re-render. This means that you can manipulate a DOM element directly.
```
// explorer/issueEdit/page.tsx
const textAreaRef = useRef<HTMLTextAreaElement>(null);
function insertInTextarea(...) {
    const textarea = textAreaRef.current;
    textarea.value = newTextarea;
}
return (... <textarea value={markdown} ref={textAreaRef} ... /> ... ); // textarea is the referenced DOM element
```
## custom hook
You can create your own hooks to wrap logic and use them in different components. 
```
export default function useMobile() {
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 600px)');

    const update = () => {
      setMobile(mediaQuery.matches);
    };

    update();

    mediaQuery.addEventListener('change', update);

    return () => {
      mediaQuery.removeEventListener('change', update);
    };
  }, []);

  return mobile;
}

```