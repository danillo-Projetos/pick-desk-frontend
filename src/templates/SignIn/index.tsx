import React, { useContext, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { signIn, useSession } from 'next-auth/client';
import { useRouter } from 'next/dist/client/router';
import dynamic from 'next/dynamic';
import classes from './SignIn.module.scss';
import { AuthContext } from '../../contexts/AuthContext';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="#">
        pick.room
      </Link>
      {' '}
      {new Date().getFullYear()}
      .
    </Typography>
  );
}

const ButtonWithNoSSR = dynamic(
  () => import('../../components/ButtonMicrosoftLogin'),
  { ssr: false },
);

export default function SignInTemplate() {
  const { signIn: signInContext } = useContext(AuthContext);
  const [session] = useSession();
  const router = useRouter();

  const signInMicrosoft = () => {
    // authenticationContext.login('loginPopup', returnedAccountInfo);
  };

  return (
    <Grid container className={classes.container}>
      <Grid item xs={false} sm={6} md={8} className={classes.image} />
      <Grid
        item
        xs={12}
        sm={6}
        md={4}
        component={Paper}
        className={classes.containerForm}
      >
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography align="center" component="h1" variant="h5">
            SignIn
          </Typography>

          <ButtonWithNoSSR
            className={`${classes.sign} ${classes.signin}`}
            label="Entrar com Microsoft"
          />

          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={`${classes.sign} ${classes.signin}`}
            onClick={() => signIn('google', { callbackUrl: 'http://localhost:3000/dashboard' })}
          >
            Entrar com Google
          </Button>
          <Box mt={5}>
            <Copyright />
          </Box>
        </div>
      </Grid>
    </Grid>
  );
}
