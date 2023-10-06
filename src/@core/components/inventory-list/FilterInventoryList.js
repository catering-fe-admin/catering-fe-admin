import { useState } from 'react';

import pickBy from 'lodash/pickBy';

import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';

import DropdownItemPacks from '../dropdown/DropdownItemPacks';
import ImportCSVDialog from './ImportCSVDialog';
import PreviewCSVDialog from './PreviewCSVDialog';

const FilterInventoryList = ({ setParams }) => {
  const [filter, setFilter] = useState({
    name: '',
    isTheoreticalPackQtyNegative: false
  });
  const [isShowModalCSV, setIsShowModalCSV] = useState(false);
  const [isShowPreview, SetIsShowPreview] = useState(false);
  const [dataPreview, setDataPreview] = useState([]);
  const [file, setFile] = useState(null);

  const handleChange = (prop) => (event) => {
    setFilter({ ...filter, [prop]: event });
  };

  const handleSearch = (e) => {
    e?.preventDefault();

    const newFilter =
      pickBy(
        {
          name: filter?.name?.item?.name,
          isTheoreticalPackQtyNegative: filter?.isTheoreticalPackQtyNegative
        },
        (value) => !!value
      ) || {};

    setParams(newFilter);
  };

  const handleShowImportCSV = () => {
    setIsShowModalCSV(true);
  };

  return (
    <>
      <Grid container spacing={5} padding="24px" justifyContent="center">
        <Grid item container spacing={5} alignItems="flex-end">
          {/* Filter Inventory Management */}
          <Grid item lg={7} md={6} xs={12}>
            <DropdownItemPacks
              label="品名"
              onChange={handleChange('name')}
              value={filter?.name}
              defaultValue={filter?.name}
            />
          </Grid>
          <Grid item lg={3} md={4} xs={12}>
            <FormControlLabel
              label="理論在庫マイナスの商品"
              control={
                <Checkbox
                  checked={filter?.isTheoreticalPackQtyNegative}
                  onChange={() =>
                    setFilter({
                      ...filter,
                      isTheoreticalPackQtyNegative:
                        !filter?.isTheoreticalPackQtyNegative
                    })
                  }
                />
              }
            />
          </Grid>
          <Grid item lg={2} md={2} xs={12}>
            <Button
              variant="contained"
              color="info"
              onClick={handleShowImportCSV}
            >
              CSV取込
            </Button>
          </Grid>
        </Grid>

        <Grid item container xs={12} justifyContent="center">
          <Grid item xs={2}>
            <Button
              fullWidth
              color="warning"
              variant="contained"
              onClick={handleSearch}
            >
              検索
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <ImportCSVDialog
        show={isShowModalCSV}
        setShow={setIsShowModalCSV}
        onClickClose={() => setIsShowModalCSV(false)}
        setDataPreview={setDataPreview}
        SetIsShowPreview={SetIsShowPreview}
        file={file}
        setFile={setFile}
      />
      <PreviewCSVDialog
        data={dataPreview}
        show={isShowPreview}
        setShow={SetIsShowPreview}
        file={file}
      />
    </>
  );
};

export default FilterInventoryList;
