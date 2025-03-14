<script setup lang="ts">
import { ref } from "vue";
import RelationsEditor from "./RelationsEditor.vue";
import QuestionsEditor from "./QuestionsEditor.vue";
import { Tab, type Survey } from "../assets/types";
import { tabs } from "../assets/constants/tabs";

const props = defineProps<{
  survey: Survey;
}>();
const emit = defineEmits<{
  back: [];
  save: [survey: Survey];
}>();

const activeName = ref(Tab.RELATIONS);
</script>

<template>
  <header>
    <el-button plain @click="emit('back')" class="button-back">
      ← назад
    </el-button>
    <h1>{{ props.survey.label }}</h1>
  </header>
  <el-card shadow="always">
    <el-tabs v-model="activeName" type="card" class="tabs">
      <el-tab-pane
        v-for="tab in tabs"
        :label="tab.label"
        :disabled="tab.disabled"
        :name="tab.name"
      />
    </el-tabs>
    <section>
      <QuestionsEditor v-if="activeName === Tab.QUESTIONS" :survey="survey" />
      <RelationsEditor
        v-if="activeName === Tab.RELATIONS"
        :survey="survey"
        @save="(e) => emit('save', e)"
      />
    </section>
  </el-card>
</template>

<style lang="scss" scoped>
header {
  display: flex;
  justify-content: center;
  position: relative;
}
.button-back {
  position: absolute;
  left: 0;
  bottom: 5px;
}
</style>
