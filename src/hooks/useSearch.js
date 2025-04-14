import { useState, useMemo } from "react";

const useSearch = (items) => {
  const [query, setQuery] = useState("");

  const filteredItems = useMemo(() => {
    if (!query.trim()) return items;
    return items.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [items, query]);

  return [query, setQuery, filteredItems];
};

export default useSearch;
