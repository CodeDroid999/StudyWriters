import React, { useEffect, useState } from 'react'
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Slider from './components/Slider/Slider';
import Work from './components/Work/Work';
import About from './components/About/About';
import Founders from './components/Founders/Founders';
import Footer from './components/Footer/Footer';
import Login from './components/Login/Login';
import SignIn from './components/SignIn/SignIn';
import SellDocs from './components/SellDocs/SellDocs';
import Notes from './components/Notes/Notes';
import HomePage from './HomePage/HomePage';
import PricingPlanForNotes from './components/PricingPlanForNotes/PricingPlanForNotes';



import {Route,Switch,Routes} from 'react-router-dom'
import ErrorPage from './components/ErrorPage/ErrorPage';
import NotesFloatingDiv from './components/NotesFloatingDiv/NotesFloatingDiv';


//notes folder uploading
import { FileUploadScreen } from './screens/FileUploadScreen';

import {getSingleFiles,getMultipleFiles} from './data/api'

const App =()=>{
  
return (
<div className='App'>
<Routes>

<Route path='/' element={<HomePage/>}></Route>
<Route path='/home' element={<HomePage/>}></Route>

<Route path='/login' element={<Login/>}></Route>
<Route path='/signin' element={<SignIn/>}></Route>
<Route path='/SellDocs' element={<SellDocs/>}></Route>
<Route path='/notes' element={<Notes/>}></Route>
<Route path='/Pricing' element={<PricingPlanForNotes/>}></Route>


</Routes>

{/* 
<PricingPlanForNotes/>
 */}





{/* 


<Notes/> */}




{/* <ErrorPage/> */}
   {/* <Navbar/>
<Header/>
<Slider/>
<Work/>
<About/>
<Founders/>
<Footer/> */}
{/* <HomePage/> */}

{/* <Login/> */}
 {/* <SignIn/>  */}
 </div>
)
}
export default App;