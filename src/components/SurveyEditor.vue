// в режиме редактирования сделать табы параметры/вопросы/логика/условия/респонденты, добавление опроса, удаление опроса
<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import RelationsEditor from './RelationsEditor.vue';
import QuestionsEditor from './QuestionsEditor.vue';
import type { Survey } from '../assets/types';


const props = defineProps<{
    survey: Survey
}>();
const emit = defineEmits<{
    back: [],
    save: [survey: Survey]
}>();

const activeName = ref('questions');

</script>

<template>
    <div class="common-layout">
        <h2>{{ props.survey.label }}</h2>
        <el-container>
            <el-tabs v-model="activeName" type="card" class="tabs">
                <el-tab-pane label="параметры" disabled name="params"/>
                <el-tab-pane label="вопросы" name="questions"/>
                <el-tab-pane label="логика" name="relations"/>
                <el-tab-pane label="условия" disabled name="conditions"/>
                <el-tab-pane label="респонденты" disabled name="respondents"/>
            </el-tabs>
            <div>
                <QuestionsEditor v-if="activeName === 'questions'" :survey="survey" />
                <RelationsEditor
                    v-if="activeName === 'relations'"
                    :survey="survey"
                    @back="emit('back')"
                    @save="(e) => emit('save', e)"
                />

            </div>
        </el-container>
    </div>
</template>

<style scoped>
.el-container {
    display: flex;
    flex-direction: column;
}
.el-header {
    height: fit-content;
}
.main-info > * {
    text-align: left;
    padding: 0 12px;
}
.main-controls {
    display: flex;
    gap: 4px;
}

.head {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.survey {
    width: 100%;
}
</style>