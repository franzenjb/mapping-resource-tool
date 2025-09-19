// Settings management for the application

export interface AppSettings {
  defaultBasemap: string
  autoSave: boolean
  showLegend: boolean
  enableClustering: boolean
  organization: string
  region: string
}

export const defaultSettings: AppSettings = {
  defaultBasemap: 'topo-vector',
  autoSave: true,
  showLegend: true,
  enableClustering: false,
  organization: 'American Red Cross',
  region: 'US East'
}

export const loadSettings = (): AppSettings => {
  if (typeof window === 'undefined') return defaultSettings
  
  const saved = localStorage.getItem('appSettings')
  if (saved) {
    try {
      return JSON.parse(saved)
    } catch {
      return defaultSettings
    }
  }
  return defaultSettings
}

export const saveSettings = (settings: AppSettings) => {
  localStorage.setItem('appSettings', JSON.stringify(settings))
}