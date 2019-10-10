import React from 'react'
import {GeoJSON, Map, Marker, Popup, TileLayer} from 'react-leaflet'

const center_pos = [43.471, -80.542];
const DC_pos = [43.472429, -80.542003];
const DP_pos = [43.469734, -80.542251];

const styles = {
  mapStyle: {
    height: '100%',
    width: '100%'
  }
};

function getGeoColor (d) {
  return d > 100 ? '#800026' :
    d > 50 ? '#BD0026' :
      d > 20 ? '#E31A1C' :
        d > 10 ? '#FC4E2A' :
          d > 5 ? '#FD8D3C' :
            d > 2 ? '#FEB24C' :
              d > 1 ? '#FED976' :
                '#FFEDA0';
}

function getGeoStyle (feature) {
  console.log(feature);
  return {
    fillColor: getGeoColor(feature.properties.density),
    weight: 2,
    opacity: 1,
    color: 'white',
    dashArray: '3',
    fillOpacity: 0.6
  };
}

function getGeoJson () {
  return {
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "properties": {
          density: 7
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -80.54212868213654,
                43.47003167556627
              ],
              [
                -80.54268658161163,
                43.469840911295805
              ],
              [
                -80.54239690303802,
                43.46942044914515
              ],
              [
                -80.54184436798096,
                43.469619001080794
              ],
              [
                -80.54212868213654,
                43.47003167556627
              ]
            ]
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "density": 94.65,
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -80.54180681705475,
                43.472828833531636
              ],
              [
                -80.54254442453384,
                43.472558272063154
              ],
              [
                -80.54217427968979,
                43.47202493152058
              ],
              [
                -80.54143399000166,
                43.472293548878504
              ],
              [
                -80.54180681705475,
                43.472828833531636
              ]
            ]
          ]
        }
      }
    ]
  }
}

export default class CampusMap extends React.Component {
  render () {
    return (
      <Map center={center_pos} zoom={17} maxZoom={18} minZoom={16} style={styles.mapStyle}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.se/hydda/full/{z}/{x}/{y}.png"
          attribution="Map data &copy; <a href='https://www.openstreetmap.org/copyright'>
          OpenStreetMap</a> contributors"
        />
        <Marker position={DC_pos}>
          <Popup>DC</Popup>
        </Marker>
        <Marker position={DP_pos}>
          <Popup>DP</Popup>
        </Marker>
        <GeoJSON data={getGeoJson()} style={getGeoStyle}/>
      </Map>
    );
  }
}
