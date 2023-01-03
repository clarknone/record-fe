<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string }>()

const count = ref(0)
</script>

<template>
  <div>
    <q-layout view="lHh lpr lFf" container style="height: 400px">
      <q-header elevated>
        <q-toolbar>
          <q-toolbar-title> hellow World </q-toolbar-title>
        </q-toolbar>
      </q-header>
    </q-layout>

  </div>
</template>