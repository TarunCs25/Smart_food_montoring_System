import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Thermometer, Apple, AlertTriangle, CheckCircle2 } from "lucide-react";

interface DashboardOverviewProps {
  temperatureAlerts: number;
  foodItems: number;
  expiringItems: number;
  hygieneScore: number;
}

export function DashboardOverview({
  temperatureAlerts,
  foodItems,
  expiringItems,
  hygieneScore,
}: DashboardOverviewProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm">Temperature Alerts</CardTitle>
          <Thermometer className="h-4 w-4 text-orange-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{temperatureAlerts}</div>
          <p className="text-xs text-gray-500 mt-1">Active warnings</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm">Food Items</CardTitle>
          <Apple className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{foodItems}</div>
          <p className="text-xs text-gray-500 mt-1">In storage</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm">Expiring Soon</CardTitle>
          <AlertTriangle className="h-4 w-4 text-yellow-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{expiringItems}</div>
          <p className="text-xs text-gray-500 mt-1">Next 3 days</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm">Hygiene Score</CardTitle>
          <CheckCircle2 className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{hygieneScore}%</div>
          <p className="text-xs text-gray-500 mt-1">Overall rating</p>
        </CardContent>
      </Card>
    </div>
  );
}
