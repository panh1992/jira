import { useAsync } from "utils/use-async";
import { User } from "screens/project-list/search-panel";
import { useMount } from "utils";
import { useHttp } from "./http";

export const useUsers = (param?: Partial<User>) => {
  const { run, ...result } = useAsync<User[]>();
  const client = useHttp();

  useMount(() => {
    run(client("/users"));
  });

  return result;
};
