import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import React from 'react'

export type SortingTypes = 'price' | 'date' | ''

interface SortBySelectProps {
    sortBy: SortingTypes
    handleSortBy: (e:SelectChangeEvent<SortingTypes>) => void
}

const SortBySelect = ({sortBy, handleSortBy}:SortBySelectProps) => {
  return (
    <FormControl color="secondary">
          <InputLabel color="secondary" id="demo-simple-select-label">
            Sort by
          </InputLabel>
          <Select
            sx={{ width: '100px' }}
            label="Sort by"
            color="secondary"
            value={sortBy}
            onChange={handleSortBy}
            // displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
          >
            <MenuItem color="secondary" value=''>
              <em>None</em>
            </MenuItem>
            <MenuItem color="secondary" value='date'>
              Date
            </MenuItem>
            <MenuItem color="secondary" value='price'>
              Price
            </MenuItem>
          </Select>
        </FormControl>
  )
}

export default SortBySelect
