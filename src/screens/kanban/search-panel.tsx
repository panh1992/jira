import { Button, Input } from "antd";
import { Row } from "components/lib";
import { TakeTypeSelect } from "components/task-type-select";
import { UserSelect } from "components/user-select";
import React from "react";
import { useSetUrlSearchParam } from "utils/url";
import { useTasksSearchParams } from "./util";

export const SearchPanel = () => {
  const searchParams = useTasksSearchParams();
  const setSearchParams = useSetUrlSearchParam();
  const reset = () => {
    setSearchParams({
      typeId: undefined,
      processorId: undefined,
      tagId: undefined,
      name: undefined,
    });
  };

  return (
    <Row marginBoittom={4} gap={true}>
      <Input
        style={{ width: "20rem" }}
        placeholder="任务名"
        onChange={(e) =>
          setSearchParams({
            name: e.target.value,
          })
        }
        value={searchParams.name}
      />
      <UserSelect
        defaultOptionName="经办人"
        value={searchParams.processorId}
        onChange={(value) => setSearchParams({ processorId: value })}
      />
      <TakeTypeSelect
        defaultOptionName="类型"
        value={searchParams.typeId}
        onChange={(value) => setSearchParams({ typeId: value })}
      />
      <Button onClick={reset}>清除筛选器</Button>
    </Row>
  );
};
