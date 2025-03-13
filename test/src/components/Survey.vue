// в режиме редактирования сделать табы параметры/вопросы/логика/условия/респонденты, добавление опроса, удаление опроса
<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { PencilIcon, TrashIcon } from '@heroicons/vue/24/solid';
import type { TabsPaneContext } from 'element-plus';
import type { Survey } from '../assets/types';

const props = defineProps<{
    survey: Survey
}>();
const emit = defineEmits<{
    edit: [id: Number],
    delete: [id: Number],
}>();

const isDelConfirmModalVisible = ref(false)


onMounted(() => {
    console.log(props.survey);
});

const confirmDelete = () => {
    isDelConfirmModalVisible.value = false;
    emit('delete', props.survey.id);
}
const handleClick = () => {
  console.log('click')
}

// const handleClick = (tab: TabsPaneContext, event: Event) => {
//   console.log(tab, event)
// };
</script>

<template>
    <div class="common-layout">
        <el-container class="main-info">
            <div style="min-width: 40px">{{ props.survey.id }}</div>
            <div style="min-width: 180px">{{ props.survey.label }}</div>
            <div style="width: 100%">{{ props.survey.about }}</div>
            <div style="min-width: 180px">{{ props.survey.author }}</div>
            <controls class="main-controls">
                <PencilIcon class="icon" @click="emit('edit', props.survey.id)"/>
                <TrashIcon class="icon" @click="isDelConfirmModalVisible = true"/>
            </controls>
        </el-container>

        <el-dialog v-model="isDelConfirmModalVisible" :modal="false">
            <span>Точно хотите удалить опрос?</span>
            <template #footer>
            <div class="dialog-footer">
                <el-button @click="isDelConfirmModalVisible = false">Отмена</el-button>
                <el-button type="primary" @click="confirmDelete">
                    Удалить
                </el-button>
            </div>
            </template>
        </el-dialog>
    </div>
</template>

<style scoped>
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
.editor-controls {
    display: flex;
    justify-content: end;
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