<script setup lang="ts">
import { ref } from 'vue';
import type { Survey } from '../assets/types';


const props = defineProps<{
  survey: Survey
}>();

const count = ref(0)
</script>

<template>
  <h3>Редактор вопросов</h3>
  <h4 v-for="question in props.survey.questions">{{ question.label }}</h4>

</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
