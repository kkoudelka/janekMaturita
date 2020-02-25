import Head from 'next/head';
import * as React from 'react';
import { IJankableResult, IJankableGet } from '../src/models/interfaces';
import Button from '@material-ui/core/Button';
import { Typography, TextField, Grid, Divider } from '@material-ui/core';
import { getData } from '../src/models/dataHelper';
import UkolDva from '../components/ukol2';
import UkolTri from '../components/ukol3';
import UkolCtyri from '../components/ukol4';

const Home: React.FunctionComponent<{}> = () => {



  return <>
    <Grid container direction="column">
      <Grid item>
        <UkolDva />
      </Grid>
      <Divider style={{ margin: "1rem" }} />
      <Grid item>
        <UkolTri />
      </Grid>
      <Divider style={{ margin: "1rem" }} />
      <Grid item>
        <UkolCtyri />
      </Grid>
    </Grid>
  </>;
};

export default Home;
