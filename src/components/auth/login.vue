<template>
    <q-card>
        <q-form @submit="submit">
            <q-card-section>
                <q-input v-model="formData.email" label="Email" type="email" required />
                <q-input v-model="formData.password" label="Password" type="password" required />
            </q-card-section>
            <q-banner v-if="errorMessage" class="bg-red text-white q-mx-md">
                {{ errorMessage }}
            </q-banner>
            <q-card-actions align="right">
                <q-btn type="submit" color="primary" label="Login" :loading="isLoading" />
            </q-card-actions>
        </q-form>
    </q-card>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUser } from '../../composables/user/auth';
import { AuthLogin } from '../../interfaces/auth'

const emit = defineEmits<{ (e: "login",): void }>()

const formData = ref<AuthLogin>({ email: "", password: "" })
const isLoading = ref<boolean>(false)
const errorMessage = ref<string>('')

const router = useRouter()

const { login } = useUser()

const submit = () => {
    errorMessage.value = ''
    login(formData.value).then(() => {
        router.push("/")
        emit("login")
    }).catch(e => {
        errorMessage.value = e.message
        console.log(e.message)
    }).finally(() => {
        isLoading.value = false
    })
}
</script>