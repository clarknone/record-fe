<template>
    <q-card>
        <q-card-section>
            <p class="text-right">
                <q-chip text-color="white" size="small" class="text-capitalize"
                    :label="new Date(quote.date || '').toLocaleDateString()" color="accent" square />
            </p>
            <p>{{ quote.text }}</p>
        </q-card-section>
        <q-card-actions align="right">
            <div class="q-gutter-sm">
                <q-btn size="small" outline style="font-size: 0.6em;" @click="editCallback && editCallback(quote)"
                    unelevated color="primary" label="Edit" no-caps />
                <q-btn icon="fas fa-trash" unelevated outline color="primary" flat no-caps :loading="isLoading"
                    @click="() => mutate(quote)" style="font-size: 0.6em;" />
            </div>
        </q-card-actions>
    </q-card>
</template>

<script lang="ts" setup>
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { IQuote } from "../../../interfaces/quote";
import { deleteQuote } from "../../../services/api/quote";
const { quote, editCallback } = defineProps<{
    quote: IQuote;
    editCallback?: (quote: IQuote) => void;
}>();

const queryClient = useQueryClient()

const { isLoading, isError, mutate } = useMutation({
    mutationFn: (data: IQuote) => deleteQuote(data),
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['quote'] })
    }
})

</script>
