// List of layers that are confirmed to work without authentication
export const WORKING_PUBLIC_LAYERS = [
  'USA Structures',
  'National Address Database', 
  'U.S. Census Blocks',
  'USA 2020 Census Block Characteristics',
  'Microsoft Building Footprints',
  'Open StreetMap Buildings for North America',
  'Base Reflectivity Radar Time Enabled',
  'WFIGS Current Interagency Fire Perimeters',
  'Current Wildland Fire Incident Locations',
  'Live Stream Gauges',
  'County Power Outages',
  'Iowa 511 Events',
  'Minnesota 511 Events',
  'Missouri 511 Events',
  'Nebraska 511 Events'
];

// Layers that require Red Cross authentication
export const RED_CROSS_INTERNAL_LAYERS = [
  'Worksites_PROD_Operations',
  'Open Shelters Partner View',
  'Master RC Geography FY 25',
  'Master DRA Territories'
];

// Actually apps, not layers (mislabeled)
export const MISLABELED_AS_FEATURES = [
  'Population & Housing Units Tool',
  'NWS GIS Viewer',
  'NIFC Fire Situational Awareness',
  'National Water Prediction Service',
  'Crisis Cleanup'
];

export function getLayerStatus(itemName: string): 'working' | 'auth-required' | 'app' | 'unknown' {
  if (WORKING_PUBLIC_LAYERS.includes(itemName)) return 'working';
  if (RED_CROSS_INTERNAL_LAYERS.includes(itemName)) return 'auth-required';
  if (MISLABELED_AS_FEATURES.includes(itemName)) return 'app';
  return 'unknown';
}