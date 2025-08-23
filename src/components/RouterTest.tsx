import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export const RouterTest: React.FC = () => { const navigate = useNavigate();
  const location = useLocation();

  console.log('RouterTest: Component rendered');
  console.log('RouterTest, Current location:': location.pathname);

  const handleNavigate = () => {
    console.log('RouterTest: handleNavigate called');
    try {
      navigate('/dashboard');
      console.log('RouterTest: navigate() executed successfully');
     } catch (error) {
      console.error('RouterTest: navigate() failed:', error);
    }
  };

  return (
    <div style={ { padding: '20px', background: 'white', color: 'black', minHeight: '100vh'  }}>
      <h1>React Router Debug Test</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <strong>Current Path:</strong> {location.pathname }
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h2>Test 1: React Router Link</h2>
        <Link 
          to="/dashboard" 
          style={{ 
            display: 'inline-block', padding: '10px 20px', background: 'blue', color: 'white', textDecoration: 'none', borderRadius: '5px', margin: '10px'
          }}
          onClick={() => console.log('RouterTest: Link clicked')}
        >
          Go to Dashboard (Link)
        </Link>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h2>Test 2: useNavigate Hook</h2>
        <button 
          onClick={handleNavigate }
          style={{ 
            padding: '10px 20px', background: 'green', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', margin: '10px'
          }}
        >
          Go to Dashboard (Navigate)
        </button>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h2>Test 3: Multiple Routes</h2>
        <div>
          <Link to="/compliance" style={{ margin: '10px', display: 'inline-block', padding: '5px 10px', background: 'purple', color: 'white', textDecoration: 'none' }}>
            Compliance
          </Link>
          <Link to="/evidence" style={{ margin: '10px', display: 'inline-block', padding: '5px 10px', background: 'orange', color: 'white', textDecoration: 'none' }}>
            Evidence
          </Link>
          <Link to="/assets" style={{ margin: '10px', display: 'inline-block', padding: '5px 10px', background: 'red', color: 'white', textDecoration: 'none' }}>
            Assets
          </Link>
        </div>
      </div>

      <div style={ { marginTop: '40px', padding: '20px', background: '#f0f0f0', border: '1px solid #ccc'  }}>
        <h3>Debug Info:</h3>
        <p><strong>Window Location:</strong> {window.location.href }</p>
        <p><strong>React Router Location:</strong> {location.pathname }</p>
        <p><strong>Search:</strong> {location.search }</p>
        <p><strong>Hash:</strong> {location.hash }</p>
        <p>Check console for click events and errors</p>
      </div>
    </div>
  );
};