import React from "react";
import { Kanban } from "types/kanban";
import { useTasks } from "utils/task";
import { useTasksSearchParams } from "./util";

export const KanbanColumn = ({ kanban }: { kanban: Kanban }) => {
  const { data: allTasks } = useTasks(useTasksSearchParams());
  const tasks = allTasks?.filter((t) => t.kanbanId === kanban.id);

  return (
    <div>
      <h3>{kanban.name}</h3>
      {tasks?.map((t) => (
        <div key={t.id}>{t.name}</div>
      ))}
    </div>
  );
};
