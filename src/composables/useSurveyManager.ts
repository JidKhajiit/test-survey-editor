import { ref, computed, onMounted } from 'vue';
import type { Survey } from '../assets/types';
import { surveyApi } from '../api/services';

export function useSurveyManager() {
    const surveys = ref<Survey[]>([]);
    const editingSurveyId = ref<Number | null>(null);
    const isLoading = ref(false);
    const error = ref<string | null>(null);

    const editingSurvey = computed(() => 
        surveys.value.find(({ id }) => id === editingSurveyId.value)
    );
    const isEditing = computed(() => editingSurveyId.value !== null);

    const loadSurveys = async () => {
        try {
            isLoading.value = true;
            error.value = null;
            surveys.value = await surveyApi.getAll();
        } catch (err) {
            error.value = err instanceof Error ? err.message : 'Failed to load surveys';
        } finally {
            isLoading.value = false;
        }
    };

    const startEditing = (id: Number) => {
        editingSurveyId.value = id;
    };

    const stopEditing = () => {
        editingSurveyId.value = null;
    };

    const deleteSurvey = async (id: Number) => {
        try {
            await surveyApi.delete(Number(id));
            surveys.value = surveys.value.filter(survey => survey.id !== id);
        } catch (err) {
            error.value = err instanceof Error ? err.message : 'Failed to delete survey';
            throw err;
        }
    };

    const saveSurvey = async (editedSurvey: Survey) => {
        if (!editingSurveyId.value) {
            console.error('No survey is being edited');
            return;
        }

        try {
            const updatedSurvey = await surveyApi.update(Number(editingSurveyId.value), editedSurvey);
            surveys.value = surveys.value.map(survey =>
                survey.id === editingSurveyId.value ? updatedSurvey : survey
            );
            stopEditing();
        } catch (err) {
            error.value = err instanceof Error ? err.message : 'Failed to save survey';
            throw err;
        }
    };

    const createSurvey = async (newSurvey: Omit<Survey, 'id'>) => {
        try {
            const createdSurvey = await surveyApi.create(newSurvey);
            surveys.value.push(createdSurvey);
            return createdSurvey;
        } catch (err) {
            error.value = err instanceof Error ? err.message : 'Failed to create survey';
            throw err;
        }
    };

    onMounted(() => {
        loadSurveys();
    });

    return {
        surveys,
        editingSurvey,
        isEditing,
        isLoading,
        error,
        startEditing,
        stopEditing,
        deleteSurvey,
        saveSurvey,
        createSurvey,
        loadSurveys
    };
} 