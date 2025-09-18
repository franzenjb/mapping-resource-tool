# Mapping Resource Tool

A comprehensive web application for accessing and managing ArcGIS and Red Cross mapping resources. Built with Next.js, TypeScript, and the ArcGIS JavaScript API.

## 🌐 Live Demo

**Production:** https://mapping-resource-tool.vercel.app  
**GitHub Repository:** https://github.com/franzenjb/mapping-resource-tool

## 🚀 Features

- **Rich Resource Database**: Access to 60+ curated mapping layers from ArcGIS, NOAA, Red Cross, and more
- **Interactive Map**: Real-time visualization with ArcGIS JavaScript API
- **Smart Search**: Filter resources by type (Feature, App, Reference) and keywords
- **Category Organization**: Resources organized by disaster type (Weather, Wildfire, Flooding, etc.)
- **Simple Authentication**: Secure access with password protection
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Layer Management**: Add, remove, and manage multiple layers simultaneously
- **Export Capabilities**: Export map configurations for use in ArcGIS Online

## 📦 Resource Categories

- **Census & Demographics**: Population data, housing units, block characteristics
- **Weather & Storms**: NWS data, storm predictions, hurricane tracking
- **Wildfire**: Fire perimeters, incident locations, situational awareness
- **Flooding**: Water prediction, flood inundation mapping, river gauges
- **Emergency Response**: Red Cross shelters, crisis cleanup, damage assessment
- **Infrastructure**: Power outages, road closures, transportation
- **FEMA Resources**: Damage assessment, structures data, resilience analysis

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Mapping**: ArcGIS JavaScript API 4.30
- **Styling**: Tailwind CSS
- **Data**: CSV parsing with PapaParse
- **Authentication**: Hybrid (Simple/OAuth)
- **Deployment**: Vercel

## 🏗️ Setup & Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/franzenjb/mapping-resource-tool.git
   cd mapping-resource-tool
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file:
   ```env
   NEXT_PUBLIC_AUTH_MODE=simple
   NEXT_PUBLIC_ARCGIS_CLIENT_ID=your_client_id
   NEXT_PUBLIC_AUTH_PASSWORD=your_password
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000)

## 📝 Development Notes

### Authentication
- **Development**: Uses simple password authentication (default: "redcross")
- **Production**: Can be configured for ArcGIS OAuth 2.0

### Data Sources
The tool includes rich mapping resources from:
- FEMA structures and damage assessment data
- U.S. Census Bureau demographics and blocks
- National Weather Service products and forecasts
- NOAA Storm Prediction Center
- Red Cross operational data and shelters
- OpenStreetMap building footprints
- Microsoft Building Footprints
- NIFC wildfire data
- USGS National Map

### Adding New Resources
Edit `/public/data/mapping_resources.csv` to add new mapping resources. Format:
```csv
Item,Link,Description,"Feature, App or Reference",Category
```

### Key Files
- `/app/page.tsx` - Main application interface
- `/components/MapView.tsx` - ArcGIS map component
- `/components/HybridAuth.tsx` - Authentication system
- `/lib/search.ts` - Search and filter logic
- `/public/data/mapping_resources.csv` - Resource database

## 🔄 Future Enhancements

- [ ] User favorites/bookmarks system
- [ ] Advanced layer metadata preview
- [ ] Collaboration features for teams
- [ ] API integration for dynamic updates
- [ ] Mobile app version
- [ ] Offline capability for field work
- [ ] Custom layer upload support
- [ ] Integration with Red Cross CAS system
- [ ] Historical disaster overlays
- [ ] Real-time alert integration

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is proprietary to the American Red Cross.

## 🙏 Acknowledgments

Special thanks to:
- American Red Cross GIS team
- ArcGIS Living Atlas contributors
- NOAA/NWS for weather data
- FEMA for disaster response data
- All data providers listed in the resources

## 📧 Contact

Jeff Franzen - jeff.franzen2@redcross.org

---

**Last Updated:** September 2025  
**Version:** 1.0.0  
**Status:** Active Development