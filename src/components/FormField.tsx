import React from 'react';
import { FieldConfig } from '@/types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface FormFieldProps {
  fieldKey: string;
  config: FieldConfig;
  value: string;
  onChange: (fieldKey: string, value: string) => void;
}

/**
 * Generic form field component driven by configuration
 * Renders different input types based on config.uiType
 */
export const FormField: React.FC<FormFieldProps> = ({
  fieldKey,
  config,
  value,
  onChange,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    onChange(fieldKey, e.target.value);
  };

  const renderInput = () => {
    switch (config.uiType) {
      case 'input':
        return (
          <Input
            type="text"
            id={fieldKey}
            value={value}
            onChange={handleChange}
            placeholder={config.placeholder}
            required={config.required}
          />
        );

      case 'date':
        return (
          <Input
            type="date"
            id={fieldKey}
            value={value}
            onChange={handleChange}
            required={config.required}
          />
        );

      case 'select':
        return (
          <select
            id={fieldKey}
            value={value}
            onChange={handleChange}
            required={config.required}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="">Select...</option>
            {config.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      default:
        return (
          <Input
            type="text"
            id={fieldKey}
            value={value}
            onChange={handleChange}
            placeholder={config.placeholder}
            required={config.required}
          />
        );
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={fieldKey}>
        {config.label}
        {config.required && <span className="text-destructive ml-1">*</span>}
      </Label>
      {renderInput()}
    </div>
  );
};
