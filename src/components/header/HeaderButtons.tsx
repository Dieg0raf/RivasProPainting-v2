import { navItems, scrollToSection } from "./utils";
import ServicesButtons from "../home/services/ServicesButtons";
import Link from "next/link";

// Base class for the buttons
const baseDesktopClasses =
  "relative text-gray-200 hover:text-white block px-3 py-2 rounded-md text-base font-medium after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-white after:transition-all after:duration-300 after:w-0 focus:after:w-full hover:after:w-full";

const baseMobileClasses =
  "relative text-gray-200 hover:text-white block w-full px-3 py-2 rounded-md text-left text-base font-medium after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-white after:transition-all after:duration-300 after:w-0 hover:after:w-full hover:bg-white/10 focus:bg-white/10 transition-colors";

export function HeaderMobileButtons({
  toggleMenu,
}: {
  toggleMenu: () => void;
}) {
  return (
    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
      {navItems.map((item) => {
        if (item.id === "my-quote") {
          return (
            <ServicesButtons
              key={item.id}
              quote={{ justQuote: true }}
              className="w-full flex items-start"
            />
          );
        }

        return item.homePage ? (
          <button
            key={item.id}
            onClick={() => {
              scrollToSection(item.id);
              toggleMenu();
            }}
            aria-label={item.ariaLabel}
            className={baseMobileClasses}
          >
            {item.label}
          </button>
        ) : (
          <Link
            key={item.id}
            onClick={() => {
              scrollToSection(item.id);
              toggleMenu();
            }}
            href={item.id === "home" ? "/" : `/${item.id}`}
            aria-label={item.ariaLabel}
            className={`${baseMobileClasses} text-gray-200 hover:text-white`}
          >
            {item.label}
          </Link>
        );
      })}
    </div>
  );
}

export function HeaderDesktopButtons() {
  return (
    <div className="flex items-center space-x-8">
      {/* Check if button or link takes user to a section on the home page or to another page */}
      {navItems.map((item) => {
        // Check if the button is the "Get a Quote" button (same one used across the site)
        if (item.id === "my-quote") {
          return <ServicesButtons key={item.id} quote={{ justQuote: true }} />;
        }
        return item.homePage ? (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            aria-label={item.ariaLabel}
            className={baseDesktopClasses}
          >
            {item.label}
          </button>
        ) : (
          <Link
            key={item.id}
            href={item.id === "home" ? "/" : `/${item.id}`}
            aria-label={item.ariaLabel}
            className={
              item.id === "my-quote"
                ? `bg-primary-red relative text-gray-200 hover:text-white block px-3 py-2 rounded-md text-base font-medium `
                : baseDesktopClasses
            }
          >
            {item.label}
          </Link>
        );
      })}
    </div>
  );
}
