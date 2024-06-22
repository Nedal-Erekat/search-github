"use client";

import { ChangeEvent, useState } from "react";
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
      <UserList query={debounceQuery} />
    </>
  );
};

export default SearchBox;
