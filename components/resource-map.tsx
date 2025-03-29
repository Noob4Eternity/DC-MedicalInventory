"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Ambulance, Building2, MapPin, AlertTriangle } from "lucide-react"

// Mock data for map markers
const mapMarkers = [
  { id: 1, type: "hospital", lat: 150, lng: 100, name: "General Hospital", beds: 45, available: 12, status: "normal" },
  {
    id: 2,
    type: "hospital",
    lat: 250,
    lng: 180,
    name: "St. Mary's Medical Center",
    beds: 78,
    available: 5,
    status: "critical",
  },
  {
    id: 3,
    type: "hospital",
    lat: 100,
    lng: 220,
    name: "County Emergency Center",
    beds: 32,
    available: 8,
    status: "warning",
  },
  {
    id: 4,
    type: "ambulance",
    lat: 180,
    lng: 150,
    name: "Ambulance #A-12",
    status: "en-route",
    destination: "General Hospital",
  },
  { id: 5, type: "ambulance", lat: 220, lng: 120, name: "Ambulance #B-05", status: "available", destination: null },
  {
    id: 6,
    type: "ambulance",
    lat: 130,
    lng: 190,
    name: "Ambulance #C-08",
    status: "on-scene",
    destination: "Accident Site",
  },
  { id: 7, type: "emergency", lat: 130, lng: 190, name: "Traffic Accident", severity: "high", units: 2 },
  { id: 8, type: "emergency", lat: 200, lng: 220, name: "Medical Emergency", severity: "medium", units: 1 },
]

export function ResourceMap() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [selectedMarker, setSelectedMarker] = useState<(typeof mapMarkers)[0] | null>(null)
  const [filter, setFilter] = useState<"all" | "hospitals" | "ambulances" | "emergencies">("all")

  // Draw the map and markers
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Draw background
    ctx.fillStyle = "#1e2b38"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw grid lines
    ctx.strokeStyle = "#3D5A73"
    ctx.lineWidth = 1

    // Horizontal grid lines
    for (let y = 0; y < canvas.height; y += 40) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(canvas.width, y)
      ctx.stroke()
    }

    // Vertical grid lines
    for (let x = 0; x < canvas.width; x += 40) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, canvas.height)
      ctx.stroke()
    }

    // Draw markers
    mapMarkers.forEach((marker) => {
      // Filter markers based on selected tab
      if (
        filter === "all" ||
        (filter === "hospitals" && marker.type === "hospital") ||
        (filter === "ambulances" && marker.type === "ambulance") ||
        (filter === "emergencies" && marker.type === "emergency")
      ) {
        // Scale marker positions to canvas size
        const x = (marker.lng / 300) * canvas.width
        const y = (marker.lat / 300) * canvas.height

        ctx.beginPath()

        // Different styles for different marker types
        if (marker.type === "hospital") {
          ctx.fillStyle = marker.status === "critical" ? "#D3212D" : marker.status === "warning" ? "#F59E0B" : "#2AAA8A"
          ctx.arc(x, y, 8, 0, Math.PI * 2)
          ctx.fill()

          // Hospital icon (simplified)
          ctx.fillStyle = "#fff"
          ctx.fillRect(x - 3, y - 5, 6, 10)
          ctx.fillRect(x - 5, y - 3, 10, 6)
        } else if (marker.type === "ambulance") {
          ctx.fillStyle =
            marker.status === "en-route" ? "#F59E0B" : marker.status === "on-scene" ? "#D3212D" : "#2AAA8A"
          ctx.arc(x, y, 6, 0, Math.PI * 2)
          ctx.fill()
        } else if (marker.type === "emergency") {
          ctx.fillStyle = marker.severity === "high" ? "#D3212D" : marker.severity === "medium" ? "#F59E0B" : "#2AAA8A"

          // Draw triangle for emergency
          ctx.beginPath()
          ctx.moveTo(x, y - 8)
          ctx.lineTo(x - 7, y + 4)
          ctx.lineTo(x + 7, y + 4)
          ctx.closePath()
          ctx.fill()

          // Exclamation mark
          ctx.fillStyle = "#fff"
          ctx.fillRect(x - 1, y - 4, 2, 5)
          ctx.fillRect(x - 1, y + 2, 2, 2)
        }

        // Highlight selected marker
        if (selectedMarker && selectedMarker.id === marker.id) {
          ctx.strokeStyle = "#fff"
          ctx.lineWidth = 2
          ctx.beginPath()
          ctx.arc(x, y, 12, 0, Math.PI * 2)
          ctx.stroke()
        }
      }
    })

    // Handle click on canvas to select markers
    const handleCanvasClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      // Convert click coordinates to map coordinates
      const mapX = (x / canvas.width) * 300
      const mapY = (y / canvas.height) * 300

      // Find clicked marker (with some tolerance)
      const clickedMarker = mapMarkers.find((marker) => {
        const markerX = marker.lng
        const markerY = marker.lat
        const distance = Math.sqrt(Math.pow(markerX - mapX, 2) + Math.pow(markerY - mapY, 2))
        return distance < 15
      })

      setSelectedMarker(clickedMarker || null)
    }

    canvas.addEventListener("click", handleCanvasClick)

    return () => {
      canvas.removeEventListener("click", handleCanvasClick)
    }
  }, [selectedMarker, filter])

  return (
    <Card className="border-[#3D5A73] bg-[#263747]">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold text-white">Resource Map</CardTitle>
          <Tabs defaultValue="all" className="w-auto" onValueChange={(value) => setFilter(value as any)}>
            <TabsList className="bg-[#1e2b38]">
              <TabsTrigger value="all" className="text-xs data-[state=active]:bg-[#1A5F7A]">
                All
              </TabsTrigger>
              <TabsTrigger value="hospitals" className="text-xs data-[state=active]:bg-[#1A5F7A]">
                Hospitals
              </TabsTrigger>
              <TabsTrigger value="ambulances" className="text-xs data-[state=active]:bg-[#1A5F7A]">
                Ambulances
              </TabsTrigger>
              <TabsTrigger value="emergencies" className="text-xs data-[state=active]:bg-[#1A5F7A]">
                Emergencies
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="relative">
          <canvas ref={canvasRef} className="h-[400px] w-full rounded-b-lg" />

          {selectedMarker && (
            <div className="absolute bottom-4 left-4 right-4 rounded-lg border border-[#3D5A73] bg-[#1e2b38] p-3 shadow-lg md:w-64 md:right-auto">
              <div className="flex items-center gap-2">
                {selectedMarker.type === "hospital" && <Building2 className="h-5 w-5 text-[#2AAA8A]" />}
                {selectedMarker.type === "ambulance" && <Ambulance className="h-5 w-5 text-[#1A5F7A]" />}
                {selectedMarker.type === "emergency" && <AlertTriangle className="h-5 w-5 text-[#D3212D]" />}
                <h3 className="text-sm font-medium text-white">{selectedMarker.name}</h3>
              </div>

              <div className="mt-2 text-xs text-gray-400">
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  <span>
                    {selectedMarker.lat.toFixed(1)}, {selectedMarker.lng.toFixed(1)}
                  </span>
                </div>

                {selectedMarker.type === "hospital" && (
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center justify-between">
                      <span>Total Beds:</span>
                      <span className="text-white">{selectedMarker.beds}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Available:</span>
                      <span className={selectedMarker.available < 10 ? "text-[#D3212D]" : "text-[#2AAA8A]"}>
                        {selectedMarker.available}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Status:</span>
                      <span
                        className={
                          selectedMarker.status === "critical"
                            ? "text-[#D3212D]"
                            : selectedMarker.status === "warning"
                              ? "text-[#F59E0B]"
                              : "text-[#2AAA8A]"
                        }
                      >
                        {selectedMarker.status.charAt(0).toUpperCase() + selectedMarker.status.slice(1)}
                      </span>
                    </div>
                  </div>
                )}

                {selectedMarker.type === "ambulance" && (
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center justify-between">
                      <span>Status:</span>
                      <span
                        className={
                          selectedMarker.status === "en-route"
                            ? "text-[#F59E0B]"
                            : selectedMarker.status === "on-scene"
                              ? "text-[#D3212D]"
                              : "text-[#2AAA8A]"
                        }
                      >
                        {selectedMarker.status.charAt(0).toUpperCase() + selectedMarker.status.slice(1)}
                      </span>
                    </div>
                    {selectedMarker.destination && (
                      <div className="flex items-center justify-between">
                        <span>Destination:</span>
                        <span className="text-white">{selectedMarker.destination}</span>
                      </div>
                    )}
                  </div>
                )}

                {selectedMarker.type === "emergency" && (
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center justify-between">
                      <span>Severity:</span>
                      <span
                        className={
                          selectedMarker.severity === "high"
                            ? "text-[#D3212D]"
                            : selectedMarker.severity === "medium"
                              ? "text-[#F59E0B]"
                              : "text-[#2AAA8A]"
                        }
                      >
                        {selectedMarker.severity.charAt(0).toUpperCase() + selectedMarker.severity.slice(1)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Units Assigned:</span>
                      <span className="text-white">{selectedMarker.units}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

