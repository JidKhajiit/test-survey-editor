<script setup lang="ts">
import { ref, computed } from 'vue'
import { TrashIcon } from '@heroicons/vue/24/solid';
import type { Survey, Relation, Question } from '../assets/types';

const props = defineProps<{
  survey: Survey
}>();
const emit = defineEmits<{
    back: [],
    save: [survey: Survey]
}>();

const questions = ref([...props.survey.questions]);
const relations = ref<{
  question: Question | null,
  answer: Number | null,
  relatedQuestion: Number | null,
}[]>([...props.survey.relations]);


const addRelation = () => {
  relations.value.push({
    question: null,
    answer: null,
    relatedQuestion: null
  });
};

const changedQuestion = (index) => {
  relations.value[index] = {...relations.value[index], relatedQuestion: null, answer: null}
}

const deleteRelation = (indexForDel) => {
  relations.value = relations.value.filter((el, index) => indexForDel !== index)
}

const save = () => {
    emit('save', {
      ...props.survey,
      relations: relations.value.filter(({question, relatedQuestion}) => !!question && !!relatedQuestion)
    })
}
</script>

<template>
  <el-card v-for="(relation, index) in relations" shadow="always" class="relation-card">
    Если
    <el-select value-key="id" clearable v-model="relation.question" placeholder="Любой вопрос" @change="() => changedQuestion(index)" style="width: 200px; margin-right: 5px">
      <el-option
        v-for="question in questions"
        :key="question.id"
        :label="question.label"
        :value="question"
      />
    </el-select>
    <el-select :disabled="!relation.question" clearable v-model="relation.answer" placeholder="Любой ответ" style="width: 200px">
      <el-option
        v-for="answer in relation.question?.answers"
        :key="answer.id"
        :label="answer.label"
        :value="answer.id"
      />
    </el-select>
    перейти на
    <el-select v-model="relation.relatedQuestion" clearable placeholder="Любой вопрос" style="width: 200px">
      <el-option
        v-for="question in questions"
        :key="question.id"
        :label="question.label"
        :value="question.id"
        :disabled="question.id === relation.question?.id"
        />
    </el-select>
    <TrashIcon class="icon" @click="() => deleteRelation(index)"/>
  </el-card>

  <el-button style="margin-top: 20px;" @click="addRelation">Добавить связь</el-button>

  <controls class="editor-controls">
      <el-button plain @click="emit('back')">
          Отмена
      </el-button>
      <el-button plain @click="save()">
          Сохранить
      </el-button>
  </controls>
</template>

<style scoped>
.relation-card > *{
  display: flex;
  align-items: center;
  gap: 4px;
}
.editor-controls {
    margin-top: 20px;
    display: flex;
    justify-content: end;
}
</style>
