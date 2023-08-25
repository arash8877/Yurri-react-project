import React, {useEffect} from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const ProjectsPage = () => {
  const location = useLocation();
  const idToken = location.state.idToken;
  

  const getData = async () => {
    try {
      const response = await axios ({
        method: 'get',
        headers: {
          Authorization: `Bearer ${idToken}`
        },
        url: 'http://byrdbox-env.eba-4kxk4yka.eu-north-1.elasticbeanstalk.com/projects/get'
      })
      console.log(response)
    } catch (err) {
      console.error("An error occurred:", err)
    }
  }

 useEffect(() => {
  getData()
 }, [])
 


  return (
    <div>
      This is a Projects page
    </div>
  );
}

export default ProjectsPage;
