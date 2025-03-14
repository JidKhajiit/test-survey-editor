// в режиме редактирования сделать табы
параметры/вопросы/логика/условия/респонденты, добавление опроса, удаление опроса
<script setup lang="ts">
import SurveyCard from "./Survey.vue";
import type { Survey } from "../assets/types";

const props = defineProps<{
  surveys: Survey[];
}>();
const emit = defineEmits<{
  edit: [id: Number];
  delete: [id: Number];
}>();
</script>

<template>
  <header>
    <h1>Список опросов</h1>
  </header>
  <main>
    <p v-if="!props.surveys.length">Опросов пока нет(</p>
    <table v-else>
      <thead class="table-head">
        <tr>
          <th style="min-width: 40px">Id</th>
          <th style="min-width: 180px">Название</th>
          <th style="width: 100%">Описание</th>
          <th style="min-width: 180px">Автор</th>
          <th style="min-width: 100px"></th>
        </tr>
      </thead>
      <tbody>
        <SurveyCard
          v-for="survey in props.surveys"
          :survey="survey"
          @edit="(id) => emit('edit', id)"
          @delete="(id) => emit('delete', id)"
        />
      </tbody>
    </table>
  </main>
</template>

<style lang="scss" scoped>
.el-card {
  width: 100%;
}
</style>
