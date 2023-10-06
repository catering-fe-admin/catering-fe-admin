// ** React Imports
import { forwardRef } from 'react';
// ** Styles Import
import 'react-credit-cards/es/styles-compiled.css';

import fileDownload from 'js-file-download';

// ** Icon Imports
import Icon from 'src/@core/components/icon';
import { getAdminItemPacksInventoriesTemplate } from 'src/client/adminItemPacksInventoriesClient';
import { usePostAdminItemPacksInventoriesPreview } from 'src/hooks/api/useAdminItemPacksInventories';

// ** MUI Imports
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Fade from '@mui/material/Fade';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

import CustomTextField from '../mui/text-field';

const CustomCloseButton = styled(IconButton)(({ theme }) => ({
  top: 0,
  right: 0,
  color: 'grey.500',
  position: 'absolute',
  boxShadow: theme.shadows[2],
  transform: 'translate(10px, -10px)',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: `${theme.palette.background.paper} !important`,
  transition: 'transform 0.25s ease-in-out, box-shadow 0.25s ease-in-out',
  '&:hover': {
    transform: 'translate(7px, -5px)'
  }
}));

const Transition = forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />;
});

const ImportCSVDialog = ({
  show = false,
  title = 'Import CSV',
  onClickClose,
  setDataPreview,
  setShow,
  SetIsShowPreview,
  file,
  setFile
}) => {
  const handleClose = () => {
    onClickClose && onClickClose();
  };

  const { mutate: postPreview } = usePostAdminItemPacksInventoriesPreview();
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    postPreview(formData, {
      onSuccess: (data) => {
        if (data?.data) {
          setDataPreview(data?.data);
        }
      }
    });

    setShow(false);
    SetIsShowPreview(true);
  };

  // in progress be
  const handleTemplate = async () => {
    const { data } = await getAdminItemPacksInventoriesTemplate();

    if (data) {
      fileDownload(data, 'Sample CSV.csv');
    }
  };

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <Dialog
      fullWidth
      open={show}
      maxWidth="sm"
      scroll="body"
      onClose={handleClose}
      TransitionComponent={Transition}
      sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
    >
      <form onSubmit={onSubmit} encType="multipart/form-data">
        <DialogContent>
          <CustomCloseButton onClick={handleClose}>
            <Icon icon="tabler:x" fontSize="1.25rem" />
          </CustomCloseButton>
          <Typography variant="h6">{title}</Typography>
          <CustomTextField type="file" onChange={handleFile} />
        </DialogContent>
        <DialogActions>
          <Button variant="tonal" color="secondary" onClick={handleTemplate}>
            download template
          </Button>
          <Button variant="contained" sx={{ mr: 1 }} type="submit">
            submit
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ImportCSVDialog;
