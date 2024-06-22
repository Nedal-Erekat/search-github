import { User } from "@/types/user";
import styles from "./userList.module.css";
import { Suspense, useDeferredValue, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import useDebounce from "@/hooks/useDebounce";
import useOffset from "@/hooks/useOffset";
import useUserLoader from "@/hooks/useUserLoader";
import ListItem from "../list-item";
import { NUMBER_OF_USERS_TO_FETCH } from "@/servics/fetchUsers";

type UserListProps = {
  query: string;
};

const UserList: React.FC<UserListProps> = ({ query }: UserListProps) => {
  const { ref, inView } = useInView();
  const debouncedQuery = useDebounce(query, 300); // Debounce the query to avoid rapid state changes
  const [offset, setOffset] = useOffset(inView);
  const users = useUserLoader(debouncedQuery, offset);
  const deferredQuery = useDeferredValue(debouncedQuery); // Defer the debounced query to optimize rendering
  const hasMoreUsers: boolean = users.length < NUMBER_OF_USERS_TO_FETCH;  

  useEffect(() => {
    setOffset(1); // Reset offset when query changes
  }, [deferredQuery, setOffset]);

  return (
    <Suspense fallback={<h2>Loading...</h2>}>
      <ul
        className={styles.userList}
        style={{
          opacity: query !== deferredQuery ? 0.5 : 1,
        }}
      >
        {users.map((user: User) => (
          <ListItem key={user.id} user={user} />
        ))}
        {!hasMoreUsers && (
          <div ref={ref} className={styles.loadingIndicator}>
            {inView && !!users.length && "Loading more users..."}
          </div>
        )}
      </ul>
    </Suspense>
  );
};

export default UserList;
