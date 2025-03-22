import axios from 'axios';
import { QuestionnaireData } from '@/types/questionnaire';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const questionnaireApi = {
  submit: async (data: QuestionnaireData) => {
    const response = await axios.post(`${API_URL}/questionnaire`, data);
    return response.data;
  },

  // Admin endpoints
  getAll: async () => {
    const response = await axios.get(`${API_URL}/questionnaire`);
    return response.data;
  },

  downloadExcel: async () => {
    const response = await axios.get(`${API_URL}/questionnaire/export`, {
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