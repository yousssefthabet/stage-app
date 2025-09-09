"use client";

import { Input } from "../ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { useRef, useTransition } from "react";
import debounce from "debounce";
import { Loader2, Search } from "lucide-react";
import { cn } from "@/lib/utils";

export default function SearchBar({
  className,
  searchParam = "query",
}: {
  className?: string;
  searchParam?: string;
}) {
  const [ispending, setTransition] = useTransition();
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultValue = searchParams.get(searchParam) ?? "";
  const InputRef = useRef<HTMLInputElement | null>(null);

  const handleSearch = () => {
    setTransition(() => {
      const sanitizedValue = encodeURIComponent(
        InputRef.current?.value?.trim() ?? "",
      );
      router.push(`?${searchParam}=${sanitizedValue}`, { scroll: false });
    });
  };
  return (
    <div className={cn(className, "relative w-[300px] md:w-[250px]")}>
      {ispending ? (
        <Loader2 className="absolute top-3 left-3 h-4 w-4 text-gray-400 dark:text-gray-500" />
      ) : (
        <Search className="absolute top-3 left-3 h-4 w-4 text-gray-400 dark:text-gray-500" />
      )}
      <Input
        defaultValue={defaultValue}
        placeholder="Recherche..."
        className="focus:border-primary focus:ring-primary h-10 w-full rounded-md border border-gray-300 bg-white pl-8 text-gray-900 placeholder:text-gray-400 focus:ring-1 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-500"
        ref={InputRef}
        onChange={debounce(handleSearch, 500)}
        onKeyDown={(e) => e.stopPropagation()}
      />
    </div>
  );
}
