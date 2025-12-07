import React, { useState, useEffect } from 'react';
import axios from "axios";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Rating from '@mui/material/Rating';
import { useNavigate, useLocation } from 'react-router-dom';

const Addfeedback = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const editData = location.state?.feedback;   

  const [feedback, setFeedback] = useState({
    coursename: "",
    duration: "",
    rating: 0,
    comments: ""
  });

  useEffect(() => {
    if (editData) {
      setFeedback({
        coursename: editData.coursename,
        duration: editData.duration,
        rating: editData.rating,
        comments: editData.comments,
      });
    }
  }, [editData]);

  const handleSubmit = async () => {
    try {
      if (editData) {
        await axios.put(`http://localhost:3000/feedback/update/${editData._id}`, feedback);
        alert("Feedback updated!");
      } else {
        await axios.post("http://localhost:3000/feedback/add", feedback);
        alert("Feedback submitted!");
      }

      navigate("/");
    } catch (err) {
      alert("Error submitting form");
    }
  };

  return (
    <center>
      <Card style={{ width: "700px", marginTop: "80px" }}>
        
        <Typography variant="h5">
          {editData ? "EDIT FEEDBACK" : "ADD FEEDBACK"}
        </Typography>

        <Card style={{ width: "90%", background: "#d8edf3", marginTop: 20 }}>
          <CardContent>

            <div style={{ display: 'flex', gap: 10 }}>
              <Typography>Course name</Typography>
              <TextField
                label="Enter course"
                size="small"
                value={feedback.coursename}
                onChange={(e) => setFeedback({ ...feedback, coursename: e.target.value })}
              />
            </div>

            <div style={{ display: 'flex', gap: 10 }}>
              <Typography>Course Duration</Typography>
              <TextField
                label="Enter duration"
                size="small"
                value={feedback.duration}
                onChange={(e) => setFeedback({ ...feedback, duration: e.target.value })}
              />
            </div>

            <div style={{ display: 'flex', gap: 10 }}>
              <Typography>Rating</Typography>
              <Rating
                precision={0.5}
                value={feedback.rating}
                onChange={(e, value) => setFeedback({ ...feedback, rating: value })}
              />
            </div>

            <div style={{ display: 'flex', gap: 10 }}>
              <Typography>Comments</Typography>
              <TextField
                label="Write comments"
                size="small"
                value={feedback.comments}
                onChange={(e) => setFeedback({ ...feedback, comments: e.target.value })}
              />
            </div>

          </CardContent>
        </Card>

        <CardActions>
          <Button variant="contained" onClick={handleSubmit}>
            {editData ? "Update" : "Submit"}
          </Button>
        </CardActions>
      </Card>
    </center>
  );
};

export default Addfeedback;
