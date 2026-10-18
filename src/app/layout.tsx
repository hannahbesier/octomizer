"use client";

import "../styles/globals.css";
import { Provider } from "react-redux";
import { store } from "../store/store";
import MainHeader from "./MainHeader";
import AuthInitializer from "./AuthInitializer";
import Navbar from "./Navbar";
import { Gantari } from "next/font/google";
const gantari = Gantari({
  subsets: ["latin"],
  weight: "300",
});
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Plan, organize, document your development projects. Octomizer is designed for small teams to enable project, feature and issue edit."
          key="desc"
        />
        <title>Octomizer</title>
        <link rel="icon" type="image/svg+xml" href="\icons\ibm-cloud--transit-gateway.svg"/>
      </head>
      <body
        className={`flex flex-col h-dvh bg-background text-foreground ${gantari.className} scrollbar-thumb-primary`}
      >
        <Provider store={store}>
          <AuthInitializer />
          <MainHeader />
          <Navbar />
          <div className="flex flex-1 min-h-0">
            <main className="flex-1 overflow-y-auto">{children}</main>
          </div>
        </Provider>
      </body>
    </html>
  );
}
