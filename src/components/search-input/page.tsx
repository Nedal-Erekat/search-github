"use client";
import {
  ChangeEventHandler,
} from "react";
import styles from "./searchInput.module.css";

type SearchInputProps = {
  handleSearchQuery: ChangeEventHandler;
  query: string;
};

const SearchInput: React.FC<SearchInputProps> = ({
  handleSearchQuery,
  query,
}: SearchInputProps) => {

  return (
    <div className={styles.container}>
      <input
        type="text"
        value={query}
        onChange={handleSearchQuery}
        className={styles.searchInput}
        placeholder="Search GitHub users"
        autoFocus
      />
    </div>
  );
};

export default SearchInput;
