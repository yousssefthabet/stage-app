import { type UniqueIdentifier } from "@dnd-kit/core";

// Global context to track active drag state across multiple table instances
export type DragContextType = {
  activeDragId: UniqueIdentifier | null;
  activeSourceId: UniqueIdentifier | null;
  setActiveDragId: (id: UniqueIdentifier) => void;
  setActiveSourceId: (id: UniqueIdentifier) => void;
};

// Types for the draggable table
export type DraggableTableColumn<T> = {
  header: string;
  accessor: keyof T | ((item: T) => React.ReactNode);
  width?: string;
};

export type DraggableTableProps<T> = {
  id: string;
  data: T[];
  columns: DraggableTableColumn<T>[];
  getItemId: (item: T) => string;
  onDragEnd?: (result: {
    source: string;
    destination: string;
    item: T;
  }) => void;
  onReceiveDrop?: (item: T, sourceId: string) => void;
  renderActions?: (item: T) => React.ReactNode;
  className?: string;
  isDropDisabled?: boolean;
};
