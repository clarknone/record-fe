
<template>
    <q-card style="height: 100%;">
        <q-card-section>
            <p class="text-right">
                <q-chip text-color="white" size="small" class="text-capitalize" :label="commit.language" color="accent"
                    square />
            </p>
            <!-- <p class="q-my-none" style="text-overflow: ellipsis;overflow: hidden;"> Hash:{{ commit.hash }} </p> -->
            <h6 class="q-my-none q-mb-sm"> {{ commit.title }} </h6>
            <div class="row justify-between">
                <p class="q-my-none"> Commit Hash: {{ commit.commit_hash }} </p>
                <p> Date: {{ commit.date && new Date(commit.date).toLocaleDateString() }} </p>
            </div>
        </q-card-section>
    </q-card>
</template>


<script lang="ts" setup>
import { ICommit } from '../../../interfaces/commit'
const { commit } = defineProps<{ commit: ICommit }>()
</script>