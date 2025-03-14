export const API_BASE_URL = 'http://localhost:8081/api';

export const API_ENDPOINTS = {
  // Survey endpoints
  surveys: {
    getAll: '/forms',
    getById: (id: number) => `/forms/${id}`,
    create: '/forms',
    update: (id: number) => `/forms/${id}`,
    delete: (id: number) => `/forms/${id}`,
  },
  // Question endpoints
  questions: {
    getAll: '/questions',
    getById: (id: number) => `/questions/${id}`,
    create: '/questions',
    update: (id: number) => `/questions/${id}`,
    delete: (id: number) => `/questions/${id}`,
    getBySurveyId: (surveyId: number) => `/questions?surveyId=${surveyId}`,
  }
} as const; 