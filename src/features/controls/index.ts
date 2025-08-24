// Controls Management Feature Exports
export { ControlsManagementView 
    } from './components/ControlsManagementView';

// Control types - using a more specific type definition
export interface Control { id, string;
  name, string;
  description?, string;
  status: 'active' | 'inactive' | 'pending';
  category?, string;
    }