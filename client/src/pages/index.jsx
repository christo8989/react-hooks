import React, { Fragment } from "react"
import { Router } from '@reach/router';
import styled from 'styled-components'

import Dashboard from './dashboard';
import ComposeTweet from "./compose-tweet";
import { LogoutButton } from "../containers";
import EditTweet from "./edit-tweet";

const FixedLogoutButton = styled(LogoutButton)`
  position: fixed;
  top: 0.5rem;
  right: 0.5rem;
`

export default function Pages() {
  return (
    <Fragment>
      <FixedLogoutButton />
      <Router primary={false} component={Fragment}>
        <Dashboard path="/" />
        <ComposeTweet path="/compose/tweet" />
        <EditTweet path="/tweet/:tweetId/edit" />
      </Router>
    </Fragment>
  );
}