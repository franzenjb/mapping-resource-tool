# Simple Guide to Mapping Resources

## The Three Types Explained Simply

### 🗺️ **Features** = Data You Can Put on a Map
Think of these like transparent overlays you can place on a map. Each one shows different information:
- **Building locations** (where houses and structures are)
- **Fire locations** (where wildfires are burning right now)
- **Flood areas** (which areas are underwater)
- **Population data** (how many people live in each area)

**How to use**: Click "Add to Map" and it appears as a layer on your map. You can add multiple layers to see relationships (like which buildings are near a fire).

### 📱 **Apps** = Websites That Do Something
These are complete tools built by others that you visit in your browser:
- **Weather radar viewer** - Shows animated storm movement
- **Hurricane tracker** - Tracks hurricane paths and predictions
- **Population calculator** - Draw an area and it tells you how many people live there
- **Fire dashboard** - Shows all current wildfires with details

**How to use**: Click "Open App" and it opens in a new tab. Each app is self-contained with its own features.

### 📚 **References** = Information and Documentation
These are guides, lists, or portals that help you understand or find more resources:
- **How-to guides** for using Census data
- **Lists** of weather station codes
- **Portals** that link to many other resources
- **Documentation** explaining data formats

**How to use**: Click "View Source" to read documentation or access resource catalogs.

---

## Who Provides What?

### 🌐 **ArcGIS/Esri** (The Main Platform)
- **What it is**: Like Google Maps but for professional emergency response
- **What they provide**: The mapping platform and many data layers
- **Identified by**: URLs with "arcgis.com" or mentions of "Living Atlas"

### 🏛️ **Government Agencies**
Each agency specializes in different data:
- **NOAA/NWS**: Weather, storms, flooding (anything weather-related)
- **FEMA**: Building damage, disaster areas, emergency declarations
- **Census**: Population, housing units, neighborhood boundaries
- **USGS**: Earthquakes, topographic maps, geographic names

### 🔴 **Red Cross Internal**
- **What they provide**: Shelter locations, volunteer territories, operational data
- **Identified by**: "arc-nhq-gis" in the URL (internal Red Cross GIS system)

---

## Real-World Example Scenarios

### 🌀 **Hurricane Approaching Florida**
1. **Open** Hurricane tracker app to see the path
2. **Add** Population layer to see how many people in the path
3. **Add** Building footprints to count affected structures
4. **Check** Power outage layer as storm hits
5. **Use** Shelter locations to direct evacuees

### 🔥 **Wildfire Response**
1. **Add** Current fire perimeter (Feature) to see fire boundary
2. **Add** Building footprints to identify threatened structures
3. **Open** Fire situational awareness app for detailed info
4. **Check** Road closures for evacuation routes
5. **Monitor** Air quality data layers

### 🌊 **Flood Event**
1. **Add** Stream gauge data to see water levels
2. **View** Flood inundation maps showing predicted flooding
3. **Add** Census blocks to estimate affected population
4. **Check** Road closures for accessible routes
5. **Identify** Critical infrastructure in flood zones

---

## Quick Decision Tree

**"I need to see where something is"** → Use a **Feature** (add to map)

**"I need a tool to analyze or track something"** → Use an **App** (opens separately)

**"I need to learn how to use something"** → Use a **Reference** (documentation)

---

## Common Combinations

### Basic Disaster Response Setup
1. **Base map** (streets and terrain)
2. **Building footprints** (what structures exist)
3. **Population data** (who lives there)
4. **Current hazard** (fire, flood, or storm layer)
5. **Response resources** (shelters, staging areas)

### Damage Assessment Configuration
1. **Pre-event imagery** (what it looked like before)
2. **Damage indicators** (NWS damage points)
3. **Structure data** (building footprints)
4. **Address points** (for reporting specific locations)

---

## Pro Tips

1. **Start Simple**: Add one or two layers first, then build up
2. **Check Dates**: Some data updates hourly (stream gauges), others are static
3. **Save Configurations**: Export your map setup to reload later
4. **Combine Types**: Use Features for data, Apps for analysis, References for help
5. **Test Before Emergency**: Learn the tools when you're not under pressure

---

## Most Important Resources for Red Cross Work

### Top 5 Features (Data Layers)
1. **USA Structures** - For damage assessment planning
2. **Census Block Characteristics** - For population impact
3. **Live Stream Gauges** - For flood monitoring
4. **Current Fire Perimeters** - For wildfire response
5. **Open Shelters** - For resource coordination

### Top 5 Apps (Tools)
1. **Hurrevac** - Hurricane tracking and decisions
2. **National Water Prediction** - Flood forecasting
3. **NIFC Fire Situational Awareness** - Wildfire monitoring
4. **Crisis Cleanup** - Volunteer coordination
5. **Population & Housing Units Tool** - Impact estimation

### Top 3 References
1. **FEMA Geospatial Resource Center** - Gateway to all FEMA resources
2. **NOAA GeoPlatform** - Weather and climate data portal
3. **Emergency Response Imagery** - Post-disaster aerial photos

---

Remember: These tools are meant to work together. No single resource tells the whole story - it's the combination that provides situational awareness for effective disaster response.