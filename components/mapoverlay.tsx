// components/Mapoverlay.tsx
"use client";

import { useEffect, useRef } from "react";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import LineString from "ol/geom/LineString";
import { Style, Icon, Stroke } from "ol/style";
import { fromLonLat } from "ol/proj"; // Import fromLonLat
import "ol/ol.css";

const MapComponent = ({ checkpoints = [] }) => {
  const mapRef = useRef(null);
  const mapInstance = useRef<Map>(null);
  const vectorSource = useRef(new VectorSource());

  // Initialize the map
  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    mapInstance.current = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        new VectorLayer({
          source: vectorSource.current,
        }),
      ],
      view: new View({
        center: fromLonLat([77.2090, 28.6139]), // Transform center to EPSG:3857
        zoom: 5,
      }),
    });

    return () => {
      if (mapInstance.current) {
        mapInstance.current.setTarget(null);
      }
    };
  }, []);

  // Update checkpoints and route
  useEffect(() => {
    if (!mapInstance.current || !vectorSource.current) return;

    vectorSource.current.clear();

    // Add checkpoints as markers
    const markerFeatures = checkpoints.map((checkpoint) => {
      const feature = new Feature({
        geometry: new Point(fromLonLat([checkpoint.lon, checkpoint.lat])), // Transform coordinates
      });
      feature.setStyle(
        new Style({
          image: new Icon({
            src: "https://openlayers.org/en/latest/examples/data/icon.png",
            scale: 0.1,
          }),
        })
      );
      return feature;
    });

    // Add route path connecting checkpoints in order
    if (checkpoints.length > 1) {
      const coordinates = checkpoints.map((cp) =>
        fromLonLat([cp.lon, cp.lat]) // Transform coordinates
      );
      const routeFeature = new Feature({
        geometry: new LineString(coordinates),
      });
      routeFeature.setStyle(
        new Style({
          stroke: new Stroke({
            color: "#ff0000",
            width: 8,
          }),
        })
      );
      markerFeatures.push(routeFeature);
    }

    vectorSource.current.addFeatures(markerFeatures);

    // Adjust map view to fit checkpoints
    if (checkpoints.length > 0) {
      const extent = vectorSource.current.getExtent();
      mapInstance.current.getView().fit(extent, {
        padding: [50, 50, 50, 50],
        maxZoom: 15,
      });
    }
  }, [checkpoints]);

  return <div ref={mapRef} style={{ width: "100%", height: "100vh" }} />;
};

export default MapComponent;