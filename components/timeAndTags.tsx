import { Task } from "@/lib/tasks";
import { isBeforeNow } from "@/lib/time";
import { cn } from "@/lib/utils";
import TaskTags from "./taskTags";

interface TimeAndTagsProps {
  task: Task;
  formattedDate: string | null;
}

export default function TimeAndTags({ task, formattedDate }: TimeAndTagsProps) {
  return (
    <div className="flex gap-1 mt-1 w-full">
      {task.dateTime && (
        <time
          dateTime={new Date(task.dateTime).toString()}
          className={cn(
            {
              "border-destructive":
                isBeforeNow(task.dateTime.toString()) && !task.checked,
            },
            "task-tag",
          )}
        >
          {task.checked && task.repeatInterval && "next: "} {formattedDate}
        </time>
      )}
      {task.tags && <TaskTags tags={task.tags} />}
    </div>
  );
}
