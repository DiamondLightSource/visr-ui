import type { FC, ChangeEvent } from "react";
import { useState } from "react";
import { TextField } from "@mui/material";
import type { SpectroscopyFormData } from "./SpectroscopyForm";

const Modes = {
  NATURAL: /^([0-9]+)$/,
  INTEGER: /^[+\\-]?([0-9]+)$/,
  FLOATING:
    /^[+\\-]?(([0-9]+)|([0-9]+[\\.])|([\\.][0-9]+)|([0-9]+[\\.][0-9]+))$/,
  SCIENTIFIC:
    /^[+\\-]?(([0-9]+)|([0-9]+[\\.])|([\\.][0-9]+)|([0-9]+[\\.][0-9]+))([eE][+\\-]?[0-9]+)?$/,
};

type Value = string;

export type Props = {
  formData: SpectroscopyFormData;
  setFormData: (f: SpectroscopyFormData) => void;
  field: keyof SpectroscopyFormData;
  step?: number;
  label?: string;
  mode?: keyof typeof Modes;
  defaultValue?: Value;
  onChange?: (value?: Value) => void;
  max?: number;
  min?: number;
  placeholder?: string;
  errorMessage?: string;
};

export const NumberField: FC<Props> = ({
  formData,
  setFormData,
  field,
  step = 1,
  label = "Numeric input",
  mode = "FLOATING",
  defaultValue = formData[field],
  errorMessage = "Incorrect Input!",
}) => {
  const pattern = Modes[mode];
  const [numberText, setNumberText] = useState("");
  const [isValid, setIsValid] = useState(true);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setIsValid(pattern.test(value));
    setNumberText(value);
  };

  const handleSubmit = () => {
    const parsedValue = parseFloat(numberText);
    setFormData({ ...formData, [field]: parsedValue });
    console.log("parsed value: ", parsedValue);
  };

  const handleKeyDown = (event: { key: string }) => {
    if (event.key === "Enter" && isValid && handleSubmit) {
      handleSubmit();
    }
  };

  const handleBlur = () => {
    if (isValid && handleSubmit) {
      handleSubmit();
    }
  };

  return (
    <TextField
      fullWidth
      label={label}
      type="text"
      defaultValue={defaultValue}
      onChange={handleInputChange}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
      helperText={!isValid ? errorMessage : ""}
      error={!isValid}
      slotProps={{ htmlInput: { step: step } }}
    />
  );
};
