
<template>

    <q-page class="q-pa-md">
        <div>
            <h6> All Records </h6>
            <q-table flat hide-pagination :rows="data" :columns="(columns as any)" :loading="isLoading || isFetching">
                <template v-slot:body-cell-index="props">
                    <q-td :props="props">
                        {{ props.rowIndex + ((pagination.page - 1) * pagination.rowsPerPage) + 1 }}
                    </q-td>
                </template>
                <template v-slot:body-cell-action="props">
                    <q-td :props="props">
                        <q-btn size="small" icon="fas fa-edit" round style="font-size: 0.6em;"
                            @click="() => toggleDialog('record', props.row)" flat color="primary" no-caps />
                        <q-btn round icon="fas fa-save" @click="toggleDialog('commit', props.row)" style="font-size: 0.6em;"
                            color="primary" no-caps />
                        <q-btn round icon="fas fa-trash" unelevated outline color="primary" flat no-caps
                            :loading="isLoading" @click="() => mutate(props.row)" style="font-size: 0.6em;" />
                    </q-td>
                </template>

            </q-table>

            <q-pagination v-if="totalPage > 1" @update:model-value="updatePagination" v-model="pagination.page"
                :max="totalPage" />
        </div>
    </q-page>

    <q-dialog v-model="dialog.record">
        <div style="max-width:'800px'; width: 100%;">
            <q-toolbar class="bg-primary text-white">
                <q-toolbar-title> Add New Record </q-toolbar-title>
                <q-space />
                <q-btn icon="fas fa-times" round @click="() => toggleDialog('record')" />
            </q-toolbar>
            <AddRecord :is-edited="isEditing" :record="activeRecord" />
        </div>
    </q-dialog>

    <q-dialog v-model="dialog.commit">
        <div style="max-width:'800px'; width: 100%;">
            <q-toolbar class="bg-primary text-white">
                <q-toolbar-title> Commit Record </q-toolbar-title>
                <q-space />
                <q-btn icon="fas fa-times" round @click="() => toggleDialog('commit')" />
            </q-toolbar>
            <AddCommit :record="activeRecord" />
        </div>
    </q-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import AddCommit from '../components/record/modal/AddCommit.vue';
import AddRecord from '../components/record/modal/AddRecord.vue';
import { useRecordQuery, useDeleteMutation } from '../composables/record/record';
import { IFilter } from '../interfaces/query';
import { IRecord } from '../interfaces/record';


const filter = reactive<IFilter>({ page: 1, limit: 10 })
const dialog = reactive<{ [index: string]: boolean }>({ login: false, signup: false })
const activeRecord = ref<IRecord>()
const isEditing = ref<boolean>(false)

const toggleDialog = (type: string, record?: IRecord) => {
    if (record && !isEditing.value) {
        isEditing.value = true
        activeRecord.value = record
    } else if (isEditing.value || activeRecord.value) {
        activeRecord.value = undefined
        isEditing.value = false
    }
    dialog[type] = !dialog[type]
}


const pagination = reactive({ page: filter.page, rowsPerPage: filter.limit, rowsNumber: 100 })


interface IColumn {
    name: string
    label: string,
    field?: string,
    align?: "left" | "right" | "center";
    format?: (val: any, row: any) => any;
}

const columns: IColumn[] = [
    {
        name: "index",
        label: "S/N",
        align: "left",
    },
    {
        name: "title",
        label: "Title",
        align: "left",
        field: "title",
    },
    {
        name: "language",
        label: "Language",
        field: "language",
        align: "left",
    },
    {
        name: "description",
        label: "Description",
        align: "left",
        field: "description",
    }, {
        name: "action",
        label: "Actions",
        align: "left",
        // field: "description",
    },
]

const updatePagination = (val: any) => {
    pagination.page = val
    filter.page = val
}
const { isLoading, isFetching, totalPage, data } = useRecordQuery(filter)
const { isLoading: deleteLoading, mutate } = useDeleteMutation()
pagination.rowsNumber = totalPage.value

</script>