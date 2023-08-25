import { Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import "./VerifyEmail.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const VerifyUser = () => {
  const [code, setCode] = useState<string>("");
  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (code) {
      try {
        console.log(location);
        const email = location.state.email;
        const response = await axios({
          method: "post",
          url: "http://byrdbox-env.eba-4kxk4yka.eu-north-1.elasticbeanstalk.com/auth/verify-user",
          data: {
            email,
            code,
          },
        });
        if (response.status === 200 && response.statusText === "OK") {
          alert("you are registered successfully.");
          navigate("/login");
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="code-verify-form">
        <Typography variant="h5">Verify Your email</Typography>
        <Typography variant="subtitle2">Please enter the code here.</Typography>
        <TextField
          type="string"
          // value={code}
          label="Enter the code"
          variant="outlined"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setCode(e.target.value)
          }
        />
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default VerifyUser;
