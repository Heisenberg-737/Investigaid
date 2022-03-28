import { Card, Button } from "@mui/material";
import React from "react";
import styles from "./Dashboard.module.scss";

const DashBoard = () => {
  const data = [
    { briefDesc: "breif", longDesc: "longDesc", location: "location", TrustScore: 80, id: "123" },
    { briefDesc: "breif", longDesc: "longDesc", location: "location", TrustScore: 80, id: "124" },
    { briefDesc: "breif", longDesc: "longDesc", location: "location", TrustScore: 80, id: "125" },
    { briefDesc: "breif", longDesc: "longDesc", location: "location", TrustScore: 80, id: "126" },
    { briefDesc: "breif", longDesc: "longDesc", location: "location", TrustScore: 80, id: "127" },
  ];
  return (
    <div>
      <div className={styles.header}>All TipOffs</div>
      {data.map((data) => {
        return (
          <div className="tipCard" key={data.id}>
            <Card variant="outlined" className="p-3">
              <h1>{data.briefDesc}</h1>
              <p>{data.longDesc}</p>
              <h4>Location : {data.location}</h4>
              <p>
                <b>Trust Score : {data.TrustScore}</b>
              </p>
              <Button variant="text">View Details</Button>
            </Card>
          </div>
        );
      })}
    </div>
  );
};

export default DashBoard;
