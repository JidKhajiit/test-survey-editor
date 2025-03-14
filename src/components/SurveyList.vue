// в режиме редактирования сделать табы
параметры/вопросы/логика/условия/респонденты, добавление опроса, удаление опроса
<script setup lang="ts">
import { Plus } from "@element-plus/icons-vue";
import SurveyCard from "./Survey.vue";
import type { Survey } from "../assets/types";

const props = defineProps<{
  surveys: Survey[];
}>();
const emit = defineEmits<{
  edit: [id: Number];
  delete: [id: Number];
  add: [];
}>();
</script>

<template>
    <header class="list-header">
      <h1>Список опросов</h1>
      <el-button
        type="primary"
        :icon="Plus"
        @click="emit('add')"
      >
        Добавить опрос
      </el-button>
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
          :key="survey.id"
          :survey="survey"
          @edit="(id) => emit('edit', id)"
          @delete="(id) => emit('delete', id)"
        />
      </tbody>
    </table>
  </main>
</template>

<style lang="scss" scoped>
.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;

  h1 {
    margin: 0;
  }
}
.table-head {
    margin-bottom: 20px;
}
</style>
