<template>
    <q-layout>
        <AppBar />
        <q-page-container class="bg-grey-1">
            <router-view />
        </q-page-container>
    </q-layout>
</template>

<script lang="ts" setup>
import { watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import AppBar from '../components/layout/AppBar.vue';
import { useUser } from '../composables/user/auth';
import '../services/api/index'
import { useAuthUserStore } from '../store/user';

const router = useRouter()

const { init, auth } = useUser()
init()


const authUserStore = useAuthUserStore()

watchEffect(() => {
    if (!authUserStore.authUser.token) {
        router.push("/login")
    } else {
        router.push('/')
    }
})



</script>