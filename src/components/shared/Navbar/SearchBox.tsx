"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

function SearchBox() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && query.trim().length >= 3) {
      void router.push(`/recherche?search=${encodeURIComponent(query.trim())}`);
    }
  };
  return (
    <div className="flex items-center justify-center gap-2 rounded-full bg-white px-4">
      <FaSearch className="text-primary text-xs" />
      <input
        type="text"
        placeholder="Rechercher"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        className="placeholder:text-primary h-[5vh] min-h-[35px] border-none text-xs text-black placeholder:text-xs focus:shadow-none focus:outline-0"
      />
    </div>
  );
}

export default SearchBox;
