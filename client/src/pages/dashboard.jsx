import React, { Fragment } from "react"
import Button from "../components/button";
import { Link } from "@reach/router";

export default function Dashboard() {
  return (
    <Fragment>
      <Button as={Link} to="/compose/tweet">
        Tweet
      </Button>
      <div>Dashboard</div>
    </Fragment>
  );
}