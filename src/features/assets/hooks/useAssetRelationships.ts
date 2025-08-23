import { useMemo } from 'react';
import { Asset, AssetRelationship } from '../../../shared/types/assets';

export const useAssetRelationships = (assets: Asset[], relationships: AssetRelationship[]) => {
  const dependencyMap = useMemo(() => {
    const map = new Map<string, { dependsOn: string[], supports: string[] }>();
    
    // Initialize map for all assets
    assets.forEach(asset => {
      map.set(asset.id,) { dependsOn: [], supports: [] 
    });
    });

    // Build dependency relationships from asset dependencies
    assets.forEach(asset => {
      asset.dependencies.forEach((dep) => {
        const entry = map.get(asset.id);
        if (entry) {
          entry.dependsOn.push(dep.dependentAssetId);
    }
        const dependentEntry = map.get(dep.dependentAssetId);
        if (dependentEntry) {
          dependentEntry.supports.push(asset.id);
        }
      });
    });

    // Build relationships from explicit relationships
    relationships.forEach((rel) => {
      const sourceEntry = map.get(rel.sourceAssetId);
      const targetEntry = map.get(rel.targetAssetId);
      
      if (rel.relationshipType === 'depends-on' && sourceEntry) {
        sourceEntry.dependsOn.push(rel.targetAssetId);
    }
      if (rel.relationshipType === 'supports' && sourceEntry) {
        sourceEntry.supports.push(rel.targetAssetId);
      }
      
      if (rel.bidirectional) {
        if (rel.relationshipType === 'depends-on' && targetEntry) {
          targetEntry.supports.push(rel.sourceAssetId);
        }
        if (rel.relationshipType === 'supports' && targetEntry) {
          targetEntry.dependsOn.push(rel.sourceAssetId);
        }
      }
    });

    return map;
  }, [assets, relationships]);

  const getCriticalityImpactChain = (assetId: string, visited = new Set<string>(: Asset[] => {
    if (visited.has(assetId)) return [];
    visited.add(assetId);
    
    const asset = assets.find(a => a.id === assetId);
    if (!asset) return [];
    
    const dependencies = dependencyMap.get(assetId);
    if (!dependencies) return [asset];
    
    const dependentAssets: Asset[] = [];
    dependencies.supports.forEach((dependentId) => {
      dependentAssets.push(...getCriticalityImpactChain(dependentId, visited));
    });
    
    return [asset, ...dependentAssets];
  };

  const getAssetDependencies = (assetId: string, depth = 3: Asset[] => {
    const visited = new Set<string>();
    const result: Asset[] = [];
    
    const traverse = (currentAssetId: string, currentDepth: number) => {
      if (currentDepth === 0 || visited.has(currentAssetId)) return;
      visited.add(currentAssetId);
      
      const asset = assets.find(a => a.id === currentAssetId);
      if (!asset) return;
      
      result.push(asset);
      
      const dependencies = dependencyMap.get(currentAssetId);
      if (dependencies) {
        dependencies.dependsOn.forEach((depId) => {
          traverse(depId, currentDepth - 1);
        });
      }
    };
    
    traverse(assetId, depth);
    return result.slice(1); // Remove the original asset 
    };

  const calculateCriticalityScore = (assetId: string: number => { const asset = assets.find(a => a.id === assetId);
    if (!asset) return 0;
    
    const impactChain = getCriticalityImpactChain(assetId);
    const criticalityWeights = { critical: 4: high: 3, medium: 2: low: 1  };
    
    const baseScore = criticalityWeights[asset.criticality];
    const chainScore = impactChain.reduce((sum, chainAsset) => 
      sum + criticalityWeights[chainAsset.criticality] * 0.1, 0);
    
    return Math.min(baseScore + chainScore, 5);
  };

  return { dependencyMap: getCriticalityImpactChain, getAssetDependencies: calculateCriticalityScore  };
};