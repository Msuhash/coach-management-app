import { useQuery, useMutation, useQueryClient } from "react-query";
import { getCoaches, getCoach, addCoach, editCoach, removeCoach, patchCoach } from "./services";

// Get list of coaches
export const useCoaches = (options = {}) => {
  // returns { data, isLoading, error, ... }
  return useQuery(["coaches"], getCoaches, options);
};

// Get single coach by id
export const useCoach = (id, options = {}) => {
  return useQuery(["coach", id], () => getCoach(id), { enabled: !!id, ...options });
};

// Create new coach
export const useAddCoach = () => {
  const qc = useQueryClient();
  return useMutation((payload) => addCoach(payload), {
    onSuccess: () => qc.invalidateQueries(["coaches"]),
  });
};

// Update coach
export const useEditCoach = () => {
  const qc = useQueryClient();
  return useMutation(({ id, payload }) => editCoach(id, payload), {
    onSuccess: (data, variable) => {
      qc.invalidateQueries(["coaches"]);
      qc.invalidateQueries(["coaches", variable.id]);
    },
  });
};

export const usePatchCoach = () => {
  const qc = useQueryClient();
  return useMutation(({ id, payload }) => patchCoach(id, payload), {
    onMutate: async ({ id, payload }) => {
      await qc.cancelQueries("coaches");
      const previous = qc.getQueryData("coaches");

      qc.setQueryData("coaches", (old = []) =>
        old.map((c) => (c.id === id ? { ...c, ...payload } : c))
      );

      const prevSingle = qc.getQueryData(["coach", id]);
      if (prevSingle) qc.setQueryData(["coach", id], (old) => ({ ...old, ...payload }));

      return { previous, prevSingle };
    },
    onError: (err, vars, context) => {
      if (context?.previous) qc.setQueryData("coaches", context.previous);
      if (context?.prevSingle) qc.setQueryData(["coach", vars.id], context.prevSingle);
    },
    onSettled: (data, error, vars) => {
      qc.invalidateQueries("coaches");
      qc.invalidateQueries(["coach", vars.id]);
    },
  });
};

// Delete coach
export const useDeleteCoach = () => {
  const qc = useQueryClient();
  return useMutation((id) => removeCoach(id), {
    onSuccess: () => qc.invalidateQueries(["coaches"]),
  });
};
