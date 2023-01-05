
<template>
    <q-card>
        <q-card-section>
            <h6 class="q-my-sm"> {{ commit.title }} </h6>
            <p style="word-break:break-all;"> Previous Hash: {{ commit.previous_hash }} </p>
            <p class="q-my-none" style="word-break:break-all;"> Hash: {{ commit.hash }} </p>
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