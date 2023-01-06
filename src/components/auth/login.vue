<template>
    <q-card>
        <q-form @submit="submit">
            <q-card-section>
                <q-input v-model="formData.email" label="Email" type="email" required />
                <q-input v-model="formData.password" label="Password" type="password" required />
            </q-card-section>
            <q-card-actions>
                <q-btn type="submit" label="Login" :loading="isLoading" />
            </q-card-actions>
        </q-form>
    </q-card>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useUser } from '../../composables/user/auth';
import { AuthLogin } from '../../interfaces/auth'

const emit = defineEmits<{ (e: "login",): void }>()

const formData = ref<AuthLogin>({ email: "", password: "" })
const isLoading = ref<boolean>(false)

const { login } = useUser()

const submit = () => {
    login(formData.value).then(() => {
        emit("login")
    }).catch(e => {
        console.log(e)
    }).finally(() => {
        isLoading.value = false
    })
}
</script>