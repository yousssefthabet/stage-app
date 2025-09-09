"use client";

import * as React from "react";
import { Check, ChevronsUpDown, MapPin } from "lucide-react";
import { cn } from "../../lib/utils";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../ui/popover";
import { Badge } from "../../ui/badge";
import { useCity } from "../../apis/modules/city/city-queries";
import { type City } from "../../apis/types/city-types";

interface CitySearchSelectProps {
  value?: City | null;
  onValueChange?: (city: City | null) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export default function CitySearchSelect({
  value,
  onValueChange,
  placeholder = "Rechercher une ville ou code postal...",
  className,
  disabled = false,
}: CitySearchSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = React.useState("");

  // Debounce search term
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Determine search parameters
  const searchParams = React.useMemo(() => {
    if (!debouncedSearchTerm || debouncedSearchTerm.length < 2)
      return undefined;
    const isPostalCode = /^\d+$/.test(debouncedSearchTerm);
    return isPostalCode
      ? { postalCode: debouncedSearchTerm }
      : { name: debouncedSearchTerm };
  }, [debouncedSearchTerm]);

  // Fetch cities
  const { data: citiesResponse, isLoading } = useCity(searchParams);
  const cities = React.useMemo(() => citiesResponse ?? [], [citiesResponse]);

  const handleSelect = (city: City) => {
    onValueChange?.(city);
    setOpen(false);
  };

  // Helper to get postal code string
  const getPostalCodeString = (
    postal: string | { code?: string | { code: string } },
  ) => {
    if (typeof postal === "string") return postal;
    if (postal?.code) {
      return typeof postal.code === "string" ? postal.code : postal.code.code;
    }
    return "";
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        asChild
        className={cn("w-full justify-between overflow-hidden", className)}
      >
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
          disabled={disabled}
        >
          {value?.name ? (
            <div className="flex items-center gap-2">
              <MapPin className="text-muted-foreground h-4 w-4" />
              <span className="truncate">{value.name}</span>
              {value.PostalCodes?.[0] && (
                <Badge variant="secondary" className="text-xs text-white">
                  {getPostalCodeString(value.PostalCodes[0])}
                </Badge>
              )}
            </div>
          ) : (
            <span className="text-muted-foreground">{placeholder}</span>
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-full p-0" align="start">
        <Command shouldFilter={false}>
          <div className="flex items-center border-b px-3">
            <CommandInput
              placeholder="Tapez le nom de la ville ou le code postal..."
              value={searchTerm}
              onValueChange={setSearchTerm}
              className="placeholder:text-muted-foreground flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <CommandList>
            {isLoading && (
              <div className="text-muted-foreground p-4 text-center text-sm">
                Recherche en cours...
              </div>
            )}
            {!isLoading && searchTerm.length >= 2 && cities.length === 0 && (
              <CommandEmpty>Aucune ville trouvée.</CommandEmpty>
            )}
            {!isLoading && cities.length > 0 && (
              <CommandGroup>
                {cities.map((city) => (
                  <CommandItem
                    key={city.id}
                    value={`${city.name} ${city.department.code}`}
                    onSelect={() => handleSelect(city)}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <MapPin className="text-muted-foreground h-4 w-4" />
                      <div className="flex flex-col">
                        <span className="font-medium">{city.name}</span>
                        <span className="text-muted-foreground text-xs">
                          {city.department.name} ({city.department.code})
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {city.PostalCodes?.slice(0, 2).map((postal, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs"
                        >
                          {getPostalCodeString(postal)}
                        </Badge>
                      ))}
                      {city.PostalCodes && city.PostalCodes.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{city.PostalCodes.length - 2}
                        </Badge>
                      )}
                      <Check
                        className={cn(
                          "ml-2 h-4 w-4",
                          value?.id === city.id ? "opacity-100" : "opacity-0",
                        )}
                      />
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
