'use client';

import { useState, useEffect } from 'react';
import { questionnaireApi } from '@/services/api/questionnaire';
import { QuestionnaireData } from '@/types/questionnaire';
import { useToast } from '@/components/ui/use-toast';
import { Download } from 'lucide-react';

export default function QuestionnairesPage() {
  const [questionnaires, setQuestionnaires] = useState<QuestionnaireData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadQuestionnaires();
  }, []);

  const loadQuestionnaires = async () => {
    try {
      setIsLoading(true);
      const response = await questionnaireApi.getAll();
      setQuestionnaires(response.data);
    } catch (error) {
      console.error('Error loading questionnaires:', error);
      toast({
        title: 'Error',
        content: 'Failed to load questionnaires',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadExcel = async () => {
    try {
      await questionnaireApi.downloadExcel();
      toast({
        title: 'Success',
        content: 'Excel file downloaded successfully',
        variant: 'default'
      });
    } catch (error) {
      console.error('Error downloading Excel:', error);
      toast({
        title: 'Error',
        content: 'Failed to download Excel file',
        variant: 'destructive'
      });
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Questionnaire Submissions</h1>
        <button
          onClick={handleDownloadExcel}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          <Download className="w-4 h-4" />
          Download Excel
        </button>
      </div>

      {isLoading ? (
        <div className="text-center py-8">Loading...</div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Organization
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact Person
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Submitted At
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {questionnaires.map((q, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {q.organizationName}
                      </div>
                      <div className="text-sm text-gray-500">
                        {q.organizationType}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{q.position}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{q.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{q.contactNumber}</div>
                      <div className="text-sm text-gray-500">
                        WhatsApp: {q.whatsappNumber}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(q.submittedAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
