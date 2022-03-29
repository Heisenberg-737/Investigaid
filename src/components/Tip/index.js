import { Divider, Select, TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import React, { useState } from "react";
import { useWeb3 } from "@3rdweb/hooks";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import axios from "axios";
import { Label } from "@mui/icons-material";

const Tip = () => {
  const [crimeCategory, setCrimeCategory] = useState("Human Traficking");
  const [location, setLocation] = useState("Rajouri Garden");
  const [nearestPoliceStation, setNearestPoliceStation] = useState(
    "Rajouri Garden Station"
  );
  const [briefDescription, setBriefDescription] = useState("");
  const [detailedDescription, setDetailedDescription] = useState("");
  const [suspectName, setSuspectName] = useState("");
  const [majorHint, setMajorHint] = useState("");
  const [tipType, setTipType] = useState("Have Seen Crime Being Committed");
  const { connectWallet, address, error } = useWeb3();
  const baseURL =
    "http://3bed-2405-201-4022-e94c-d86f-2661-841d-c787.ngrok.io/";
  const submitHandler = async () => {
    try {
      const obj = {
        address: address || "",
        category: crimeCategory || "",
        brief_descr: briefDescription || "",
        extended_descr: detailedDescription || "",
        time: new Date().toLocaleString() || "",
        location: location || "",
        station: nearestPoliceStation || "",
        crimeperson: tipType || "",
        name_accu: suspectName || "",
        tip_score: 75,
      };
      const res = await axios.post(
        "https://3bed-2405-201-4022-e94c-d86f-2661-841d-c787.ngrok.io/backend/tip/",
        obj
      );
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return address == null ? (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-slate-100">
      {JSON.stringify(error)}
      {address ? (
        <p className="px-2 py-1 rounded-full bg-gray-200 hover:bg-gray-300 font-mono font-medium cursor-pointer duration-100">
          {address}
        </p>
      ) : (
        !error && (
          <Button variant="contained" onClick={() => connectWallet("injected")}>
            Connect Wallet
          </Button>
        )
      )}
    </div>
  ) : (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submitHandler();
      }}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        padding: "4px 24px",
      }}
    >
      <h1 style={{ margin: "8px auto" }}>Tip off</h1>
      <TextField
        label="Brief Description"
        value={briefDescription}
        onChange={(e) => {
          setBriefDescription(e.target.value);
        }}
        required
      />
      <TextField
        multiline
        label="Detailed Description"
        value={detailedDescription}
        onChange={(e) => {
          setDetailedDescription(e.target.value);
        }}
        required
      />
      <TextField
        label="Suspected Person Name"
        value={suspectName}
        onChange={(e) => {
          setSuspectName(e.target.value);
        }}
      />
      <TextField
        label="Major Hint"
        value={majorHint}
        onChange={(e) => {
          setMajorHint(e.target.value);
        }}
      />
      <br />
      <Divider />
      <br />
      <InputLabel id="crimeCategory">Type of Crime</InputLabel>
      <Select
        labelId="crimeCategory"
        id="crimeCategory"
        value={crimeCategory}
        label="Crime Category"
        onChange={(e) => {
          setCrimeCategory(e.target.value);
        }}
        required
      >
        <MenuItem value="Human Traficking">Human Traficking</MenuItem>
        <MenuItem value="Smuggling">Smuggling</MenuItem>
        <MenuItem value="Kidnapping">Kidnapping</MenuItem>
        <MenuItem value="Burglary">Burglary</MenuItem>
        <MenuItem value="Terrorism">Terrorism</MenuItem>
        <MenuItem value="Murder">Murder</MenuItem>
      </Select>
      <TextField
        label="Exact Location"
        value={location}
        onChange={(e) => {
          setLocation(e.target.value);
        }}
      />
      {/* <Select
        labelId="location"
        id="location"
        value={location}
        label="Location"
        onChange={(e) => {
          setLocation(e.target.value);
        }}
        required
      >
        <MenuItem value="Rajouri Garden">Rajouri Garden</MenuItem>
        <MenuItem value="Dwarka Mor">Dwarka Mor</MenuItem>
        <MenuItem value="Uttam Nagar">Uttam Nagar</MenuItem>
        <MenuItem value="Janakpuri West">Janakpuri West</MenuItem>
        <MenuItem value="Subhas Nagar">Subhas Nagar</MenuItem>
        <MenuItem value="Karol Bagh">Karol Bagh</MenuItem>
      </Select> */}
      <br />
      <InputLabel id="nearestLocation">Nearest Police Station</InputLabel>
      <Select
        labelId="nearestLocation"
        id="nearestLocation"
        value={nearestPoliceStation}
        label="nearest police station"
        onChange={(e) => {
          setNearestPoliceStation(e.target.value);
        }}
        required
      >
        <MenuItem value="Rajouri Garden">
          Rajouri Garden Police Station
        </MenuItem>
        <MenuItem value="Dwarka Mor">Dwarka Mor Police Station</MenuItem>
        <MenuItem value="Uttam Nagar">Uttam Nagar Police Station</MenuItem>
        <MenuItem value="Janakpuri West">
          Janakpuri West Police Station
        </MenuItem>
        <MenuItem value="Subhas Nagar">Subhas Nagar Police Station</MenuItem>
        <MenuItem value="Karol Bagh">Karol Bagh Police Station</MenuItem>
      </Select>
      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">Type of Tip</FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue={tipType}
          name="radio-buttons-group"
          onChange={(e) => {
            setTipType(e.target.value);
          }}
        >
          <FormControlLabel
            value="Have Seen Crime Being Committed "
            control={<Radio />}
            label="Have Seen Crime Being Committed"
          />
          <FormControlLabel
            value="Know that crime is being planned"
            control={<Radio />}
            label="Know that crime is being planned"
          />
          <FormControlLabel value="other" control={<Radio />} label="Other" />
        </RadioGroup>
      </FormControl>
      <Button
        style={{ margin: "auto", width: "200px" }}
        type="submit"
        variant="contained"
      >
        Submit
      </Button>
    </form>
  );
};

export default Tip;
