import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Thermometer, AlertCircle } from "lucide-react";

export interface TemperatureZone {
  id: string;
  name: string;
  currentTemp: number;
  targetTemp: number;
  minTemp: number;
  maxTemp: number;
  unit: "C" | "F";
}

interface TemperatureMonitorProps {
  zones: TemperatureZone[];
}

export function TemperatureMonitor({ zones }: TemperatureMonitorProps) {
  const getStatus = (zone: TemperatureZone) => {
    if (zone.currentTemp < zone.minTemp || zone.currentTemp > zone.maxTemp) {
      return { text: "Alert", color: "bg-red-500", icon: true };
    }
    if (
      Math.abs(zone.currentTemp - zone.targetTemp) > 2
    ) {
      return { text: "Warning", color: "bg-yellow-500", icon: true };
    }
    return { text: "Normal", color: "bg-green-500", icon: false };
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Thermometer className="h-5 w-5 mr-2" />
          Temperature Monitoring
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {zones.map((zone) => {
            const status = getStatus(zone);
            return (
              <div
                key={zone.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold">{zone.name}</h4>
                    {status.icon && <AlertCircle className="h-4 w-4 text-red-500" />}
                  </div>
                  <p className="text-sm text-gray-500">
                    Target: {zone.targetTemp}°{zone.unit} | Range: {zone.minTemp}°
                    {zone.unit} - {zone.maxTemp}°{zone.unit}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">
                    {zone.currentTemp}°{zone.unit}
                  </div>
                  <Badge className={`${status.color} mt-1`}>{status.text}</Badge>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
