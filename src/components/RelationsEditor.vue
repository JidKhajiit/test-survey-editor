<script setup lang="ts">
import { ref } from "vue";
import { Delete } from "@element-plus/icons-vue";
import type { Survey, Question } from "../assets/types";

const props = defineProps<{
  survey: Survey;
}>();
const emit = defineEmits<{
  save: [survey: Survey];
}>();

const questions = ref([...props.survey.questions]);
const relations = ref<
  {
    question: Question | null;
    answer: Number | null;
    relatedQuestion: Number | null;
  }[]
>([...props.survey.relations]);

const addRelation = () => {
  relations.value.push({
    question: null,
    answer: null,
    relatedQuestion: null,
  });
};

const changedQuestion = (index) => {
  relations.value[index] = {
    ...relations.value[index],
    relatedQuestion: null,
    answer: null,
  };
};

const deleteRelation = (indexForDel) => {
  relations.value = relations.value.filter((_, index) => indexForDel !== index);
};

const save = () => {
  emit("save", {
    ...props.survey,
    relations: relations.value.filter(
      ({ question, relatedQuestion }) => !!question && !!relatedQuestion
    ),
  });
};
</script>

<template>
  <main class="">
    <h2>Редактор связей</h2>
    <p v-if="!relations.length">Связей пока нет(</p>
    <el-scrollbar v-else height="200px">
      <el-card
        v-for="(relation, index) in relations"
        shadow="always"
        class="relation-card"
      >
        Если
        <el-select
          value-key="id"
          clearable
          v-model="relation.question"
          placeholder="Любой вопрос"
          @change="() => changedQuestion(index)"
          style="width: 200px; margin-right: 5px"
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
          style="width: 200px"
        >
          <el-option
            v-for="answer in relation.question?.answers"
            :key="answer.id"
            :label="answer.label"
            :value="answer.id"
          />
        </el-select>
        перейти на
        <el-select
          v-model="relation.relatedQuestion"
          clearable
          placeholder="Любой вопрос"
          style="width: 200px"
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
      </el-card>
    </el-scrollbar>
    <el-button class="button-add" @click="addRelation"
      >Добавить связь</el-button
    >
  </main>

  <footer class="editor-controls">
    <el-button plain @click="save()"> Сохранить </el-button>
  </footer>
</template>

<style lang="scss" scoped>
.relation-card > * {
  display: flex;
  align-items: center;
  gap: 4px;
}

main {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.editor-controls {
  margin-top: 20px;
  display: flex;
  justify-content: end;
}

.button-add {
  margin-top: 20px;
}
</style>
