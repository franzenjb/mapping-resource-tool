// Popup templates for different layer types

export const getPopupTemplate = (layerName: string) => {
  // Census Block layers
  if (layerName.includes('Census Block') || layerName.includes('USA 2020 Census')) {
    return {
      title: "{NAME} in {COUNTY}, {STATE}",
      content: [{
        type: "fields",
        fieldInfos: [
          {
            fieldName: "P0010001",
            label: "Total Population",
            format: {
              digitSeparator: true,
              places: 0
            }
          },
          {
            fieldName: "H0010001",
            label: "Total Housing Units",
            format: {
              digitSeparator: true,
              places: 0
            }
          },
          {
            fieldName: "H0010002",
            label: "Occupied Housing Units",
            format: {
              digitSeparator: true,
              places: 0
            }
          },
          {
            fieldName: "H0010003",
            label: "Vacant Housing Units",
            format: {
              digitSeparator: true,
              places: 0
            }
          },
          {
            fieldName: "ALAND",
            label: "Land Area (sq meters)",
            format: {
              digitSeparator: true,
              places: 0
            }
          },
          {
            fieldName: "AWATER",
            label: "Water Area (sq meters)",
            format: {
              digitSeparator: true,
              places: 0
            }
          },
          {
            fieldName: "GEOID",
            label: "Geographic ID"
          },
          {
            fieldName: "BLOCK",
            label: "Block Number"
          },
          {
            fieldName: "TRACT",
            label: "Census Tract"
          }
        ]
      }, {
        type: "text",
        text: "<b>Population Density:</b> {expression/density} people per sq mile"
      }],
      expressionInfos: [{
        name: "density",
        expression: "Round(($feature.P0010001 / ($feature.ALAND * 0.0000003861)) * 100) / 100",
        title: "Population Density"
      }]
    }
  }

  // USA Structures
  if (layerName.includes('USA Structures')) {
    return {
      title: "Structure Information",
      content: [{
        type: "fields",
        fieldInfos: [
          {
            fieldName: "ADDRESS",
            label: "Address"
          },
          {
            fieldName: "CITY",
            label: "City"
          },
          {
            fieldName: "STATE",
            label: "State"
          },
          {
            fieldName: "ZIP",
            label: "ZIP Code"
          },
          {
            fieldName: "BLDG_TYPE",
            label: "Building Type"
          },
          {
            fieldName: "SQ_FEET",
            label: "Square Feet",
            format: {
              digitSeparator: true,
              places: 0
            }
          },
          {
            fieldName: "YEAR_BUILT",
            label: "Year Built"
          },
          {
            fieldName: "OCCUP_TYPE",
            label: "Occupancy Type"
          }
        ]
      }]
    }
  }

  // National Address Database
  if (layerName.includes('National Address Database') || layerName.includes('Address')) {
    return {
      title: "Address Point",
      content: [{
        type: "fields",
        fieldInfos: [
          {
            fieldName: "FullAddr",
            label: "Full Address"
          },
          {
            fieldName: "Add_Number",
            label: "Street Number"
          },
          {
            fieldName: "StName",
            label: "Street Name"
          },
          {
            fieldName: "StType",
            label: "Street Type"
          },
          {
            fieldName: "City",
            label: "City"
          },
          {
            fieldName: "State",
            label: "State"
          },
          {
            fieldName: "Zip",
            label: "ZIP Code"
          },
          {
            fieldName: "County",
            label: "County"
          },
          {
            fieldName: "Placement",
            label: "Placement Method"
          }
        ]
      }]
    }
  }

  // Fire perimeters
  if (layerName.includes('Fire Perimeter') || layerName.includes('WFIGS')) {
    return {
      title: "{IncidentName} Fire",
      content: [{
        type: "fields",
        fieldInfos: [
          {
            fieldName: "IncidentName",
            label: "Fire Name"
          },
          {
            fieldName: "GISAcres",
            label: "Acres Burned",
            format: {
              digitSeparator: true,
              places: 0
            }
          },
          {
            fieldName: "PercentContained",
            label: "Percent Contained"
          },
          {
            fieldName: "FireDiscoveryDateTime",
            label: "Discovery Date",
            format: {
              dateFormat: "short-date-short-time"
            }
          },
          {
            fieldName: "ModifiedOnDateTime",
            label: "Last Updated",
            format: {
              dateFormat: "short-date-short-time"
            }
          },
          {
            fieldName: "FireCause",
            label: "Fire Cause"
          },
          {
            fieldName: "POOState",
            label: "State"
          },
          {
            fieldName: "POOCounty",
            label: "County"
          }
        ]
      }]
    }
  }

  // Fire incident locations
  if (layerName.includes('Fire Incident') || layerName.includes('Wildland Fire')) {
    return {
      title: "{IncidentName}",
      content: [{
        type: "fields",
        fieldInfos: [
          {
            fieldName: "IncidentName",
            label: "Incident Name"
          },
          {
            fieldName: "IncidentTypeCategory",
            label: "Incident Type"
          },
          {
            fieldName: "DailyAcres",
            label: "Daily Acres",
            format: {
              digitSeparator: true,
              places: 0
            }
          },
          {
            fieldName: "PercentContained",
            label: "Percent Contained"
          },
          {
            fieldName: "FireDiscoveryDateTime",
            label: "Discovery Date",
            format: {
              dateFormat: "short-date"
            }
          },
          {
            fieldName: "POOState",
            label: "State"
          },
          {
            fieldName: "POOCounty",
            label: "County"
          }
        ]
      }]
    }
  }

  // Stream gauges
  if (layerName.includes('Stream Gauge') || layerName.includes('Live Stream')) {
    return {
      title: "{station_nm}",
      content: [{
        type: "fields",
        fieldInfos: [
          {
            fieldName: "station_nm",
            label: "Station Name"
          },
          {
            fieldName: "status",
            label: "Current Status"
          },
          {
            fieldName: "stage",
            label: "Stage (ft)",
            format: {
              places: 2
            }
          },
          {
            fieldName: "flow",
            label: "Flow (cfs)",
            format: {
              digitSeparator: true,
              places: 0
            }
          },
          {
            fieldName: "flood_stage",
            label: "Flood Stage (ft)",
            format: {
              places: 2
            }
          },
          {
            fieldName: "datetime",
            label: "Last Reading",
            format: {
              dateFormat: "short-date-short-time"
            }
          },
          {
            fieldName: "huc_cd",
            label: "HUC Code"
          }
        ]
      }]
    }
  }

  // Building footprints
  if (layerName.includes('Building Footprint') || layerName.includes('Microsoft Building')) {
    return {
      title: "Building Footprint",
      content: [{
        type: "fields",
        fieldInfos: [
          {
            fieldName: "Shape__Area",
            label: "Building Area (sq meters)",
            format: {
              digitSeparator: true,
              places: 0
            }
          },
          {
            fieldName: "Shape__Length",
            label: "Perimeter (meters)",
            format: {
              digitSeparator: true,
              places: 0
            }
          }
        ]
      }, {
        type: "text",
        text: "<b>Approx. Square Feet:</b> {expression/sqft}"
      }],
      expressionInfos: [{
        name: "sqft",
        expression: "Round($feature.Shape__Area * 10.764)",
        title: "Square Feet"
      }]
    }
  }

  // Power outages
  if (layerName.includes('Power Outage')) {
    return {
      title: "{County} County Power Outages",
      content: [{
        type: "fields",
        fieldInfos: [
          {
            fieldName: "County",
            label: "County"
          },
          {
            fieldName: "State",
            label: "State"
          },
          {
            fieldName: "CustomersOut",
            label: "Customers Without Power",
            format: {
              digitSeparator: true,
              places: 0
            }
          },
          {
            fieldName: "CustomersTracked",
            label: "Total Customers",
            format: {
              digitSeparator: true,
              places: 0
            }
          },
          {
            fieldName: "PercentOut",
            label: "Percent Out",
            format: {
              places: 1
            }
          },
          {
            fieldName: "LastUpdate",
            label: "Last Updated",
            format: {
              dateFormat: "short-date-short-time"
            }
          }
        ]
      }]
    }
  }

  // 511 Events (traffic)
  if (layerName.includes('511 Event')) {
    return {
      title: "{event_type}",
      content: [{
        type: "fields",
        fieldInfos: [
          {
            fieldName: "event_type",
            label: "Event Type"
          },
          {
            fieldName: "description",
            label: "Description"
          },
          {
            fieldName: "road",
            label: "Road/Highway"
          },
          {
            fieldName: "direction",
            label: "Direction"
          },
          {
            fieldName: "severity",
            label: "Severity"
          },
          {
            fieldName: "start_date",
            label: "Start Time",
            format: {
              dateFormat: "short-date-short-time"
            }
          },
          {
            fieldName: "end_date",
            label: "Expected End",
            format: {
              dateFormat: "short-date-short-time"
            }
          }
        ]
      }]
    }
  }

  // Default popup for unrecognized layers
  return {
    title: "{*}",
    content: [{
      type: "fields",
      fieldInfos: [{
        fieldName: "*",
        label: null
      }]
    }],
    fieldInfosFormat: {
      digitSeparator: true
    }
  }
}