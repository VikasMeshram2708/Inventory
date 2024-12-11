"use client";

import { useCallback, useEffect, useState } from "react";
import { Input } from "../ui/input";
import useDebounce from "@/lib/useDebounce";
import { filterResults } from "@/actions/inventory";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const debounceQuery = useDebounce(query, 500);

  const searching = useCallback(async (value: string) => {
    const result = await filterResults({ filterParams: value });
    console.log("res", result.data);
  }, []);

  useEffect(() => {
    if (query.length > 1) {
      searching(debounceQuery);
    }
  }, [query, debounceQuery, searching]);
  return (
    <div className="container mx-auto flex items-center gap-2">
      <label htmlFor="Search Product">Search </label>
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search Product..."
        type="text"
      />
    </div>
  );
}
