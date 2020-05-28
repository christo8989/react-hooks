import React, { Fragment } from "react"
import { Router } from '@reach/router';
import Dashboard from './dashboard';
import ComposeTweet from "./compose-tweet";

export default function Pages() {
  return (
    <Fragment>
      <Router primary={false} component={Fragment}>
        <Dashboard path="/" />
        <ComposeTweet path="/compose/tweet" />
      </Router>
    </Fragment>
  );
}