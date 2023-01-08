
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

            </q-table>

            <q-pagination v-if="totalPage > 1" @update:model-value="updatePagination" v-model="pagination.page"
                :max="totalPage" />
        </div>
    </q-page>

</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { useRecordQuery } from '../composables/record/record';
import { IFilter } from '../interfaces/query';


const filter = reactive<IFilter>({ page: 1, limit: 10 })

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
    }, {
        name: "description",
        label: "Description",
        align: "left",
        field: "description",
    },
]

const updatePagination = (val: any) => {
    pagination.page = val
    filter.page = val
}
const { isLoading, isFetching, totalPage, data } = useRecordQuery(filter)
pagination.rowsNumber = totalPage.value

</script>