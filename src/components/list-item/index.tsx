import { User } from "@/types/user";
import Image from "next/image";
import styles from "./list-item.module.css";

const ListItem = ({ user }: { user: User }) => {
  return (
    <li className={styles.userItem}>
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
  );
};

export default ListItem;
