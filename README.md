# ArcGIS & Red Cross Mapping Resources Tool

A powerful web application for searching, previewing, and exporting ArcGIS and Red Cross mapping layers and applications. Built with Next.js, TypeScript, and ArcGIS JavaScript API.

## Features

- **Search & Filter**: Search across hundreds of mapping resources by name, description, or category
- **Interactive Map Preview**: Add multiple layers to an interactive map for visualization
- **Layer Management**: Add, remove, and manage multiple layers simultaneously
- **Export Capabilities**: Export map configurations for use in ArcGIS Online
- **Resource Types**: Support for Feature Layers, Applications, and Reference materials
- **Red Cross Integration**: Special support for Red Cross disaster response data

## Quick Start

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Data Sources

The tool includes rich mapping resources from:
- FEMA structures and damage assessment data
- Census blocks and demographics
- National Weather Service products
- Storm prediction and hurricane tracking
- Red Cross operational data
- OpenStreetMap building footprints
- Microsoft Building Footprints
- And many more...

## Technology Stack

- **Framework**: Next.js 15 with TypeScript
- **Mapping**: ArcGIS JavaScript API 4.28
- **Styling**: Tailwind CSS
- **Data Processing**: PapaParse for CSV parsing

## Project Structure

```
mapping-resource-tool/
├── app/                    # Next.js app directory
├── components/             # React components
│   ├── MapView.tsx        # Interactive map component
│   ├── SearchBar.tsx      # Search interface
│   ├── SearchResults.tsx  # Results display
│   └── ExportButton.tsx   # Export functionality
├── lib/                   # Utility functions
│   ├── types.ts          # TypeScript interfaces
│   └── search.ts         # Search and data processing
└── public/data/          # CSV data files
```

## Usage

1. **Search**: Use the search bar to find mapping resources by keyword
2. **Filter**: Select resource type (Feature, App, Reference)
3. **Add to Map**: Click "Add to Map" for feature layers
4. **View Source**: Access original data sources via "View Source" links
5. **Open Apps**: Launch external mapping applications
6. **Export**: Download map configuration as JSON

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## License

MIT
