import React, { ChangeEvent, FC, memo } from 'react';
import { TextField } from '@mui/material';

type NumberInputProps = {
  value: string | undefined;
  onChange: (value: string | undefined) => void;
  label: string;
};

const keepNumbers = (value: string) => value.replace(/\D/g, '');

export const NumberInput: FC<NumberInputProps> = memo(({ value, onChange, label }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(keepNumbers(e.target.value) || undefined);
  };

  return (
    <TextField
      sx={{ textTransform: 'uppercase' }}
      label={label}
      variant="outlined"
      onChange={handleChange}
      value={value ?? ' '}
    />
  );
});
