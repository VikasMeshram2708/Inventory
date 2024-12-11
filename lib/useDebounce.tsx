import { useEffect, useState } from "react";

export default function useDebounce(searchQuery: string, delay = 500) {
  const [query, setQuery] = useState(searchQuery);

  useEffect(() => {
    const handler = setTimeout(() => {
      setQuery(searchQuery);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery, delay]);
  return query;
}
