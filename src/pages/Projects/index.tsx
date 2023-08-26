import React, { useEffect, useState } from "react";
import "./Projects.css";
import axios from "axios";
import { useLocation, Link } from "react-router-dom";
import { Card, Typography, CardContent } from "@mui/material";
import AddProjectModal from "../addProjectModal";

const ProjectsPage = () => {
  const location = useLocation();
  const idToken = location.state.idToken;
  const accessToken = location.state.accessToken;
  const [projectsList, setProjectsList] = useState<[]>([]);

  type ProjectType = {
    title: string;
    description: string;
  };

  const getData = async () => {
    try {
      const response = await axios({
        method: "get",
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
        url: "http://byrdbox-env.eba-4kxk4yka.eu-north-1.elasticbeanstalk.com/projects/get",
      });
      console.log(response);
      setProjectsList(response.data);
    } catch (err) {
      console.error("An error occurred:", err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="layout">
      <Typography variant="h5">List of the Projects</Typography>
      <div className="cards">
        {projectsList.map((project: ProjectType) => {
          return (
            <Card sx={{ width: 275 }} key={project.title} className="card">
              <CardContent className="cardContent">
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  {project.title}
                </Typography>
                <Typography variant="body2">
                  {project.description}
                  <br />
                  {'"a benevolent smile"'}
                </Typography>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <AddProjectModal idToken={idToken} getData={getData}/>
    </div>
  );
};

export default ProjectsPage;
