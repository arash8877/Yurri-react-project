import React, { useState } from "react";
import "./Signup.css"; //???
import { Typography, TextField, Button } from "@mui/material";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignUpPage() {
  const [name, setName] = useState<string>("");
  const [familyName, setFamilyName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (email && password) {
      try {
        const response = await axios({
          method: "post",
          url: "http://byrdbox-env.eba-4kxk4yka.eu-north-1.elasticbeanstalk.com/auth/signup",
          data: {
            name,
            familyName,
            phoneNumber,
            email,
            password,
          },
        });
        if(response.status === 200 && response.statusText === 'OK') {
          console.log(response);
          navigate('/login');
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="layout">
      <form onSubmit={handleSubmit} className="form">
        <Typography variant="h5">Sign-up Form</Typography>
        <TextField
          type="text"
          value={name}
          label="Name"
          variant="outlined"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
        />
        <TextField
          type="text"
          value={familyName}
          label="family name"
          variant="outlined"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFamilyName(e.target.value)
          }
        />
        <TextField
          type="text"
          value={phoneNumber}
          label="phone number"
          variant="outlined"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPhoneNumber(e.target.value)
          }
        />
        <TextField
          type="email"
          value={email}
          label="Email"
          variant="outlined"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
        />
        <TextField
          type="password"
          value={password}
          label="Password"
          variant="outlined"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
        />
        <Button type="submit" variant="contained">
          Sign up
        </Button>
      </form>
      <div className="link">
        <Link to={"/login"}> Navigate to Login </Link>
      </div>
    </div>
  );
}

export default SignUpPage;
