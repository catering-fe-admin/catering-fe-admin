// ** React Imports
import { forwardRef } from 'react'

// ** MUI Imports
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Fade from '@mui/material/Fade'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import IconButton from '@mui/material/IconButton'

// ** Styles Import
import 'react-credit-cards/es/styles-compiled.css'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

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
}))

const Transition = forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />
})

const ConfirmDialog = ({
  show = false,
  setShow,
  title = 'Title',
  description = '本当によろしいでしょうか？',
  onClickSubmit,
  onClickClose,
  showButton = true
}) => {
  const handleClose = () => {
    setShow(false)
    onClickClose && onClickClose()
  }

  const onSubmit = () => {
    onClickSubmit && onClickSubmit()
  }

  return (
    <Dialog
      fullWidth
      open={show}
      maxWidth='sm'
      scroll='body'
      onClose={handleClose}
      TransitionComponent={Transition}
      sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
    >
      <DialogContent>
        <CustomCloseButton onClick={handleClose}>
          <Icon icon='tabler:x' fontSize='1.25rem' />
        </CustomCloseButton>
        <Typography variant='h6'>{title}</Typography>
        <Typography sx={{ marginTop: '24px' }}>{description}</Typography>
      </DialogContent>
      {showButton && (
        <DialogActions>
          <Button variant='tonal' color='secondary' onClick={handleClose}>
            キャンセル
          </Button>
          <Button variant='contained' sx={{ mr: 1 }} onClick={onSubmit}>
            送信
          </Button>
        </DialogActions>
      )}
    </Dialog>
  )
}

export default ConfirmDialog
