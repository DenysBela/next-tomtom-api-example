"use client";
import { useEffect, useRef } from "react";
import tt, { Map as TomTomMap } from "@tomtom-international/web-sdk-maps";
import "@tomtom-international/web-sdk-maps/dist/maps.css";

interface MapProps {
  apiKey: string | undefined;
  lat: number;
  lng: number;
  zoom: number;
}

const Map = ({ apiKey, lat, lng, zoom }: MapProps) => {
  const mapElement = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<TomTomMap | null>(null);

  useEffect(() => {
    if (mapElement.current && !mapInstance.current && apiKey) {
      // Инициализация карты
      mapInstance.current = tt.map({
        key: apiKey,
        container: mapElement.current,
        center: [lng, lat],
        zoom: zoom,
        pitch: 45,
        stylesVisibility: {
          map: true,
          trafficFlow: true,
          trafficIncidents: true,
        },
      });

      // Координаты кастомной локации
      const customCoordinates = [10.10994, 54.326166];

      // Создание маркера
      const marker = new tt.Marker()
        .setLngLat(customCoordinates)
        .addTo(mapInstance.current);

      // Создание попапа с кастомным содержимым
      const popupOffsets = {
        top: [0, 0],
        bottom: [0, -70],
        "bottom-right": [0, -70],
        "bottom-left": [0, -70],
        left: [25, -35],
        right: [-25, -35],
      };

      const popupContent = `
        <div style="text-align: center;">
          Adresse, г. Kiel
        </div>
      `;

      const popup = new tt.Popup({ offset: popupOffsets }).setHTML(
        popupContent
      );

      // Прикрепление попапа к маркеру
      marker.setPopup(popup).togglePopup();
    }

    // Удаление карты при размонтировании
    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
      }
    };
  }, [apiKey, lat, lng, zoom]);

  return <div ref={mapElement} style={{ width: "50%", height: "50%" }} />;
};

export default Map;
