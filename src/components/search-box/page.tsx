"use client"
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import styles from "./searchBox.module.css";
import Image from "next/image";
import { useInView } from "react-intersection-observer";

interface User {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
}

const NUMBER_OF_USERS_TO_FETCH = 20;

const fetchUsers = async (query: string, page: number): Promise<User[]> => {
  const token = process.env.NEXT_PUBLIC_GITHUB_API_TOKEN;
  const headers = {
    Accept: "application/vnd.github+json",
    Authorization: `Bearer ${token}`,
    "X-GitHub-Api-Version": "2022-11-28",
  };

  try {
    const response = await fetch(
      `https://api.github.com/search/users?q=${query}&page=${page}&per_page=${NUMBER_OF_USERS_TO_FETCH}`,
      { headers }
    );
    const data = await response.json();
    return data.items || [];
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

const SearchBox: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]);
  const { ref, inView } = useInView();
  const [offset, setOffset] = useState<number>(1); // Initial offset

  const handleSearchQuery = (e: ChangeEvent<HTMLInputElement>): void => {
    setQuery(e.target.value);
    setOffset(1); // Reset offset when new query is entered
    setUsers([]);
  };

  const loadUsers = useCallback(async () => {
    if (!query) return; // Don't fetch if query is empty
    const newUsers = await fetchUsers(query, offset);
    setUsers((prevUsers) => [...prevUsers, ...newUsers]);
  }, [query, offset]);

  useEffect(() => {
    loadUsers();
  }, [query, offset, loadUsers]);

  useEffect(() => {
    if (inView) {
      setOffset((prevOffset) => prevOffset + 1);
    }
  }, [inView]);

  return (
    <div className={styles.container}>
      <input
        type="text"
        value={query}
        onChange={handleSearchQuery}
        className={styles.searchInput}
        placeholder="Search GitHub users"
      />
      <ul className={styles.userList}>
        {users.map((user) => (
          <li key={user.id} className={styles.userItem}>
            <Image
              src={user.avatar_url}
              alt={user.login}
              width={50}
              height={50}
              className={styles.avatar}
            />
            <div className={styles.userInfo}>
              <h2 className={styles.userName}>{user.login}</h2>
              <a
                href={user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.userLink}
              >
                View Profile
              </a>
            </div>
          </li>
        ))}
      </ul>
      <div ref={ref} className={styles.loadingIndicator}>
        {inView && "Loading more users..."}
      </div>
    </div>
  );
};

export default SearchBox;
