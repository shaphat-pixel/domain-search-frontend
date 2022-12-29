
import React, {useContext, useState, useEffect} from 'react'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';

import PacmanLoader from "react-spinners/PacmanLoader";




const HomePage = () => {



    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));



    const [hoverPrice, setHoverPrice] = useState("")
    const [domainPrice, setDomainPrice] = useState("")
    const [nameCheapPrice, setNameCheapPrice] = useState("")

    const [input, setInput] = useState("")

    const [searchDone, setSearchDone] = useState(false)

    const [isLoading, setIsLoading] = useState(false)

    let Hover = async ()=> {
          setIsLoading(true)
             let response =  await fetch('http://127.0.0.1:8000/hover/', {
                 method: "POST",
                 credentials: "include",
                 headers: {
                "Content-Type": "application/json"
           },
                   
                 body:JSON.stringify({
                    "url": `https://www.hover.com/domains/results?q=${input}`
                })
             })
            
             let data = await response.json()
             setHoverPrice(data.slice(6, 11))
             console.log(data.slice(6, 11))

             //setHoverPrice(data)
            
             console.log('response:', response)

             setSearchDone(true)
             setIsLoading(false)
         }


         let NameCheap = async ()=> {
            setIsLoading(true)
               let response =  await fetch('http://127.0.0.1:8000/hover/', {
                   method: "POST",
                   credentials: "include",
                   headers: {
                  "Content-Type": "application/json"
             },
                     
                   body:JSON.stringify({
                      "url": `https://www.namecheap.com/domains/registration/results/?domain=${input}`
                  })
               })
              
               let data = await response.json()
               setNameCheapPrice(data.slice(2, 6))
               console.log(data.slice(0, 5))
  
               //setHoverPrice(data)
              
               console.log('response:', response)
               setSearchDone(true)
               setIsLoading(false)
           }



           let Domain = async ()=> {
            
               let response =  await fetch('http://127.0.0.1:8000/hover/', {
                   method: "POST",
                   credentials: "include",
                   headers: {
                  "Content-Type": "application/json"
             },
                     
                   body:JSON.stringify({
                      "url": `https://www.domain.com/registration/?flow=domainDFE&search=${input}#/domainDFE/1`
                  })
               })
              
               let data = await response.json()
               setDomainPrice(data.slice(6, 11))
               console.log(data.slice(6, 11))

               console.log('response:', response)
               setSearchDone(true)
           }

         const searchDomain = (e) => {
            e.preventDefault()
            Hover()
            NameCheap()
            //Domain()
         }


	return (

        <div>
          
        
    <header>
        <ul>
         <li><a class="links" href="#user"><button class="signbutton" type="button">Contact Shaphat</button></a></li>
          <li><a href="#images">About</a></li>
          <li><a href="#gmail">Gmail</a></li>
          </ul>  
    </header>
    <div class="logo">
      <h1>Domain Findr (.com)</h1>
    </div>
    <div>
    <form onSubmit={searchDomain}>
    <div class="bar">
      <input class="searchbar" type="text" title="Search" value = {input}  onChange={(e) => setInput(e.target.value )}/>

    </div>
    <div class="buttons">
      <input class="button" type="submit" value="Search Now"/>
      
     </div>
     </form>
     </div>

     <br/><br/>
   

     <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} columns={16}>
        <Grid xs={8}>
          <Item>
            
          <h2>Name Cheap</h2>{!nameCheapPrice && searchDone?<span>This domain is already taken</span>:<span><h2>{isLoading?<PacmanLoader color="#36d7b7" /> :null}${nameCheapPrice} per year</h2></span>}
          
          </Item>
        </Grid>
        <Grid xs={8}>
          <Item>
          <h2>Hover</h2> {!nameCheapPrice && searchDone?<span>This domain is already taken</span>:<span><h2>{isLoading?<PacmanLoader color="#36d7b7" /> :null}${hoverPrice} per year</h2></span>}
          
          </Item>
        </Grid>
      </Grid>
    </Box>
            
        </div>

        
	  

		)
}
export default HomePage