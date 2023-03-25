import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

interface TextInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  error?: boolean;
  helperText?: string;
  variant?: "standard" | "outlined" | "filled" | undefined;
  fullWidth?: boolean;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  value,
  onChange,
  type = "text",
  error = false,
  helperText = "",
  variant = "outlined",
  fullWidth = false,
  
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const renderEndAdornment = () => {
    if (type === "password") {
      return (
        <InputAdornment position="end">
          <IconButton onClick={handleTogglePasswordVisibility}>
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </InputAdornment>
      );
    }
    return null;
  };

  return (
    <TextField
      label={label}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      type={showPassword ? "text" : type}
      error={error}
      helperText={helperText}
      variant={variant}
      fullWidth={fullWidth}
      InputProps={{
        endAdornment: renderEndAdornment(),
      }}
    />
  );
};

export default TextInput;