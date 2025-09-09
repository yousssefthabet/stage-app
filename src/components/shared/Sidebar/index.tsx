"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft, Menu } from "lucide-react";
import { cn } from "../../lib/utils";
import type { SideBarLinksProps } from "./types";
import { useMediaQuery } from "../../hooks/use-media-query";
import { Button } from "../../ui/button";
import { Sheet, SheetContent } from "../../ui/sheet";

export default function SideBarComponent({
  links,
}: {
  links: Array<SideBarLinksProps & { onClick?: () => void }>;
}) {
  const pathname = usePathname();
  const [activeLink, setActiveLink] = React.useState<string | null>(null);
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  // Initialize active link and expanded state based on current path
  React.useEffect(() => {
    const findActiveLinkFromPath = () => {
      const mainLink = links.find((link) => pathname?.startsWith(link.href));
      if (mainLink) {
        setActiveLink(mainLink.href);
        setIsExpanded(mainLink.isExpanded ?? false);
        return;
      }

      // Check sublinks
      for (const link of links) {
        const subLink = link.subLinks?.find((sub) =>
          pathname?.startsWith(sub.href),
        );
        if (subLink) {
          setActiveLink(link.href);
          setIsExpanded(true);
          return;
        }
      }
    };

    findActiveLinkFromPath();
  }, [pathname, links]);

  const handleLinkClick = (
    link: SideBarLinksProps & { onClick?: () => void },
  ) => {
    // If the link has a custom onClick handler, use it
    if (link.onClick) {
      link.onClick();
      return;
    }

    // Default behavior for links with subLinks
    if (link.subLinks?.length) {
      if (activeLink === link.href) {
        // Toggle expanded state if clicking the same link
        setIsExpanded(!isExpanded);
      } else {
        // Expand when clicking a new link with sublinks
        setActiveLink(link.href);
        setIsExpanded(true);
      }
    } else {
      // Regular link without sublinks
      setActiveLink(link.href);
      setIsExpanded(false);

      // Close mobile menu when clicking a link without sublinks
      if (isMobile) {
        setMobileOpen(false);
      }
    }
  };

  const toggleMobileSidebar = () => {
    setMobileOpen(!mobileOpen);
  };

  // Mobile sidebar
  if (isMobile) {
    return (
      <>
        <Button
          variant="outline"
          size="icon"
          onClick={toggleMobileSidebar}
          className="bg-primary hover:bg-primary/90 fixed right-4 bottom-4 z-50 rounded-full text-white shadow-lg"
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle navigation</span>
        </Button>

        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetContent side="left" className="w-[280px] p-0 sm:w-[350px]">
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between border-b p-4">
                <h2 className="font-semibold">Navigation</h2>
              </div>

              <div className="flex-1 overflow-auto">
                {activeLink &&
                isExpanded &&
                links.find((link) => link.href === activeLink)?.subLinks ? (
                  <div className="p-4">
                    <Button
                      variant="ghost"
                      className="mb-2 flex items-center gap-2"
                      onClick={() => setIsExpanded(false)}
                    >
                      <ChevronLeft className="h-4 w-4" />
                      <span>Back</span>
                    </Button>

                    <h3 className="text-primary mb-3 border-b pb-2 font-medium">
                      {links.find((link) => link.href === activeLink)?.title}
                    </h3>

                    <ul className="space-y-2">
                      {links
                        .find((link) => link.href === activeLink)
                        ?.subLinks?.map((subLink) => (
                          <li key={subLink.title}>
                            <Link
                              href={subLink.href}
                              onClick={() => setMobileOpen(false)}
                              className={cn(
                                "flex items-center gap-3 rounded-md p-3 text-gray-700 transition-colors hover:bg-gray-100",
                                pathname === subLink.href
                                  ? "bg-secondary-clr/10 text-secondary-clr font-medium"
                                  : "",
                                subLink.isDisabled
                                  ? "cursor-not-allowed opacity-60"
                                  : "",
                              )}
                            >
                              {subLink.icon}
                              <span>{subLink.title}</span>
                            </Link>
                          </li>
                        ))}
                    </ul>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-2 p-4">
                    {links.map((link) => (
                      <div key={link.title} className="relative">
                        <Link
                          href={link.subLinks?.length ? "#" : link.href}
                          onClick={(e) => {
                            if (link.subLinks?.length) {
                              e.preventDefault();
                            }
                            handleLinkClick(link);
                          }}
                          className={cn(
                            "flex h-[90px] flex-col items-center justify-center gap-2 rounded-lg p-3 text-center text-white transition-all duration-300 ease-in-out",
                            pathname === link.href ||
                              link.subLinks?.some(
                                (sub) => pathname === sub.href,
                              )
                              ? "bg-secondary-clr hover:bg-secondary-clr"
                              : activeLink === link.href &&
                                  link.subLinks?.length
                                ? "bg-primary/80 hover:bg-primary/80 ring-secondary-clr/50 ring-2"
                                : "bg-primary hover:bg-primary/70",
                            link.isDisabled
                              ? "cursor-not-allowed opacity-60"
                              : "",
                          )}
                        >
                          {link.icon}
                          <span className="text-sm font-medium">
                            {link.title}
                          </span>
                          {link.subLinks?.length && (
                            <div className="bg-secondary-clr absolute top-1/2 -right-1 -translate-y-1/2 transform rounded-full p-1">
                              <ChevronLeft
                                className={cn(
                                  "h-3 w-3 text-white transition-transform duration-300",
                                  "rotate-180",
                                )}
                              />
                            </div>
                          )}
                        </Link>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </>
    );
  }

  // Desktop sidebar
  return (
    <div className="flex h-full">
      <div className="scrollbar-thin scrollbar-thumb-primary scrollbar-track-transparent flex max-h-[calc(100vh-80px)] flex-col gap-2 overflow-y-auto p-2">
        {links.map((link) => (
          <div key={link.title} className="relative">
            <Link
              href={link.subLinks?.length ? "#" : link.href}
              onClick={(e) => {
                if (link.subLinks?.length) {
                  e.preventDefault();
                }
                handleLinkClick(link);
              }}
              className={cn(
                "flex min-h-[100px] max-w-[100px] flex-col items-center justify-center gap-2 rounded-lg p-2 text-center text-white transition-all duration-300 ease-in-out",
                pathname === link.href ||
                  link.subLinks?.some((sub) => pathname === sub.href)
                  ? "bg-secondary-clr hover:bg-secondary-clr"
                  : activeLink === link.href && link.subLinks?.length
                    ? "bg-primary/80 hover:bg-primary/80 ring-secondary-clr/50 ring-2"
                    : "bg-primary hover:bg-primary/70",
                link.isDisabled ? "cursor-not-allowed opacity-60" : "",
                link.subLinks?.length && activeLink === link.href
                  ? "relative"
                  : "",
              )}
            >
              {link.icon}
              <span className="text-sm font-medium">{link.title}</span>
              {link.subLinks?.length && (
                <div className="bg-secondary-clr absolute top-1/2 -right-2 -translate-y-1/2 transform rounded-full p-1">
                  <ChevronLeft
                    className={cn(
                      "h-4 w-4 text-white transition-transform duration-300",
                      activeLink === link.href && isExpanded
                        ? "rotate-180"
                        : "",
                    )}
                  />
                </div>
              )}
            </Link>
          </div>
        ))}
      </div>

      <div
        className={cn(
          "overflow-hidden border-l bg-white transition-all duration-300 ease-in-out",
          isExpanded ? "w-[240px] opacity-100" : "w-0 opacity-0",
        )}
      >
        {isExpanded && activeLink && (
          <div className="h-full bg-gray-50 p-4 shadow-lg">
            <div className="mb-4 border-b pb-2">
              <h3 className="text-primary font-medium">
                {links.find((link) => link.href === activeLink)?.title}
              </h3>
            </div>
            <ul className="space-y-2">
              {links
                .find((link) => link.href === activeLink)
                ?.subLinks?.map((subLink) => (
                  <li key={subLink.title}>
                    <Link
                      href={subLink.href}
                      className={cn(
                        "flex items-center gap-3 rounded-md p-2 text-gray-700 transition-colors hover:bg-gray-100",
                        pathname === subLink.href
                          ? "bg-secondary-clr/10 text-secondary-clr font-medium"
                          : "",
                        subLink.isDisabled
                          ? "cursor-not-allowed opacity-60"
                          : "",
                      )}
                    >
                      {subLink.icon}
                      <span>{subLink.title}</span>
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
