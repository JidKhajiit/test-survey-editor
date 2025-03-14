<script setup lang="ts">
import type { Survey } from "../assets/types";

const props = defineProps<{
  survey: Survey;
}>();
</script>

<template>
  <h2>Редактор вопросов</h2>
  <p v-if="!props.survey.questions.length">Вопросов пока нет(</p>

  <ul v-else>
    <li v-for="question in props.survey.questions">{{ question.label }}</li>
  </ul>
</template>
