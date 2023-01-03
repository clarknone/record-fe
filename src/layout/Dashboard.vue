<template>
    <q-layout>
        <AppBar />
        <q-page-container>
            <router-view />
        </q-page-container>
    </q-layout>
</template>

<script lang="ts" setup>
import AppBar from '../components/layout/AppBar.vue';
</script>