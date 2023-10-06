import React from 'react';

import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';

const RiceDeliveryDate = ({ setValues, values }) => {
  const arrayRiceDelivery = values?.delivery?.split('') || '0000000'.split('');

  const onChangeRiceDelivery = (index, isChecked) => {
    const arrayRiceDelivery =
      values?.delivery?.split('') || '0000000'.split('');
    arrayRiceDelivery[index] = isChecked ? '1' : '0';

    const stringRiceDelivery = arrayRiceDelivery.join('');

    setValues({ ...values, delivery: stringRiceDelivery });
  };

  return (
    <Grid item xs={6}>
      出荷可能曜日
      <div>
        <Checkbox
          checked={arrayRiceDelivery[0] == '1'}
          onChange={(e) => onChangeRiceDelivery(0, e.target.checked)}
        />
        月
        <Checkbox
          checked={arrayRiceDelivery[1] == '1'}
          onChange={(e) => onChangeRiceDelivery(1, e.target.checked)}
        />
        火
        <Checkbox
          checked={arrayRiceDelivery[2] == '1'}
          onChange={(e) => onChangeRiceDelivery(2, e.target.checked)}
        />
        水
        <Checkbox
          checked={arrayRiceDelivery[3] == '1'}
          onChange={(e) => onChangeRiceDelivery(3, e.target.checked)}
        />
        木
        <Checkbox
          checked={arrayRiceDelivery[4] == '1'}
          onChange={(e) => onChangeRiceDelivery(4, e.target.checked)}
        />
        金
        <Checkbox
          checked={arrayRiceDelivery[5] == '1'}
          onChange={(e) => onChangeRiceDelivery(5, e.target.checked)}
        />
        土
        <Checkbox
          checked={arrayRiceDelivery[6] == '1'}
          onChange={(e) => onChangeRiceDelivery(6, e.target.checked)}
        />
        日
      </div>
    </Grid>
  );
};

export default RiceDeliveryDate;
