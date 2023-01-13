import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { ref, watchEffect } from "vue";
import { IFilter } from "../../interfaces/query";
import { IQuote } from "../../interfaces/quote";
import {
  deleteQuote,
  getQuotes,
  getTodayQuote,
  updateQuote,
} from "../../services/api/quote";

export const useQuoteQuery = (filter: IFilter = { page: 1, limit: 10 }) => {
  const totalPage = ref<number>(0);
  const quotes = ref<IQuote[]>([]);

  const { isLoading, data, isFetching, error } = useQuery({
    queryKey: ["quote", filter],
    queryFn: () => getQuotes(filter),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });

  watchEffect(() => {
    if (data.value?.count) {
      totalPage.value = Math.ceil(data.value.count / filter.limit);
      quotes.value = data.value.results;
    }
  });

  return {
    isLoading,
    totalPage,
    isFetching,
    data: quotes,
    error: error,
  };
};

export const useTodayQuoteQuery = () => {
  const quote = ref<IQuote>();

  const { isLoading, data, isFetching, error } = useQuery({
    queryKey: ["quote", "today"],
    queryFn: () => getTodayQuote(),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });

  watchEffect(() => {
    if (data.value?.id) {
      quote.value = data.value;
    }
  });

  return {
    isLoading,
    isFetching,
    data: quote,
    error,
  };
};

export const useDeleteMutation = () => {
  const queryClient = useQueryClient();

  const { isLoading, isError, mutate } = useMutation({
    mutationFn: (data: IQuote) => deleteQuote(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quote"] });
    },
  });

  return { isLoading, isError, mutate };
};