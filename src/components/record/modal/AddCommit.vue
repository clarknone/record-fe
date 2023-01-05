<template>
    <q-card>
        <q-form @submit="submit">
            <q-card-section>
                <h6> {{ record?.title }} will be commited </h6>
                <q-input v-model="formData.commit_hash" label="Commit Hash" />
            </q-card-section>
            <q-card-actions>
                <q-btn type="submit" label="Commit" :loading="isLoading" />
            </q-card-actions>
        </q-form>
    </q-card>
</template>

<script lang="ts" setup>
import { useMutation } from '@tanstack/vue-query';
import { ref } from 'vue';
import { ICommit } from '../../../interfaces/commit';
import { IRecord } from '../../../interfaces/record';
import { createCommit } from '../../../services/api/commit';

const formData = ref<ICommit>({ commit_hash: "" })
const { record } = defineProps<{ record?: IRecord }>()


const { isLoading, isError, error, isSuccess, mutate } = useMutation({
    mutationFn: (data: ICommit) => createCommit(data),
    onSuccess: () => {
        formData.value = { commit_hash: "" }
    }
})

const submit = () => {
    mutate(formData.value)
}
</script>