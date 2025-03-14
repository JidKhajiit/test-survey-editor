<script setup lang="ts">
import { ref } from "vue";
import { Delete, Edit, Plus } from "@element-plus/icons-vue";
import type { Survey, Question } from "../assets/types";

const props = defineProps<{
  survey: Survey;
}>();
const emit = defineEmits<{
  save: [survey: Survey];
}>();

const questions = ref([...props.survey.questions]);

const addQuestion = () => {
  const newId = Math.max(...questions.value.map(q => Number(q.id)), -1) + 1;
  questions.value.push({
    id: newId,
    label: `Вопрос ${newId + 1}`,
    answers: [
      { id: 0, label: 'Ответ 1' },
      { id: 1, label: 'Ответ 2' }
    ]
  });
};

const deleteQuestion = (questionId: Number) => {
  questions.value = questions.value.filter(q => q.id !== questionId);
};

const save = () => {
  emit("save", {
    ...props.survey,
    questions: questions.value
  });
};
</script>

<template>
  <main class="questions-editor">
    <h2>Редактор вопросов</h2>
    <p v-if="!questions.length" class="empty-state">Вопросов пока нет(</p>
    <el-scrollbar v-else height="400px">
      <el-card
        v-for="question in questions"
        :key="question.id"
        class="question-card"
      >
        <div class="question-header">
          <h3>{{ question.label }}</h3>
          <div class="question-controls">
            <el-button
              type="primary"
              :icon="Edit"
              circle
              size="small"
            />
            <el-button
              type="danger"
              :icon="Delete"
              circle
              size="small"
              @click="() => deleteQuestion(question.id)"
            />
          </div>
        </div>
        <div class="answers-list">
          <div
            v-for="answer in question.answers"
            :key="answer.id"
            class="answer-item"
          >
            {{ answer.label }}
          </div>
        </div>
      </el-card>
    </el-scrollbar>
    <el-button
      class="button-add"
      type="primary"
      :icon="Plus"
      @click="addQuestion"
    >
      Добавить вопрос
    </el-button>
  </main>

  <footer class="editor-controls">
    <el-button plain @click="save">Сохранить</el-button>
  </footer>
</template>

<style lang="scss" scoped>
.questions-editor {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.empty-state {
  color: #909399;
  font-style: italic;
}

.question-card {
  margin-bottom: 16px;
  width: 100%;
}

.question-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;

  h3 {
    margin: 0;
    color: #303133;
  }
}

.question-controls {
  display: flex;
  gap: 8px;
}

.answers-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.answer-item {
  padding: 8px 12px;
  background-color: #f5f7fa;
  border-radius: 4px;
  color: #606266;
}

.editor-controls {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
  width: 100%;
}

.button-add {
  margin-top: 20px;
}
</style>
