import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Utensils, Trash2 } from "lucide-react";
import { format } from "date-fns";

export interface DietEntry {
  id: string;
  mealType: string;
  foodName: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  timestamp: Date;
}

interface DietTrackerProps {
  entries: DietEntry[];
  onDelete: (id: string) => void;
}

export function DietTracker({ entries, onDelete }: DietTrackerProps) {
  const todayEntries = entries.filter(
    (entry) =>
      format(entry.timestamp, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd")
  );

  const totalCalories = todayEntries.reduce((sum, entry) => sum + entry.calories, 0);
  const totalProtein = todayEntries.reduce((sum, entry) => sum + entry.protein, 0);
  const totalCarbs = todayEntries.reduce((sum, entry) => sum + entry.carbs, 0);
  const totalFats = todayEntries.reduce((sum, entry) => sum + entry.fats, 0);

  const getMealTypeColor = (mealType: string) => {
    const colors: Record<string, string> = {
      Breakfast: "bg-orange-500",
      Lunch: "bg-blue-500",
      Dinner: "bg-purple-500",
      Snack: "bg-green-500",
    };
    return colors[mealType] || "bg-gray-500";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Utensils className="h-5 w-5 mr-2" />
          Diet Tracker
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
          <h4 className="font-semibold mb-3">Today's Summary</h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-gray-600">Calories</p>
              <p className="text-xl font-bold">{totalCalories}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Protein</p>
              <p className="text-xl font-bold">{totalProtein}g</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Carbs</p>
              <p className="text-xl font-bold">{totalCarbs}g</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Fats</p>
              <p className="text-xl font-bold">{totalFats}g</p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="font-semibold">Recent Entries</h4>
          {entries.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-8">
              No diet entries yet. Add your first meal!
            </p>
          ) : (
            entries.map((entry) => (
              <div
                key={entry.id}
                className="flex items-start justify-between p-3 border rounded-lg"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h5 className="font-semibold">{entry.foodName}</h5>
                    <Badge className={getMealTypeColor(entry.mealType)}>
                      {entry.mealType}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-500">
                    {format(entry.timestamp, "MMM dd, yyyy 'at' h:mm a")}
                  </p>
                  <div className="flex gap-4 mt-2 text-sm">
                    <span>{entry.calories} cal</span>
                    <span>P: {entry.protein}g</span>
                    <span>C: {entry.carbs}g</span>
                    <span>F: {entry.fats}g</span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDelete(entry.id)}
                  className="text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
