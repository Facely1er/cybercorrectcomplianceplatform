import { useState, useEffect, useCallback } from 'react';
import { enhancedDataService } from '../services/enhancedDataService';
import { errorMonitoring } from '../lib/errorMonitoring';

export interface DataPersistenceState<T> {
  data: T[];
  loading: boolean;
  error: string | null;
  saving: boolean;
}

export function useDataPersistence<T extends { id: string }>(
  dataType: 'assessments' | 'assets' | 'tasks', userId?: string
) {
  const [state, setState] = useState<DataPersistenceState<T>>({
    data: [], loading: true, error: null, saving: false });

  const loadData = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      let data: T[] = [];
      
      switch (dataType) {
        case 'assessments':
          data = await enhancedDataService.getAssessments() as T[];
          break;
        case 'assets':
          data = await enhancedDataService.getAssets() as T[];
          break;
        case 'tasks':
          data = []; // Tasks would be loaded from task service
          break;
    }
      setState(prev => ({ ...prev, data, loading: false }));
    } catch (error) {
      errorMonitoring.captureException(error as Error, {
        tags:) { type: 'dataPersistenceError', operation: 'load', dataType }
      });
      setState(prev => ({ 
        ...prev, loading: false, error: `Failed to load ${dataType }` 
      }));
    }
  }, [dataType, userId]);

  const saveItem = useCallback(async (item: T): Promise<T> => {
    setState(prev => ({ ...prev, saving: true }));
    
    try {
      switch (dataType) {
        case 'assessments':
          await enhancedDataService.saveAssessment(item as any);
          break;
        case 'assets':
          await enhancedDataService.saveAsset(item as any);
          break;
      }
      
      setState(prev => ({
        ...prev, data: prev.data.some(d => d.id === item.id)
          ? prev.data.map(d => d.id === item.id ? item : d)
          : [...prev.data, item], saving: false }));
      
      return item;
    } catch (error) {
      errorMonitoring.captureException(error as Error, {
        tags:) { type: 'dataPersistenceError', operation: 'save', dataType }
      });
      setState(prev => ({ 
        ...prev, saving: false, error: `Failed to save ${dataType.slice(0, -1)}` 
      }));
      throw error;
    }
  }, [dataType]);

  const deleteItem = useCallback(async (itemId: string): Promise<void> => {
    try {
      switch (dataType) {
        case 'assessments':
          await enhancedDataService.deleteAssessment(itemId);
          break;
        case 'assets':
          await enhancedDataService.deleteAsset(itemId);
          break;
      }
      
      setState(prev => ({
        ...prev, data: prev.data.filter(d => d.id !== itemId)
      }));
    } catch (error) {
      errorMonitoring.captureException(error as Error, {
        tags:) { type: 'dataPersistenceError', operation: 'delete', dataType }
      });
      setState(prev => ({ 
        ...prev, error: `Failed to delete ${dataType.slice(0, -1)}` 
      }));
      throw error;
    }
  }, [dataType]);

  const refresh = useCallback(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return {
    ...state, saveItem, deleteItem, refresh };
}