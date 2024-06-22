import fetchUsers from "@/servics/fetchUsers";
import { User } from "@/types/user";
import { useEffect, useRef, useState } from "react";

const useUserLoader = (query: string, offset: number) => {
    const [users, setUsers] = useState<User[]>([]);
    // const [currentQuery, setCurrentQuery] = useState<string>(query);

    let currentQuery= useRef(query);
  
    useEffect(() => {
      const loadUsers = async () => {
        if (!query) {
          setUsers([]);
          return;
        }
  
        if (query !== currentQuery.current) {
        //   setCurrentQuery(query);
          currentQuery.current = query;
          setUsers([]); // Reset users when query changes
        }
  
        const newUsers = await fetchUsers(query, offset);
        setUsers((prevUsers) => [...prevUsers, ...newUsers]);
      };
  
      loadUsers();
    }, [query, offset]);
  
    return users;
  };

  export default useUserLoader;