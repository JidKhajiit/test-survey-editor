<script setup lang="ts">
import { Plus } from "@element-plus/icons-vue";
import SurveyCard from "./Survey.vue";
import type { Survey } from "../assets/types";

const props = defineProps<{
  surveys: Survey[];
  isLoading: boolean;
  error: string | null;
}>();

const emit = defineEmits<{
  edit: [id: Number];
  delete: [id: Number];
  add: [];
  retry: [];
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
    <el-skeleton v-if="isLoading" :rows="5" animated />
    
    <el-alert
      v-else-if="error"
      type="error"
      :title="error"
      show-icon
      closable
      @close="emit('retry')"
    />

    <p v-else-if="!props.surveys.length" class="empty-state">
      Опросов пока нет(
    </p>

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

.empty-state {
  color: #909399;
  font-style: italic;
  text-align: center;
  padding: 20px;
}
</style>
