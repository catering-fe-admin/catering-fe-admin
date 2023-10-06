import { useState } from 'react';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { makeStyles } from '@material-ui/core/styles';
import isEmpty from 'lodash/isEmpty';

import { useGetInfiniteTimeSections } from 'src/hooks/api/useAdminTimeSections';

import CustomTextField from 'components/mui/text-field';

import MenuItem from '@mui/material/MenuItem';

const useStyles = makeStyles(() => ({
  menuPaper: {
    maxHeight: 300
  }
}));

const DropdownTimeSection = ({
  error,
  helperText,
  defaultValue = {},
  value = { id: '', name: '' },
  onChange,
  label = '時間帯',
  readOnly = false
}) => {
  const classes = useStyles();
  const [options, setOptions] = useState(null);

  const { fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetInfiniteTimeSections(
      {
        page: 1,
        size: 10
      },
      {
        onSuccess: (data) => {
          if (data) {
            const newContent = [];

            data?.pages?.forEach((page) => {
              newContent.push(...(page?.data?.content || []));
            });

            const lastData = data?.pages?.[data?.pages?.length - 1]?.data;

            return setOptions({
              ...lastData,
              content: newContent?.filter((e) => e?.id != defaultValue?.id)
            });
          }
        }
      }
    );

  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0.1
  });

  useEffect(() => {
    if (!inView) return;
    if (!hasNextPage) return;
    if (isFetchingNextPage) return;

    fetchNextPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasNextPage, inView, isFetchingNextPage]);

  return (
    <CustomTextField
      error={error}
      helperText={helperText}
      fullWidth
      select
      SelectProps={{
        readOnly,
        defaultValue,
        value,
        onChange,
        MenuProps: {
          classes: {
            paper: classes.menuPaper
          }
        }
      }}
      label={label}
      id="timeSectionDropdown"
    >
      {!isEmpty(defaultValue) && (
        <MenuItem value={defaultValue}>{defaultValue?.name}</MenuItem>
      )}

      {options?.content?.map((option, idx) => {
        return (
          <MenuItem key={idx} value={option}>
            {option?.name}
          </MenuItem>
        );
      })}

      <div ref={ref}></div>
    </CustomTextField>
  );
};

export default DropdownTimeSection;
