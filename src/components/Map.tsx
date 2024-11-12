"use client";
import { useEffect, useRef } from "react";
import tt, { Map as TomTomMap } from "@tomtom-international/web-sdk-maps"; // Импортируем SDK и тип Map
import "@tomtom-international/web-sdk-maps/dist/maps.css"; // Импортируем стили карты

interface MapProps {
  apiKey: string | undefined;
  lat: number;
  lng: number;
  zoom: number;
}

const Map = ({ apiKey, lat, lng, zoom }: MapProps) => {
  const mapElement = useRef(); // Реф для HTML элемента карты
  const mapInstance = useRef<TomTomMap | null>(null); // Реф для инстанса карты с правильным типом

  useEffect(() => {
    if (mapElement.current && apiKey) {
      mapInstance.current = tt.map({
        key: apiKey, // Ваш API ключ
        container: mapElement.current, // HTML-элемент для рендера карты
        center: [lng, lat], // Начальные координаты
        zoom: zoom, // Начальный уровень зума
        language: "de", // Язык карты
        // style: '', // Стиль карты
      });
    }

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove(); // Убираем карту при размонтировании компонента
      }
    };
  }, [apiKey, lat, lng, zoom]);

  return <div ref={mapElement} style={{ width: "50vh", height: "50vh" }} />;
};

export default Map;
