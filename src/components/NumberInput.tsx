import { useState } from "react";
import { Button, Stack, TextField } from "@mui/material";

const Modes = {
  /** Natural numbers from 0 to inf */
  NATURAL: /^([0-9]+)$/,
  /** Integers from -inf to inf */
  INTEGER: /^[+\\-]?([0-9]+)$/,
  /** Floating point numbers from -inf to inf, accepts values such as 1. and .1 as valid*/
  FLOATING:
    /^[+\\-]?(([0-9]+)|([0-9]+[\\.])|([\\.][0-9]+)|([0-9]+[\\.][0-9]+))$/,
  /** Floating point numbers from -inf to inf, accepts values such as 1.e1 and .1e1 as valid*/
  SCIENTIFIC:
    /^[+\\-]?(([0-9]+)|([0-9]+[\\.])|([\\.][0-9]+)|([0-9]+[\\.][0-9]+))([eE][+\\-]?[0-9]+)?$/,
};

interface NumberInputTextProps {
  label: string;
  numberMode: keyof typeof Modes;
  numberText: string;
  setNumberText: (v: string) => void;
  isValid: boolean;
  setIsValid: (v: boolean) => void;
  handleSubmit?: () => void;
  submitOnReturn?: boolean;
  submitOnBlur?: boolean;
}

const NumberInputText: React.FC<NumberInputTextProps> = ({
  label,
  numberMode,
  numberText,
  setNumberText,
  isValid,
  setIsValid,
  handleSubmit,
  submitOnReturn,
  submitOnBlur,
}) => {
  const numberRegex = Modes[numberMode];

  const handleInputChange = (value: string) => {
    setIsValid(numberRegex.test(value));
    setNumberText(value);
  };

  const handleKeyDown = (event: { key: string }) => {
    if (event.key === "Enter" && submitOnReturn && isValid && handleSubmit) {
      handleSubmit();
    }
  };

  const handleBlur = () => {
    if (isValid && submitOnBlur && handleSubmit) {
      handleSubmit();
    }
  };

  return (
    <TextField
      label={label}
      value={numberText}
      onChange={e => handleInputChange(e.target.value)}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
      error={!isValid}
      helperText={!isValid ? "Invalid input" : ""}
      variant="outlined"
    />
  );
};

interface NumberInputProps {
  label: string;
  numberMode: keyof typeof Modes;
  defaultValue: number | string;
  onSubmit?: (number: number) => void;
  number?: number;
  parameters?: object;
  submitButton?: boolean;
  submitOnReturn?: boolean;
  submitOnBlur?: boolean;
}

const NumberInput: React.FC<NumberInputProps> = ({
  label,
  numberMode = "FLOATING",
  defaultValue,
  onSubmit,
  submitButton = true,
  submitOnReturn = true,
  submitOnBlur = true,
}) => {
  const [numberText, setNumberText] = useState(defaultValue.toString());
  const [isValid, setIsValid] = useState(true);

  const handleSubmit = () => {
    const parsedValue: number = parseFloat(numberText);
    if (onSubmit) {
      onSubmit(parsedValue);
    }
  };

  return (
    <>
      {onSubmit && submitButton ? (
        <Stack direction="row" alignContent="end" spacing={1} alignSelf="end">
          <NumberInputText
            label={label}
            numberMode={numberMode}
            numberText={numberText}
            setNumberText={setNumberText}
            isValid={isValid}
            setIsValid={setIsValid}
            handleSubmit={handleSubmit}
            submitOnReturn={submitOnReturn}
            submitOnBlur={submitOnBlur}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={!isValid}
            data-testid="submit-button"
          >
            Submit
          </Button>
        </Stack>
      ) : (
        <NumberInputText
          label={label}
          numberMode={numberMode}
          numberText={numberText}
          setNumberText={setNumberText}
          isValid={isValid}
          setIsValid={setIsValid}
          handleSubmit={handleSubmit}
          submitOnReturn={submitOnReturn}
          submitOnBlur={submitOnBlur}
        />
      )}
    </>
  );
};

export { NumberInput, NumberInputText };
export type { NumberInputTextProps, NumberInputProps };
