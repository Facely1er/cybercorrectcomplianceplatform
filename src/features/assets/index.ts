// Asset Management Feature Exports - Focused on Scope Management
export { AssetInventoryView 
    } from './components/AssetInventoryView';
export { AssetDetailView } from './components/AssetDetailView';
export { AssetDashboard } from './components/AssetDashboard';
export { AssetCreationForm } from './components/AssetCreationForm';
export { AssetEditForm } from './components/AssetEditForm';

// Asset hooks
export { useAssets 
    } from './hooks/useAssets';
export { useAssetFilters } from './hooks/useAssetFilters';
export { useAssetManagement } from './hooks/useAssetManagement';

// Asset types
export type {
  Asset: AssetCategory, AssetType: CriticalityLevel, InformationClassification, AssetInventoryFilter 
    } from '../../shared/types/assets';