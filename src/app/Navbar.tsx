"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const navItem = [
    { name: "Home", href: "/" },
    { name: "Team Board", href: "/issueboard" },
    { name: "My Issues", href: "/myIssues" },
    { name: "Projects", href: "/explorer" },
  ];
  return (
    <nav className="flex pl-8 pr-8 h-10 shadow-md dark:shadow-darkShadow bg-secondary items-center justify-center sm:justify-start">
      {navItem.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          data-path={
            pathname === item.href ||
            (item.href !== "/" && pathname.includes(item.href))
          }
          className="cursor-pointer hover:bg-hover hover:dark:bg-hover p-2 border-transparent border-b-2 data-[path=true]:border-b-2 data-[path=true]:border-primary"
          onClick={() => router.push(item.href)}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
}
