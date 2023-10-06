import React from 'react';

import BottomNav from '@mui/material/BottomNavigation';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const bottomNavStyle = {
  position: 'fixed',
  width: '100%',
  bottom: 0,
  left: 0,
  right: 0,
  zIndex: 11,
  background: 'white',
  paddingTop: '36px',
  paddingBottom: '36px',
  boxShadow: 10,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end'
};

const BottomNavigation = ({
  onClick,
  text = '登録',
  action,
  disabled = false
}) => {
  return (
    <BottomNav sx={bottomNavStyle}>
      <Box sx={{ paddingRight: '20px' }}>
        {action ? (
          action
        ) : (
          <Button
            variant="contained"
            color="success"
            fullWidth
            onClick={onClick}
            disabled={disabled}
          >
            {text}
          </Button>
        )}
      </Box>
    </BottomNav>
  );
};

export default BottomNavigation;
