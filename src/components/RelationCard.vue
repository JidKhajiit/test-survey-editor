<script setup lang="ts">
import { Delete } from "@element-plus/icons-vue";
import { computed } from "vue";
import type { IQuestion } from "@/api/models/Survey";
import type { EmptyRelation, NewRelation } from "@assets/types";
import type { IRelation, IChoice } from "@api/models/Survey";

type Relation = IRelation | EmptyRelation | NewRelation;

const props = defineProps<{
  relation: Relation;
  questions: IQuestion[];
  index: number;
}>();

const emit = defineEmits<{
  'update': [index: number, relation: Partial<Relation>];
  'delete': [index: number];
}>();

const relation = computed(() => ({
  from_question: props.questions.find(question => question.id === props.relation.from_question) || null,
  answer_choice: props.relation.answer_choice,
  to_question: props.questions.find(question => question.id === props.relation.to_question) || null,
}));

const handleRelationChange = (field: keyof Relation, value: number | undefined) => {
  console.log('handleRelationChange', field, value);
  emit('update', props.index, { [field]: value || null });
};
</script>

<template>
  <el-card shadow="always" class="relation-card">
    <div class="relation-form">
      <span>Если</span>
      <el-select
        value-key="id"
        clearable
        :model-value="relation.from_question"
        placeholder="Любой вопрос"
        @update:model-value="(value: IQuestion | undefined) => handleRelationChange('from_question', value?.id)"
        class="question-select"
      >
        <el-option
          v-for="question in questions"
          :key="question.id"
          :label="question.question_text"
          :value="question"
        />
      </el-select>
      <el-select
        :disabled="!relation.from_question"
        clearable
        :model-value="relation.answer_choice"
        placeholder="Любой ответ"
        class="answer-select"
        @update:model-value="(value: number | undefined) => handleRelationChange('answer_choice', value)"
      >
        <el-option
          v-for="answer in relation.from_question?.choices"
          :key="answer.id"
          :label="answer.choice_text"
          :value="answer.id"
        />
      </el-select>
      <span>перейти на</span>
      <el-select
        value-key="id"
        clearable
        :model-value="relation.to_question"
        placeholder="Любой вопрос"
        class="question-select"
        @update:model-value="(value: IQuestion | undefined) => handleRelationChange('to_question', value?.id)"
      >
        <el-option
          v-for="question in questions"
          :key="question.id"
          :label="question.question_text"
          :value="question"
          :disabled="question.id === relation.from_question?.id"
        />
      </el-select>
      <el-button
        type="danger"
        :icon="Delete"
        circle
        @click="() => emit('delete', index)"
      />
    </div>
  </el-card>
</template>

<style lang="scss" scoped>
.relation-card {
  margin-bottom: 16px;
}

.relation-form {
  display: flex;
  align-items: center;
  gap: 8px;
}

.question-select,
.answer-select {
  width: 200px;
}
</style> 