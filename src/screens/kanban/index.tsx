import styled from "@emotion/styled";
import React from "react";
import { useDocumentTitle } from "utils";
import { useKanbans } from "utils/kanban";
import { KanbanColumn } from "./kanban-column";
import { useKanbanSearchParams, useProjectdInUrl } from "./util";

export const KanBanScreen = () => {
  useDocumentTitle("看板标题");

  const { data: currentProject } = useProjectdInUrl();
  const { data: kanbans } = useKanbans(useKanbanSearchParams());

  return (
    <div>
      <h1>{currentProject?.name}看板</h1>
      <ColumnsContainer>
        {kanbans?.map((kanban) => (
          <KanbanColumn key={kanban.id} kanban={kanban} />
        ))}
      </ColumnsContainer>
    </div>
  );
};

const ColumnsContainer = styled.div`
  display: flex;
  overflow: hidden;
  margin-right: 2rem;
`;
