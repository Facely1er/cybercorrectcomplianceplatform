module.exports = {
  ci: {
    collect: {
      url: [
        'http://localhost:4173/',
        'http://localhost:4173/dashboard',
        'http://localhost:4173/assessment-intro'
      ],
      numberOfRuns: 2
    },
    assert: {
      assertions: {
        'categories:performance': ['warn', {minScore: 0.9}],
        'categories:accessibility': ['error', {minScore: 0.95}],
        'categories:best-practices': ['warn', {minScore: 0.9}],
        'categories:pwa': ['warn', {minScore: 0.8}]
      }
    }
  }
};