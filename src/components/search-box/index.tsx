"use client";

import { ChangeEvent, Suspense, useState } from "react";
import SearchInput from "../search-input/page";
import UserList from "../usersList.tsx";
import useDebounce from "@/hooks/useDebounce";

const SearchBox = () => {
  const [query, setQuery] = useState<string>("");
  const debounceQuery = useDebounce(query);

  const handleSearchQuery = (e: ChangeEvent<HTMLInputElement>): void => {
    setQuery(e.target.value);
  };
  
  return (
    <>
      <SearchInput handleSearchQuery={handleSearchQuery} query={query} />
    <Suspense fallback={<h2>Loading...</h2>}>
      <UserList query={debounceQuery} />
    </Suspense>
    </>
  );
};

export default SearchBox;
