import { useQuery } from "react-query";
import { User } from "types/user";
import { cleanObject } from "utils";
import { useHttp } from "./http";

export const useUsers = (param?: Partial<User>) => {
  const client = useHttp();
  return useQuery<User[]>(["users", param], () =>
    client("/users", { data: cleanObject(param || {}) })
  );
};
