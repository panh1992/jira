import React from "react";
import { User } from "./search-panel";

interface Project {
  id: string;
  name: string;
  personId: string;
  organization: string;
}

interface ListProps {
  list: Project[];
  users: User[];
}

export const List = ({ list, users }: ListProps) => {
  return (
    <table>
      <thead>
        <tr>
          <th>名称</th>
          <th>负责人</th>
        </tr>
      </thead>
      <tbody>
        {list.map((p) => (
          <tr key={p.id}>
            <td>{p.name}</td>
            <td>{users.find((u) => u.id === p.personId)?.name || "未知"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
