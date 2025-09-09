"use client";

import { createContext, useContext, useState } from "react";
import type {
  DragContextType,
  DraggableTableColumn,
  DraggableTableProps,
} from "./types";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";
import { GripVertical, Plus } from "lucide-react";
import {
  closestCenter,
  DndContext,
  type DragEndEvent,
  type DragOverEvent,
  DragOverlay,
  type DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  type UniqueIdentifier,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};

const DragContext = createContext<DragContextType>({
  activeDragId: null,
  activeSourceId: null,
  setActiveDragId: noop,
  setActiveSourceId: noop,
});

/**
 * Drag Drop Provider
 *
 * A context provider for managing drag-and-drop state across multiple components.
 * This provider allows components to share drag state, making it easier to implement
 * drag-and-drop functionality without prop drilling.
 *
 * ## Features
 * - Provides a context for managing active drag IDs and source IDs.
 * - Allows components to set and access the current drag state.
 * - Simplifies the implementation of drag-and-drop functionality in React applications.
 *
 * ## Example Usage:
 * ```tsx
 * import { DragDropProvider } from "@/components/shared/draggable-data-table";
 *
 * function App() {
 *  return (
 *    <DragDropProvider>
 *     <YourComponent />
 *    </DragDropProvider>
 *  );
 * }
 *
 * ```
 */

export const DragDropProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [activeDragId, setActiveDragId] = useState<UniqueIdentifier | null>(
    null,
  );
  const [activeSourceId, setActiveSourceId] = useState<UniqueIdentifier | null>(
    null,
  );

  return (
    <DragContext.Provider
      value={{
        activeDragId,
        activeSourceId,
        setActiveDragId,
        setActiveSourceId,
      }}
    >
      {children}
    </DragContext.Provider>
  );
};

/**
 * Custom hook to access the drag context.
 *
 * This hook provides access to the drag context, allowing components to
 * interact with the drag-and-drop state.
 *
 * ## Example Usage:
 * ```tsx
 * import { useDragContext } from "@/components/shared/draggable-data-table";
 *
 * function YourComponent() {
 *   const { activeDragId, activeSourceId, setActiveDragId, setActiveSourceId} = useDragContext();
 *
 *   return <div>{activeDragId}</div>;
 * }
 * ```
 */
export const useDragContext = () => useContext(DragContext);

/**
 * DraggableRow Component
 *
 * A row component for a draggable table. This component uses the `useSortable` hook
 * from the `@dnd-kit/sortable` library to provide drag-and-drop functionality.
 *
 * ## Props
 * - `item`: The data item to be displayed in the row.
 * - `columns`: An array of column definitions for the table.
 * - `getItemId`: A function to get the unique ID of the item.
 * - `renderActions`: A function to render action buttons for the item.
 *
 * ## Example Usage:
 * ```tsx
 * import { DraggableRow } from "@/components/shared/draggable-data-table";
 *
 * function YourComponent() {
 *  const columns = [
 *    { header: "Name", accessor: "name" },
 *    { header: "Age", accessor: "age" },
 *    { header: "Actions", accessor: "actions" },
 *  ];
 *
 * const data = [
 *  { id: "1", name: "John Doe", age: 30 },
 *  { id: "2", name: "Jane Doe", age: 25 },
 * ];
 *
 * return (
 *  <table>
 *   <thead>
 *    <tr>
 *     {columns.map((col) => (
 *      <th key={col.header}>{col.header}</th>
 *     ))}
 *   </tr>
 *  </thead>
 *  <tbody>
 *   {data.map((item) => (
 *    <DraggableRow
 *      key={item.id}
 *      item={item}
 *      columns={columns}
 *      getItemId={(item) => item.id}
 *      renderActions={(item) => (
 *        <button onClick={() => console.log(item)}>Edit</button>
 *      )}
 *    />
 *   ))}
 *  </tbody>
 * </table>
 * }
 * ```
 */
export function DraggableRow<T>({
  item,
  columns,
  getItemId,
  renderActions,
}: {
  item: T;
  columns: DraggableTableColumn<T>[];
  getItemId: (item: T) => string;
  renderActions?: (item: T) => React.ReactNode;
}) {
  const id = getItemId(item);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <tr
      ref={setNodeRef}
      style={style}
      className={cn(
        "bg-sky-100/80 transition-colors hover:bg-sky-200/80",
        isDragging && "bg-sky-200/80 shadow-md",
      )}
    >
      <td className="w-10 p-2 text-center">
        <div
          {...attributes}
          {...listeners}
          className="flex h-full cursor-grab items-center justify-center active:cursor-grabbing"
        >
          <GripVertical className="h-5 w-5 text-gray-500" />
        </div>
      </td>

      {columns.map((column, colIndex) => {
        const value: React.ReactNode =
          typeof column.accessor === "function"
            ? column.accessor(item)
            : String(item[column.accessor]);

        return (
          <td key={colIndex} className="p-3" style={{ width: column.width }}>
            {value}
          </td>
        );
      })}
      {renderActions && (
        <td className="p-2 text-right">
          <div className="flex justify-end gap-2">{renderActions(item)}</div>
        </td>
      )}
    </tr>
  );
}

/**
 * DropZone Component
 *
 * A drop zone component for a draggable table. This component is used to indicate
 * where items can be dropped when using drag-and-drop functionality.
 *
 * ## Example Usage:
 * ```tsx
 * import { DropZone } from "@/components/shared/draggable-data-table";
 *
 * function YourComponent() {
 *   return (
 *     <table>
 *       <tbody>
 *         <DropZone />
 *       </tbody>
 *     </table>
 *   );
 * }
 * ```
 */
export function DropZone() {
  return (
    <div className="flex items-center justify-center gap-2 rounded-lg border-2 border-dashed border-blue-300 p-4 text-blue-500">
      <Plus className="h-5 w-5" />
      <span>Déposez ici pour ajouter un élément</span>
    </div>
  );
}

export function DraggableTable<T>({
  id,
  data,
  columns,
  getItemId,
  onDragEnd,
  onReceiveDrop,
  renderActions,
  className,
  isDropDisabled = false,
}: DraggableTableProps<T>) {
  const { activeDragId, activeSourceId, setActiveDragId, setActiveSourceId } =
    useDragContext();
  const [activeItem, setActiveItem] = useState<T | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // Minimum drag distance before activation
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveDragId(active.id);
    setActiveSourceId(id);

    const draggedItem = data.find((item) => getItemId(item) === active.id);
    if (draggedItem) {
      setActiveItem(draggedItem as T);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    setActiveDragId("");
    setActiveSourceId("");
    setActiveItem(null);

    if (over && active.id !== over.id && onDragEnd && activeSourceId === id) {
      const draggedItem = data.find((item) => getItemId(item) === active.id);
      if (draggedItem) {
        onDragEnd({
          source: id,
          destination: id,
          item: draggedItem,
        });
      }
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { over } = event;

    // Handle drop from another table
    if (
      over &&
      over.id === `${id}-dropzone` &&
      activeSourceId &&
      activeSourceId !== id &&
      onReceiveDrop &&
      activeItem
    ) {
      onReceiveDrop(activeItem, activeSourceId.toString());
    }
  };

  let itemIds = [];

  if (data && data.length > 0) {
    itemIds = data.map((item) => getItemId(item));
  } else {
    itemIds = [id];
  }

  const isOtherTableDragging = activeDragId !== null && activeSourceId !== id;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
    >
      <div className={cn("overflow-hidden rounded-md border", className)}>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-primary text-white">
              <th className="w-10"></th>
              {columns.map((column, index) => (
                <th
                  key={index}
                  className="py-2 text-left text-sm font-medium"
                  style={{ width: column.width }}
                >
                  {column.header}
                </th>
              ))}
              {renderActions && (
                <th className="py-2 text-left text-sm font-medium">Action</th>
              )}
            </tr>
          </thead>
          <tbody>
            {isOtherTableDragging && !isDropDisabled ? (
              <tr id={`${id}-dropzone`}>
                <td colSpan={columns.length + (renderActions ? 2 : 1)}>
                  <DropZone />
                </td>
              </tr>
            ) : (
              <SortableContext items={itemIds}>
                {data && data.length > 0 ? (
                  data.map((item) => (
                    <DraggableRow
                      key={getItemId(item).toString()}
                      item={item}
                      columns={columns}
                      getItemId={getItemId}
                      renderActions={renderActions}
                    />
                  ))
                ) : (
                  <tr>
                    <td colSpan={columns.length + (renderActions ? 2 : 1)}>
                      <div className="flex items-center justify-center p-4">
                        <span className="text-gray-500">
                          Aucune donnée disponible
                        </span>
                      </div>
                    </td>
                  </tr>
                )}
              </SortableContext>
            )}
          </tbody>
        </table>
      </div>

      <DragOverlay>
        {activeDragId && activeItem && (
          <table className="w-full border-collapse shadow-md">
            <tbody>
              <tr className="bg-sky-200/90">
                <td className="w-10 p-2 text-center">
                  <div className="flex h-full items-center justify-center">
                    <GripVertical className="h-5 w-5 text-gray-500" />
                  </div>
                </td>
                {columns.map((column, colIndex) => {
                  const value: React.ReactNode =
                    typeof column.accessor === "function"
                      ? column.accessor(activeItem)
                      : String(activeItem[column.accessor]);

                  return (
                    <td
                      key={colIndex}
                      className="p-3"
                      style={{ width: column.width }}
                    >
                      {value}
                    </td>
                  );
                })}
                {renderActions && (
                  <td className="p-2 text-left">
                    <div className="flex justify-end gap-2">
                      {renderActions(activeItem)}
                    </div>
                  </td>
                )}
              </tr>
            </tbody>
          </table>
        )}
      </DragOverlay>
    </DndContext>
  );
}
