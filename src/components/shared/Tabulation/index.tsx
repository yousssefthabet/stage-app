"use client";

import type React from "react";

import { useState } from "react";
import { cn } from "../../lib/utils";
import { type Tab, type TabulationComponentProps } from "./types";
import "./tabulation-style.css";
import DesktopTabOverflow from "./desktop-tab-overflow";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { toast } from "sonner";

/**
 * TabulationComponent
 *
 * A reusable tab component built using the `Button` component from shadcn/ui.
 * It renders a horizontal tab navigation interface where each tab can display a title,
 * optional count badge, and associated content.
 *
 * ## Props
 * @param {Array<{ id: string; title: string; content?: React.ReactNode; count?: number }>} tabs
 *   An array of tab objects, each with:
 *   - `id`: Unique identifier for the tab.
 *   - `title`: Label displayed on the tab button.
 *   - `content`: (Optional) JSX content to be shown when the tab is active.
 *   - `count`: (Optional) A number badge displayed next to the tab title.
 *
 * @param {string} [defaultActiveTab]
 *   ID of the tab to be active by default. If not provided, the first tab will be selected.
 *
 * @param {string} [className]
 *   Optional additional Tailwind classes for the container.
 *
 * @param {(tabId: string) => void} [onTabChange]
 *   Optional callback function triggered whenever the active tab changes.
 *
 * ## Features
 * - Responsive horizontal tab layout with wrapping support
 * - Tab switching with visual active state
 * - Badge support for tab counts
 * - Fully controlled via props with a callback on tab change
 *
 * ## Example Usage:
 * ```tsx
 * <TabulationComponent
 *   tabs={[
 *     { id: "overview", title: "Overview", content: <OverviewContent /> },
 *     { id: "details", title: "Details", content: <DetailsContent />, count: 3 },
 *   ]}
 *   defaultActiveTab="overview"
 *   onTabChange={(id) => console.log("Active tab changed to:", id)}
 * />
 * ```
 */
export default function TabulationComponent({
  tabs,
  defaultActiveTab,
  className,
  onTabChange,
}: TabulationComponentProps) {
  const [activeTab, setActiveTab] = useState<string>(
    defaultActiveTab ?? tabs[0]?.id ?? "",
  );

  const getTabColor = (isActive: boolean) => {
    return isActive
      ? "bg-secondary-clr text-white hover:bg-secondary-clr"
      : "bg-primary text-white hover:bg-primary/80";
  };

  const handleTabChange = (tabId: string) => {
    const tab = tabs.find((t) => t.id === tabId);
    if (tab?.disabled) {
      handleShowToast(tab);
      return;
    }

    setActiveTab(tabId);
    onTabChange?.(tabId); // Call the prop if it exists
  };

  const handleShowToast = (tab: Tab) => {
    if (tab.disabled) {
      toast.info(
        "Cette fonctionnalité n'est pas disponible pour les nouveaux co-emprunteurs. vous devez d'abord remplir Identité du co-emprunteur.",
        {
          duration: 5000,
          position: "top-right",
        },
      );
    }
  };

  return (
    <div className={cn("w-full", className)}>
      <div className="mb-2 flex md:hidden">
        <Select value={activeTab} onValueChange={handleTabChange} required>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Sélectionnez ..." />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {tabs.map((tab) => (
                <SelectItem
                  key={tab.id}
                  value={tab.id}
                  disabled={tab.disabled}
                  onClick={() => handleShowToast(tab)}
                >
                  {tab.title}
                  {tab.count !== undefined && ` (${tab.count})`}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <DesktopTabOverflow
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        getTabColor={getTabColor}
      />

      <div className="h-auto rounded-md border p-4">
        {tabs.find((tab) => tab.id === activeTab)?.content ?? (
          <div className="flex p-4 text-xl font-medium text-gray-700">
            {tabs.find((tab) => tab.id === activeTab)?.title}
          </div>
        )}
      </div>
    </div>
  );
}
