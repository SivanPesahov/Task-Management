import { Checkbox } from "../ui/checkbox";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { CEField } from "./edit-input";

export function ChecklistItemField({
  itemId,
  index,
  control,
  watch,
  onToggle,
}) {
  const isDone = !!watch(`todoList.${index}.isComplete`);
  return (
    <li
      key={itemId}
      className="group flex items-center gap-2 px-3 py-2 hover:bg-foreground/5 rounded-md transition-colors"
    >
      <Checkbox
        checked={isDone}
        onCheckedChange={(checked) => onToggle(index, checked)}
        className="mr-1"
      />
      <FormField
        control={control}
        name={`todoList.${index}.title`}
        render={({ field }) => (
          <FormItem className="flex-1">
            <FormControl>
              <CEField
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                singleLine
                placeholder={`Todo #${index + 1}`}
                ariaLabel={`Todo ${index + 1} title`}
                className={
                  "h-7 px-1 text-sm border border-transparent focus:border-input rounded-sm " +
                  (isDone
                    ? "text-muted-foreground line-through"
                    : "text-foreground")
                }
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </li>
  );
}
