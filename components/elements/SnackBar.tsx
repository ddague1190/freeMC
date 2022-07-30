import * as React from 'react';
import { Theme, styled } from '@mui/material/styles';
import MuiSnackbar, { SnackbarProps } from '@mui/material/Snackbar';
import { snackbarContentClasses } from '@mui/material/SnackbarContent';
import Slide from '@mui/material/Slide';
import CloseIcon from '@mui/icons-material/Close';
import InfoIcon from '@mui/icons-material/Info';
import IconButton from '@mui/material/IconButton';
import { TransitionProps } from '@mui/material/transitions/transition';
import { useDispatch, useSelector } from "react-redux";
import { hideNotification } from '../../store/notification';

const styles = ({ theme }: { theme: Theme }) =>
  ({
    [`& .${snackbarContentClasses.root}`]: {
      backgroundColor: theme.palette.secondary.light,
      color: theme.palette.text.primary,
      flexWrap: 'inherit',
      [theme.breakpoints.up('md')]: {
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 4,
        borderBottomLeftRadius: 4,
      },
    },
    [`& .${snackbarContentClasses.message}`]: {
      fontSize: 16,
      display: 'flex',
      alignItems: 'center',
    },
    [`& .${snackbarContentClasses.action}`]: {
      paddingLeft: theme.spacing(2),
    },
    '& .MuiSnackbarContent-info': {
      flexShrink: 0,
      marginRight: theme.spacing(2),
    },
    '& .MuiSnackbarContent-close': {
      padding: theme.spacing(1),
    },
  } as const);

function Transition(
  props: TransitionProps & { children: React.ReactElement<any, any> },
) {
  return <Slide {...props} direction="down" />;
}

interface ExtraSnackbarProps {
  closeFunc?: () => void;
}

function Snackbar(props: SnackbarProps & ExtraSnackbarProps) {
  const dispatch = useDispatch();
  
  const { message, ...other } = props;
  const closeFunc = () => {

    dispatch(hideNotification())
  };
  const classes = {
    info: 'MuiSnackbarContent-info',
    close: 'MuiSnackbarContent-close',
  };


  return (
    <MuiSnackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      autoHideDuration={3000}
      TransitionComponent={Transition}
      message={
        <React.Fragment>
          <InfoIcon className={classes.info} />
          <span>{message}</span>
        </React.Fragment>
      }
      action={[
        <IconButton
          key="close"
          aria-label="close"
          color="inherit"
          className={classes.close}
          onClick={() => closeFunc && closeFunc()}
        >
          <CloseIcon />
        </IconButton>,
      ]}
      {...other}
    />
  );
}

export default styled(Snackbar)(styles);
