import {
  FormControl,
  FormLabel,
  Radio as RadioChackra,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";
import React from "react";
import { FieldValues, FieldErrors, Controller, Control } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";

interface RadioProps {
  input: {
    id: string;
    label: string;
    placeholder: string;
    type: string;
    required?: boolean;
    options: { label: string; value: string }[];
  };
  control: Control;
  errors: FieldErrors<FieldValues>;
}

const Radio: React.FC<RadioProps> = ({ control, errors, input }) => {
  return (
    <FormControl
      id={input.id}
      isInvalid={!!errors?.[input.id]}
      isRequired={input.required}
    >
      <FormLabel>{input.label}</FormLabel>
      <Controller
        name={input.id}
        control={control}
        render={({ field: { onChange, value } }) => (
          <RadioGroup onChange={onChange} value={value}>
            <Stack direction="row">
              {input.options?.map((item: { value: string; label: string }) => (
                <RadioChackra key={item.value} value={item.value}>
                  {item.label}
                </RadioChackra>
              ))}
            </Stack>
          </RadioGroup>
        )}
        rules={{ required: !!input.required }}
      />
      <ErrorMessage error={errors?.[input.id]} />
    </FormControl>
  );
};

export default Radio;
