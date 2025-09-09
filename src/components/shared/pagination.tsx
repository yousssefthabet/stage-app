import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "../ui/pagination";
import { cn } from "../lib/utils";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import type { SearchParams } from "@/types/search-params";

interface Props {
  lastPage: number;
  searchParam?: string;
  visiblePages?: number;
  className?: string;
  SearchParams: SearchParams;
}

export default function PaginationComponent({
  lastPage,
  visiblePages = 2,
  searchParam = "page",
  className,
  SearchParams,
}: Props) {
  const currentPage = parseInt(SearchParams[searchParam] as string) || 1;
  const generatePageNumbers = () => {
    const pages: (number | string)[] = [];

    if (currentPage > visiblePages + 1) {
      pages.push(1);
      pages.push("...");
    }

    const start = Math.max(1, currentPage - visiblePages);
    const end = Math.min(lastPage, currentPage + visiblePages);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < lastPage - 1) {
      pages.push("...");
      pages.push(lastPage);
    }

    return pages;
  };

  return (
    <Pagination className={className}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={
              currentPage > 1
                ? `?${new URLSearchParams({
                    ...SearchParams,
                    page: (currentPage - 1).toString(),
                  }).toString()}`
                : undefined
            }
            className={
              currentPage === 1 ? "pointer-events-none opacity-50" : ""
            }
          />
        </PaginationItem>

        {generatePageNumbers().map((page, index) =>
          page === "..." ? (
            <PaginationItem key={`ellipsis-${index}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={page}>
              <Link
                className={cn(
                  buttonVariants({
                    variant: currentPage === page ? "outline" : "ghost",
                    size: "icon",
                  }),
                )}
                href={{
                  query: {
                    ...SearchParams,
                    page: page,
                  },
                }}
                shallow={true}
              >
                {page}
              </Link>
            </PaginationItem>
          ),
        )}

        <PaginationItem>
          <PaginationNext
            href={
              currentPage < lastPage
                ? `?${new URLSearchParams({
                    ...SearchParams,
                    page: (currentPage + 1).toString(),
                  }).toString()}`
                : undefined
            }
            className={
              currentPage === lastPage ? "pointer-events-none opacity-50" : ""
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
