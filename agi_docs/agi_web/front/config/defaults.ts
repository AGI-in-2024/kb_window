export const DEFAULT_CONFIG = {
  ragflowId: 'ragflow-E3MTBmMTg2M2ExZDExZWY4NDg2MDI0Mm',
  apiUrl: 'http://localhost:9222',
  workflowId: '0cf49e3aad8511efa9c7d843ae08a70a'
}

// Optional: Add environment-specific overrides
export const getConfig = () => {
  // You can add environment-specific logic here if needed
  return DEFAULT_CONFIG
} 