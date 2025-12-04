import * as React from "react";
import { NumberField } from "@base-ui-components/react/number-field";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import type { SpectroscopyFormData } from "./SpectroscopyForm";

export default function NumberTextField({
  id: idProp,
  formData,
  setFormData,
  field,
  step,
  label = field,
  size = "medium",
  ...other
}: NumberField.Root.Props & {
  formData: SpectroscopyFormData;
  setFormData: (f: SpectroscopyFormData) => void;
  field: keyof SpectroscopyFormData;
  step: number;
  label?: React.ReactNode;
  size?: "small" | "medium";
}) {
  let id = React.useId();
  if (idProp) {
    id = idProp;
  }

  const handleCommit = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>,
  ) => {
    const parsedValue = Number.isInteger(step)
      ? parseInt(e.target.value, 10)
      : parseFloat(e.target.value);
    setFormData({ ...formData, [field]: parsedValue });
  };

  return (
    <NumberField.Root
      value={formData[field]}
      step={step}
      {...other}
      render={(props, state) => (
        <FormControl
          size={size}
          ref={props.ref}
          disabled={state.disabled}
          required={state.required}
          variant="outlined"
        >
          {props.children}
        </FormControl>
      )}
    >
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <NumberField.Group>
        <NumberField.Input
          id={id}
          render={(props, state) => (
            <OutlinedInput
              label={label}
              inputRef={props.ref}
              value={state.value}
              onChange={props.onChange}
              onKeyUp={props.onKeyUp}
              onKeyDown={props.onKeyDown}
              onBlur={e => handleCommit(e)}
              onFocus={props.onFocus}
              slotProps={{ input: props }}
              fullWidth={true}
              endAdornment={
                <InputAdornment
                  position="end"
                  sx={{
                    flexDirection: "column",
                    maxHeight: "unset",
                    alignSelf: "stretch",
                    borderLeft: "1px solid",
                    borderColor: "divider",
                    ml: 0,
                    "& button": { py: 0, flex: 1, borderRadius: 0.5 },
                  }}
                >
                  <NumberField.Increment render={<IconButton size={size} />}>
                    <KeyboardArrowUpIcon
                      fontSize={size}
                      sx={{ transform: "translateY(2px)" }}
                    />
                  </NumberField.Increment>
                  <NumberField.Decrement render={<IconButton size={size} />}>
                    <KeyboardArrowDownIcon
                      fontSize={size}
                      sx={{ transform: "translateY(-2px)" }}
                    />
                  </NumberField.Decrement>
                </InputAdornment>
              }
              sx={{ pr: 0 }}
            />
          )}
        />
      </NumberField.Group>
    </NumberField.Root>
  );
}
