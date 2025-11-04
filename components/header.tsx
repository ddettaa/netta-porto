"use client";
import React from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import { WordmarkIcon } from "@/components/logo";
import { MenuToggleIcon } from "@/components/menu-toggle-icon";
import { Button, buttonVariants } from "@/components/ui/button";
import { useScroll } from "@/hooks/use-scroll";
import { cn } from "@/lib/utils";

export function Header() {
  const [open, setOpen] = React.useState(false);
  const scrolled = useScroll(10);
  const pathname = usePathname();
  const isContactPage = pathname === "/contact";
  const isProjectsPage = pathname === "/projects";
  const links = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Projects",
      href: "/projects",
    },
    {
      label: "Contact",
      href: "/contact",
    },
  ];

  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn("top-0 z-50 w-full mb-4", {
          scrolled,
      })}
    >
      <nav className="mx-auto flex h-14 w-full items-center justify-between px-6 text-lg relative">
        <div className={cn("absolute bottom-0 left-6 right-6 h-1 rounded-r-full", {
          "bg-border": !isContactPage && !isProjectsPage,
          "bg-white": isContactPage || isProjectsPage,
        })}></div>
        <div className="rounded-md p-2">
          <WordmarkIcon className={cn("h-4", {
            "text-white": isContactPage || isProjectsPage,
          })} />
        </div>
        <div className="hidden items-center gap-2 md:flex">
          {links.map((link, i) => (
            <a
              className={cn(buttonVariants({ variant: "ghost" }), {
                "text-white": isContactPage || isProjectsPage,
              })}
              href={link.href}
              key={i}
            >
              {link.label}
            </a>
          ))}
        </div>
        <Button
          aria-controls="mobile-menu"
          aria-expanded={open}
          aria-label="Toggle menu"
          className={cn("md:hidden bg-transparent hover:bg-transparent", {
            "text-white border-white": isContactPage || isProjectsPage,
            "border-border": !isContactPage && !isProjectsPage,
          })}
          onClick={() => setOpen(!open)}
          size="icon"
          variant="outline"
        >
          <MenuToggleIcon className={cn("size-5", {
            "text-white": isContactPage || isProjectsPage,
          })} duration={300} open={open} />
        </Button>
      </nav>
      <MobileMenu className="flex flex-col justify-between gap-2" open={open}>
        <div className="grid gap-y-2">
          {links.map((link) => (
            <a
              className={cn(buttonVariants({
                variant: "ghost",
                className: "justify-start",
              }), {
                "text-white": isContactPage || isProjectsPage,
              })}
              href={link.href}
              key={link.label}
            >
              {link.label}
            </a>
          ))}
        </div>
      </MobileMenu>
    </header>
  );
}

type MobileMenuProps = React.ComponentProps<"div"> & {
  open: boolean;
};

function MobileMenu({ open, children, className, ...props }: MobileMenuProps) {
  if (!open || typeof window === "undefined") {
    return null;
  }

  return createPortal(
    <div
      className={cn(
        "bg-background/95 backdrop-blur-lg supports-[backdrop-filter]:bg-background/50",
        "fixed top-14 right-0 bottom-0 left-0 z-40 flex flex-col overflow-hidden border-y md:hidden"
      )}
      id="mobile-menu"
    >
      <div
        className={cn(
          "data-[slot=open]:zoom-in-97 ease-out data-[slot=open]:animate-in",
          "size-full p-4",
          className
        )}
        data-slot={open ? "open" : "closed"}
        {...props}
      >
        {children}
      </div>
    </div>,
    document.body
  );
}
