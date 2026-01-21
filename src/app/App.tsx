import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { DashboardOverview } from "@/app/components/DashboardOverview";
import { FoodItemCard, FoodItem } from "@/app/components/FoodItemCard";
import { AddFoodDialog } from "@/app/components/AddFoodDialog";
import { TemperatureMonitor, TemperatureZone } from "@/app/components/TemperatureMonitor";
import { TemperatureSettings } from "@/app/components/TemperatureSettings";
import { HygieneChecklist, HygieneTask } from "@/app/components/HygieneChecklist";
import { DietTracker, DietEntry } from "@/app/components/DietTracker";
import { AddDietDialog } from "@/app/components/AddDietDialog";
import { Refrigerator, Home } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "@/app/components/ui/sonner";

function App() {
  // Food Items State
  const [foodItems, setFoodItems] = useState<FoodItem[]>(() => {
    const saved = localStorage.getItem("foodItems");
    return saved ? JSON.parse(saved, (key, value) => {
      if (key === "expiryDate") return new Date(value);
      return value;
    }) : [
      {
        id: "1",
        name: "Fresh Milk",
        category: "Dairy",
        expiryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        location: "Refrigerator",
        quantity: 1,
        unit: "L",
      },
      {
        id: "2",
        name: "Chicken Breast",
        category: "Meat",
        expiryDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        location: "Freezer",
        quantity: 500,
        unit: "g",
      },
    ];
  });

  // Temperature Zones State
  const [temperatureZones, setTemperatureZones] = useState<TemperatureZone[]>(() => {
    const saved = localStorage.getItem("temperatureZones");
    return saved ? JSON.parse(saved) : [
      {
        id: "1",
        name: "Refrigerator",
        currentTemp: 4,
        targetTemp: 4,
        minTemp: 0,
        maxTemp: 5,
        unit: "C" as const,
      },
      {
        id: "2",
        name: "Freezer",
        currentTemp: -18,
        targetTemp: -18,
        minTemp: -25,
        maxTemp: -15,
        unit: "C" as const,
      },
      {
        id: "3",
        name: "Pantry",
        currentTemp: 22,
        targetTemp: 20,
        minTemp: 15,
        maxTemp: 25,
        unit: "C" as const,
      },
    ];
  });

  // Hygiene Tasks State
  const [hygieneTasks, setHygieneTasks] = useState<HygieneTask[]>(() => {
    const saved = localStorage.getItem("hygieneTasks");
    return saved ? JSON.parse(saved) : [
      {
        id: "1",
        title: "Sanitize food preparation surfaces",
        category: "Food Safety",
        completed: true,
        frequency: "Daily",
      },
      {
        id: "2",
        title: "Check refrigerator temperature",
        category: "Equipment",
        completed: true,
        frequency: "Daily",
      },
      {
        id: "3",
        title: "Wash hands before food handling",
        category: "Personal Hygiene",
        completed: false,
        frequency: "Always",
      },
      {
        id: "4",
        title: "Deep clean refrigerator shelves",
        category: "Cleaning",
        completed: false,
        frequency: "Weekly",
      },
      {
        id: "5",
        title: "Check expiry dates",
        category: "Food Safety",
        completed: false,
        frequency: "Daily",
      },
      {
        id: "6",
        title: "Clean kitchen floor",
        category: "Cleaning",
        completed: false,
        frequency: "Daily",
      },
    ];
  });

  // Diet Entries State
  const [dietEntries, setDietEntries] = useState<DietEntry[]>(() => {
    const saved = localStorage.getItem("dietEntries");
    return saved ? JSON.parse(saved, (key, value) => {
      if (key === "timestamp") return new Date(value);
      return value;
    }) : [
      {
        id: "1",
        mealType: "Breakfast",
        foodName: "Oatmeal with Berries",
        calories: 320,
        protein: 12,
        carbs: 54,
        fats: 7,
        timestamp: new Date(),
      },
    ];
  });

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem("foodItems", JSON.stringify(foodItems));
  }, [foodItems]);

  useEffect(() => {
    localStorage.setItem("temperatureZones", JSON.stringify(temperatureZones));
  }, [temperatureZones]);

  useEffect(() => {
    localStorage.setItem("hygieneTasks", JSON.stringify(hygieneTasks));
  }, [hygieneTasks]);

  useEffect(() => {
    localStorage.setItem("dietEntries", JSON.stringify(dietEntries));
  }, [dietEntries]);

  // Handlers
  const handleAddFoodItem = (item: Omit<FoodItem, "id">) => {
    const newItem = {
      ...item,
      id: Date.now().toString(),
    };
    setFoodItems([...foodItems, newItem]);
    toast.success("Food item added successfully!");
  };

  const handleDeleteFoodItem = (id: string) => {
    setFoodItems(foodItems.filter((item) => item.id !== id));
    toast.success("Food item removed!");
  };

  const handleToggleHygieneTask = (id: string) => {
    setHygieneTasks(
      hygieneTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleAddDietEntry = (entry: Omit<DietEntry, "id" | "timestamp">) => {
    const newEntry = {
      ...entry,
      id: Date.now().toString(),
      timestamp: new Date(),
    };
    setDietEntries([newEntry, ...dietEntries]);
    toast.success("Diet entry added!");
  };

  const handleDeleteDietEntry = (id: string) => {
    setDietEntries(dietEntries.filter((entry) => entry.id !== id));
    toast.success("Diet entry deleted!");
  };

  const handleUpdateTemperatureZones = (zones: TemperatureZone[]) => {
    setTemperatureZones(zones);
    toast.success("Temperature settings updated!");
  };

  // Calculate dashboard metrics
  const temperatureAlerts = temperatureZones.filter(
    (zone) => zone.currentTemp < zone.minTemp || zone.currentTemp > zone.maxTemp
  ).length;

  const expiringItems = foodItems.filter((item) => {
    const daysUntilExpiry = Math.ceil(
      (item.expiryDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
    );
    return daysUntilExpiry >= 0 && daysUntilExpiry <= 3;
  }).length;

  const hygieneScore = Math.round(
    (hygieneTasks.filter((t) => t.completed).length / hygieneTasks.length) * 100
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster />
      
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg">
                <Refrigerator className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold">Smart Food Monitor</h1>
                <p className="text-sm text-gray-500">Hygiene Management System</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-5 h-auto gap-2">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              <span className="hidden sm:inline">Dashboard</span>
              <span className="sm:hidden">Home</span>
            </TabsTrigger>
            <TabsTrigger value="food">Food</TabsTrigger>
            <TabsTrigger value="temperature">Temperature</TabsTrigger>
            <TabsTrigger value="hygiene">Hygiene</TabsTrigger>
            <TabsTrigger value="diet">Diet</TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <DashboardOverview
              temperatureAlerts={temperatureAlerts}
              foodItems={foodItems.length}
              expiringItems={expiringItems}
              hygieneScore={hygieneScore}
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <TemperatureMonitor zones={temperatureZones} />
              <HygieneChecklist tasks={hygieneTasks} onToggle={handleToggleHygieneTask} />
            </div>
          </TabsContent>

          {/* Food Tab */}
          <TabsContent value="food" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Food Inventory</h2>
              <AddFoodDialog onAdd={handleAddFoodItem} />
            </div>

            {foodItems.length === 0 ? (
              <div className="text-center py-12 border-2 border-dashed rounded-lg">
                <p className="text-gray-500">No food items yet. Add your first item!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {foodItems.map((item) => (
                  <FoodItemCard key={item.id} item={item} onDelete={handleDeleteFoodItem} />
                ))}
              </div>
            )}
          </TabsContent>

          {/* Temperature Tab */}
          <TabsContent value="temperature" className="space-y-6">
            <h2 className="text-2xl font-bold">Temperature Management</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <TemperatureMonitor zones={temperatureZones} />
              <TemperatureSettings
                zones={temperatureZones}
                onUpdate={handleUpdateTemperatureZones}
              />
            </div>
          </TabsContent>

          {/* Hygiene Tab */}
          <TabsContent value="hygiene" className="space-y-6">
            <h2 className="text-2xl font-bold">Hygiene Management</h2>
            <HygieneChecklist tasks={hygieneTasks} onToggle={handleToggleHygieneTask} />
          </TabsContent>

          {/* Diet Tab */}
          <TabsContent value="diet" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Diet Tracking</h2>
              <AddDietDialog onAdd={handleAddDietEntry} />
            </div>
            <DietTracker entries={dietEntries} onDelete={handleDeleteDietEntry} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

export default App;
