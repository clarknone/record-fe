<template>
    <q-card>
        <q-form @submit="submit">
            <q-card-section>
                <q-input v-model="formData.email" label="Email" type="email" required />
                <q-input v-model="formData.full_name" label="Full Name" required />
                <q-input v-model="formData.phone" label="Phone" required />
                <q-input v-model="formData.password" label="Password" type="password" required />
            </q-card-section>
            <q-card-actions align="right">
                <q-btn type="submit" color="primary" label="Create Account" :loading="isLoading" />
            </q-card-actions>
        </q-form>
    </q-card>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUser } from '../../composables/user/auth';
import { AuthRegister } from '../../interfaces/auth'

const emit = defineEmits<{ (e: "login",): void }>()

const formData = ref<AuthRegister>({ email: "", password: "", phone: '', full_name: '' })
const isLoading = ref<boolean>(false)

const { signup } = useUser()
const router = useRouter()

const submit = () => {
    signup(formData.value).then(() => {
        router.replace("/")
        emit("login")
    }).catch(e => {
        // console.log(e)
    }).finally(() => {
        isLoading.value = false
    })
}
</script>