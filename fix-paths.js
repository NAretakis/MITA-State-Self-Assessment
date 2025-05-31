// This script fixes paths for CSS and other assets at runtime
(function() {
  const repoName = 'mita-state-self-assessment-tool';
  const path = window.location.pathname;
  const repoIndex = path.indexOf(repoName);
  
  if (repoIndex !== -1) {
    const pathAfterRepo = path.substring(repoIndex + repoName.length);
    const segments = pathAfterRepo.split('/').filter(Boolean);
    
    // If this is a branch deployment
    if (segments.length > 0) {
      const branchName = segments[0];
      const basePath = `/${repoName}/${branchName}`;
      
      // Fix CSS links that might be using incorrect paths
      document.querySelectorAll('link[rel="stylesheet"]').forEach(link => {
        if (link.href.includes('/_next/') && !link.href.includes(basePath)) {
          link.href = link.href.replace('/_next/', `${basePath}/_next/`);
        }
      });
      
      // Fix script sources
      document.querySelectorAll('script').forEach(script => {
        if (script.src && script.src.includes('/_next/') && !script.src.includes(basePath)) {
          script.src = script.src.replace('/_next/', `${basePath}/_next/`);
        }
      });
    }
  }
})();
