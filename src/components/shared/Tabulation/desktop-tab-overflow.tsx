"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../ui/popover";
import { Button } from "../../ui/button";
import { cn } from "../../lib/utils";
import { ChevronUp } from "lucide-react";
import type { Props, Tab } from "./types";

/**
 * DesktopTabOverflow
 *
 * A responsive tab navigation component optimized for desktop view. It automatically
 * handles tab overflow by displaying extra tabs in a dropdown popover when the horizontal
 * space is insufficient. Designed to work in tandem with `TabulationComponent`.
 *
 * ## Props
 * @param {Array<{ id: string; title: string; content?: React.ReactNode; count?: number }>} tabs
 *   An array of tab objects, each with:
 *   - `id`: Unique identifier for the tab.
 *   - `title`: Label displayed on the tab button.
 *   - `content`: (Optional) JSX content to be shown when the tab is active.
 *   - `count`: (Optional) A number badge displayed next to the tab title.
 *
 * @param {string} activeTab
 *   The ID of the currently active tab. Determines the selected tab’s visual state.
 *
 * @param {(tabId: string) => void} onTabChange
 *   Callback function triggered when a tab is selected. Receives the selected tab ID.
 *
 * @param {(isActive: boolean) => string} getTabColor
 *   A function returning Tailwind class names for styling tabs based on active state.
 *
 * ## Features
 * - Automatically detects when tabs overflow and moves extras into a dropdown
 * - Maintains full interactivity and styling for overflowed tabs
 * - Highlights the active tab whether visible or hidden in the overflow
 * - Smooth integration with ShadCN `Button`, `Popover`, and layout utilities
 * - Avoids unnecessary DOM updates for better performance
 *
 * ## Example Usage:
 * ```tsx
 * <DesktopTabOverflow
 *   tabs={[
 *     { id: "overview", title: "Overview" ,content: <OverviewContent />},
 *     { id: "details", title: "Details", count: 2 ,content: <DetailsContent />},
 *   ]}
 *   activeTab={activeTab}
 *   onTabChange={(id) => setActiveTab(id)}
 *   getTabColor={(isActive) => isActive ? "bg-secondary text-white" : "bg-primary text-white/60"}
 * />
 * ```
 */

export default function DesktopTabOverflow({
  tabs,
  activeTab,
  onTabChange,
  getTabColor,
}: Props) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const overflowButtonRef = useRef<HTMLButtonElement | null>(null);

  const [visibleTabs, setVisibleTabs] = useState<Tab[]>(tabs);
  const [overflowTabs, setOverflowTabs] = useState<Tab[]>([]);

  const updateTabs = useCallback(() => {
    if (!containerRef.current) return;

    const containerWidth = containerRef.current.offsetWidth;
    const overflowButtonWidth = overflowButtonRef.current?.offsetWidth ?? 80;

    let usedWidth = 0;
    const visible: Tab[] = [];
    const hidden: Tab[] = [];

    for (const tab of tabs) {
      const el = tabRefs.current[tab.id];
      if (!el) continue;

      const width = el.offsetWidth + 5;

      if (usedWidth + width <= containerWidth - overflowButtonWidth) {
        visible.push(tab);
        usedWidth += width;
      } else {
        hidden.push(tab);
      }
    }

    // Only update state if changed
    setVisibleTabs((prev) =>
      prev.length === visible.length &&
      prev.every((t, i) => t.id === visible[i]?.id)
        ? prev
        : visible,
    );
    setOverflowTabs((prev) =>
      prev.length === hidden.length &&
      prev.every((t, i) => t.id === hidden[i]?.id)
        ? prev
        : hidden,
    );
  }, [tabs, containerRef, overflowButtonRef, tabRefs]);

  // Trigger updateTabs once refs are ready
  useLayoutEffect(() => {
    if (tabs.every((tab) => tabRefs.current[tab.id])) {
      updateTabs();
    }
  }, [updateTabs, tabs]);

  // Handle resize efficiently
  useEffect(() => {
    let prevWidth = containerRef.current?.offsetWidth ?? 0;

    const handleResize = () => {
      const newWidth = containerRef.current?.offsetWidth ?? 0;
      if (Math.abs(newWidth - prevWidth) > 30) {
        prevWidth = newWidth;
        updateTabs();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [updateTabs]);

  const isOverflowTabActive = overflowTabs.some((tab) => tab.id === activeTab);

  return (
    <div
      className="border-secondary-clr hidden gap-1 overflow-hidden border-b-3 md:flex"
      ref={containerRef}
    >
      {/* Visible Tabs */}
      {visibleTabs.map((tab) => (
        <Button
          type="button"
          key={tab.id}
          ref={(el) => {
            tabRefs.current[tab.id] = el;
          }}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            "cursor-pointer snap-start rounded-t-md rounded-b-none px-2 py-2 font-medium transition-colors",
            getTabColor(activeTab === tab.id),
          )}
        >
          <span>{tab.title}</span>
          {tab.count !== undefined && (
            <span className="ml-2 rounded-full bg-white/20 px-2 py-0.5 text-sm">
              {tab.count}
            </span>
          )}
        </Button>
      ))}

      {/* Overflow Button */}
      {overflowTabs.length > 0 && (
        <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              ref={overflowButtonRef}
              className={cn(
                "cursor-pointer snap-start rounded-t-md rounded-b-none px-2 py-2 font-medium transition-colors",
                getTabColor(isOverflowTabActive),
              )}
            >
              <span className="flex items-center gap-1 text-white">
                {isPopoverOpen ? (
                  <>
                    <ChevronUp className="h-4 w-4" />
                  </>
                ) : (
                  <>({overflowTabs.length}) Plus</>
                )}
              </span>
            </Button>
          </PopoverTrigger>

          <PopoverContent
            align="end"
            className="hidden w-auto p-2 md:flex md:flex-col"
          >
            {overflowTabs.map((tab) => (
              <Button
                key={tab.id}
                variant="ghost"
                onClick={() => onTabChange(tab.id)}
                className={cn(
                  "my-1 justify-between rounded-md px-2 py-2 font-medium text-white transition-colors hover:text-white",
                  getTabColor(activeTab === tab.id),
                )}
              >
                {tab.title}
                {tab.count !== undefined && (
                  <span className="ml-2 rounded-full bg-white/20 px-2 py-0.5 text-sm">
                    {tab.count}
                  </span>
                )}
              </Button>
            ))}
          </PopoverContent>
        </Popover>
      )}

      {/* Hidden Tabs for measurement only */}
      <div className="pointer-events-none invisible absolute h-0">
        {tabs.map((tab) => (
          <Button
            key={`measure-${tab.id}`}
            ref={(el) => {
              if (el) tabRefs.current[tab.id] = el;
            }}
            className="px-2 py-2"
          >
            {tab.title}
            {tab.count !== undefined && (
              <span className="ml-2 rounded-full px-2 py-0.5 text-sm">
                {tab.count}
              </span>
            )}
          </Button>
        ))}
      </div>
    </div>
  );
}
