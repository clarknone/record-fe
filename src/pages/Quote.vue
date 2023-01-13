
<template>

    <q-page class="q-pa-md">
        <div class="row justify-between items-center">
            <h6> All Quotes </h6>
            <div>
                <q-btn round flat icon="fas fa-plus" @click="toggleDialog()" />
            </div>

        </div>

        <div class="row q-col-gutter-sm" v-if="data.length">
            <div class="col-12 col-sm-6 col-md-4 col-lg-3" v-for="quote in data">
                <SingleQuote :quote="quote" :edit-callback="() => toggleDialog(quote)" />
            </div>
            <div class="col-12">
                <q-pagination v-if="totalPage > 1" @update:model-value="updatePagination" v-model="pagination.page"
                    :max="totalPage" />
            </div>
        </div>
        <div v-else-if="isLoading">
            <q-linear-progress indeterminate />
        </div>
        <div v-else>
            <h6 class="text-center"> No Quote available </h6>
        </div>
    </q-page>

    <q-dialog v-model="dialog">
        <div style="max-width:'800px'; width: 100%;">
            <q-toolbar class="bg-primary text-white">
                <q-toolbar-title> Add New Quote </q-toolbar-title>
                <q-space />
                <q-btn icon="fas fa-times" round @click="() => toggleDialog()" />
            </q-toolbar>
            <AddQuote :is-edited="isEditing" :quote="activeQuote" />
        </div>
    </q-dialog>

</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import AddQuote from '../components/quote/modal/AddQuote.vue';
import SingleQuote from '../components/quote/single/SingleQuote.vue';
import { useQuoteQuery, useDeleteMutation } from '../composables/quote/';
import { IFilter } from '../interfaces/query';
import { IQuote } from '../interfaces/quote';


const filter = reactive<IFilter>({ page: 1, limit: 10 })
const dialog = ref<boolean>(false)
const activeQuote = ref<IQuote>()
const isEditing = ref<boolean>(false)

const toggleDialog = (quote?: IQuote) => {
    if (quote && !isEditing.value) {
        isEditing.value = true
        activeQuote.value = quote
    } else if (isEditing.value || activeQuote.value) {
        activeQuote.value = undefined
        isEditing.value = false
    }
    dialog.value = !dialog.value
}


const pagination = reactive({ page: filter.page, rowsPerPage: filter.limit, rowsNumber: 100 })


const updatePagination = (val: any) => {
    pagination.page = val
    filter.page = val
}
const { isLoading, isFetching, totalPage, data } = useQuoteQuery(filter)

pagination.rowsNumber = totalPage.value

</script>