import React, { useState } from "react";
import "./Signup.css"; //???
import { Typography, TextField, Button } from "@mui/material";
import { Link } from "react-router-dom";

function SignUpPage() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confPassword, setConfPassword] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password && password === confPassword) {
      try {

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
        <TextField
          type="password"
          value={confPassword}
          label="Confirm Password"
          variant="outlined"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setConfPassword(e.target.value)
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
