import React, { createContext, useState } from 'react'

const AuthContext = createContext({
    firstName:'User',
    lastName:'',
    email: '',
    userId:'Nothing Yet Determined',
    addUserId:(uid) =>{},
    addFirstName:(firstName) =>{},
    addLastName:(lastName) =>{},
    addEmail:(email) =>{}

});

export const AuthContextProvider = (props) => {

  const [validateUser, setValidateUser] = useState(false);
  const [obtainedFirstName, setobtainedFirstName] = useState('');
  const [obtainedLastName, setobtainedLastName] = useState('');
  const [obtainedEmail, setobtainedEmail] = useState('');
  const [obtainedUid, setobtainedUid] = useState('Nothing yet Determined');
  
  const validUserHandler = (validText)=>{
    setValidateUser(validText)
  }

  const obtainedFirstNameHandler = (firstName) => {    
    setobtainedFirstName(firstName);
  } 
  
  const obtainedLastNameHandler = (lastName) => {    
    setobtainedLastName(lastName);
  } 
  
  const setEmailHandler = (email) => {    
    setobtainedEmail(email);
  } 
  
  const setUserId = (uid) => {    
    setobtainedUid(uid);
  } 


  const authCtxValue = {
    firstName:obtainedFirstName,
    lastName:obtainedLastName,
    email: obtainedEmail,
    userId:obtainedUid,
    addUserId:setUserId,
    addFirstName:obtainedFirstNameHandler,
    addLastName:obtainedLastNameHandler,
    addEmail:setEmailHandler,
    validUser: validateUser,
    addValidUser: validUserHandler,
  }
  


  return (
    <AuthContext.Provider value={authCtxValue}>{props.children}</AuthContext.Provider>
  )
}

export default AuthContext;
