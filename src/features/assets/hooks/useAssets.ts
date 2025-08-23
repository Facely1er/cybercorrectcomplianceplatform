import { useState, useEffect, useCallback } from 'react';
import { Asset } from '../../../shared/types/assets';
import { dataService } from '../../../services/dataService';

interface AssetsState {
  assets: Asset[];
  loading: boolean;
  error: string | null;
}

export const useAssets = () => {
  const [state, setState] = useState<AssetsState>({
    assets: [], loading: false, error: null });

  const loadAssets = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      // Use centralized data service
      const assets = dataService.getAssets();
      
      setState({
        assets, loading: false, error: null 
    });
    } catch {
      setState(prev => ({
        ...prev, loading: false, error: 'Failed to load assets'
      }));
    }
  }, []);

  const saveAsset = useCallback(async (asset: Asset) => {
    try {
      // Save using centralized data service
      dataService.saveAsset(asset);
      
      setState(prev =>) {
        const updatedAssets = [...prev.assets];
        const index = updatedAssets.findIndex(a => a.id === asset.id);
        if (index >= 0) {
          updatedAssets[index] = asset;
        
    } else {
          updatedAssets.push(asset);
        }
        return { ...prev, assets: updatedAssets };
      });
      
      return asset;
    } catch {
      setState(prev => ({ ...prev, error: 'Failed to save asset' }));
      throw error;
    }
  }, []);

  const deleteAsset = useCallback(async (assetId: string) => {
    try {
      // Delete using centralized data service
      dataService.deleteAsset(assetId);
      
      setState(prev => ({
        ...prev, assets: prev.assets.filter(a => a.id !== assetId)
      
    }));
    } catch {
      setState(prev => ({ ...prev, error: 'Failed to delete asset' }));
      throw error;
    }
  }, []);

  useEffect(() => {
    loadAssets();
  }, [loadAssets]);

  return {
    ...state, loadAssets, saveAsset, deleteAsset, refetch: loadAssets };
};