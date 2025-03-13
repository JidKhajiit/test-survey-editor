// нужен ещё список опросов, их редактирование

<script setup lang="ts">
import { ref, computed } from 'vue';
import SurveyList from './components/SurveyList.vue';
import SurveyEditor from './components/SurveyEditor.vue';
import { initialSurveys } from './assets/constants/mocks';
import type { Survey } from './assets/types';


const surveys = ref<Survey[]>([ ...initialSurveys ]);

const editingSurveyId = ref<Number | null>(null);

const editingSurvey = computed(() => surveys.value.find(({id}) => id === editingSurveyId.value));
const isEditing = computed(() => editingSurveyId.value !== null);

const deleteSurvey = (id: Number) => surveys.value = surveys.value.filter((survey) => survey.id !== id);
const save = (editedSurvey: Survey) => {
  surveys.value = surveys.value.map((survey) => editingSurveyId.value === survey.id ? editedSurvey : survey);
  editingSurveyId.value = null;
}
</script>

<template>
  <SurveyList
    v-if="!isEditing"
    :surveys="surveys"
    @edit="(id) => editingSurveyId = id"
    @delete="deleteSurvey"
  />
  <SurveyEditor v-else
    :survey="editingSurvey"
    @back="editingSurveyId = null"
    @save="save"
  />
</template>

<style lang="scss">
.demo-tabs > el-tab-pane {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>
