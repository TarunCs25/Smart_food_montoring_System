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
import { FoodItem } from "./FoodItemCard";

interface AddFoodDialogProps {
  onAdd: (item: Omit<FoodItem, "id">) => void;
}

export function AddFoodDialog({ onAdd }: AddFoodDialogProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    expiryDate: "",
    location: "",
    quantity: "",
    unit: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      name: formData.name,
      category: formData.category,
      expiryDate: new Date(formData.expiryDate),
      location: formData.location,
      quantity: parseFloat(formData.quantity),
      unit: formData.unit,
    });
    setFormData({
      name: "",
      category: "",
      expiryDate: "",
      location: "",
      quantity: "",
      unit: "",
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full sm:w-auto">
          <Plus className="h-4 w-4 mr-2" />
          Add Food Item
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Food Item</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Food Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Fresh Milk"
              required
            />
          </div>

          <div>
            <Label htmlFor="category">Category</Label>
            <Select
              value={formData.category}
              onValueChange={(value) => setFormData({ ...formData, category: value })}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Dairy">Dairy</SelectItem>
                <SelectItem value="Meat">Meat</SelectItem>
                <SelectItem value="Vegetables">Vegetables</SelectItem>
                <SelectItem value="Fruits">Fruits</SelectItem>
                <SelectItem value="Grains">Grains</SelectItem>
                <SelectItem value="Beverages">Beverages</SelectItem>
                <SelectItem value="Frozen">Frozen</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="expiryDate">Expiry Date</Label>
            <Input
              id="expiryDate"
              type="date"
              value={formData.expiryDate}
              onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="location">Storage Location</Label>
            <Select
              value={formData.location}
              onValueChange={(value) => setFormData({ ...formData, location: value })}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Refrigerator">Refrigerator</SelectItem>
                <SelectItem value="Freezer">Freezer</SelectItem>
                <SelectItem value="Pantry">Pantry</SelectItem>
                <SelectItem value="Counter">Counter</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                step="0.1"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                placeholder="0"
                required
              />
            </div>
            <div>
              <Label htmlFor="unit">Unit</Label>
              <Select
                value={formData.unit}
                onValueChange={(value) => setFormData({ ...formData, unit: value })}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Unit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="kg">kg</SelectItem>
                  <SelectItem value="g">g</SelectItem>
                  <SelectItem value="L">L</SelectItem>
                  <SelectItem value="mL">mL</SelectItem>
                  <SelectItem value="pcs">pcs</SelectItem>
                  <SelectItem value="oz">oz</SelectItem>
                  <SelectItem value="lb">lb</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button type="submit" className="w-full">
            Add Item
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
