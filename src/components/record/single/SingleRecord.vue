<template>
    <q-card style="height: 100%;">
        <q-card-section>
            <p class="text-right">
                <q-chip text-color="white" size="small" class="text-capitalize" :label="record.language" color="accent"
                    square />
            </p>
            <h6 class="q-my-sm">{{ record.title }}</h6>
            <p>{{ record.description }}</p>
        </q-card-section>
        <q-card-actions align="between">
            <div class="q-gutter-sm">
                <q-btn size="small" outline style="font-size: 0.6em;" @click="editCallback && editCallback(record)"
                    unelevated color="primary" label="Edit" no-caps />
                <q-btn outline @click="commitCallback && commitCallback(record)" style="font-size: 0.6em;" unelevated
                    color="primary" label="Commit" no-caps />
            </div>
            <q-btn icon="fas fa-trash" unelevated outline color="primary" flat no-caps :loading="isLoading"
                @click="() => mutate(record)" style="font-size: 0.6em;" />
        </q-card-actions>
    </q-card>
</template>

<script lang="ts" setup>
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { IRecord } from "../../../interfaces/record";
import { deleteRecord } from "../../../services/api/record";
const { record, editCallback, commitCallback } = defineProps<{
    record: IRecord;
    commitCallback: (record: IRecord) => void;
    editCallback?: (record: IRecord) => void;
}>();

const queryClient = useQueryClient()

const { isLoading, isError, mutate } = useMutation({
    mutationFn: (data: IRecord) => deleteRecord(data),
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['record'] })
    }
})

</script>
