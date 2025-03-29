import { DashboardLayout } from "@/components/dashboard-layout"
import { ResourceOverview } from "@/components/resource-overview"
import { ResourceMap } from "@/components/resource-map"
import { TrackingWidgets } from "@/components/tracking-widgets"

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 p-6">
        <h1 className="text-2xl font-bold text-white md:text-3xl">Medical Resource Allocation</h1>
        <ResourceOverview />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <ResourceMap />
          </div>
          <div className="lg:col-span-2">
            <TrackingWidgets />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

