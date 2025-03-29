"use client"

import { Ambulance, Bed, Users, AlertTriangle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const resourceData = [
  {
    title: "Total Ambulances",
    value: 24,
    available: 18,
    icon: Ambulance,
    color: "#1A5F7A",
    change: "+2",
  },
  {
    title: "Available Hospital Beds",
    value: 142,
    total: 180,
    icon: Bed,
    color: "#2AAA8A",
    change: "-5",
  },
  {
    title: "Staff on Duty",
    value: 86,
    total: 120,
    icon: Users,
    color: "#1A5F7A",
    change: "+12",
  },
  {
    title: "Active Emergencies",
    value: 7,
    critical: 3,
    icon: AlertTriangle,
    color: "#D3212D",
    change: "+2",
  },
]

export function ResourceOverview() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {resourceData.map((resource, index) => (
        <ResourceCard key={index} resource={resource} />
      ))}
    </div>
  )
}

function ResourceCard({ resource }: { resource: (typeof resourceData)[0] }) {
  const Icon = resource.icon
  const isPositive = resource.change.startsWith("+")
  const isNegative = resource.change.startsWith("-")

  return (
    <Card className="border-[#3D5A73] bg-[#263747]">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div
            className="flex h-12 w-12 items-center justify-center rounded-lg"
            style={{ backgroundColor: `${resource.color}20` }}
          >
            <Icon className="h-6 w-6" style={{ color: resource.color }} />
          </div>
          <div className="flex items-center gap-1">
            <span
              className={cn(
                "text-sm font-medium",
                isPositive && "text-[#2AAA8A]",
                isNegative && "text-[#D3212D]",
                !isPositive && !isNegative && "text-gray-400",
              )}
            >
              {resource.change}
            </span>
            <div className="h-6 w-6 rounded-full bg-[#1e2b38] flex items-center justify-center">
              <span className="sr-only">Change indicator</span>
              <div
                className={cn(
                  "h-1.5 w-1.5 rounded-full",
                  isPositive && "bg-[#2AAA8A]",
                  isNegative && "bg-[#D3212D]",
                  !isPositive && !isNegative && "bg-gray-400",
                )}
              />
            </div>
          </div>
        </div>
        <div className="mt-3">
          <h3 className="text-lg font-bold text-white">{resource.value}</h3>
          <p className="text-sm text-gray-400">{resource.title}</p>
        </div>
        <div className="mt-4">
          {resource.available !== undefined && (
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400">Available</span>
              <span className="text-xs font-medium text-[#2AAA8A]">{resource.available}</span>
            </div>
          )}
          {resource.total !== undefined && (
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400">Total</span>
              <span className="text-xs font-medium text-white">{resource.total}</span>
            </div>
          )}
          {resource.critical !== undefined && (
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400">Critical</span>
              <span className="text-xs font-medium text-[#D3212D]">{resource.critical}</span>
            </div>
          )}
          {(resource.total !== undefined || resource.available !== undefined) && (
            <div className="mt-2 h-1.5 w-full rounded-full bg-[#1e2b38]">
              <div
                className="h-1.5 rounded-full transition-all duration-500 ease-in-out"
                style={{
                  width: `${resource.total ? (resource.value / resource.total) * 100 : (resource.available! / resource.value) * 100}%`,
                  backgroundColor: resource.color,
                }}
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

