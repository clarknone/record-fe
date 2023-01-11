
<template>

    <q-page>
        <div style="min-height: calc(100vh - 40px);display: flex;justify-content: center;align-items: center;">
            <q-card flat>
                <h4 class="q-my-sm"> It's like you are not logged in </h4>
                <q-card-actions align="center" style="gap: 20px;">
                    <q-btn label="Login" color="primary" @click="() => toggleDialog('login')" />
                    <q-btn label="Sign Up" color="primary" @click="() => toggleDialog('signup')" />
                </q-card-actions>
            </q-card>
        </div>
    </q-page>


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
import Login from '../components/auth/login.vue';
import Signup from '../components/auth/signup.vue';


const dialog = reactive<{ [index: string]: boolean }>({ login: false, signup: false })

const toggleDialog = (type: string) => {
    dialog[type] = !dialog[type]
}

</script>