import { useEffect, useState } from "react";
import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import axios from "axios"

export default function WidgetSm() {
  const [newUsers,setNewUsers]=useState([])
  useEffect(()=>{
    const getNewUsers=async()=>{
      try{
        const res=await axios.get("/users?new=true",{
          headers:{
            token:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MTU0N2MwMWFkM2M0NzYyNWNkMDY4MyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY5NzY0ODg0MiwiZXhwIjoxNzI5MTg0ODQyfQ.cEewEpKHzPJrOHGK8AV38iCZr3LRBvQiVSjS0pSjx70"
          }
        })
        setNewUsers(res.data)
      }
      catch(err){
        console.log(err)
      }
    }
    getNewUsers();
  },[])
  return (
        
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {newUsers.map((user)=>(
          <>
        <li className="widgetSmListItem">
          <img
            src={user.profilePic || "https://avatars.githubusercontent.com/u/6759280?v=4"}
            alt=""
            className="widgetSmImg"
          />
          <div className="widgetSmUser">
            <span className="widgetSmUsername">{user.username}</span>
            
          </div>
          <button className="widgetSmButton">
            <Visibility className="widgetSmIcon" />
            Display
          </button>
        </li>
        </>
        ))}
      </ul>
    </div>
        
  );
}
