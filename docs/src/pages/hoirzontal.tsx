import Layout from "@theme/Layout";
import React from "react";
import { Crono } from "react-crono";
import data from "../data";

function Horizontal() {
  return (
    <Layout>
      <Crono items={data} />
    </Layout>
  );
}

export default Horizontal;
