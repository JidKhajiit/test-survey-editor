
export type Question = {
    id: Number;
    label: String;
    answers: {id: Number, label: String}[];
}

export type Relation = {
    question: Question;
    answer: Number | null;
    relatedQuestion: Number;
}


export type Survey = {
    id: Number;
    label: String;
    about: String;
    author: String;
    questions: Question[];
    relations: Relation[];
}