// в режиме редактирования сделать табы параметры/вопросы/логика/условия/респонденты, добавление опроса, удаление опроса
<script setup lang="ts">
import { ref } from 'vue';
import SurveyCard from './Survey.vue';
import type { Survey } from '../assets/types';

const props = defineProps<{
    surveys: Survey[]
}>();
const emit = defineEmits<{
    edit: [id: Number],
    delete: [id: Number],
}>();



</script>

<template>
    <div>
        <table>
            <thead  class="table-head">
                <tr>
                    <th style="min-width: 40px">Id</th>
                    <th style="min-width: 180px">Название</th>
                    <th style="width: 100%">Описание</th>
                    <th style="min-width: 180px">Автор</th>
                    <th style="min-width: 52px"></th>
                </tr>
            </thead>
            <tbody>

                <tr v-for="survey in props.surveys">
                    <el-card  shadow="always">
                        <SurveyCard
                            :survey="survey"
                            @edit="(id) => emit('edit', id)"
                            @delete="(id) => emit('delete', id)"
                        />
                    </el-card>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style>
table, thead {
    box-sizing: border-box;
    display: block;
}
th {
    box-sizing: border-box;
}
.table-head {
    padding: 0 20px;
    & th {
        padding: 0 12px;
        text-align: left;
    }
}
.el-card {
    width: 100%;
}
</style>