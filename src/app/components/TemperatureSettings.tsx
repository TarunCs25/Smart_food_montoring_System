import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Settings } from "lucide-react";
import { TemperatureZone } from "./TemperatureMonitor";

interface TemperatureSettingsProps {
  zones: TemperatureZone[];
  onUpdate: (zones: TemperatureZone[]) => void;
}

export function TemperatureSettings({ zones, onUpdate }: TemperatureSettingsProps) {
  const [editedZones, setEditedZones] = useState(zones);

  useEffect(() => {
    setEditedZones(zones);
  }, [zones]);

  const handleZoneUpdate = (id: string, field: keyof TemperatureZone, value: number) => {
    setEditedZones((prev) =>
      prev.map((zone) =>
        zone.id === id ? { ...zone, [field]: value } : zone
      )
    );
  };

  const handleSave = () => {
    onUpdate(editedZones);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Settings className="h-5 w-5 mr-2" />
          Temperature Settings
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {editedZones.map((zone) => (
            <div key={zone.id} className="border rounded-lg p-4">
              <h4 className="font-semibold mb-4">{zone.name}</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`target-${zone.id}`}>Target Temperature (°{zone.unit})</Label>
                  <Input
                    id={`target-${zone.id}`}
                    type="number"
                    value={zone.targetTemp}
                    onChange={(e) =>
                      handleZoneUpdate(zone.id, "targetTemp", parseFloat(e.target.value))
                    }
                  />
                </div>
                <div>
                  <Label htmlFor={`current-${zone.id}`}>Current Temperature (°{zone.unit})</Label>
                  <Input
                    id={`current-${zone.id}`}
                    type="number"
                    value={zone.currentTemp}
                    onChange={(e) =>
                      handleZoneUpdate(zone.id, "currentTemp", parseFloat(e.target.value))
                    }
                  />
                </div>
                <div>
                  <Label htmlFor={`min-${zone.id}`}>Min Temperature (°{zone.unit})</Label>
                  <Input
                    id={`min-${zone.id}`}
                    type="number"
                    value={zone.minTemp}
                    onChange={(e) =>
                      handleZoneUpdate(zone.id, "minTemp", parseFloat(e.target.value))
                    }
                  />
                </div>
                <div>
                  <Label htmlFor={`max-${zone.id}`}>Max Temperature (°{zone.unit})</Label>
                  <Input
                    id={`max-${zone.id}`}
                    type="number"
                    value={zone.maxTemp}
                    onChange={(e) =>
                      handleZoneUpdate(zone.id, "maxTemp", parseFloat(e.target.value))
                    }
                  />
                </div>
              </div>
            </div>
          ))}
          <Button onClick={handleSave} className="w-full">
            Save Settings
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}