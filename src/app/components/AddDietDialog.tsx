import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { Plus } from "lucide-react";
import { DietEntry } from "./DietTracker";

interface AddDietDialogProps {
  onAdd: (entry: Omit<DietEntry, "id" | "timestamp">) => void;
}

export function AddDietDialog({ onAdd }: AddDietDialogProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    mealType: "",
    foodName: "",
    calories: "",
    protein: "",
    carbs: "",
    fats: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      mealType: formData.mealType,
      foodName: formData.foodName,
      calories: parseFloat(formData.calories),
      protein: parseFloat(formData.protein),
      carbs: parseFloat(formData.carbs),
      fats: parseFloat(formData.fats),
    });
    setFormData({
      mealType: "",
      foodName: "",
      calories: "",
      protein: "",
      carbs: "",
      fats: "",
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full sm:w-auto">
          <Plus className="h-4 w-4 mr-2" />
          Add Diet Entry
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Diet Entry</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="mealType">Meal Type</Label>
            <Select
              value={formData.mealType}
              onValueChange={(value) => setFormData({ ...formData, mealType: value })}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select meal type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Breakfast">Breakfast</SelectItem>
                <SelectItem value="Lunch">Lunch</SelectItem>
                <SelectItem value="Dinner">Dinner</SelectItem>
                <SelectItem value="Snack">Snack</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="foodName">Food Name</Label>
            <Input
              id="foodName"
              value={formData.foodName}
              onChange={(e) => setFormData({ ...formData, foodName: e.target.value })}
              placeholder="e.g., Grilled Chicken Salad"
              required
            />
          </div>

          <div>
            <Label htmlFor="calories">Calories</Label>
            <Input
              id="calories"
              type="number"
              step="1"
              value={formData.calories}
              onChange={(e) => setFormData({ ...formData, calories: e.target.value })}
              placeholder="0"
              required
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="protein">Protein (g)</Label>
              <Input
                id="protein"
                type="number"
                step="0.1"
                value={formData.protein}
                onChange={(e) => setFormData({ ...formData, protein: e.target.value })}
                placeholder="0"
                required
              />
            </div>
            <div>
              <Label htmlFor="carbs">Carbs (g)</Label>
              <Input
                id="carbs"
                type="number"
                step="0.1"
                value={formData.carbs}
                onChange={(e) => setFormData({ ...formData, carbs: e.target.value })}
                placeholder="0"
                required
              />
            </div>
            <div>
              <Label htmlFor="fats">Fats (g)</Label>
              <Input
                id="fats"
                type="number"
                step="0.1"
                value={formData.fats}
                onChange={(e) => setFormData({ ...formData, fats: e.target.value })}
                placeholder="0"
                required
              />
            </div>
          </div>

          <Button type="submit" className="w-full">
            Add Entry
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
