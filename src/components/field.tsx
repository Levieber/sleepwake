import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import type { ControllerProps, FieldPath, FieldValues } from "react-hook-form";

interface FieldProps<
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends ControllerProps<TFieldValues, TName> {
	label?: string;
	description?: string;
}

export function Field<
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
	control,
	name,
	render,
	label,
	description,
}: FieldProps<TFieldValues, TName>) {
	return (
		<FormField
			control={control}
			name={name}
			render={(props) => (
				<FormItem>
					{label && <FormLabel>{label}</FormLabel>}
					<FormControl>{render(props)}</FormControl>
					{description && <FormDescription>{description}</FormDescription>}
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
