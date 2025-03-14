// в режиме редактирования сделать табы
параметры/вопросы/логика/условия/респонденты, добавление опроса, удаление опроса
<script setup lang="ts">
import { ref } from "vue";
import { Delete, Edit } from "@element-plus/icons-vue";
import type { Survey } from "../assets/types";

const props = defineProps<{
  survey: Survey;
}>();
const emit = defineEmits<{
  edit: [id: Number];
  delete: [id: Number];
}>();

const isDelConfirmModalVisible = ref(false);

const confirmDelete = () => {
  isDelConfirmModalVisible.value = false;
  emit("delete", props.survey.id);
};
</script>

<template>
  <tr class="el-card is-always-shadow el-card__body">
    <td style="min-width: 40px">{{ props.survey.id }}</td>
    <td style="min-width: 180px">{{ props.survey.label }}</td>
    <td style="width: 100%">{{ props.survey.about }}</td>
    <td style="min-width: 180px">{{ props.survey.author }}</td>
    <td>
      <div class="controls">
        <el-button
          type="primary"
          :icon="Edit"
          circle
          @click="emit('edit', props.survey.id)"
        />
        <el-button
          type="danger"
          :icon="Delete"
          circle
          @click="isDelConfirmModalVisible = true"
        />
      </div>
    </td>
  </tr>

  <el-dialog
    v-model="isDelConfirmModalVisible"
    :modal="true"
    title="Подтверждение удаления"
    width="400px"
  >
    <span>Вы уверены, что хотите удалить опрос "{{ props.survey.label }}"?</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="isDelConfirmModalVisible = false">Отмена</el-button>
        <el-button type="danger" @click="confirmDelete">Удалить</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
.el-card > * {
  text-align: left;
  padding: 0 12px;
}
.controls {
  display: flex;
  align-items: center;
}
</style>
