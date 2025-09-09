"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import MessagesButton from "./MessagesButton";
import FormLinkButton from "./FormLinkButton";
import ModulesButton from "./ModulesButton";
import NotificationButton from "./NotificationButton";
import EmailsButton from "./EmailsButton";
import SettingsButton from "./SettingsButton";
import UserButton from "./UserButton";
import SearchBox from "./SearchBox";
import { FaBars } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import FullScreenToggle from "./FullScreenToggle";
import { Button } from "../../ui/button";
import Image from "next/image";

function Navbar() {
  const pathname = usePathname(); // Get current path

  const [ActivePath, setActivePath] = useState("accueil");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setActivePath(pathname);
  }, [pathname]);

  const links = [
    {
      title: "Accueil",
      path: "/accueil",
    },
    {
      title: "Projets",
      path: "/projet-rapide",
    },
    {
      title: "Prescripteurs",
      path: "/agent/prescripteurs",
    },
    {
      title: "Courtiers",
      path: "/agent/courtiers",
    },
  ];

  return (
    <nav className="bg-primary border-b-secondary fixed top-0 left-0 flex h-[8vh] min-h-[60px] w-full items-center justify-between border-b-2 pr-2 text-white">
      <div className="flex h-full w-[50vw] items-center justify-end rounded-tr-full bg-white pr-10 md:w-[18vw]">
        <Image
          src="/logo2lCourtage.png"
          className="w-25"
          alt="Logo"
          width={200}
          height={200}
        />
      </div>
      <div className="flex items-center gap-2 md:hidden">
        {/* <ThemeToggle /> */}

        {isOpen ? (
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            className="bg-primary-dark hover:bg-primary-dark hover:text-secondary-clr h-10 w-10 cursor-pointer rounded-full border-0"
          >
            <FaXmark className="text-2xl md:hidden" />
          </Button>
        ) : (
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            className="bg-primary-dark hover:bg-primary-dark hover:text-secondary-clr h-10 w-10 cursor-pointer rounded-full border-0"
          >
            <FaBars className="text-2xl md:hidden" />
          </Button>
        )}
      </div>

      <div className="hidden h-full items-center justify-center gap-1 md:flex">
        {links.map((link, index) => (
          <Link
            key={index}
            href={link.path}
            className={`flex h-5/6 w-25 items-center justify-center rounded-lg px-4 text-xs font-bold transition-all duration-300 ease-in-out ${
              ActivePath == link.path
                ? "bg-secondary-clr"
                : "bg-primary-dark hover:bg-secondary-clr"
            }`}
          >
            {link.title}
          </Link>
        ))}
      </div>
      <div className="hidden items-center gap-1 pb-1 md:flex">
        <div className="mr-3">
          <SearchBox />
        </div>
        <MessagesButton MessagesNumber={5} />
        <FormLinkButton />
        <ModulesButton />
        <NotificationButton NotificationsNumber={20} />
        <EmailsButton EmailsNumber={23} />
        <SettingsButton />
        <UserButton />
        <FullScreenToggle />
        {/* <ThemeToggle /> */}
      </div>

      {isOpen && (
        <div className="absolute top-[8vh] right-0 z-10 w-full">
          <div className="flex w-full flex-col items-center bg-white shadow-md">
            {links.map((link, index) => (
              <Link
                key={index}
                href={link.path}
                className={`mb-1 flex w-full border-b-2 border-gray-200 px-4 py-3 text-left text-sm font-bold ${
                  ActivePath == link.path
                    ? "text-secondary-clr"
                    : "text-gray-400"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.title}
              </Link>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 bg-white px-4 py-3 shadow-md">
            <MessagesButton
              MessagesNumber={5}
              onClick={() => setIsOpen(false)}
            />
            <FormLinkButton />
            <ModulesButton />
            <NotificationButton NotificationsNumber={20} />
            <EmailsButton EmailsNumber={23} onClick={() => setIsOpen(false)} />
            <SettingsButton />
            <UserButton />
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
