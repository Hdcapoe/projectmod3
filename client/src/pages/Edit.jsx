import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";


const Edit = () => {
    const navigate = useNavigate();

    const params = useParams()
    const {id} = params
    console.log(id)
    
    let [ wholeMails, setWholeMails ] = useState([])
    let [ name, setName ] = useState ("") 
    let [ address, setAddress ] = useState ("") 
    let [ zip, setZip ] = useState ("") 

  useEffect(() => {

     const getData = async () => {
       try {
         // OPTION 1: use fetch for "index" route
         // const response = await fetch('/api/regs/:id')
         // const data = await response.json()
 
         // OPTION 2: use axios
         const response = await axios.get('/api/mails/' + id)
         console.log(response)
         setWholeMails(response.data)
         setName(response.data.name)
         setAddress(response.data.address)
         setZip(response.data.zip)
        

       } catch(err) {
         console.error(err)
       }
     }
 
     getData()
 
   }, [])
 
async function updateMail(e) {
    e.preventDefault()

   
    let wholeMail = {

        name: name,
        address: address, 
        zip: zip,
      
      };

     

 try {

    // OPTION 1: use fetch for "delete" route

   // await fetch(`/api/todos/${id}`, {
   //   method: 'DELETE'
   // })

    // OPTION 2: use axios

    console.log("updating",wholeMail.name)
    await axios.put(`/api/mails/${id}`, wholeMail)
    navigate(`/pages/Show/${id}`)
 


 } catch(err) {
   console.log(err)
 }
 
}
function handleChangeN (event) {
    setName(event.target.value)
  }
  function handleChangeA (event) {
    setAddress(event.target.value)
  }
  function handleChangeZ (event) {
    setZip(event.target.value)
  }
  
    
  return (

    <div>
      
        
        
      <h1> Edit Mailing List Information</h1>
          <br></br>
          <br></br>
          <form>
              <div>
            <h3>Mailing List Information</h3>
              
              <br></br>
                Name : 
            <input value={name} onChange={handleChangeN}/>
              <br></br>
              <br></br>
                Address :
              <input value={address} onChange={handleChangeA}/>
              <br></br>
              <br></br>
                Zip :
                <input value={zip} onChange={handleChangeZ} />
              </div>
          </form>
          <br></br>
          <button onClick={updateMail}>Submit</button>
          
        
        </div>
  )
}


export default Edit