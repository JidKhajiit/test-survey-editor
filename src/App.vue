<script setup lang="ts">
import SurveyList from "./components/SurveyList.vue";
import SurveyEditor from "./components/SurveyEditor.vue";
import { useSurveyManager } from "./composables/useSurveyManager";

const {
  surveys,
  editingSurvey,
  isEditing,
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
      @edit="startEditing"
      @delete="deleteSurvey"
    />
    <SurveyEditor
      v-else
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
