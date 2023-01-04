<template>
    <q-card>
        <q-card-section>
            <q-form @submit="submit">
                <q-input v-model="formData.title" label="Title" />
                <q-input v-model="formData.language" label="Language" />
                <q-input v-model="formData.description" type="textarea" :min-row="2" label="Describtion" />
            </q-form>
        </q-card-section>
        <q-card-actions>
            <q-btn :label="isEdited ? 'Update' : 'Create'" :loading="formLoading" />
        </q-card-actions>
    </q-card>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { IRecord } from '../../../interfaces/record';
const formData = ref<{ title: string, description: string, language?: string }>({ title: "", description: "", language: "" })
const formLoading = ref<boolean>(false)

const { record, isEdited = false } = defineProps<{ record?: IRecord, isEdited?: boolean }>()
if (record?.id) {
    formData.value.title = record.title
    formData.value.description = record.description
    formData.value.language = record.language
}

const submit = () => {
    formLoading.value = true
}
</script>