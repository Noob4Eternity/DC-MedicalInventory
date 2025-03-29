"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Ambulance, Clock, Hospital, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"

// Mock data for ambulances
const ambulanceData = [
  { id: "A-12", status: "en-route", location: "Downtown", destination: "General Hospital", eta: "4 min" },
  { id: "B-05", status: "available", location: "North District", destination: null, eta: null },
  { id: "C-08", status: "on-scene", location: "Highway 101", destination: "Accident Site", eta: null },
  { id: "D-03", status: "returning", location: "East Side", destination: "Station 2", eta: "12 min" },
]

// Mock data for hospitals
const hospitalData = [
  { id: 1, name: "General Hospital", capacity: 85, beds: { total: 120, available: 18 }, status: "normal" },
  { id: 2, name: "St. Mary's Medical Center", capacity: 92, beds: { total: 85, available: 7 }, status: "warning" },
  { id: 3, name: "County Emergency Center", capacity: 98, beds: { total: 45, available: 1 }, status: "critical" },
]

// Mock data for emergency dispatches
const dispatchData = [
  {
    id: "E-2305",
    type: "Traffic Accident",
    location: "Highway 101, Mile 24",
    units: 2,
    time: "10:24 AM",
    priority: "high",
  },
  {
    id: "E-2306",
    type: "Medical Emergency",
    location: "42 Oak Street",
    units: 1,
    time: "10:45 AM",
    priority: "medium",
  },
  { id: "E-2307", type: "Fire", location: "Industrial Park", units: 3, time: "11:02 AM", priority: "high" },
]

export function TrackingWidgets() {
  const [currentTime, setCurrentTime] = useState(new Date())

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex flex-col gap-6">
      <Card className="border-[#3D5A73] bg-[#263747]">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-base font-bold text-white">
            <Ambulance className="h-5 w-5 text-[#1A5F7A]" />
            Ambulance Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {ambulanceData.map((ambulance) => (
              <div
                key={ambulance.id}
                className="flex items-center justify-between rounded-md border border-[#3D5A73] bg-[#1e2b38] p-3"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "h-2.5 w-2.5 rounded-full",
                      ambulance.status === "available" && "bg-[#2AAA8A]",
                      ambulance.status === "en-route" && "bg-[#F59E0B]",
                      ambulance.status === "on-scene" && "bg-[#D3212D]",
                      ambulance.status === "returning" && "bg-[#1A5F7A]",
                    )}
                  />
                  <div>
                    <h4 className="text-sm font-medium text-white">Ambulance #{ambulance.id}</h4>
                    <p className="text-xs text-gray-400">{ambulance.location}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge
                    className={cn(
                      "border-none",
                      ambulance.status === "available" && "bg-[#2AAA8A]/20 text-[#2AAA8A]",
                      ambulance.status === "en-route" && "bg-[#F59E0B]/20 text-[#F59E0B]",
                      ambulance.status === "on-scene" && "bg-[#D3212D]/20 text-[#D3212D]",
                      ambulance.status === "returning" && "bg-[#1A5F7A]/20 text-[#1A5F7A]",
                    )}
                  >
                    {ambulance.status.charAt(0).toUpperCase() + ambulance.status.slice(1)}
                  </Badge>
                  {ambulance.eta && (
                    <p className="mt-1 flex items-center justify-end gap-1 text-xs text-gray-400">
                      <Clock className="h-3 w-3" /> ETA: {ambulance.eta}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-[#3D5A73] bg-[#263747]">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-base font-bold text-white">
            <Hospital className="h-5 w-5 text-[#2AAA8A]" />
            Hospital Capacity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {hospitalData.map((hospital) => (
              <div key={hospital.id} className="rounded-md border border-[#3D5A73] bg-[#1e2b38] p-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-white">{hospital.name}</h4>
                  <Badge
                    className={cn(
                      "border-none",
                      hospital.status === "normal" && "bg-[#2AAA8A]/20 text-[#2AAA8A]",
                      hospital.status === "warning" && "bg-[#F59E0B]/20 text-[#F59E0B]",
                      hospital.status === "critical" && "bg-[#D3212D]/20 text-[#D3212D]",
                    )}
                  >
                    {hospital.beds.available} beds
                  </Badge>
                </div>
                <div className="mt-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400">Capacity</span>
                    <span className="text-white">{hospital.capacity}%</span>
                  </div>
                  <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-[#3D5A73]">
                    <div
                      className={cn(
                        "h-full transition-all duration-500 ease-in-out",
                        hospital.capacity > 90
                          ? "bg-[#D3212D]"
                          : hospital.capacity > 80
                            ? "bg-[#F59E0B]"
                            : "bg-[#2AAA8A]",
                      )}
                      style={{ width: `${hospital.capacity}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-[#3D5A73] bg-[#263747]">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-base font-bold text-white">
            <AlertTriangle className="h-5 w-5 text-[#D3212D]" />
            Emergency Dispatch
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {dispatchData.map((dispatch) => (
              <div key={dispatch.id} className="rounded-md border border-[#3D5A73] bg-[#1e2b38] p-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-white">{dispatch.type}</h4>
                  <Badge
                    className={cn(
                      "border-none",
                      dispatch.priority === "low" && "bg-[#2AAA8A]/20 text-[#2AAA8A]",
                      dispatch.priority === "medium" && "bg-[#F59E0B]/20 text-[#F59E0B]",
                      dispatch.priority === "high" && "bg-[#D3212D]/20 text-[#D3212D]",
                    )}
                  >
                    {dispatch.priority.charAt(0).toUpperCase() + dispatch.priority.slice(1)}
                  </Badge>
                </div>
                <p className="mt-1 text-xs text-gray-400">{dispatch.location}</p>
                <div className="mt-2 flex items-center justify-between text-xs">
                  <span className="text-gray-400">Units: {dispatch.units}</span>
                  <span className="text-gray-400">{dispatch.time}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

