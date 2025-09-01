import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Switch } from "../ui/switch";

export function PinTaskToggleField({ control, name = "isPinned", form }) {
  return (
    <Form {...form}>
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem className="ml-2 inline-flex items-center gap-2">
            <FormControl>
              <Switch
                checked={!!field.value}
                onCheckedChange={(checked) => field.onChange(!!checked)}
              />
            </FormControl>
            <FormLabel className="m-0 text-[11px] leading-none text-foreground/70">
              Pin task
            </FormLabel>
          </FormItem>
        )}
      />
    </Form>
  );
}
