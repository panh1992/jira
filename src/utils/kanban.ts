import { Kanban } from "types/kanban";
import { useQuery } from "react-query";
import { cleanObject } from "utils";
import { useHttp } from "./http";

export const useKanbans = (param?: Partial<Kanban>) => {
  const client = useHttp();

  return useQuery<Kanban[]>(["kanbans", param], () =>
    client("/kanbans", { data: cleanObject(param || {}) })
  );
};
