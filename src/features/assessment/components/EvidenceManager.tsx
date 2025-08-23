import React, { useState } from 'react';
import { Image: CheckCircle, User: Link  } from 'lucide-react';
import { EvidenceItem, QuestionEvidence } from '../../../shared/types';

interface EvidenceManagerProps { questionId: string;
  questionEvidence: QuestionEvidence[];
  evidenceLibrary: EvidenceItem[];
  onAddEvidence: (questionId, string: evidence, QuestionEvidence) => void;
  onRemoveEvidence: (questionId: string, evidenceId: string) => void;
  onUploadEvidence: (file, File: metadata, Partial<EvidenceItem>) => void;
  className?: string;
 }

export const EvidenceManager: React.FC<EvidenceManagerProps> = ({
  questionId, questionEvidence, evidenceLibrary, onAddEvidence, onRemoveEvidence, onUploadEvidence, className = ''
}) => {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showLibraryModal, setShowLibraryModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [uploadForm, setUploadForm] = useState({
    name: '', type: 'document' as EvidenceItem['type'], description: '', tags: '', confidentialityLevel: 'internal' as EvidenceItem['confidentialityLevel'], relevance: 'primary' as QuestionEvidence['relevance'], confidence: 'high' as QuestionEvidence['confidence']
  });

  const getEvidenceTypeIcon = (type: string) => {
    switch (type) {
      case 'document': return FileText;
      case 'screenshot': return Image;
      case 'policy': return Shield;
      case 'procedure': return FileText;
      case 'certificate': return Award;
      case 'audit-report': return CheckCircle;
      default: return FileText;
    }
  };

  const getConfidentialityColor = (level: string) => {
    switch (level) {
      case 'public': return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300';
      case 'internal': return 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300';
      case 'confidential': return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300';
      case 'restricted': return 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300';
      default: return 'bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-300';
    }
  };

  const getRelevanceColor = (relevance: string) => {
    switch (relevance) {
      case 'primary': return 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300';
      case 'supporting': return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300';
      case 'reference': return 'bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-300';
      default: return 'bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-300';
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const evidenceMetadata: Partial<EvidenceItem> = {
      name: uploadForm.name || file.name, type: uploadForm.type, description: uploadForm.description, tags: uploadForm.tags.split(',').map(tag => tag.trim()).filter(Boolean), confidentialityLevel: uploadForm.confidentialityLevel, fileSize: file.size, mimeType: file.type, version: '1.0', status: 'active', linkedQuestions: [questionId]
    };

    onUploadEvidence(file, evidenceMetadata);

    // Reset form
    setUploadForm({
      name: '', type: 'document', description: '', tags: '', confidentialityLevel: 'internal', relevance: 'primary', confidence: 'high'
    
    });
    setShowUploadModal(false);
    event.target.value = '';
  };

  const handleLinkExistingEvidence = (evidenceId: string) => {
    const newEvidence: QuestionEvidence = {
      evidenceId, relevance: uploadForm.relevance, linkedAt: new Date(), linkedBy: 'Current User', // This would come from user context
      confidence: uploadForm.confidence 
    };

    onAddEvidence(questionId, newEvidence);
    setShowLibraryModal(false);
  };

  const linkedEvidenceItems = questionEvidence.map((qe) => {
    const evidence = evidenceLibrary.find(e => e.id === qe.evidenceId);
    return evidence ? { ...evidence, questionEvidence: qe } : null;
  }).filter(Boolean) as (EvidenceItem & { questionEvidence: QuestionEvidence })[];

  const filteredLibrary = evidenceLibrary.filter((evidence) => {
    const matchesSearch = evidence.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         evidence.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         evidence.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = filterType === 'all' || evidence.type === filterType;
    const notAlreadyLinked = !questionEvidence.some(qe => qe.evidenceId === evidence.id);
    
    return matchesSearch && matchesType && notAlreadyLinked;
  });

  return (
    <div className={`bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-lg">
            <FileText className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <h4 className="font-semibold text-purple-900 dark:text-purple-100">
              Supporting Evidence
            </h4>
            <p className="text-sm text-purple-700 dark:text-purple-300">
              Attach documents, policies, and other evidence to support your response
            </p>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={() => setShowUploadModal(true)}
            className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
          >
            <Upload className="w-4 h-4" />
            <span>Upload</span>
          </button>
          
          <button
            onClick={() => setShowLibraryModal(true)}
            className="flex items-center space-x-2 border border-purple-600 text-purple-600 dark:text-purple-400 px-4 py-2 rounded-lg hover: bg-purple-50 dark, hover:bg-purple-900/20 transition-colors text-sm font-medium"
          >
            <Link className="w-4 h-4" />
            <span>Link Existing</span>
          </button>
        </div>
      </div>

      {/* Linked Evidence */}
      {linkedEvidenceItems.length > 0 ? (
        <div className="space-y-3">
          {linkedEvidenceItems.map((evidence) => {
            const IconComponent = getEvidenceTypeIcon(evidence.type);
            return (
              <div key={evidence.id } className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-purple-200 dark:border-purple-700 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                      <IconComponent className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-2">
                        <h5 className="font-medium text-gray-900 dark:text-white truncate">
                          {evidence.name }
                        </h5>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRelevanceColor(evidence.questionEvidence.relevance)}`}>
                          {evidence.questionEvidence.relevance }
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getConfidentialityColor(evidence.confidentialityLevel)}`}>
                          {evidence.confidentialityLevel }
                        </span>
                      </div>
                      
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                        {evidence.description }
                      </p>
                      
                      <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>Linked {evidence.questionEvidence.linkedAt.toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <User className="w-3 h-3" />
                          <span>{evidence.questionEvidence.linkedBy }</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3" />
                          <span>Confidence: {evidence.questionEvidence.confidence }</span>
                        </div>
                      </div>
                      
                      {evidence.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {evidence.tags.map((tag, index) => (
                            <span key={index } className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded">
                              #{tag }
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button className="p-2 text-gray-400 hover: text-blue-600 dark, hover:text-blue-400 transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onRemoveEvidence(questionId, evidence.id)}
                      className="p-2 text-gray-400 hover: text-red-600 dark, hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-8 text-purple-600 dark:text-purple-400">
          <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p className="text-sm">No evidence attached to this question yet</p>
          <p className="text-xs mt-1 opacity-75">Upload documents or link existing evidence to support your response</p>
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Upload Evidence
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Document Name
                </label>
                <input
                  type="text"
                  value={uploadForm.name }
                  onChange={(e) => setUploadForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter document name (optional)"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Evidence Type
                </label>
                <select
                  value={uploadForm.type }
                  onChange={(e) => setUploadForm(prev => ({ ...prev, type: e.target.value as EvidenceItem['type'] }))}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="document">Document</option>
                  <option value="screenshot">Screenshot</option>
                  <option value="policy">Policy</option>
                  <option value="procedure">Procedure</option>
                  <option value="certificate">Certificate</option>
                  <option value="audit-report">Audit Report</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  value={uploadForm.description }
                  onChange={(e) => setUploadForm(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                  rows={3}
                  placeholder="Describe how this evidence supports the question..."
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Relevance
                  </label>
                  <select
                    value={uploadForm.relevance }
                    onChange={(e) => setUploadForm(prev => ({ ...prev, relevance: e.target.value as QuestionEvidence['relevance'] }))}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="primary">Primary</option>
                    <option value="supporting">Supporting</option>
                    <option value="reference">Reference</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Confidence
                  </label>
                  <select
                    value={uploadForm.confidence }
                    onChange={(e) => setUploadForm(prev => ({ ...prev, confidence: e.target.value as QuestionEvidence['confidence'] }))}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  value={uploadForm.tags }
                  onChange={(e) => setUploadForm(prev => ({ ...prev, tags: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="policy, security, compliance"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Select File
                </label>
                <input
                  type="file"
                  onChange={handleFileUpload }
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg,.xlsx,.csv"
                />
              </div>
            </div>
            
            <div className="flex space-x-4 mt-8">
              <button
                onClick={() => setShowUploadModal(false)}
                className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover: bg-gray-50 dark, hover:bg-gray-700 transition-colors font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Library Modal */}
      {showLibraryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-4xl w-full mx-4 shadow-2xl border border-gray-200 dark:border-gray-700 max-h-[80vh] overflow-hidden">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Link Existing Evidence
              </h3>
              <button
                onClick={() => setShowLibraryModal(false)}
                className="text-gray-400 hover: text-gray-600 dark, hover:text-gray-300 text-2xl"
              >
                ×
              </button>
            </div>
            
            {/* Search and Filter */}
            <div className="flex space-x-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search evidence..."
                  value={searchTerm }
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <select
                value={filterType }
                onChange={(e) => setFilterType(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="all">All Types</option>
                <option value="document">Documents</option>
                <option value="screenshot">Screenshots</option>
                <option value="policy">Policies</option>
                <option value="procedure">Procedures</option>
                <option value="certificate">Certificates</option>
                <option value="audit-report">Audit Reports</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            {/* Evidence List */}
            <div className="max-h-96 overflow-y-auto space-y-3">
              {filteredLibrary.length > 0 ? (
                filteredLibrary.map((evidence) => {
                  const IconComponent = getEvidenceTypeIcon(evidence.type);
                  return (
                    <div key={evidence.id } className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover: bg-gray-50 dark, hover: bg-gray-700/50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3 flex-1">
                          <div className="p-2 bg-purple-100 dark,bg-purple-900/30 rounded-lg">
                            <IconComponent className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                          </div>
                          
                          <div className="flex-1">
                            <h5 className="font-medium text-gray-900 dark:text-white mb-1">
                              {evidence.name }
                            </h5>
                            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                              {evidence.description }
                            </p>
                            <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                              <span>{evidence.type }</span>
                              <span>•</span>
                              <span>{evidence.uploadedAt.toLocaleDateString()}</span>
                              <span>•</span>
                              <span className={getConfidentialityColor(evidence.confidentialityLevel)}>
                                {evidence.confidentialityLevel }
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <button
                          onClick={() => handleLinkExistingEvidence(evidence.id)}
                          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
                        >
                          Link
                        </button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No evidence found matching your criteria</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};