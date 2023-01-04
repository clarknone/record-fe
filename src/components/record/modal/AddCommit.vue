<template>
    <q-card>
        <q-card-section>
            <h6> {{ record?.title }} will be commited </h6>
            <q-form @submit="submit">
                <q-input v-model="formData.commit_hash" label="Commit Hash" />
            </q-form>
        </q-card-section>
        <q-card-actions>
            <q-btn label="Commit" :loading="formLoading" />
        </q-card-actions>
    </q-card>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { IRecord } from '../../../interfaces/record';
const formData = ref<{ commit_hash: string }>({ commit_hash: "" })
const formLoading = ref<boolean>(false)

const { record } = defineProps<{ record?: IRecord }>()

const submit = () => {
    formLoading.value = true
}
</script>