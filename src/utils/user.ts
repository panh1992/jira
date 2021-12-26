import { useEffect } from "react";
import { useAsync } from "utils/use-async";
import { User } from "screens/project-list/search-panel";
import { useHttp } from "./http";

export const useUsers = (param?: Partial<User>) => {
  const { run, ...result } = useAsync<User[]>();
  const client = useHttp();

  useEffect(() => {
    run(client("/users"));
  }, [client, run, param]);

  return result;
};
