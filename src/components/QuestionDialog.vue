<script setup lang="ts">
import { ref } from "vue";
import { Delete, Plus } from "@element-plus/icons-vue";
import type { IQuestion } from "@/api/models/Survey";

const props = defineProps<{
  modelValue: boolean;
  surveyId: number;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: boolean];
  'add': [question: Omit<IQuestion, 'id'>];
}>();

const newQuestion = ref({
  form: props.surveyId,
  question_text: '',
  question_type: 'text',
  choices: [
    { id: 0, choice_text: '' },
    { id: 1, choice_text: '' }
  ]
});

const handleAdd = () => {
  emit('add', { ...newQuestion.value });
  // Reset form
  newQuestion.value = {
    form: props.surveyId,
    question_text: '',
    question_type: 'text',
    choices: [
      { id: 0, choice_text: '' },
      { id: 1, choice_text: '' }
    ]
  };
};
</script>

<template>
  <el-dialog
    :model-value="modelValue"
    @update:model-value="(value) => emit('update:modelValue', value)"
    title="Добавить вопрос"
    width="500px"
  >
    <el-form :model="newQuestion" label-width="120px">
      <el-form-item label="Текст вопроса">
        <el-input v-model="newQuestion.question_text" placeholder="Введите текст вопроса" />
      </el-form-item>
      <el-form-item label="Тип вопроса">
        <el-select v-model="newQuestion.question_type" placeholder="Выберите тип вопроса">
          <el-option label="Текстовый" value="text" />
          <el-option label="Одиночный выбор" value="single" />
          <el-option label="Множественный выбор" value="multiple" />
        </el-select>
      </el-form-item>
      <el-form-item label="Варианты ответов">
        <div v-for="(choice, index) in newQuestion.choices" :key="index" class="choice-item">
          <el-input v-model="choice.choice_text" :placeholder="'Ответ ' + (index + 1)" />
          <el-button 
            type="danger" 
            circle 
            :icon="Delete" 
            @click="newQuestion.choices.splice(index, 1)"
            v-if="newQuestion.choices.length > 2"
          />
        </div>
        <el-button 
          type="primary" 
          plain 
          :icon="Plus" 
          @click="newQuestion.choices.push({ id: newQuestion.choices.length, choice_text: '' })"
        >
          Добавить вариант
        </el-button>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="emit('update:modelValue', false)">Отмена</el-button>
        <el-button type="primary" @click="handleAdd">
          Добавить
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
.choice-item {
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
  align-items: center;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}
</style> 