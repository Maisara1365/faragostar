"use client";

import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    ZoomControl,
} from "react-leaflet";
import L from "leaflet";
import {
    MapPin,
    Navigation,
} from "lucide-react";
import "leaflet/dist/leaflet.css";

import { Language } from "@/locales";

interface LocationMapProps {
    language: Language;
}

/*
|--------------------------------------------------------------------------
| Pul-e-Khumri, Baghlan, Afghanistan
|--------------------------------------------------------------------------
*/

const LOCATION: [number, number] = [
    35.937803586766734,
    68.63574999556991,
];

/*
|--------------------------------------------------------------------------
| Custom Location Marker
|--------------------------------------------------------------------------
*/

const customIcon = L.divIcon({
    className: "custom-location-marker",

    html: `
        <div
            style="
                width:52px;
                height:52px;
                border-radius:50% 50% 50% 0;
                background:linear-gradient(
                    135deg,
                    #4f46e5,
                    #7c3aed
                );
                transform:rotate(-45deg);
                display:flex;
                align-items:center;
                justify-content:center;
                box-shadow:
                    0 10px 30px
                    rgba(79,70,229,0.45);
                border:4px solid white;
            "
        >
            <div
                style="
                    width:18px;
                    height:18px;
                    border-radius:50%;
                    background:white;
                "
            ></div>
        </div>
    `,

    iconSize: [52, 52],
    iconAnchor: [26, 52],
    popupAnchor: [0, -52],
});

/*
|--------------------------------------------------------------------------
| Component
|--------------------------------------------------------------------------
*/

export default function LocationMap({
    language,
}: LocationMapProps) {
    const isPersian = language === "fa";

    const text = isPersian
        ? {
              location: "موقعیت ما",
              address:
                  "پل خمری، بغلان، افغانستان",
              directions: "مسیریابی",
              popup:
                  "ما در پل خمری، بغلان، افغانستان قرار داریم.",
          }
        : {
              location: "Our Location",
              address:
                  "Pul-e-Khumri, Baghlan, Afghanistan",
              directions: "Get Directions",
              popup:
                  "We are located in Pul-e-Khumri, Baghlan, Afghanistan.",
          };

    const directionsUrl =
        `https://www.openstreetmap.org/directions?from=&to=${LOCATION[0]}%2C${LOCATION[1]}`;

    return (
        <div
            dir={isPersian ? "rtl" : "ltr"}
            style={{
                position: "relative",
                width: "100%",
                height: "520px",
                overflow: "hidden",
                borderRadius: "26px",
                background:
                    "linear-gradient(135deg, #eef2ff, #f5f3ff)",
            }}
        >
            {/* =====================================================
                MAP
            ====================================================== */}

            <MapContainer
                center={LOCATION}
                zoom={13}
                scrollWheelZoom={true}
                zoomControl={false}
                style={{
                    width: "100%",
                    height: "100%",
                    zIndex: 1,
                }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors'
                    url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <ZoomControl position="bottomright" />

                <Marker
                    position={LOCATION}
                    icon={customIcon}
                >
                    <Popup>
                        <div
                            style={{
                                minWidth: "220px",
                                textAlign: isPersian
                                    ? "right"
                                    : "left",
                                direction: isPersian
                                    ? "rtl"
                                    : "ltr",
                            }}
                        >
                            <strong
                                style={{
                                    display: "block",
                                    marginBottom: "7px",
                                    fontSize: "15px",
                                    color: "#111827",
                                }}
                            >
                                {text.location}
                            </strong>

                            <span
                                style={{
                                    display: "block",
                                    fontSize: "13px",
                                    lineHeight: 1.6,
                                    color: "#64748b",
                                }}
                            >
                                {text.popup}
                            </span>
                        </div>
                    </Popup>
                </Marker>
            </MapContainer>

            {/* =====================================================
                FLOATING LOCATION CARD
            ====================================================== */}

            <div
                style={{
                    position: "absolute",
                    top: "24px",

                    left: isPersian
                        ? "auto"
                        : "24px",

                    right: isPersian
                        ? "24px"
                        : "auto",

                    zIndex: 1000,
                    maxWidth: "370px",
                    padding: "18px 20px",
                    borderRadius: "18px",

                    background:
                        "rgba(255,255,255,0.95)",

                    backdropFilter:
                        "blur(18px)",

                    WebkitBackdropFilter:
                        "blur(18px)",

                    boxShadow:
                        "0 15px 40px rgba(15,23,42,0.18)",

                    border:
                        "1px solid rgba(255,255,255,0.8)",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                    }}
                >
                    <div
                        style={{
                            width: "44px",
                            height: "44px",
                            flexShrink: 0,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: "14px",
                            background:
                                "linear-gradient(135deg, #4f46e5, #7c3aed)",
                            color: "white",
                            boxShadow:
                                "0 8px 20px rgba(79,70,229,0.3)",
                        }}
                    >
                        <MapPin
                            size={21}
                            strokeWidth={2.5}
                        />
                    </div>

                    <div>
                        <div
                            style={{
                                fontSize: "13px",
                                fontWeight: 800,
                                color: "#4f46e5",
                                marginBottom: "3px",
                            }}
                        >
                            {text.location}
                        </div>

                        <div
                            style={{
                                fontSize: "14px",
                                fontWeight: 600,
                                color: "#111827",
                                lineHeight: 1.5,
                            }}
                        >
                            {text.address}
                        </div>
                    </div>
                </div>
            </div>

            {/* =====================================================
                DIRECTIONS BUTTON
            ====================================================== */}

            <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                    position: "absolute",
                    bottom: "24px",

                    left: isPersian
                        ? "auto"
                        : "24px",

                    right: isPersian
                        ? "24px"
                        : "auto",

                    zIndex: 1000,

                    display: "inline-flex",
                    alignItems: "center",
                    gap: "9px",

                    padding: "13px 18px",

                    borderRadius: "14px",

                    background:
                        "linear-gradient(135deg, #4f46e5, #7c3aed)",

                    color: "white",

                    fontSize: "14px",
                    fontWeight: 700,

                    textDecoration: "none",

                    boxShadow:
                        "0 12px 30px rgba(79,70,229,0.35)",

                    transition:
                        "transform 0.25s ease, box-shadow 0.25s ease",
                }}
            >
                <Navigation size={17} />

                {text.directions}
            </a>

            {/* =====================================================
                DECORATIVE GLOW
            ====================================================== */}

            <div
                style={{
                    position: "absolute",
                    top: "-120px",
                    right: "-100px",
                    width: "300px",
                    height: "300px",
                    borderRadius: "50%",
                    background:
                        "rgba(99,102,241,0.16)",
                    filter: "blur(70px)",
                    zIndex: 2,
                    pointerEvents: "none",
                }}
            />
        </div>
    );
}

