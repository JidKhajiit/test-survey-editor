<script setup lang="ts">
import { Plus } from "@element-plus/icons-vue";
import type { Survey } from "@assets/types";
import { useRelations } from "@composables/useRelations";
import { onMounted } from "vue";
import RelationCard from "./RelationCard.vue";

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
  saveRelations,
  loadRelations,
  getValidRelations
} = useRelations(props.survey);

const save = () => {
  console.log('save', saveRelations());
  emit("save", {
    ...props.survey,
    relations: getValidRelations()
  });
};

onMounted(() => {
  loadRelations();
});
</script>

<template>
  <div class="relations-editor">
    <h2>Редактор связей</h2>
    <p v-if="!relations.length" class="empty-state">Связей пока нет(</p>
    <el-scrollbar v-else height="400px">
      <RelationCard
        v-for="(relation, index) in relations"
        :key="index"
        :relation="relation"
        :questions="questions"
        :index="index"
        @update="updateRelation"
        @delete="deleteRelation"
      />
    </el-scrollbar>
    <el-button
      class="button-add"
      type="primary"
      :icon="Plus"
      @click="addRelation"
    >
      Добавить связь
    </el-button>
  </div>

  <footer class="editor-controls">
    <el-button plain @click="save">Сохранить</el-button>
  </footer>
</template>

<style lang="scss" scoped>
.relations-editor {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.empty-state {
  color: #909399;
  font-style: italic;
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
