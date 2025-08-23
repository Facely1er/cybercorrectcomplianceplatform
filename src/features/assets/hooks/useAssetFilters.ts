import { useMemo } from 'react';
import { Asset, AssetInventoryFilter } from '../../../shared/types/assets';

export const useAssetFilters = (assets: Asset[], filters: AssetInventoryFilter) => {
  const filteredAssets = useMemo(() => {
    return assets.filter((asset) => {
      // Category filter
      if (filters.categories && filters.categories.length > 0) {
        if (!filters.categories.includes(asset.category)) return false;
    }
      // Type filter
      if (filters.types && filters.types.length > 0) {
        if (!filters.types.includes(asset.type)) return false;
    }
      // Criticality filter
      if (filters.criticality && filters.criticality.length > 0) {
        if (!filters.criticality.includes(asset.criticality)) return false;
    }
      // Status filter
      if (filters.status && filters.status.length > 0) {
        if (!filters.status.includes(asset.status)) return false;
    }
      // Classification filter
      if (filters.classification && filters.classification.length > 0) {
        if (!filters.classification.includes(asset.informationClassification)) return false;
    }
      // Owner filter
      if (filters.owners && filters.owners.length > 0) {
        if (!filters.owners.includes(asset.owner)) return false;
    }
      // Location filter
      if (filters.locations && filters.locations.length > 0) {
        const locationString = `${asset.location.building || ''} ${asset.location.room || ''}`.toLowerCase();
        const hasMatchingLocation = filters.locations.some(location => 
          locationString.includes(location.toLowerCase())
        );
        if (!hasMatchingLocation) return false;
      }

      // Tags filter
      if (filters.tags && filters.tags.length > 0) {
        const hasMatchingTag = filters.tags.some(tag => 
          asset.tags.some(assetTag => assetTag.toLowerCase().includes(tag.toLowerCase()))
        );
        if (!hasMatchingTag) return false;
    }
      // Risk level filter
      if (filters.riskLevel && filters.riskLevel.length > 0) {
        if (!filters.riskLevel.includes(asset.riskAssessment.overallRisk)) return false;
    }
      return true;
    });
  }, [assets, filters]);

  const assetMetrics = useMemo(() => {
    return {
      total: filteredAssets.length, byCategory: filteredAssets.reduce((acc, asset) => {
        acc[asset.category] = (acc[asset.category] || 0) + 1;
        return acc;
      }, {} as Record<string, number>), byCriticality: filteredAssets.reduce((acc, asset) => {
        acc[asset.criticality] = (acc[asset.criticality] || 0) + 1;
        return acc;
      }, {} as Record<string, number>), byStatus: filteredAssets.reduce((acc, asset) => {
        acc[asset.status] = (acc[asset.status] || 0) + 1;
        return acc;
      }, {} as Record<string, number>), byClassification: filteredAssets.reduce((acc, asset) => {
        acc[asset.informationClassification] = (acc[asset.informationClassification] || 0) + 1;
        return acc;
      }, {} as Record<string, number>), byRisk: filteredAssets.reduce((acc, asset) => {
        acc[asset.riskAssessment.overallRisk] = (acc[asset.riskAssessment.overallRisk] || 0) + 1;
        return acc;
      }, {} as Record<string, number>), criticalAssets: filteredAssets.filter(a => a.criticality === 'critical').length, highRiskAssets: filteredAssets.filter(a => a.riskAssessment.overallRisk === 'high' || a.riskAssessment.overallRisk === 'very-high').length, overdueMaintenance: filteredAssets.filter(a => new Date(a.lifecycle.maintenanceSchedule.nextMaintenance) < new Date()).length, expiringSupportContracts: filteredAssets.filter((a) => {
        if (!a.lifecycle.supportContract) return false;
        const thirtyDaysFromNow = new Date();
        thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
        return new Date(a.lifecycle.supportContract.endDate) <= thirtyDaysFromNow;
      }).length };
  }, [filteredAssets]);

  return {
    filteredAssets, assetMetrics };
};