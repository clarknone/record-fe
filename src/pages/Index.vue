<template>
    <q-page class="q-pa-md">
        <div>
            <h4>Track and monitor project tasks</h4>
        </div>
        <div class="row q-col-gutter-md">
            <div class=" col-12 col-md-7">
                <div class="row justify-between items-center">
                    <h6>Records</h6>
                    <div>
                        <q-btn @click="toggleDialog" round flat icon="fas fa-plus" color="primary" />
                    </div>
                </div>
                <div class="column q-gutter-sm">
                    <SingleRecord :commit-callback="() => toggleCommitDialog(record)"
                        :edit-callback="() => openEditDialog(record)" :record="record" v-for="record in records"
                        :key="record.id" />
                </div>
            </div>
            <div class=" col-12 col-md-5">
                <h6>Commits</h6>
                <div class="column q-gutter-sm">
                    <SingleCommit :commit="commit" v-for="commit in commits" :key="commit.id" />
                </div>
            </div>
        </div>
    </q-page>

    <q-dialog v-model="createDialog">
        <div style="max-width:'800px'; width: 100%;">
            <q-toolbar class="bg-primary text-white">
                <q-toolbar-title> Add New Record </q-toolbar-title>
                <q-space />
                <q-btn icon="fas fa-times" round @click="toggleDialog" />
            </q-toolbar>
            <AddRecord :is-edited="isEditing" :record="activeRecord" />
        </div>
    </q-dialog>

    <q-dialog v-model="commitDialog">
        <div style="max-width:'800px'; width: 100%;">
            <q-toolbar class="bg-primary text-white">
                <q-toolbar-title> Commit Record </q-toolbar-title>
                <q-space />
                <q-btn icon="fas fa-times" round @click="() => toggleCommitDialog()" />
            </q-toolbar>
            <AddCommit :record="activeRecord" />
        </div>
    </q-dialog>
</template>

<script lang="ts" setup>
import SingleRecord from "../components/record/single/SingleRecord.vue";
import SingleCommit from "../components/record/single/SingleCommit.vue";
import AddRecord from "../components/record/modal/AddRecord.vue";
import AddCommit from "../components/record/modal/AddCommit.vue";
import { useQuery } from '@tanstack/vue-query'

import { IRecord } from "../interfaces/record";
import { ICommit } from "../interfaces/commit";
import { ref } from "vue";
import { getRecord } from "../services/api/record";
import { getCommit } from "../services/api/commit";

const activeRecord = ref<IRecord>()
const createDialog = ref<boolean>(false)
const commitDialog = ref<boolean>(false)
const isEditing = ref<boolean>(false)

const { isLoading,  isError, data: records, error } = useQuery({
    queryKey: ['record'],
    queryFn: () => getRecord(),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
})

const { isLoading: commitLoading, data: commits, error: commitError } = useQuery({
    queryKey: ['commit'],
    queryFn: () => getCommit(),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
})

const openEditDialog: (record: IRecord) => void = (current: IRecord): void => {
    activeRecord.value = current
    isEditing.value = true
    createDialog.value = true
}

const toggleDialog = () => {
    activeRecord.value = undefined
    isEditing.value = false
    createDialog.value = !createDialog.value
}
const toggleCommitDialog = (record?: IRecord) => {
    commitDialog.value = !commitDialog.value
    activeRecord.value = record
}
</script>
