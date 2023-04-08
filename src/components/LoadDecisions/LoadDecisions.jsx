import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Backdrop, CircularProgress } from '@mui/material';

function LoadDecisions(props) {
  const navigate = useNavigate();

  const [alertStatus, setAlertStatus] = React.useState(false);

  React.useEffect(() => {
    if (props.open) {
      setTimeout(alertSuccess, 1000);
    }
  }, [props.open]);

  const alertSuccess = () => {
    if (!props.redirect) {
      props.setOpen(false);
    }
    setAlertStatus(true);
    setTimeout(
      () => {
        setAlertStatus(false);
        if (props.redirect) {
          navigate(props.redirect);
        }
      },
      props.redirect ? 2000 : 5000
    );
  };
  const handleToggle = () => {
    props.setOpen(!props.open);
    setTimeout(alertSuccess, 1000);
  };

  return (
    <>
      {alertStatus ? (
        <Alert
          variant="filled"
          severity={
            props.alertProps.statusType.toLowerCase() === 'success'
              ? 'success'
              : props.alertProps.statusType.toLowerCase() === 'error'
              ? 'error'
              : props.alertProps.statusType.toLowerCase() === 'warning'
              ? 'warning'
              : props.alertProps.statusType.toLowerCase() === 'info'
              ? 'info'
              : 'error'
          }
          sx={{
            position: 'fixed',
            left: '50%',
            transform: 'translate(-50%, 0)',
            zIndex: props.redirect ? 100000 : null,
          }}
        >
          {props.alertProps.title}
        </Alert>
      ) : null}

      <Backdrop sx={{ color: '#1F305C', zIndex: (theme) => theme.zIndex.drawer + 10000 }} open={props.open}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}

export default LoadDecisions;

// How To Use
/* <LoadDecisions
  setOpen={setoOpenLoadDecision}
  open={openLoadDecision}
  close={true}
  alertProps={{
    title: 'This is a success alert — check it out!',
    statusType: 'success|error|warning|info',
  }}
  redirect={'/InformasiBisnis'}
/>; */
