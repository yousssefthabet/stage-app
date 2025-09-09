import { useState, useCallback, useEffect } from "react";

export interface Toast {
  id: string;
  title?: string;
  description?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  variant?: "default" | "destructive";
}

const TOAST_LIMIT = 3;
const TOAST_REMOVE_DELAY = 5000;

let toastCount = 0;

function generateId() {
  toastCount = (toastCount + 1) % Number.MAX_VALUE;
  return toastCount.toString();
}

let memoryState: { toasts: Toast[] } = { toasts: [] };
const listeners: Array<(state: { toasts: Toast[] }) => void> = [];

function dispatch(action: { type: string; toast?: Toast; toastId?: string }) {
  switch (action.type) {
    case "ADD_TOAST":
      if (action.toast) {
        memoryState.toasts = [action.toast, ...memoryState.toasts].slice(
          0,
          TOAST_LIMIT,
        );
      }
      break;
    case "UPDATE_TOAST":
      if (action.toast) {
        memoryState.toasts = memoryState.toasts.map((t) =>
          t.id === action.toast!.id ? { ...t, ...action.toast } : t,
        );
      }
      break;
    case "DISMISS_TOAST":
      const { toastId } = action;
      if (toastId) {
        memoryState.toasts = memoryState.toasts.map((t) =>
          t.id === toastId ? { ...t, open: false } : t,
        );
      } else {
        memoryState.toasts.forEach((toast) => {
          toast.open = false;
        });
      }
      break;
    case "REMOVE_TOAST":
      if (action.toastId) {
        memoryState.toasts = memoryState.toasts.filter(
          (t) => t.id !== action.toastId,
        );
      }
      break;
  }

  listeners.forEach((listener) => {
    listener(memoryState);
  });
}

export function toast({
  title,
  description,
  variant = "default",
  ...props
}: Omit<Toast, "id">) {
  const id = generateId();

  const update = (props: Partial<Toast>) =>
    dispatch({
      type: "UPDATE_TOAST",
      toast: { ...props, id },
    });

  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id });

  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      title,
      description,
      variant,
      open: true,
      onOpenChange: (open: boolean) => {
        if (!open) dismiss();
      },
    },
  });

  // Auto dismiss after delay
  setTimeout(() => {
    dispatch({ type: "REMOVE_TOAST", toastId: id });
  }, TOAST_REMOVE_DELAY);

  return {
    id,
    dismiss,
    update,
  };
}

export function useToast() {
  const [state, setState] = useState<{ toasts: Toast[] }>(memoryState);

  useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state]);

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
  };
}
