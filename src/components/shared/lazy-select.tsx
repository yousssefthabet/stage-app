import { FixedSizeList as List } from "react-window";
import { useState, useEffect, useRef } from "react";

interface SelectItem {
  id: string;
  [key: string]: string | number | boolean | undefined;
}

interface SelectDataProps {
  data: SelectItem[];
  onChange?: (value: string) => void;
  placeholder?: string;
  track?: string;
  defaultValue?: string;
  className?: string;
  disabled?: boolean;
}

function SelectData({
  data,
  onChange,
  placeholder = "Choisir une option",
  track = "name",
  defaultValue,
  className,
  disabled,
}: SelectDataProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<{
    value: string;
    id: string;
  } | null>(() => {
    if (defaultValue) {
      const defaultItem = data.find((item) => item.id === defaultValue);
      return defaultItem
        ? {
            value: String(defaultItem[track] ?? ""),
            id: defaultItem.id,
          }
        : null;
    }
    return null;
  });
  useEffect(() => {
    if (defaultValue) {
      const defaultItem = data.find((item) => item.id === defaultValue);
      setSelectedItem(
        defaultItem
          ? {
              value: String(defaultItem[track] ?? ""),
              id: defaultItem.id,
            }
          : null,
      );
    }
  }, [defaultValue, data, track]);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSelect = (item: SelectItem) => {
    const value = String(item[track] ?? "");
    const id = item.id;

    setSelectedItem({ value, id });
    setIsOpen(false);
    onChange?.(id);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={`relative w-full ${className}`} ref={containerRef}>
      <div
        onClick={() => !disabled && setIsOpen(!isOpen)}
        onKeyDown={(e) => {
          if (!disabled && (e.key === "Enter" || e.key === " ")) {
            e.preventDefault();
            setIsOpen(!isOpen);
          } else if (e.key === "Escape" && isOpen) {
            setIsOpen(false);
          }
        }}
        tabIndex={disabled ? -1 : 0}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-disabled={disabled}
        className={`border-input bg-background ring-offset-background placeholder:text-muted-foreground focus:ring-ring flex h-10 w-full items-center justify-between rounded-md border px-3 py-2 text-sm focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${
          disabled ? "cursor-not-allowed opacity-50" : ""
        }`}
      >
        <span className="flex items-center gap-2 truncate">
          {selectedItem ? selectedItem.value : placeholder}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`h-4 w-4 opacity-50 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>

      {isOpen && (
        <div className="bg-background text-popover-foreground animate-in fade-in-0 zoom-in-95 absolute z-50 w-full min-w-[8rem] overflow-hidden rounded-md border shadow-md">
          <List
            height={200}
            itemCount={data.length}
            itemSize={36}
            width="100%"
            className="p-1"
          >
            {({
              index,
              style,
            }: {
              index: number;
              style: React.CSSProperties;
            }) => {
              const item = data[index];
              const isSelected = selectedItem?.id === item?.id;

              return (
                <div
                  style={style}
                  className={`relative flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm transition-colors outline-none select-none ${
                    isSelected
                      ? "bg-accent text-accent-foreground"
                      : "text-foreground hover:bg-accent/50 hover:text-accent-foreground"
                  }`}
                  onClick={() => item && handleSelect(item)}
                >
                  <span className="flex-1">
                    {item && track in item ? String(item[track] ?? "") : ""}
                  </span>
                  {isSelected && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="ml-2 h-4 w-4"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </div>
              );
            }}
          </List>
        </div>
      )}
    </div>
  );
}

export default SelectData;
