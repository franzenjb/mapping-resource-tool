# 🗺️ Disaster Response Mapping Resource Tool

A comprehensive web application for accessing and visualizing disaster response mapping resources from FEMA, Red Cross, NOAA, and other agencies.

## 🚀 Live Demo

**[View Live Application](https://franzenjb.github.io/mapping-resource-tool/)**

**GitHub Repository:** https://github.com/franzenjb/mapping-resource-tool

## 📋 Overview

This tool consolidates 60+ mapping resources critical for disaster response operations, providing instant access to real-time hazard data, demographic information, and emergency response layers.

## ✨ Key Features

### 🗺️ Interactive Map View
- **Multi-layer Support**: Add multiple data layers simultaneously
- **Smart Popups**: Click any feature to see detailed information
- **Basemap Gallery**: Switch between topographic, street, satellite, and hybrid views
- **Search Integration**: Find locations and addresses quickly
- **Dynamic Legend**: Automatically updates based on active layers

### 📚 Resource Library
- **60+ Curated Resources**: Comprehensive database of mapping resources
- **Smart Filtering**: Filter by type (Features, Apps, References) and search by keyword
- **Status Indicators**: Visual badges show which layers work without authentication
- **Direct Access**: One-click links to original data sources

### 🎯 Working Layers (No Authentication Required)
- USA Structures (FEMA building footprints with addresses)
- National Address Database
- U.S. Census Blocks with population/housing data
- Microsoft Building Footprints
- Live wildfire perimeters and incidents
- Real-time stream gauges and flood data
- Power outage tracking by county
- Traffic incidents (511 events)

### ⚙️ Settings & Preferences
- Save preferred basemap style
- Configure legend visibility
- Enable/disable point clustering
- Organization and region defaults
- Authentication status management

## 🛠️ Technology Stack

- **Framework**: Next.js 15 with TypeScript
- **Mapping Engine**: ArcGIS JavaScript API 4.30
- **Styling**: Tailwind CSS with custom animations
- **State Management**: React hooks and context
- **Data Format**: CSV database with dynamic loading
- **Deployment**: GitHub Pages with GitHub Actions CI/CD
- **Authentication**: Hybrid system (simple password + OAuth ready)

## 📊 Resource Categories

### Emergency Response
- Open shelters and evacuation centers
- Crisis cleanup coordination
- Damage assessment tools
- Emergency response imagery

### Weather & Climate
- National Weather Service products
- Storm prediction center data
- Hurricane tracking (Hurrevac)
- Radar and precipitation

### Wildfire
- Current fire perimeters (WFIGS)
- Active incident locations
- NIFC fire situational awareness
- Watch Duty volunteer reports

### Flooding & Water
- National Water Prediction Service
- Live stream gauges
- Flood inundation mapping (current & 5-day forecast)
- River forecast centers

### Infrastructure
- Power outage tracking
- Road conditions and closures
- Building footprints
- Census demographics

## 🚀 Quick Start

### Prerequisites
```bash
Node.js 18+ 
npm or yarn
Git
```

### Installation

```bash
# Clone the repository
git clone https://github.com/franzenjb/mapping-resource-tool.git

# Navigate to project directory
cd mapping-resource-tool

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Run development server
npm run dev

# Open http://localhost:3000
```

### Environment Configuration

Create `.env.local`:
```env
NEXT_PUBLIC_AUTH_MODE=simple
NEXT_PUBLIC_ARCGIS_CLIENT_ID=your_client_id_here
NEXT_PUBLIC_AUTH_PASSWORD=redcross
NEXT_PUBLIC_BASE_PATH=/mapping-resource-tool
```

## 📁 Project Structure

```
mapping-resource-tool/
├── app/                       # Next.js app router
│   ├── page.tsx              # Main map interface
│   ├── resources/page.tsx    # Resource library
│   ├── ai/page.tsx          # AI assistant (mock)
│   └── settings/page.tsx     # User settings
│
├── components/               # React components
│   ├── MapView.tsx          # ArcGIS map wrapper
│   ├── Navigation.tsx       # Top navigation
│   ├── HelpModal.tsx        # Help documentation
│   └── PasswordProtection.tsx # Auth component
│
├── lib/                     # Utilities & helpers
│   ├── search.ts           # Resource search logic
│   ├── popup-templates.ts  # Feature popup configs
│   ├── working-layers.ts   # Layer status tracking
│   └── settings.ts         # Settings management
│
├── public/
│   └── data/
│       └── mapping_resources.csv # Resource database
│
└── .github/
    └── workflows/
        └── deploy.yml      # GitHub Pages deployment
```

## 🔧 Key Components

### MapView Component
- Dynamic layer loading
- Popup template system
- Basemap switching
- Export to WebMap JSON

### Resource Search
- CSV parsing with PapaParse
- Fuzzy search capabilities
- Category filtering
- Status checking

### Authentication
- Simple password for development
- OAuth2 ready for production
- Token persistence
- Auto-logout on inactivity

## 📝 Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Run production build locally
npm run start

# Type checking
npm run type-check

# Linting
npm run lint
```

## 🚢 Deployment

The application automatically deploys to GitHub Pages when pushing to the main branch:

```bash
git add .
git commit -m "Your changes"
git push origin main
```

Deployment happens via GitHub Actions and takes 2-3 minutes.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📚 Documentation

- [Development Guide](./DEVELOPMENT.md)
- [Resource Guide](./RESOURCE_GUIDE.md)
- [API Documentation](./docs/API.md)

## 🐛 Known Issues

- Some layers require Red Cross authentication
- PDF links may not work in all browsers
- Large datasets may cause performance issues

## 🔮 Future Enhancements

- [ ] Real AI integration for resource recommendations
- [ ] Offline capability with service workers
- [ ] Mobile app version
- [ ] Custom drawing tools
- [ ] Save and share map configurations
- [ ] Historical data playback

## 📄 License

MIT License - see [LICENSE](./LICENSE) file for details

## 🙏 Acknowledgments

- **FEMA** - Disaster response data and APIs
- **American Red Cross** - Operational layers and shelters
- **NOAA/NWS** - Weather and water data
- **NIFC** - Wildfire information
- **Esri** - ArcGIS platform and Living Atlas
- **OpenStreetMap** - Building and infrastructure data

## 📞 Support

**Contact**: jeff.franzen2@redcross.org  
**Issues**: [GitHub Issues](https://github.com/franzenjb/mapping-resource-tool/issues)

## 🚦 Status

![Build Status](https://github.com/franzenjb/mapping-resource-tool/workflows/Deploy%20to%20GitHub%20Pages/badge.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-1.0.0-green.svg)

**Active Development** - Updated regularly with new resources and features

---

Built with ❤️ for disaster response operations

🤖 Generated with [Claude Code](https://claude.ai/code)