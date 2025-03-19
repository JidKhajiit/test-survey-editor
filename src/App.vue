<script setup lang="ts">
import SurveyList from "./components/SurveyList.vue";
import SurveyEditor from "./components/SurveyEditor.vue";
import { useSurveyManager } from "./composables/useSurveyManager";
import type { Survey } from "@assets/types";

const {
  surveys,
  editingSurvey,
  isEditing,
  isLoading,
  error,
  startEditing,
  stopEditing,
  deleteSurvey,
  saveSurvey
} = useSurveyManager();
</script>

<template>
  <main class="app-container">
    <SurveyList
      v-if="!isEditing"
      :surveys="surveys"
      :is-loading="isLoading"
      :error="error"
      @edit="startEditing"
      @delete="deleteSurvey"
    />
    <SurveyEditor
      v-else-if="editingSurvey"
      :survey="editingSurvey"
      @back="stopEditing"
      @save="saveSurvey"
    />
  </main>
</template>

<style lang="scss" scoped>
.app-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}
</style>
