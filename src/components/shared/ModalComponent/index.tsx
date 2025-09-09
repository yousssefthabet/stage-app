"use client";
import { cn } from "../../lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import type { ModalProps } from "./types";
import { DialogTrigger } from "@radix-ui/react-dialog";

/**
 * Modal Component
 *
 * A flexible and customizable modal dialog built using the `Dialog` primitives from `@/components/ui/dialog`.
 * Supports dynamic width, height, customizable header color (with Tailwind class or direct color values),
 * and optional outside click dismissal.
 *
 * ## Props (ModalProps)
 * @param {boolean} isOpen
 *   Controls the visibility of the modal. When true, the modal is shown.
 *
 * @param {() => void} onClose
 *   Callback function triggered when the modal requests to close (e.g., user clicks outside or presses Escape).
 *
 * @param {string} title
 *   The title displayed in the modal header.
 *
 * @param {React.ReactNode} children
 *   The content of the modal displayed in the body section.
 *
 * @param {string} [headerColor="primary"]
 *   Optional color for the modal header background. Accepts Tailwind color class (e.g., `"bg-primary"`)
 *   or raw color values like `"#3498db"`, `"rgba(...)"`, `"hsl(...)"`, etc.
 *
 * @param {boolean} [closeOnOutsideClick=true]
 *   If false, clicking outside the modal will not trigger `onClose`.
 *
 * @param {string} [width="90vw"]
 *   Optional width for the modal. Accepts any valid CSS width value.
 *
 * @param {string} [maxWidth="1200px"]
 *   Optional maximum width for the modal. Accepts any valid CSS max-width value.
 *
 * ## Features
 * - Dynamic and responsive sizing
 * - Supports both Tailwind color classes and raw color values for header
 * - Customizable modal close behavior
 * - Scrollable content area
 * - Preserves styling of internal close button
 *
 * ## Example Usage:
 * ```tsx
 * <Modal
 *   isOpen={isModalOpen}
 *   onClose={() => setModalOpen(false)}
 *   title="Create New Project"
 *   width="800px"
 *   maxWidth="90vw"
 *   headerColor="#1e40af"
 * >
 *   <ProjectForm />
 * </Modal>
 * ```
 */

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  headerColor = "primary", // Default to primary color
  closeOnOutsideClick = true,
  width = "90vw",
  maxWidth = "90vw",
  className,
  triggerButton,
}: ModalProps) {
  // Function to determine if headerColor is a Tailwind class or direct color
  const getHeaderColorStyle = () => {
    // If it starts with #, rgb, rgba, or hsl, it's a direct color value
    if (/^(#|rgb|rgba|hsl)/.test(headerColor)) {
      return { backgroundColor: headerColor };
    }
    // Otherwise, return empty object and use Tailwind classes
    return {};
  };

  // Function to get the appropriate Tailwind background class
  const getHeaderColorClass = () => {
    // If it's a direct color value, don't add a Tailwind class
    if (/^(#|rgb|rgba|hsl)/.test(headerColor)) {
      return "";
    }
    // Otherwise, use the provided color as a Tailwind class
    return `bg-${headerColor}`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      {triggerButton && <DialogTrigger>{triggerButton}</DialogTrigger>}
      <DialogContent
        className={cn(
          "overflow-hidden border-none p-0 [&>button]:cursor-pointer [&>button]:text-white",
          className,
        )}
        style={{ width, maxWidth }}
        onInteractOutside={(e) => {
          if (!closeOnOutsideClick) {
            e.preventDefault();
          }
        }}
      >
        <DialogHeader
          className={cn(
            "flex max-h-18 justify-center rounded-t-lg px-4 py-3",
            getHeaderColorClass(),
          )}
          style={getHeaderColorStyle()}
        >
          <DialogTitle className="p-5 text-lg font-medium text-white">
            {title}
          </DialogTitle>
        </DialogHeader>
        <div className="max-h-[80vh] overflow-auto p-2">{children}</div>
      </DialogContent>
    </Dialog>
  );
}
