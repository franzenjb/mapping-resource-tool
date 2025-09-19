// Popup templates for different layer types

export const getPopupTemplate = (layerName: string) => {
  // Census Block layers - use a simpler wildcard approach first
  if (layerName.includes('Census Block') || layerName.includes('USA 2020 Census')) {
    return {
      title: "Census Block {GEOID}",
      content: [{
        type: "text",
        text: "<b>Census Block Information</b><br/>" +
              "Click to view detailed census data for this block.<br/><br/>" +
              "Geographic ID: {GEOID}<br/>" +
              "State: {STATE}<br/>" + 
              "County: {COUNTY}<br/>" +
              "Block: {BLOCK}"
      }, {
        type: "fields",
        fieldInfos: [{
          fieldName: "*",
          label: null
        }]
      }]
    }
  }

  // USA Structures - simplified
  if (layerName.includes('USA Structures')) {
    return {
      title: "Structure at {ADDRESS}",
      content: [{
        type: "text",
        text: "<b>Building Information</b><br/>" +
              "Address: {ADDRESS}<br/>" +
              "City: {CITY}<br/>" +
              "State: {STATE}<br/>" +
              "ZIP: {ZIP}"
      }, {
        type: "fields",
        fieldInfos: [{
          fieldName: "*",
          label: null
        }]
      }]
    }
  }

  // National Address Database
  if (layerName.includes('National Address Database') || layerName.includes('Address')) {
    return {
      title: "Address Point",
      content: [{
        type: "text", 
        text: "<b>Address Information</b>"
      }, {
        type: "fields",
        fieldInfos: [{
          fieldName: "*",
          label: null
        }]
      }]
    }
  }

  // Fire perimeters
  if (layerName.includes('Fire Perimeter') || layerName.includes('WFIGS')) {
    return {
      title: "{IncidentName} Fire",
      content: [{
        type: "text",
        text: "<b>Fire Information</b><br/>" +
              "Name: {IncidentName}<br/>" +
              "Acres: {GISAcres}<br/>" +
              "Containment: {PercentContained}%"
      }, {
        type: "fields",
        fieldInfos: [{
          fieldName: "*",
          label: null
        }]
      }]
    }
  }

  // Fire incident locations
  if (layerName.includes('Fire Incident') || layerName.includes('Wildland Fire')) {
    return {
      title: "{IncidentName}",
      content: [{
        type: "text",
        text: "<b>Fire Incident</b><br/>" +
              "Type: {IncidentTypeCategory}<br/>" +
              "Acres: {DailyAcres}<br/>" +
              "Contained: {PercentContained}%"
      }, {
        type: "fields",
        fieldInfos: [{
          fieldName: "*",
          label: null
        }]
      }]
    }
  }

  // Stream gauges
  if (layerName.includes('Stream Gauge') || layerName.includes('Live Stream')) {
    return {
      title: "Stream Gauge",
      content: [{
        type: "text",
        text: "<b>Water Level Information</b>"
      }, {
        type: "fields",
        fieldInfos: [{
          fieldName: "*",
          label: null
        }]
      }]
    }
  }

  // Building footprints
  if (layerName.includes('Building Footprint') || layerName.includes('Microsoft Building')) {
    return {
      title: "Building Footprint",
      content: [{
        type: "text",
        text: "<b>Building Details</b>"
      }, {
        type: "fields",
        fieldInfos: [{
          fieldName: "*",
          label: null
        }]
      }]
    }
  }

  // Power outages
  if (layerName.includes('Power Outage')) {
    return {
      title: "Power Outage Information",
      content: [{
        type: "text",
        text: "<b>Outage Details</b>"
      }, {
        type: "fields",
        fieldInfos: [{
          fieldName: "*",
          label: null
        }]
      }]
    }
  }

  // 511 Events (traffic)
  if (layerName.includes('511 Event')) {
    return {
      title: "Traffic Event",
      content: [{
        type: "text",
        text: "<b>Traffic Incident</b>"
      }, {
        type: "fields",
        fieldInfos: [{
          fieldName: "*",
          label: null
        }]
      }]
    }
  }

  // Most universal default - shows ALL fields
  return {
    title: layerName,
    content: [{
      type: "fields",
      fieldInfos: [{
        fieldName: "*",
        label: null
      }]
    }]
  }
}