<template>
    <q-header>
        <q-toolbar>
            <q-toolbar-title> Record </q-toolbar-title>
            <q-space />
            <div v-if="!authUserStore.authUser.token" class="row">
                <q-btn label="Login" @click="() => toggleDialog('login')" color="primary" />
                <q-btn label="Create Account" @click="() => toggleDialog('signup')" color="primary" />
            </div>
            <q-btn v-else label="Logout" @click="logout" color="primary" />
        </q-toolbar>
    </q-header>

    <q-dialog v-model="dialog.login">
        <div style="max-width:'800px'; width: 100%;">
            <q-toolbar class="bg-primary text-white">
                <q-toolbar-title> Login </q-toolbar-title>
                <q-space />
                <q-btn icon="fas fa-times" round @click="() => toggleDialog('login')" />
            </q-toolbar>
            <Login @login="() => toggleDialog('login')" />
        </div>
    </q-dialog>

    <q-dialog v-model="dialog.signup">
        <div style="max-width:'800px'; width: 100%;">
            <q-toolbar class="bg-primary text-white">
                <q-toolbar-title> Create Account </q-toolbar-title>
                <q-space />
                <q-btn icon="fas fa-times" round @click="() => toggleDialog('signup')" />
            </q-toolbar>
            <Signup @login="() => toggleDialog('signup')" />
        </div>
    </q-dialog>

</template>


<script lang="ts" setup>
import { reactive } from 'vue';
import { useUser } from '../../composables/user/auth';
import { useAuthUserStore } from '../../store/user';
import Login from '../auth/login.vue';
import Signup from '../auth/signup.vue';

const authUserStore = useAuthUserStore()

const { logout } = useUser()

const dialog = reactive<{ [index: string]: boolean }>({ login: false, signup: false })

const toggleDialog = (type: string) => {
    dialog[type] = !dialog[type]
}

</script>