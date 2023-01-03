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
                        <q-btn round flat icon="fas fa-plus" color="primary" />
                    </div>
                </div>
                <div class="column q-gutter-sm">
                    <SingleRecord :record="record" v-for="record in records" :key="record.id" />
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
</template>

<script lang="ts" setup>
import SingleRecord from "../components/record/single/SingleRecord.vue";
import SingleCommit from "../components/record/single/SingleCommit.vue";

import { IRecord } from "../interfaces/record";
import { ICommit } from "../interfaces/commit";

const records: IRecord[] = [
    {
        title: "Build Project",
        description: "this is the description for build project",
        id: 2,
        date_created: new Date(),
    },
    {
        title: "Build Project 2",
        description: "this is the description for build project 2",
        id: 1,
        date_created: new Date(),
    },
];
const commits: ICommit[] = [
    {
        title: "Build Project",
        hash: "AWRTR",
        description: "this is the description for build project",
        id: 2,
        commit_hash: "AWRER",
        previous_hash: "AWRER",
        date: new Date(),
    },
    {
        title: "Build Project2",
        hash: "AWRTR",
        description: "this is the description for build project2",
        id: 1,
        commit_hash: "AWRER",
        previous_hash: "AWRER",
        date: new Date(),
    },
];
</script>
