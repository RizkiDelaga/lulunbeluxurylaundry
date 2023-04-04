import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import { IconButton, useMediaQuery, useTheme } from '@mui/material';

export default function PopupDialog() {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.up('xs'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Notifikasi
      </Button>

      <Dialog fullScreen={fullScreen} onClose={handleClose} open={open} sx={{ zIndex: '10000' }}>
        <div>
          <DialogTitle style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
            Notifikasi
            <IconButton onClick={handleClose}>
              <PersonIcon color="primary" />
            </IconButton>
          </DialogTitle>
        </div>
      </Dialog>
    </div>
  );
}
