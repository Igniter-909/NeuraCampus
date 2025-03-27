import { apiClient } from '@/lib/api';
import { QuestionnaireData } from '@/types/questionnaire';

export const questionnaireApi = {
  submit: async (data: QuestionnaireData) => {
    const response = await apiClient.post('/questionnaire', data);
    return response.data;
  },

  // Admin endpoints
  getAll: async () => {
    const response = await apiClient.get('/questionnaire');
    return response.data;
  },

  downloadExcel: async () => {
    const response = await apiClient.get('/questionnaire/export', {
      responseType: 'blob'
    });
    
    // Create download link
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'questionnaires.xlsx');
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
}; 