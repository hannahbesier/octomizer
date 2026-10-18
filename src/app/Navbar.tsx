"use client";
import Button from "@/components/Button";
import { Menu } from "@carbon/icons-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const navItem = [
    { name: "Home", href: "/" },
    { name: "Team Board", href: "/issueboard" },
    { name: "My Issues", href: "/myIssues" },
    { name: "Projects", href: "/explorer" },
  ];
  const page = function () {
    switch (pathname) {
      case "/":
        return ("Home");
      case "/issueboard":
        return ("Team Board");
      case "/myIssues":
        return ("My Issues");
      case "/explorer":
        return ("Projects");
      case "/explorer/issueEdit":
        return ("Issue Edit");
      case "/login":
        return ("Profile");
    }

  };
  return (
    <div>{menuOpen ?
      <div onClick={() => setMenuOpen(false)} className="fixed top-10 left-0 rigth-0 bottom-0 w-200 z-4 bg-[#00000030]">
        <nav onClick={(e) => e.stopPropagation()} className="fixed top-14 left-4 bg-secondary w-2/3 bottom-4 z-5 shadow dark:shadow-darkmode rounded-sm">
          <div className="flex flex-row h-10 pl-2 gap-2 items-center justify-start">
            <Button aria-label="Menu" primary={true} icon={<Menu size="20" className="text-foreground" />} onClick={() => setMenuOpen(false)} />
            <div>Menu</div>
          </div>
          <div className="flex flex-col pt-0 p-2">
            {navItem.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                data-path={
                  pathname === item.href ||
                  (item.href !== "/" && pathname.includes(item.href))
                }
                className="rounded-sm cursor-pointer hover:bg-hover hover:dark:bg-hover p-2 sm:bg-none data-[path=true]:bg-hover"
                onClick={() => { router.push(item.href); setMenuOpen(false); }}
              >
                <div>{item.name}</div>
              </Link>
            ))}</div>
        </nav></div> : <></>}
      <nav className="flex ml-2 mr-2 sm:ml-10 sm:mr-10 rounded-sm pl-2 sm:pl-6 sm:pr-6 h-10 shadow-md dark:shadow-darkShadow bg-secondary justify-start items-center">

        {!menuOpen ? <div className="block sm:hidden flex flex-row gap-1 items-center"><Button aria-label="Menu" primary={true} icon={<Menu size="20" className="text-foreground" />} onClick={() => setMenuOpen(true)} />{page()}</div> : <></>}
        {!menuOpen ? navItem.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            data-path={
              pathname === item.href ||
              (item.href !== "/" && pathname.includes(item.href))
            }
            className="sm:block hidden cursor-pointer hover:bg-hover hover:dark:bg-hover p-2 border-transparent border-b-2 data-[path=true]:border-b-2 data-[path=true]:border-primary"
            onClick={() => router.push(item.href)}
          >
            {item.name}
          </Link>
        )) : <></>}
      </nav></div>
  );
}
