import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Backdrop, CircularProgress } from '@mui/material';

function LoadDecisions(props) {
  const navigate = useNavigate();
  const [alertStatus, setAlertStatus] = React.useState(true);

  React.useEffect(() => {
    // if (props.openLoad.isLoad) {
    //   props.setOpenLoad({ ...props.openLoad, message: '', statusType: '' });
    //   props.setOpenLoad({ isLoad: false, message: '', statusType: '' });
    // }
    // if (props.openLoad.redirect) {
    //   props.setOpenLoad({ ...props.openLoad, isLoad: true });
    // }

    if (props.openLoad.message) {
      setAlertStatus(true);
      setTimeout(
        () => {
          setAlertStatus(false);
          props.setOpenLoad({ isLoad: false, message: '', statusType: '' });
          if (props.redirect && props.openLoad.statusType !== 'error') {
            navigate(props.redirect);
          }
        },
        props.redirect ? 2000 : 3000
      );
    }
  }, [props.openLoad.isLoad, props.openLoad.message]);

  return (
    <>
      {props.openLoad.message ? (
        alertStatus ? (
          <Alert
            variant="filled"
            severity={
              props.openLoad.statusType.toLowerCase() === 'success'
                ? 'success'
                : props.openLoad.statusType.toLowerCase() === 'error'
                ? 'error'
                : props.openLoad.statusType.toLowerCase() === 'warning'
                ? 'warning'
                : props.openLoad.statusType.toLowerCase() === 'info'
                ? 'info'
                : 'error'
            }
            sx={{
              position: 'fixed',
              left: '50%',
              transform: 'translate(-50%, 0)',
              zIndex: props.redirect ? 100000 : 1000,
            }}
          >
            {props.openLoad.message}
          </Alert>
        ) : null
      ) : null}

      <Backdrop sx={{ color: '#1F305C', zIndex: (theme) => theme.zIndex.drawer + 10000 }} open={props.openLoad.isLoad}>
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
