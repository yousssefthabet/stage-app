export type Tab = {
  id: string;
  title: string;
  count?: number;
  content?: React.ReactNode;
  disabled?: boolean;
};

export type TabulationComponentProps = {
  tabs: Tab[];
  defaultActiveTab?: string;
  colorScheme?: "primary" | "secondary";
  className?: string;
  onTabChange?: (tabId: string) => void;
};

export type Props = {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  getTabColor: (isActive: boolean) => string;
};
