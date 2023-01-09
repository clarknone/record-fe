<template>
    <q-layout>
        <AppBar />
        <q-page-container class="bg-grey-1">
            <router-view />
        </q-page-container>
    </q-layout>
</template>

<script lang="ts" setup>
import AppBar from '../components/layout/AppBar.vue';
import { useUser } from '../composables/user/auth';
import '../services/api/index'


const { init } = useUser()
init()

</script>