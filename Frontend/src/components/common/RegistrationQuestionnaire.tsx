import { useState } from 'react';
import { QuestionnaireData, ORGANIZATION_TYPES } from '@/types/questionnaire';
import { 
  FaBuilding, 
  FaBriefcase, 
  FaPhone, 
  FaGlobe, 
  FaLinkedin, 
  FaWhatsapp,
  FaBullseye,
  FaListAlt,
  FaCommentAlt,
  FaTimes,
  FaChevronDown,
  FaArrowRight
} from 'react-icons/fa';

interface Props {
  userType: string;
  email: string;
  onSubmit: (data: QuestionnaireData) => Promise<void>;
  onCancel: () => void;
  isLoading: boolean;
}

// Common input class with fixed text color
const inputClasses = `w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl 
  focus:bg-white focus:ring-2 focus:ring-blue-600 focus:border-transparent 
  group-hover:border-blue-400 transition-all text-gray-900 placeholder-gray-500`;

export function RegistrationQuestionnaire({ userType, email, onSubmit, onCancel, isLoading }: Props) {
  const [formData, setFormData] = useState<Partial<QuestionnaireData>>({
    email,
    organizationType: 'educational',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("inside questionnaire", formData);
    
    // Validate required fields
    if (!formData.organizationName || !formData.position || !formData.contactNumber || 
        !formData.whatsappNumber || !formData.linkedInProfile || !formData.purpose || 
        !formData.expectedUsage) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      await onSubmit({
        ...formData,
        submittedAt: new Date(),
      } as QuestionnaireData);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gradient-to-br from-blue-900/70 to-black/70 backdrop-blur-sm">
      <div className="relative w-full max-w-6xl bg-white rounded-2xl shadow-2xl">
        {/* Header with gradient background */}
        <div className="relative p-8 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-blue-800 rounded-t-2xl">
          <h2 className="text-3xl font-bold text-white">
            Registration Questionnaire
          </h2>
          <p className="mt-2 text-blue-100">
            for {userType === 'admin' ? 'College Administrator' : 'Corporate Recruiter'}
          </p>
          <button
            onClick={onCancel}
            className="absolute top-8 right-8 p-2 text-white/80 hover:text-white rounded-full 
              hover:bg-white/10 transition-colors"
            aria-label="Close form"
            title="Close form"
          >
            <FaTimes className="w-6 h-6" />
          </button>
        </div>

        {/* Move the entire content including the footer inside the form */}
        <form onSubmit={handleSubmit} className="flex flex-col h-full">
          {/* Form content section */}
          <div className="p-8 space-y-6 flex-1 overflow-y-auto max-h-[calc(80vh-180px)]">
            {/* Organization Section */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2 pb-2 border-b border-gray-200">
                <FaBuilding className="w-6 h-6 text-blue-600" />
                Organization Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Organization Name *
                  </label>
                  <div className="relative group">
                    <input
                      type="text"
                      name="organizationName"
                      required
                      value={formData.organizationName || ''}
                      onChange={handleInputChange}
                      className={inputClasses}
                      placeholder="Enter organization name"
                    />
                    <FaBuilding className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Organization Type *
                  </label>
                  <div className="relative group">
                    <select
                      name="organizationType"
                      required
                      value={formData.organizationType}
                      onChange={handleInputChange}
                      className={`${inputClasses} appearance-none cursor-pointer`}
                      title="Select organization type"
                    >
                      {ORGANIZATION_TYPES.map(type => (
                        <option key={type.value} value={type.value} className="text-gray-900">
                          {type.label}
                        </option>
                      ))}
                    </select>
                    <FaBriefcase className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                    <FaChevronDown className="absolute right-4 top-4 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Section with enhanced styling */}
            <div className="space-y-6 pt-4">
              <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2 pb-2 border-b border-gray-200">
                <FaPhone className="w-6 h-6 text-blue-600" />
                Contact Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Your Position *
                  </label>
                  <div className="relative group">
                    <input
                      type="text"
                      name="position"
                      required
                      value={formData.position || ''}
                      onChange={handleInputChange}
                      className={inputClasses}
                      placeholder="Enter your position"
                    />
                    <FaBriefcase className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Contact Number *
                  </label>
                  <div className="relative group">
                    <input
                      type="tel"
                      name="contactNumber"
                      required
                      value={formData.contactNumber || ''}
                      onChange={handleInputChange}
                      className={inputClasses}
                      placeholder="Enter contact number"
                    />
                    <FaPhone className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    WhatsApp Number *
                    <FaWhatsapp className="w-4 h-4 text-green-500" />
                  </label>
                  <div className="relative group">
                    <input
                      type="tel"
                      name="whatsappNumber"
                      required
                      value={formData.whatsappNumber || ''}
                      onChange={handleInputChange}
                      className={inputClasses}
                      placeholder="Enter WhatsApp number"
                    />
                    <FaWhatsapp className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    LinkedIn Profile *
                    <FaLinkedin className="w-4 h-4 text-blue-600" />
                  </label>
                  <div className="relative group">
                    <input
                      type="url"
                      name="linkedInProfile"
                      required
                      value={formData.linkedInProfile || ''}
                      onChange={handleInputChange}
                      className={inputClasses}
                      placeholder="https://linkedin.com/in/..."
                    />
                    <FaLinkedin className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                  </div>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    Website URL
                    <FaGlobe className="w-4 h-4 text-blue-500" />
                  </label>
                  <div className="relative group">
                    <input
                      type="url"
                      name="websiteUrl"
                      value={formData.websiteUrl || ''}
                      onChange={handleInputChange}
                      className={inputClasses}
                      placeholder="https://..."
                    />
                    <FaGlobe className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                  </div>
                </div>
              </div>
            </div>

            {/* Purpose Section with improved spacing */}
            <div className="space-y-6 pt-4">
              <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2 pb-2 border-b border-gray-200">
                <FaBullseye className="w-6 h-6 text-blue-600" />
                Purpose & Usage
              </h3>
              <div className="space-y-8">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    Purpose of Registration *
                    <FaBullseye className="w-4 h-4 text-blue-600" />
                  </label>
                  <div className="relative group">
                    <textarea
                      name="purpose"
                      required
                      value={formData.purpose || ''}
                      onChange={handleInputChange}
                      className={`${inputClasses} resize-none`}
                      rows={3}
                      placeholder="Please describe your main purpose for using our platform..."
                    />
                    <FaBullseye className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    Expected Usage *
                    <FaListAlt className="w-4 h-4 text-blue-500" />
                  </label>
                  <div className="relative group">
                    <textarea
                      name="expectedUsage"
                      required
                      value={formData.expectedUsage || ''}
                      onChange={handleInputChange}
                      className={`${inputClasses} resize-none`}
                      rows={3}
                      placeholder="How do you plan to use our platform? What features are you most interested in?"
                    />
                    <FaListAlt className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    Additional Information
                    <FaCommentAlt className="w-4 h-4 text-blue-500" />
                  </label>
                  <div className="relative group">
                    <textarea
                      name="additionalInfo"
                      value={formData.additionalInfo || ''}
                      onChange={handleInputChange}
                      className={`${inputClasses} resize-none`}
                      rows={2}
                      placeholder="Any additional information you'd like to share..."
                    />
                    <FaCommentAlt className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer section - now inside the form */}
          <div className="p-8 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
            <div className="flex gap-6 justify-end">
              <button
                type="button"
                onClick={onCancel}
                className="px-8 py-3 border-2 border-gray-300 rounded-xl text-gray-700 
                  hover:bg-gray-100 hover:border-gray-400 transition-all duration-300 font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl
                  hover:from-blue-700 hover:to-blue-900 transition-all duration-300 font-medium
                  disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3
                  shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Registration</span>
                    <FaArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
