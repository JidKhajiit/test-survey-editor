import { ref, computed } from 'vue';
import type { Survey } from '../assets/types';
import { initialSurveys } from '../assets/constants/mocks';

export function useSurveyManager() {
    const surveys = ref<Survey[]>([...initialSurveys]);
    const editingSurveyId = ref<Number | null>(null);

    const editingSurvey = computed(() => 
        surveys.value.find(({ id }) => id === editingSurveyId.value)
    );
    const isEditing = computed(() => editingSurveyId.value !== null);

    const startEditing = (id: Number) => {
        editingSurveyId.value = id;
    };

    const stopEditing = () => {
        editingSurveyId.value = null;
    };

    const deleteSurvey = (id: Number) => {
        surveys.value = surveys.value.filter(survey => survey.id !== id);
    };

    const saveSurvey = (editedSurvey: Survey) => {
        if (!editingSurveyId.value) {
            console.error('No survey is being edited');
            return;
        }

        surveys.value = surveys.value.map(survey =>
            survey.id === editingSurveyId.value ? editedSurvey : survey
        );
        stopEditing();
    };

    return {
        surveys,
        editingSurvey,
        isEditing,
        startEditing,
        stopEditing,
        deleteSurvey,
        saveSurvey
    };
} 