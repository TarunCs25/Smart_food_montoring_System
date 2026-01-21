import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Checkbox } from "@/app/components/ui/checkbox";
import { Badge } from "@/app/components/ui/badge";
import { ClipboardCheck } from "lucide-react";

export interface HygieneTask {
  id: string;
  title: string;
  category: string;
  completed: boolean;
  frequency: string;
}

interface HygieneChecklistProps {
  tasks: HygieneTask[];
  onToggle: (id: string) => void;
}

export function HygieneChecklist({ tasks, onToggle }: HygieneChecklistProps) {
  const completionRate = Math.round(
    (tasks.filter((t) => t.completed).length / tasks.length) * 100
  );

  const categoryColors: Record<string, string> = {
    "Food Safety": "bg-blue-500",
    "Cleaning": "bg-green-500",
    "Personal Hygiene": "bg-purple-500",
    "Equipment": "bg-orange-500",
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <ClipboardCheck className="h-5 w-5 mr-2" />
            Hygiene Checklist
          </CardTitle>
          <Badge className="bg-blue-600">
            {completionRate}% Complete
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Checkbox
                id={task.id}
                checked={task.completed}
                onCheckedChange={() => onToggle(task.id)}
                className="mt-1"
              />
              <div className="flex-1">
                <label
                  htmlFor={task.id}
                  className={`cursor-pointer ${
                    task.completed ? "line-through text-gray-400" : ""
                  }`}
                >
                  {task.title}
                </label>
                <div className="flex items-center gap-2 mt-1">
                  <Badge
                    variant="outline"
                    className={`text-xs ${categoryColors[task.category]}`}
                  >
                    {task.category}
                  </Badge>
                  <span className="text-xs text-gray-500">{task.frequency}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
