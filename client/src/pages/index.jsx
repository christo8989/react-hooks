import React, { Fragment } from "react"
import { Router } from '@reach/router';
import Profile from './profile';
import Dashboard from './dashboard';

export default function Pages() {
  return (
    <Fragment>
      <PageContainer>
        <Router primary={false} component={Fragment}>
          <Dashboard path="/" />
        </Router>
      </PageContainer>
    </Fragment>
  );
}