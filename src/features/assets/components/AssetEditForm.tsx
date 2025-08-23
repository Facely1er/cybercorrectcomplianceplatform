import React from 'react';
import { Asset } from '../../../shared/types/assets';
import { AssetCreationForm } from './AssetCreationForm';

interface AssetEditFormProps {
  asset: Asset;
  onSave: (updatedAsset: Asset) => void;
  onCancel: () => void;
}

export const AssetEditForm: React.FC<AssetEditFormProps> = ({
  asset, onSave, onCancel }) => {
  const handleSubmit = (assetData: Omit<Asset, 'id' | 'createdAt' | 'updatedAt'>) => { const updatedAsset: Asset = {
      ...assetData, id: asset.id, createdAt: asset.createdAt, updatedAt: new Date()
     };
    
    onSave(updatedAsset);
  };

  return (
    <AssetCreationForm
      initialData={asset }
      onSubmit={handleSubmit }
      onCancel={onCancel }
    />
  );
};