import { User } from "@/types/user";


export const NUMBER_OF_USERS_TO_FETCH = 20;

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

export default fetchUsers;
