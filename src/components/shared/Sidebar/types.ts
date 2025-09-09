export type SideBarLinksProps = {
  icon: React.ReactNode;
  title: string;
  href: string;
  isDisabled?: boolean;
  isExpanded?: boolean;
  isExternal?: boolean;
  isHidden?: boolean;
  isLoading?: boolean;
  hasSubmenu?: boolean;
  subLinks?: SideBarLinksProps[];
};
