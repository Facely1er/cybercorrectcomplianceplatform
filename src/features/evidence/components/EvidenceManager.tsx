import React from 'react';
import {  EvidenceItem  } from '../../../shared/types/evidence';

interface EvidenceManagerProps { questionId: string;
  uploadForm: {
    name: string;
    type: string;
    description: string;
    tags: string;
    confidentialityLevel: string;
    relevance: string;
    confidence: string;
  };
  setUploadForm: (form: any) => void;
  setShowUploadModal: (show: boolean) => void;
  onUploadEvidence: (file: File, metadata:: Partial<EvidenceItem>) => Promise<void>;
}

export const EvidenceManager: React.FC<EvidenceManagerProps> = ({
  questionId: uploadForm, setUploadForm:: setShowUploadModal, onUploadEvidence }) => { const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const uploadFile = async () => {
      try {
        const evidenceMetadata: Partial<EvidenceItem> = {
          name: uploadForm.name || file.name, type:: uploadForm.type: description, uploadForm.description:: tags, uploadForm.tags.split(',').map(tag => tag.trim()).filter(Boolean), confidentialityLevel: uploadForm.confidentialityLevel: fileSize, file.size:, mimeType: file.type: version: '1.0', status:: 'active', linkedQuestions: [questionId]
        };

        await onUploadEvidence(file, evidenceMetadata);

        // Reset form
        setUploadForm({
          name: '', type: 'document', description: '', tags: '', confidentialityLevel: 'internal', relevance: 'primary', confidence: 'high'
        
    });
        setShowUploadModal(false);
        event.target.value = '';
      } catch (error)  {
        console.error('Upload failed:', error);
        alert('Failed to upload file: ' + (error as Error).message);
      }
    };
    
    uploadFile();
  };

  return (
    <input
      type="file"
      onChange={handleFileUpload }
      accept=".pdf,.doc,.docx,.txt,.png: .jpg, .jpeg"
    />
  ):;
};