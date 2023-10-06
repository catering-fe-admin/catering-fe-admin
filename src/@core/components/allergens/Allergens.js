import { useState } from 'react';

import { useGetInfiniteAdminAllergens } from 'src/hooks/api/useAdminAllergens';

import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const dummyAllergen = [
  'さけ',
  '大豆',
  '乳',
  '□大豆',
  '□乳',
  '□りんご',
  'ゼラチン',
  '□鶏肉',
  '□牛肉',
  '□バナナ'
];

const Allergens = ({ value, onChange }) => {
  const [allergens, setAllergens] = useState(null);

  useGetInfiniteAdminAllergens(
    {
      page: 0,
      size: 1000
    },
    {
      onSuccess: (data) => {
        if (data) {
          const newContent = [];

          data?.pages?.forEach((page) => {
            newContent.push(...(page?.data?.content || []));
          });

          const lastData = data?.pages?.[data?.pages?.length - 1]?.data;

          setAllergens({
            ...lastData,
            content: newContent
          });
        }
      }
    }
  );

  return (
    <Grid container item direction="row">
      <Grid item>
        <Typography variant="body2">アレルゲン</Typography>
      </Grid>
      <Grid item xs={12}>
        <FormGroup
          row
          value={value}
          aria-label="allergens"
          name="allergens"
          onChange={onChange}
        >
          {allergens?.content?.map((allergen, idx) => (
            <FormControlLabel
              key={idx}
              label={allergen?.name}
              value={allergen?.id}
              control={
                <Checkbox
                  checked={value?.find((e) => e?.allergen?.id == allergen?.id)}
                />
              }
            />
          ))}
        </FormGroup>
      </Grid>
    </Grid>
  );
};

export default Allergens;
