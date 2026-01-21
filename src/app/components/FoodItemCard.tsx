import { Card, CardContent } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { Trash2, Calendar, MapPin } from "lucide-react";
import { format } from "date-fns";

export interface FoodItem {
  id: string;
  name: string;
  category: string;
  expiryDate: Date;
  location: string;
  quantity: number;
  unit: string;
}

interface FoodItemCardProps {
  item: FoodItem;
  onDelete: (id: string) => void;
}

export function FoodItemCard({ item, onDelete }: FoodItemCardProps) {
  const daysUntilExpiry = Math.ceil(
    (item.expiryDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  const getExpiryStatus = () => {
    if (daysUntilExpiry < 0) return { text: "Expired", color: "bg-red-500" };
    if (daysUntilExpiry <= 3) return { text: "Expiring Soon", color: "bg-yellow-500" };
    return { text: "Fresh", color: "bg-green-500" };
  };

  const status = getExpiryStatus();

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <h3 className="font-semibold text-lg">{item.name}</h3>
            <p className="text-sm text-gray-500">{item.category}</p>
          </div>
          <Badge className={status.color}>{status.text}</Badge>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="h-4 w-4 mr-2" />
            <span>Expires: {format(item.expiryDate, "MMM dd, yyyy")}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="h-4 w-4 mr-2" />
            <span>{item.location}</span>
          </div>
          <div className="text-sm text-gray-600">
            Quantity: {item.quantity} {item.unit}
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          className="w-full text-red-600 hover:bg-red-50"
          onClick={() => onDelete(item.id)}
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Remove
        </Button>
      </CardContent>
    </Card>
  );
}
