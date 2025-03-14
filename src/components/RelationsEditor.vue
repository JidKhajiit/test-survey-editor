<script setup lang="ts">
import { Delete } from "@element-plus/icons-vue";
import type { Survey } from "../assets/types";
import { useRelations } from "../composables/useRelations";

const props = defineProps<{
  survey: Survey;
}>();
const emit = defineEmits<{
  save: [survey: Survey];
}>();

const {
  questions,
  relations,
  addRelation,
  updateRelation,
  deleteRelation,
  getValidRelations
} = useRelations(props.survey);

const save = () => {
  emit("save", {
    ...props.survey,
    relations: getValidRelations()
  });
};
</script>

<template>
  <main class="relations-editor">
    <h2>Редактор связей</h2>
    <p v-if="!relations.length" class="empty-state">Связей пока нет(</p>
    <el-scrollbar v-else height="200px">
      <el-card
        v-for="(relation, index) in relations"
        :key="index"
        shadow="always"
        class="relation-card"
      >
        <div class="relation-form">
          <span>Если</span>
          <el-select
            value-key="id"
            clearable
            v-model="relation.question"
            placeholder="Любой вопрос"
            @change="(q) => updateRelation(index, { question: q, answer: null })"
            class="question-select"
          >
            <el-option
              v-for="question in questions"
              :key="question.id"
              :label="question.label"
              :value="question"
            />
          </el-select>
          <el-select
            :disabled="!relation.question"
            clearable
            v-model="relation.answer"
            placeholder="Любой ответ"
            class="answer-select"
          >
            <el-option
              v-for="answer in relation.question?.answers"
              :key="answer.id"
              :label="answer.label"
              :value="answer.id"
            />
          </el-select>
          <span>перейти на</span>
          <el-select
            v-model="relation.relatedQuestion"
            clearable
            placeholder="Любой вопрос"
            class="question-select"
          >
            <el-option
              v-for="question in questions"
              :key="question.id"
              :label="question.label"
              :value="question.id"
              :disabled="question.id === relation.question?.id"
            />
          </el-select>
          <el-button
            type="danger"
            :icon="Delete"
            circle
            @click="() => deleteRelation(index)"
          />
        </div>
      </el-card>
    </el-scrollbar>
    <el-button class="button-add" @click="addRelation">
      Добавить связь
    </el-button>
  </main>

  <footer class="editor-controls">
    <el-button plain @click="save">Сохранить</el-button>
  </footer>
</template>

<style lang="scss" scoped>
.relations-editor {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.empty-state {
  color: #909399;
  font-style: italic;
}

.relation-card {
  margin-bottom: 12px;
}

.relation-form {
  display: flex;
  align-items: center;
  gap: 12px;
}

.question-select {
  width: 200px;
}

.answer-select {
  width: 160px;
}

.editor-controls {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}

.button-add {
  margin-top: 20px;
}
</style>
