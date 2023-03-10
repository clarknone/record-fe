import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { ref, watchEffect } from "vue";
import { IFilter } from "../../interfaces/query";
import { IRecord } from "../../interfaces/record";
import { deleteRecord, getRecord } from "../../services/api/record";

export const useRecordQuery = (filter: IFilter = { page: 1, limit: 10 }) => {
  const totalPage = ref<number>(0);
  const records = ref<IRecord[]>([]);

  const {
    isLoading: loading,
    data,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["record", filter],
    queryFn: () => getRecord(filter),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });

  watchEffect(() => {
    if (data.value?.count) {
      totalPage.value = Math.ceil(data.value.count / filter.limit);
      records.value = data.value.results;
    }
  });

  return {
    isLoading: loading,
    totalPage,
    isFetching,
    data: records,
    error: error,
  };
};

export const useDeleteMutation = () => {
  const queryClient = useQueryClient();

  const { isLoading, isError, mutate } = useMutation({
    mutationFn: (data: IRecord) => deleteRecord(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["record"] });
    },
  });

  return { isLoading, isError, mutate };
};
