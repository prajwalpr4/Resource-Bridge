"use client";

// Priority Map Component — Leaflet with custom markers
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { cn } from "@/lib/utils";

interface MapNeed {
  id: string;
  title: string;
  urgency: "low" | "medium" | "critical";
  lat: number;
  lng: number;
  location: string;
  category: string;
}

interface PriorityMapProps {
  needs: MapNeed[];
}

// Custom marker icons with urgency colors
function createIcon(urgency: string): L.DivIcon {
  const colors: Record<string, string> = {
    critical: "#EF4444",
    medium: "#F59E0B",
    low: "#10B981",
  };
  const color = colors[urgency] || colors.low;
  const glow = urgency === "critical" ? `box-shadow: 0 0 12px ${color}80, 0 0 24px ${color}40; animation: pulse 2s ease-in-out infinite;` : "";

  return L.divIcon({
    className: "custom-marker",
    html: `<div style="width:16px;height:16px;border-radius:50%;background:${color};border:2.5px solid white;${glow}"></div>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
    popupAnchor: [0, -12],
  });
}

export default function PriorityMap({ needs }: PriorityMapProps) {
  // Center on India
  const center: [number, number] = [22.5, 78.5];

  return (
    <MapContainer center={center} zoom={5} style={{ height: "500px", width: "100%" }} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://carto.com/">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />
      {needs.map((need) => (
        <Marker key={need.id} position={[need.lat, need.lng]} icon={createIcon(need.urgency)}>
          <Popup>
            <div style={{ minWidth: 180, fontFamily: "Inter, sans-serif" }}>
              <p style={{ fontWeight: 600, fontSize: 13, margin: "0 0 4px" }}>{need.title}</p>
              <p style={{ fontSize: 11, color: "#a1a1aa", margin: "0 0 6px" }}>{need.location}</p>
              <div style={{ display: "flex", gap: 6 }}>
                <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 20, background: need.urgency === "critical" ? "#EF444420" : need.urgency === "medium" ? "#F59E0B20" : "#10B98120", color: need.urgency === "critical" ? "#EF4444" : need.urgency === "medium" ? "#F59E0B" : "#10B981", fontWeight: 600, textTransform: "uppercase" }}>{need.urgency}</span>
                <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 20, background: "#27272a", color: "#a1a1aa" }}>{need.category}</span>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
