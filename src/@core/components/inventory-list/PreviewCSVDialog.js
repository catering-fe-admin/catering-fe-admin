// ** React Imports
import { forwardRef } from 'react';
// ** Styles Import
import 'react-credit-cards/es/styles-compiled.css';

// ** Icon Imports
import Icon from 'src/@core/components/icon';
import { usePostAdminItemPacksInventoriesImport } from 'src/hooks/api/useAdminItemPacksInventories';

import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow
} from '@mui/material';
// ** MUI Imports
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Fade from '@mui/material/Fade';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

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

const PreviewCSVDialog = ({
  show = false,
  title = 'Preview',
  onClickClose,
  setShow,
  data,
  file
}) => {
  const handleClose = () => {
    setShow && setShow(false);
    onClickClose && onClickClose();
  };

  const { mutate: postImport } = usePostAdminItemPacksInventoriesImport();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    postImport(formData, {
      onSuccess: (data) => {
        if (data?.data) {
          setShow(false);
        }
      }
    });
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
      <DialogContent>
        <CustomCloseButton onClick={handleClose}>
          <Icon icon="tabler:x" fontSize="1.25rem" />
        </CustomCloseButton>
        <Typography variant="h6">{title}</Typography>
        <Grid container justifyContent="center">
          <TableContainer component={Paper} sx={{ maxHeight: 300 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableBody>
                <TableRow hover>
                  <TableCell align="center">品名</TableCell>
                  <TableCell align="center">倉庫</TableCell>
                  <TableCell align="center">システム</TableCell>
                </TableRow>
                {data?.map((d, idx) => {
                  return (
                    <TableRow hover key={idx}>
                      <TableCell align="center">
                        <p>
                          {d?.unitQtyOnPack} {d?.item?.name}
                        </p>
                      </TableCell>
                      <TableCell align="center">
                        <p> {d?.oldStockPackQty}</p>
                      </TableCell>
                      <TableCell align="center">
                        <p>{d?.stockPackQty}</p>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Typography variant="h6" style={{ marginTop: '10px' }}>
          在庫数に差があります。 倉庫の数値に上書きしますか?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button variant="tonal" color="secondary" onClick={handleClose}>
          No
        </Button>
        <Button variant="contained" sx={{ mr: 1 }} onClick={handleSubmit}>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PreviewCSVDialog;
