
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TCreateJobValues } from "@/validation/validation";
import { UseFormReturn } from "react-hook-form";

type TNameType = keyof TCreateJobValues;

type TInputProps = {
  label: string;
  name: TNameType;
  type: any;
  placeholder?: string;
  form: UseFormReturn<TCreateJobValues>;
};

type TSelectProps = {
  label: string;
  name: TNameType;
  options: string[];
  form: UseFormReturn<TCreateJobValues>;
};

/**
 * Custom input field component for forms.
 *
 * @param {Object} props - The component props.
 * @param {string} props.label - The label to display for the input field.
 * @param {string} props.name - The name attribute for the input field, also used as the form field name.
 * @param {string} props.type - The input type (e.g., 'text', 'password', etc.).
 * @param {string} [props.placeholder] - The placeholder text to display inside the input field.
 * @param {UseFormReturn<TCreateJobValues>} props.form - The react-hook-form instance used to manage form state.
 *
 * @returns {JSX.Element} - A FormField with an input element rendered inside.
 */
export const CustomInputField = ({
  form,
  label,
  placeholder,
  type,
  name,
}: TInputProps) => {
  return (
    <FormField
    control={form.control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          {type === "file" ? (
            <Input
              type="file"
              accept="image/*"
              placeholder={placeholder}
              onChange={(e) => field.onChange(e.target.files?.[0])} 
              ref={field.ref}
            />
          ) : (
            // @ts-ignore
            <Input type={type} placeholder={placeholder} {...field} /> 
          )}
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
  );
};

/**
 * Custom select field component for forms.
 *
 * @param {Object} props - The component props.
 * @param {string} props.label - The label to display for the select field.
 * @param {string} props.name - The name attribute for the select field, also used as the form field name.
 * @param {string[]} props.options - An array of options to display in the select dropdown.
 * @param {UseFormReturn} props.form - The react-hook-form instance used to manage form state.
 *
 * @returns {JSX.Element} - A FormField with a select dropdown rendered inside.
 */
export const CustomSelectField = ({
  form,
  label,
  name,
  options,
}: TSelectProps) => {
  return (
    <FormField
      name={name}
      control={form.control}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          {/* @ts-ignore */}
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={`Select ${label}`} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((option: string) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
