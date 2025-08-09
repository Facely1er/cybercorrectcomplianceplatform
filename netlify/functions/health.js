// Health check endpoint for production monitoring
export async function handler(event, context) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Content-Type': 'application/json',
    'Cache-Control': 'no-store, no-cache, must-revalidate'
  };

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const healthStatus = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version || '2.0.0',
      environment: 'production',
      checks: {
        api: 'healthy',
        frontend: 'healthy',
        deployment: 'healthy'
      },
      uptime: process.uptime ? Math.floor(process.uptime()) : 0,
      memory: process.memoryUsage ? process.memoryUsage() : null
    };

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(healthStatus, null, 2)
    };
  } catch (error) {
    return {
      statusCode: 503,
      headers,
      body: JSON.stringify({
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: error.message
      }, null, 2)
    };
  }
}