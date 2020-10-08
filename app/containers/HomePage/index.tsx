/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import LoadingIndicator from 'components/LoadingIndicator';


// import { useInjectReducer } from 'utils/injectReducer';
// import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';

import {
  makeSelectError,
  makeSelectLoading,
  makeSelectRepos,
} from 'containers/App/selectors';
import AtPrefix from './AtPrefix';
import CenteredSection from './CenteredSection';
import Form from './Form';
import Input from './Input';
import Section from './Section';
import messages from './messages';
import { loadRepos, reposLoaded } from '../App/actions';
import { changeUsername } from './actions';
import { makeSelectUsername } from './selectors';
import reducer from './reducer';
import saga from './saga';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import githubData from './saga';

import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });

const useStyles = makeStyles({
  containerList: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: '20px'
  },
  root: {
    padding: '20px',
    flex: '0 0 50%',
    ['@media (max-width:500px)']: {
      flex: '0 0 100%',
    }
  },
});

const key = 'home';

const stateSelector = createStructuredSelector({
  repos: makeSelectRepos(),
  username: makeSelectUsername(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme: Theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);




export default function HomePage(this: any) {
  const { repos, username, loading, error } = useSelector(stateSelector);
  const [count, setCount] = useState(-1);

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  const dispatch = useDispatch();

  useInjectReducer({ key: key, reducer: reducer });
  useInjectSaga({ key: key, saga: saga });

  useEffect(() => {
    dispatch(loadRepos())
  }, []);

  const reposListProps = {
    loading: loading,
    error: error,
    repos: repos,
  };

  const classes = useStyles();

  return (

    <article>
      {reposListProps.loading && <LoadingIndicator></LoadingIndicator>}
      <div className={classes.containerList}>
        {reposListProps.repos?.map((item, index) => {
          return (
            <div className={classes.root} key={index}>
              <Card>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    height="140"
                    image={item.photo}
                    title="Contemplative Reptile"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {item.title}
                    </Typography>
                    {/* <Typography variant="body2" color="textSecondary" component="p">
                      {item.description}
                    </Typography> */}
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button data-ind={index} size="small" color="primary" onClick={() => setCount(Number(index))}>
                    ver más
  </Button>
                </CardActions>
              </Card>
              <Dialog onClose={() => setCount(Number(-1))} aria-labelledby="customized-dialog-title" open={Number(index) == Number(count)}>
                <DialogTitle id="customized-dialog-title" onClose={() => setCount(Number(-1))}>
                  {item.title}
                </DialogTitle>
                <DialogContent dividers>
                  <Typography gutterBottom>
                    Detalles técnicos: {item.description}
                  </Typography>
                </DialogContent>
                <DialogActions>
                  <Button autoFocus onClick={() => setCount(Number(-1))} color="primary">
                    Cerrar
          </Button>
                </DialogActions>
              </Dialog>
            </div>
          )
        })}
      </div>
    </article>
  );
}

