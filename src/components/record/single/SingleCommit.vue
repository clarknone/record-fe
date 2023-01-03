
<template>
    <q-card>
        <q-card-section>
            <h6 class="q-my-sm"> {{ commit.title }} </h6>
            <p class="q-my-none"> Hash: {{ commit.hash }} </p>
            <p> Previous Hash: {{ commit.previous_hash }} </p>
        </q-card-section>
    </q-card>
</template>


<script lang="ts" setup>
import { ICommit } from '../../../interfaces/commit'
const { commit } = defineProps<{ commit: ICommit }>()
</script>