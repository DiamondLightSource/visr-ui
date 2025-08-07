import { useState, type ReactNode } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";

type PlanSelectorProps<T> = {
  plans: T[];
  getName: (plan: T) => string;
  renderPlan: (plan: T) => ReactNode;
  title?: string;
};

const PlanSelector = <T,>({
  plans,
  getName,
  renderPlan,
  title = "Plans",
}: PlanSelectorProps<T>) => {
  const [currentPlan, setCurrentPlan] = useState<T | undefined>(undefined);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap={2}
    >
      <Typography variant="h4" component="h2" textAlign="center">
        {title}
      </Typography>
      <FormControl sx={{ m: 1, width: 200 }} fullWidth>
        <InputLabel id="plan-select-id">Plan</InputLabel>
        <Select
          labelId="plan-select-id"
          value={currentPlan ? plans.indexOf(currentPlan).toString() : ""}
          label="Plan"
          onChange={event => {
            const value = event.target.value;
            if (value === "") {
              setCurrentPlan(undefined);
            } else {
              const i = parseInt(value);
              setCurrentPlan(plans[i]);
            }
          }}
        >
          <MenuItem value="">&nbsp;</MenuItem>
          {plans.map((plan, i) => (
            <MenuItem key={getName(plan)} value={i}>
              {getName(plan)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {currentPlan && renderPlan(currentPlan)}
    </Box>
  );
};

export default PlanSelector;
