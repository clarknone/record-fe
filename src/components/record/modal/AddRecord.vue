<template>
    <q-card>
        <q-form @submit="submit">
            <q-card-section>
                <q-input v-model="formData.title" label="Title" />
                <q-input v-model="formData.language" label="Language" />
                <q-input v-model="formData.description" type="textarea" :min-row="2" label="Describtion" />
            </q-card-section>
            <q-card-actions>
                <q-btn type="submit" :label="isEdited ? 'Update' : 'Create'" :loading="isLoading" />
            </q-card-actions>
        </q-form>
    </q-card>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { IRecord } from '../../../interfaces/record';
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { createRecord, updateRecord } from '../../../services/api/record';


const queryClient = useQueryClient()

const formData = ref<IRecord>({ title: "", description: "", language: "", id: undefined })

const { record, isEdited = false } = defineProps<{ record?: IRecord, isEdited?: boolean }>()
if (record?.id) {
    formData.value.title = record.title
    formData.value.description = record.description
    formData.value.language = record.language
    formData.value.id = record.id
}


const { isLoading, isError, error, isSuccess, mutate } = useMutation({
    mutationFn: (data: IRecord) => isEdited ? updateRecord(data) : createRecord(data),
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['record'] })
        formData.value = { title: "", description: "", language: "" }
    }
})

const submit = () => {
    mutate(formData.value)

}
</script>