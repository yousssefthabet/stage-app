"use client";

import { useAllCustomer } from "../../apis/modules/customer/customer-queries";
import { useUpdateHeaderProjet } from "../../apis/modules/header-projet/header-projet-queries";
import { useUsers } from "../../apis/modules/user/user-queries";
import { getChangedFields } from "../../apis/shared/utils/get-changed-fields";
import {
  type TypeSource,
  ValueSourceType,
} from "../../apis/types/type-source-types";
import { Button } from "../../ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../../ui/command";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { useFormHook } from "../../hooks/use-form";
import { cn } from "../../lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export default function SourceModalComponentForm({
  sourceId,
  detailsSourceId,
  rawSources,
  sources,
  detailsSources,
  onClose,
}: {
  sourceId: string | null;
  detailsSourceId: string | null;
  rawSources: TypeSource[];
  sources: { value: string; label: string; sourceType: ValueSourceType }[];
  detailsSources: {
    value: string;
    label: string;
    sourceType: string;
  }[];
  onClose?: () => void;
}) {
  const params = useParams();
  const projetId = params.id as string;

  const form = useFormHook({
    defaultValues: {
      source: sourceId ?? "",
      detailsSource: detailsSourceId ?? "",
    },
  });

  const { data: users } = useUsers({});
  const { data: customers } = useAllCustomer();
  const { mutate: updateHeaderProjet, isPending } =
    useUpdateHeaderProjet(projetId);

  const [filteredDetailsSources, setFilteredDetailsSources] = useState<
    { value: string; label: string; sourceType: string }[]
  >([]);

  const [open, setOpen] = useState(false);

  const checkSourceValueType = (): string => {
    const sourceValue = form.watch("source");
    const sourceObj = rawSources.find((source) => sourceValue === source.id);
    return (
      sourceObj?.valueSourceType?.toString() ?? ValueSourceType.other.toString()
    );
  };

  const handleGetDetailsSources = (sourceId: string) => {
    const data = detailsSources.filter(
      (detail) => detail.sourceType === sourceId,
    );
    setFilteredDetailsSources(data);
    if (detailsSourceId && !data.some((d) => d.value === detailsSourceId)) {
      form.setValue("detailsSource", "");
    }
  };

  useEffect(() => {
    form.reset({
      source: sourceId ?? "",
      detailsSource: detailsSourceId ?? "",
    });

    if (sourceId) {
      handleGetDetailsSources(sourceId);
    }
  }, [sourceId, detailsSourceId]);

  useEffect(() => {
    if (
      checkSourceValueType() === "user" &&
      users?.data?.length &&
      detailsSourceId
    ) {
      const exists = users.data.some(
        (user) => user.id.toString() === detailsSourceId,
      );
      if (exists) {
        form.setValue("detailsSource", detailsSourceId);
      }
    }
  }, [users?.data, detailsSourceId]);

  useEffect(() => {
    if (
      checkSourceValueType() !== "user" &&
      customers?.data?.length &&
      detailsSourceId
    ) {
      const exists = customers.data.some(
        (c) => c.id.toString() === detailsSourceId,
      );
      if (exists) {
        form.setValue("detailsSource", detailsSourceId);
      }
    }
  }, [customers?.data, detailsSourceId]);

  const originalHeaderProjet = useRef({
    typeSourceId: sourceId ?? "",
    sourceDetailId: detailsSourceId ?? "",
  });

  const handleSubmit = () => {
    const data = form.getValues();
    if (!data.source || !data.detailsSource) return;

    const changes = getChangedFields(originalHeaderProjet.current, {
      typeSourceId: data.source,
      sourceDetailId: data.detailsSource,
    });

    if (Object.keys(changes).length === 0) return;

    updateHeaderProjet(
      {
        typeSourceId: data.source,
        sourceDetailId: data.detailsSource,
      },
      {
        onSuccess: () => {
          onClose?.();
        },
        onError: () => {
          toast.error("Erreur lors de la mise à jour");
        },
      },
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="px-4">
        <FormField
          control={form.control}
          name="source"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Source</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    handleGetDetailsSources(value);
                  }}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-full cursor-pointer">
                    <SelectValue placeholder="Sélectionner une source" />
                  </SelectTrigger>
                  <SelectContent>
                    {sources.map((item) => (
                      <SelectItem
                        key={item.value}
                        value={item.value}
                        className="cursor-pointer"
                      >
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {checkSourceValueType() === "other" ? (
          <FormField
            control={form.control}
            name="detailsSource"
            render={({ field }) => (
              <FormItem className="mt-4 mb-4 w-full">
                <FormLabel>Détail Source</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full cursor-pointer">
                      <SelectValue placeholder="Sélectionner un Détail Source" />
                    </SelectTrigger>
                    <SelectContent>
                      {filteredDetailsSources.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ) : checkSourceValueType() === "user" ? (
          // User popover
          <FormField
            control={form.control}
            name="detailsSource"
            render={({ field }) => {
              const selectedUser = field.value
                ? users?.data.find((user) => user.id.toString() === field.value)
                : undefined;

              return (
                <FormItem className="mt-4 mb-4 w-full">
                  <FormLabel>Détail Source</FormLabel>
                  <FormControl>
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={open}
                          className="w-full justify-between"
                        >
                          {selectedUser
                            ? `${selectedUser.firstName} ${selectedUser.lastName}`
                            : "Sélectionner un utilisateur"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command>
                          <CommandInput placeholder="Rechercher un utilisateur..." />
                          <CommandList>
                            <CommandEmpty>
                              Aucun utilisateur trouvé
                            </CommandEmpty>
                            <CommandGroup>
                              {users?.data.map((user) => {
                                const userId = user.id.toString();
                                const isSelected = field.value === userId;
                                return (
                                  <CommandItem
                                    key={user.id}
                                    value={userId}
                                    onSelect={() => {
                                      field.onChange(userId);
                                      setOpen(false);
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        isSelected
                                          ? "opacity-100"
                                          : "opacity-0",
                                      )}
                                    />
                                    <span
                                      className={isSelected ? "font-bold" : ""}
                                    >
                                      {user.firstName} {user.lastName}
                                    </span>
                                  </CommandItem>
                                );
                              })}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        ) : (
          // Customer popover
          <FormField
            control={form.control}
            name="detailsSource"
            render={({ field }) => {
              const selectedCustomer = field.value
                ? customers?.data.find((c) => c.id.toString() === field.value)
                : undefined;

              return (
                <FormItem className="mt-4 mb-4 w-full">
                  <FormLabel>Détail Source</FormLabel>
                  <FormControl>
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={open}
                          className="w-full justify-between"
                        >
                          {selectedCustomer
                            ? `${selectedCustomer.firstName} ${selectedCustomer.lastName}`
                            : "Sélectionner un customer"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command>
                          <CommandInput placeholder="Rechercher un customer..." />
                          <CommandList>
                            <CommandEmpty>Aucun customer trouvé</CommandEmpty>
                            <CommandGroup>
                              {customers?.data.map((customer) => {
                                const customerId = customer.id.toString();
                                const isSelected = field.value === customerId;
                                return (
                                  <CommandItem
                                    key={customer.id}
                                    value={customerId}
                                    onSelect={() => {
                                      field.onChange(customerId);
                                      setOpen(false);
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        isSelected
                                          ? "opacity-100"
                                          : "opacity-0",
                                      )}
                                    />
                                    <span
                                      className={isSelected ? "font-bold" : ""}
                                    >
                                      {customer.firstName} {customer.lastName}
                                    </span>
                                  </CommandItem>
                                );
                              })}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        )}

        {/* Actions */}
        <div className="mt-4 flex justify-end space-x-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => onClose?.()}
            disabled={isPending}
          >
            Annuler
          </Button>
          <Button
            type="submit"
            onClick={() => onClose?.()}
            variant="default"
            disabled={isPending}
          >
            {isPending ? "Chargement..." : "Confirmer"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
