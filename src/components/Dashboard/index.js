import { Card, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import styles from "./Dashboard.module.scss";
import axios from "axios";
import { useRouter } from "next/router";
const baseUrl = "http://3bed-2405-201-4022-e94c-d86f-2661-841d-c787.ngrok.io";
const DashBoard = () => {
  const [data, setData] = useState([]);
  const router = useRouter();
  const queryParams = router.query;
  console.log(queryParams);
  const email = queryParams.email;
  // console.log(email);
  useEffect(() => {
    if (email)
      axios
        .get(baseUrl + "/backend/dashboard/?email=" + email)
        .then(({ data }) => {
          /*
          [
          {
            "sno": 1,
            "category": "Rape",
            "brief": "Saw rape near metro station",
            "extended": "Saw two men raping a 20-25 year old girl at around 12 am near dwarka mor metro station",
            "time": "3/29/2022, 6:30:02 AM",
            "location": "Dwarka Mor Metro Station",
            "station": "Dwarka, Delhi",
            "crimeperson": "Yes",
            "name_accu": "",
            "tip_score": 73
          },
          {
            "sno": 2,
            "category": "Muder",
            "brief": "Saw murder near sector-3",
            "extended": "Saw a man murdering a 20-25 year old boy at around 2 am near dwarka sector-3. The man was in his mid fourties and was wearing brown shirt",
            "time": "3/29/2022, 6:37:02 AM",
            "location": "Dwarka Sector-3",
            "station": "Dwarka, Delhi",
            "crimeperson": "Yes",
            "name_accu": "",
            "tip_score": 80
          }
        ]
        */
          console.log(data);
          setData(data);
        })
        .catch((err) => console.log(err));
  }, [email]);
  return (
    <div>
      <div className={styles.header}>All TipOffs</div>
      {data.map((data) => {
        return (
          <div className="tipCard" key={data.sno}>
            <Card variant="outlined" className="p-3">
              <h1>{data.brief_descr}</h1>
              <p>{data.extended_descr}</p>
              <h4>Location : {data.location}</h4>
              <h4>Station : {data.station}</h4>

              <p>
                <b>Trust Score : {data.tip_score}</b>
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
