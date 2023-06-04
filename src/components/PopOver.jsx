import React, { useEffect, useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  Button,
  Text,
  Box,
} from "@chakra-ui/react";
import { FiBell } from "react-icons/fi";
import { ref, onValue, get ,remove} from "firebase/database";
import { database } from "../config/firebase";


export const PopOver = (prop) => {
  const {userid} = prop
  const [notifications,setNotifications] = useState([])
  const [userNotification,setUsernotification] = useState([])

  const getNotificationData = () => {
  const Notiref = ref(database, "studentsNotification/");
  onValue(Notiref, (snapshot) => {
    const data = snapshot.val();
    const newNotiLeave = Object.keys(data).map((key) => ({
      id: key,
      ...data[key],
    }));
    setNotifications(newNotiLeave);
  });
};

const getCurrentuserNotifications = () => {
  let arr = []
  notifications.map((ele)=>{
       if(ele.id===userid){
         arr.push(ele)
       }
      })
      setUsernotification(arr)
  }
  useEffect(()=>{
    getNotificationData()
    getCurrentuserNotifications()
  },[notifications])

  const removeItem = (index) => {
      userNotification.filter((ele)=>{
         return ele !== index
      })
  }
  return (
    <>
      <Popover>
        <PopoverTrigger>
          <Button variant={"ghost"}>
            <FiBell cursor={"pointer"} fontSize="25px" />
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>Notification</PopoverHeader>
          <PopoverBody>
             <Box display={"grid"}>
              {
                userNotification.map((ele,index)=>{
                  return (
                    <Box display={"flex"} justifyContent="space-between" borderBottom="1px solid black" padding={"10px"}>
                       <Text color={"blue"}  fontSize={"15px"} >{ele.notification}</Text>
                    </Box>
                  )
                })
              }
             </Box>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </>
  );
};
