@@ .. @@
   const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
     const file = event.target.files?.[0];
     if (!file) return;

-    const evidenceMetadata: Partial<EvidenceItem> = {
-      name: uploadForm.name || file.name,
-      type: uploadForm.type,
-      description: uploadForm.description,
-      tags: uploadForm.tags.split(',').map(tag => tag.trim()).filter(Boolean),
-      confidentialityLevel: uploadForm.confidentialityLevel,
-      fileSize: file.size,
-      mimeType: file.type,
-      version: '1.0',
-      status: 'active',
-      linkedQuestions: [questionId]
-    };
-
-    onUploadEvidence(file, evidenceMetadata);
-
-    // Reset form
-    setUploadForm({
-      name: '',
-      type: 'document',
-      description: '',
-      tags: '',
-      confidentialityLevel: 'internal',
-      relevance: 'primary',
-      confidence: 'high'
-    });
-    setShowUploadModal(false);
-    event.target.value = '';
+    const uploadFile = async () => {
+      try {
+        const evidenceMetadata: Partial<EvidenceItem> = {
+          name: uploadForm.name || file.name,
+          type: uploadForm.type,
+          description: uploadForm.description,
+          tags: uploadForm.tags.split(',').map(tag => tag.trim()).filter(Boolean),
+          confidentialityLevel: uploadForm.confidentialityLevel,
+          fileSize: file.size,
+          mimeType: file.type,
+          version: '1.0',
+          status: 'active',
+          linkedQuestions: [questionId]
+        };
+
+        await onUploadEvidence(file, evidenceMetadata);
+
+        // Reset form
+        setUploadForm({
+          name: '',
+          type: 'document',
+          description: '',
+          tags: '',
+          confidentialityLevel: 'internal',
+          relevance: 'primary',
+          confidence: 'high'
+        });
+        setShowUploadModal(false);
+        event.target.value = '';
+      } catch (error) {
+        console.error('Upload failed:', error);
+        alert('Failed to upload file: ' + (error as Error).message);
+      }
+    };
+    
+    uploadFile();
   };