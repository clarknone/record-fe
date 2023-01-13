<template>
    <q-card>
        <q-form @submit="submit">
            <q-card-section>
                <h6> {{ record?.title }} will be commited </h6>
                <q-input v-model="formData.commit_hash" label="Commit Hash" />
            </q-card-section>
            <q-card-actions align="right">
                <q-btn type="submit" color="primary" label="Commit" :loading="isLoading" />
            </q-card-actions>
        </q-form>
    </q-card>
</template>

<script lang="ts" setup>
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { ref } from 'vue';
import { ICommit } from '../../../interfaces/commit';
import { IRecord } from '../../../interfaces/record';
import { createCommit } from '../../../services/api/commit';

const queryClient = useQueryClient()

const formData = ref<ICommit>({ commit_hash: "" })
const { record } = defineProps<{ record?: IRecord }>()


const { isLoading, isError, error, isSuccess, mutate } = useMutation({
    mutationFn: (data: ICommit) => createCommit(data),
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['record'] })
        queryClient.invalidateQueries({ queryKey: ['commit'] })
        formData.value = { commit_hash: "" }
    }
})

const submit = () => {
    mutate({ ...formData.value, record_id: record?.id })
}
</script>