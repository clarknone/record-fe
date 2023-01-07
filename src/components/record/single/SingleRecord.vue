<template>
    <q-card>
        <q-card-section>
            <h6 class="q-my-sm">{{ record.title }}</h6>
            <p>{{ record.description }}</p>
        </q-card-section>
        <q-card-actions align="right">
            <q-btn @click="editCallback && editCallback(record)" unelevated color="primary" label="Edit" no-caps />
            <q-btn unelevated color="primary" label="Delete" no-caps :loading="isLoading"
                @click="() => mutate(record)" />
            <q-btn @click="commitCallback && commitCallback(record)" unelevated color="primary" label="Commit"
                no-caps />
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
