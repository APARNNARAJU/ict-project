import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import "./Home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    axios
      .get("http://localhost:3000/feedback/get")
      .then((res) => {
        console.log("Backend response:", res.data);
        setData(res.data);
      })
      .catch((err) => console.log("Error:", err));
  }, []);

  // 🔹 DELETE handler
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this feedback?")) return;

    try {
      await axios.delete(`http://localhost:3000/feedback/delete/${id}`);
      // remove from UI
      setData((prev) => prev.filter((item) => item._id !== id));
      alert("Feedback deleted");
    } catch (err) {
      console.log(err);
      alert("Error deleting feedback");
    }
  };

  return (
    <div className="home-container">
      <div className="heading">
        <h1>FEEDBACK DASHBOARD</h1>
      </div>

      <table className="feedback-table">
        <thead>
          <tr>
            <th>Course ID</th>
            <th>Course Name</th>
            <th>Duration</th>
            <th>Rating</th>
            <th>Comments</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item, index) => (
            <tr key={item._id}>
              <td>C00{index + 1}</td>
              <td>{item.coursename}</td>
              <td>{item.duration} hrs</td>
              <td>{item.rating}</td>
              <td>{item.comments}</td>
              <td>
                <Button
  size="small"
  variant="outlined"
  onClick={() => navigate("/add", { state: { feedback: item } })}
>
  Edit
</Button>
              </td>
              <td>
                <Button
                  size="small"
                  variant="outlined"
                  color="error"
                  onClick={() => handleDelete(item._id)} // 🔹 here
                >
                  X
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
