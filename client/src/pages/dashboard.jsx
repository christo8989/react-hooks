import React, { Fragment } from "react"

import { FixedTweetButton } from "../components"
import { Tweets } from "../containers"

export default function Dashboard() {
  return (
    <Fragment>
      <Tweets />
      <FixedTweetButton />
    </Fragment>
  );
}