import { API_BASE_URL, API_ENDPOINTS } from './config';
import type { Survey } from '../assets/types';

// Generic API request function
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`);
  }

  return response.json();
}

// Survey API functions
export const surveyApi = {
  getAll: () => apiRequest<Survey[]>(API_ENDPOINTS.surveys.getAll),
  
  getById: (id: number) => 
    apiRequest<Survey>(API_ENDPOINTS.surveys.getById(id)),
  
  create: (survey: Omit<Survey, 'id'>) => 
    apiRequest<Survey>(API_ENDPOINTS.surveys.create, {
      method: 'POST',
      body: JSON.stringify(survey),
    }),
  
  update: (id: number, survey: Partial<Survey>) => 
    apiRequest<Survey>(API_ENDPOINTS.surveys.update(id), {
      method: 'PUT',
      body: JSON.stringify(survey),
    }),
  
  delete: (id: number) => 
    apiRequest<void>(API_ENDPOINTS.surveys.delete(id), {
      method: 'DELETE',
    }),
};

// Question API functions
export const questionApi = {
  getAll: () => apiRequest<Survey['questions']>(API_ENDPOINTS.questions.getAll),
  
  create: (question: Omit<Survey['questions'][0], 'id'>) => 
    apiRequest<Survey['questions'][0]>(API_ENDPOINTS.questions.create, {
      method: 'POST',
      body: JSON.stringify(question),
    }),
}; 