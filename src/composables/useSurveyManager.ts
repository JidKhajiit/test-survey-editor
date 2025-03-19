import { ref, computed, onMounted } from 'vue';
import type { ISurvey } from '@api/models/Survey';
import type { NewSurvey } from '@assets/types';
import { surveyApi } from '@api/services';

export function useSurveyManager() {
    const surveys = ref<ISurvey[]>([]);
    const editingSurveyId = ref<Number | null>(null);
    const isLoading = ref(false);
    const error = ref<string | null>(null);
    const editingSurvey = computed(() => 
        surveys.value.find(({ id }: { id: Number }) => id === editingSurveyId.value)
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

    const createSurvey = async (newSurvey: NewSurvey) => {
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
        createSurvey,
        loadSurveys
    };
} 