import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import CustomerDeliveries from './CustomerDeliveries';
import CustomerPurchaseSingles from './CustomerPurchaseSingles';
import SupplierPurchases from './SupplierPurchases';

const ItemPacksPopup = ({ open, setOpen, referenceId, type }) => {
  const handleClose = () => setOpen(false);

  const isCustomerDeliveries = [
    'CUSTOMER_DELIVERY',
    'CUSTOMER_PURCHASE_MENU_ADD',
    'CUSTOMER_PURCHASE_MENU_EDIT'
  ].includes(type);

  const isSupplierPurchases = [
    'SUPPLIER_PURCHASE_ADD',
    'SUPPLIER_PURCHASE_EDIT'
  ].includes(type);

  const isCustomerPurchaseSingles = [
    'CUSTOMER_PURCHASE_SINGLE_ADD',
    'CUSTOMER_PURCHASE_SINGLE_EDIT'
  ].includes(type);

  return (
    <Dialog open={open} scroll="paper" onClose={handleClose}>
      <DialogTitle>Subscribe</DialogTitle>
      <DialogContent dividers={true}>
        {isCustomerDeliveries && (
          <CustomerDeliveries referenceId={referenceId} type={type} />
        )}
        {isCustomerPurchaseSingles && (
          <CustomerPurchaseSingles referenceId={referenceId} type={type} />
        )}
        {isSupplierPurchases && <SupplierPurchases referenceId={referenceId} />}
      </DialogContent>
      <DialogActions className="dialog-actions-dense">
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ItemPacksPopup;
