
<template>

    <q-page class="q-pa-md">
        <div>
            <h6> All Records </h6>
            <q-table flat hide-pagination v-model:pagination="pagination" :rows="data" :columns="(columns as any)"
                :loading="isLoading || isFetching">
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
import { useCommitQuery } from '../composables/record/commit';
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
        name: "hash",
        label: "Hash",
        align: "left",
        field: "hash",
    },
    {
        name: "commitHash",
        label: "Commit Hash",
        align: "left",
        field: "commit_hash",
    },
    //  {
    //     name: "previousHash",
    //     label: "Previous Hash",
    //     align: "left",
    //     field: "previous_hash",
    // }, 
    {
        name: "title",
        label: "Title",
        align: "left",
        field: "title",
    },
    {
        name: "date",
        label: "Date",
        align: "left",
        field: "date",
        format: (val) => new Date(val).toLocaleDateString()
    },
]

const updatePagination = (val: any) => {
    pagination.page = val
    filter.page = val
}

const { isLoading, isFetching, data, totalPage } = useCommitQuery(filter)
pagination.rowsNumber = totalPage.value

</script>