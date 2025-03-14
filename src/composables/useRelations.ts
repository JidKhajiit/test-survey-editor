import { ref } from 'vue';
import type { Survey, Relation } from '../assets/types';

export function useRelations(survey: Survey) {
    const questions = ref([...survey.questions]);
    const relations = ref<Relation[]>([...survey.relations]);

    const addRelation = () => {
        const newRelation: Relation = {
            question: questions.value[0],
            answer: null,
            relatedQuestion: questions.value[1]?.id || questions.value[0].id
        };
        relations.value.push(newRelation);
    };

    const updateRelation = (index: number, updates: Partial<Relation>) => {
        relations.value[index] = {
            ...relations.value[index],
            ...updates
        };
    };

    const deleteRelation = (index: number) => {
        relations.value = relations.value.filter((_, i) => i !== index);
    };

    const getValidRelations = () => 
        relations.value.filter(({ question, relatedQuestion }) => 
            !!question && !!relatedQuestion
        );

    return {
        questions,
        relations,
        addRelation,
        updateRelation,
        deleteRelation,
        getValidRelations
    };
} 