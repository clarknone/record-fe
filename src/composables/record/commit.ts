import { useQuery } from "@tanstack/vue-query";
import { ref, watchEffect } from "vue";
import { ICommit } from "../../interfaces/commit";
import { IFilter } from "../../interfaces/query";
import { getCommit } from "../../services/api/commit";

export const useCommitQuery = (filter: IFilter = { page: 1, limit: 10 }) => {
  const totalPage = ref<number>(0);
  const commits = ref<ICommit[]>([]);

  const { isLoading, isFetching, data, error } = useQuery({
    queryKey: ["commit", filter],
    queryFn: () => getCommit(filter),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });

  watchEffect(() => {
    if (data.value?.count) {
      totalPage.value = Math.ceil(data.value.count / filter.limit);
      commits.value = data.value.results;
    }
  });

  return { isLoading, isFetching, totalPage, data: commits, error };
};
