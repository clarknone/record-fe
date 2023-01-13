<template>
    <q-card>
        <q-form @submit="submit">
            <q-card-section>
                <q-input v-model="formData.text" type="textarea" :min-row="2" label="Quote" />
            </q-card-section>
            <q-card-actions align="right">
                <q-btn type="submit" color="primary" :label="isEdited ? 'Update' : 'Create'" :loading="isLoading" />
            </q-card-actions>
        </q-form>
    </q-card>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { IQuote } from '../../../interfaces/quote';
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { createQuote, updateQuote } from '../../../services/api/quote';


const queryClient = useQueryClient()

const formData = ref<IQuote>({ text: "",  id: undefined })

const { quote, isEdited = false } = defineProps<{ quote?: IQuote, isEdited?: boolean }>()
if (quote?.id) {
    formData.value.text = quote.text
    formData.value.id = quote.id
}


const { isLoading, isError, error, isSuccess, mutate } = useMutation({
    mutationFn: (data: IQuote) => isEdited ? updateQuote(data) : createQuote(data),
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['quote'] })
        formData.value = { text: "" }
    }
})

const submit = () => {
    mutate(formData.value)

}
</script>