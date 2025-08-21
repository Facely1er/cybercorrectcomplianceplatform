import React, { useState } from 'react';
import { EvidenceItem } from '../../types';

interface EvidenceManagerProps {
  questionId: string;
  onUploadEvidence: (file: File, metadata: Partial<EvidenceItem>) => Promise<void>;
}

export const EvidenceManager: React.FC<EvidenceManagerProps> = ({ questionId, onUploadEvidence }) => {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadForm, setUploadForm] = useState({
    name: '',
    type: 'document' as const,
    description: '',
    tags: '',
    confidentialityLevel: 'internal' as const,
    relevance: 'primary' as const,
    confidence: 'high' as const
  });

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const uploadFile = async () => {
      try {
        const evidenceMetadata: Partial<EvidenceItem> = {
          name: uploadForm.name || file.name,
          type: uploadForm.type,
          description: uploadForm.description,
          tags: uploadForm.tags.split(',').map(tag => tag.trim()).filter(Boolean),
          confidentialityLevel: uploadForm.confidentialityLevel,
          fileSize: file.size,
          mimeType: file.type,
          version: '1.0',
          status: 'active',
          linkedQuestions: [questionId]
        };

        await onUploadEvidence(file, evidenceMetadata);

        // Reset form
        setUploadForm({
          name: '',
          type: 'document',
          description: '',
          tags: '',
          confidentialityLevel: 'internal',
          relevance: 'primary',
          confidence: 'high'
        });
        setShowUploadModal(false);
        event.target.value = '';
      } catch (error) {
        console.error('Upload failed:', error);
        alert('Failed to upload file: ' + (error as Error).message);
      }
    };
    
    uploadFile();
  };

  return (
    <div className="evidence-manager">
      <button
        onClick={() => setShowUploadModal(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Upload Evidence
      </button>

      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Upload Evidence</h3>
            
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">File</label>
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    className="w-full border border-gray-300 rounded-lg p-2"
                    accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Name (optional)</label>
                  <input
                    type="text"
                    value={uploadForm.name}
                    onChange={(e) => setUploadForm(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg p-2"
                    placeholder="Evidence name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <textarea
                    value={uploadForm.description}
                    onChange={(e) => setUploadForm(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg p-2"
                    rows={3}
                    placeholder="Evidence description"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Tags (comma-separated)</label>
                  <input
                    type="text"
                    value={uploadForm.tags}
                    onChange={(e) => setUploadForm(prev => ({ ...prev, tags: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg p-2"
                    placeholder="tag1, tag2, tag3"
                  />
                </div>

                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowUploadModal(false)}
                    className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};