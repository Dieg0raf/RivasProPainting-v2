export const navItems = [
  {
    id: "home",
    homePage: false,
    label: "Home",
    ariaLabel: "Go to Home Page",
  },
  {
    id: "about",
    homePage: false,
    label: "About Us",
    ariaLabel: "Go to About Us Page",
  },
  {
    id: "our-work",
    homePage: false,
    label: "Our Work",
    ariaLabel: "Go to Our Work Page",
  },
  {
    id: "my-reviews",
    homePage: true,
    label: "Reviews",
    ariaLabel: "Go to Reviews Section",
  },
  {
    id: "my-services",
    homePage: true,
    label: "Services",
    ariaLabel: "Go to Services Section",
  },
  {
    id: "my-quote",
    homepage: true,
    label: "Get Your Free Quote",
    ariaLabel: "Open up Free Quote Form",
  },
];

export const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    const headerOffset = 80;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
};
