import { useEffect } from "react";
import { Project } from "screens/project-list/list";
import { cleanObject } from "utils";
import { useHttp } from "./http";
import { useAsync } from "./use-async";

export const useProjects = (param?: Partial<Project>) => {
  const { run, ...result } = useAsync<Project[]>();
  const client = useHttp();

  const fetchProject = () =>
    client("/projects", { data: cleanObject(param || {}) });

  useEffect(() => {
    run(fetchProject(), {
      retry: fetchProject,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param]);

  return result;
};

export const useEditProject = () => {
  const { run, ...asyncResut } = useAsync();
  const client = useHttp();

  const mutate = (params: Partial<Project>) => {
    return run(
      client(`/projects/${params.id}`, {
        data: params,
        method: "PATCH",
      })
    );
  };
  return {
    mutate,
    ...asyncResut,
  };
};

export const useAddProject = () => {
  const { run, ...asyncResut } = useAsync();
  const client = useHttp();

  const mutate = (params: Partial<Project>) => {
    return run(
      client(`/projects/${params.id}`, {
        data: params,
        method: "POST",
      })
    );
  };
  return {
    mutate,
    ...asyncResut,
  };
};
