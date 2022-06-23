import React from "react";
import Checkbox from "@mui/material/Checkbox";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const CheckBox = ({ checked, onChange }) => {
  return (
    <div>
      <Checkbox
        checked={checked}
        onChange={onChange}
        {...label}
        sx={{
          "& .MuiSvgIcon-root": { fontSize: 28, mt: 0.8 },
        }}
      />
    </div>
  );
};

export default CheckBox;
