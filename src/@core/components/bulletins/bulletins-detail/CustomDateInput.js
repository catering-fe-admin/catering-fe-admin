import { forwardRef } from 'react';

import CustomTextField from 'components/mui/text-field';

const CustomDateInput = forwardRef((props, ref) => {
  return (
    <CustomTextField
      {...props}
      inputRef={ref}
      label="年月日"
      autoComplete="off"
    />
  );
});

CustomDateInput.displayName = 'CustomDateInput';

export default CustomDateInput;
