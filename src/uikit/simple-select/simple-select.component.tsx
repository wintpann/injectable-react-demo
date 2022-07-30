import React, { FC, memo, useMemo, useRef } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

type SimpleSelectProps = {
  label: string;
  items: Array<string>;
  selected: string | undefined;
  onChange: (value: string | undefined) => void;
};

const sx = { textTransform: 'uppercase' };

const EMPTY_SYMBOL = '⠀';

let id = 0;

export const SimpleSelect: FC<SimpleSelectProps> = memo(({ items, selected, onChange, label }) => {
  const idRef = useRef<string>();
  const handleChange = (e: SelectChangeEvent) =>
    onChange(e.target.value === EMPTY_SYMBOL ? undefined : e.target.value);

  if (!idRef.current) {
    idRef.current = `Select_${id++}`;
  }

  const options = useMemo(
    () =>
      selected ? Array.from(new Set([EMPTY_SYMBOL, ...items, selected])) : [EMPTY_SYMBOL, ...items],
    [items, selected],
  ); // select doesnt render option not present in list

  return (
    <FormControl fullWidth sx={sx}>
      <InputLabel id={idRef.current}>{label}</InputLabel>
      <Select
        labelId={idRef.current}
        id={idRef.current}
        value={selected ?? EMPTY_SYMBOL}
        label={label}
        onChange={handleChange}
      >
        {options.map((item) => (
          <MenuItem value={item} sx={sx} key={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
});
