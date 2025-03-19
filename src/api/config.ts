export const API_BASE_URL = 'http://127.0.0.1:8081/api';

export const API_ENDPOINTS = {
  // Survey endpoints
  surveys: {
    getAll: '/forms',
    getById: (id: number) => `/forms/${id}`,
    create: '/forms',
  },
  // Question endpoints
  questions: {
    getAll: '/questions',
    create: '/questions',
    getRelatedChoices: (questionId: number) => `/questions/${questionId}/relations`,
  },
  // Relations endpoints
  relations: {
    getById: (id: number) => `/question-relations/${id}`,
    create: '/question-relations/',
  }
} as const; 