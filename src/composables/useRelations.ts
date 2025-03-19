import { ref } from 'vue';
import type { ISurvey, IRelation } from '@api/models/Survey';
import { questionApi, relationApi } from '@api/services';
export function useRelations(survey: ISurvey) {
    const questions = ref([...survey.questions]);
    const relations = ref<IRelation[]>([]);
    const isLoading = ref(false);
    const error = ref<string | null>(null);

    const loadRelations = async () => {
        try {
            isLoading.value = true;
            error.value = null;
            const relationsList = await Promise.all(
                questions.value.map((question: { id: string }): IRelation => 
                    questionApi.getRelatedChoices(question.id)
                )
            );
            relations.value = relationsList.reduce((arr: IRelation[], relations: IRelation[]) => {
                return [...arr, ...relations];
            }, []);
            console.log('relations', relations.value);
        } catch (err) {
            error.value = err instanceof Error ? err.message : 'Failed to load relations';
        } finally {
            isLoading.value = false;
        }
    };

    const addRelation = () => {
        const newRelation: IRelation = {
            from_question: null,
            answer_choice: null,
            to_question: null
        };
        relations.value.push(newRelation);
    };

    const updateRelation = (index: number, update: Partial<IRelation>) => {
        console.log('updateRelation', index, update);
        relations.value[index] = { ...relations.value[index], ...update };
    };

    const deleteRelation = (index: number) => {
        relations.value.splice(index, 1);
    };

    const getValidRelations = () => 
        relations.value.filter(({ from_question, to_question, id }: { from_question: string; to_question: string; id: number }) => 
            !!from_question && !!to_question && !id
        );

    const saveRelations = async () => {
        const validRelations = getValidRelations();
        await Promise.all(validRelations.map((relation: IRelation) => 
            relationApi.create(relation)
        ));
    };

    return {
        questions,
        relations,
        addRelation,
        updateRelation,
        deleteRelation,
        getValidRelations,
        loadRelations,
        saveRelations
    };
} 