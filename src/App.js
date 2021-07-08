import React,{useEffect, useState} from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
}from 'react-router-dom';

import Container from '@material-ui/core/Container'
import Navbar from './components/Navbar/Navbar'
import Auth from './components/Auth/Auth'
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import Meals from './components/Meal/Meals';
import LayoutPage from './components/Page/LayoutPage';
import CreateMeal from './components/Page/CreateMeal';
import AdminProfile from './components/admin/AdminProfile';
import HomeAdmin from './components/admin/HomeAdmin'
import AdminUserView from './components/admin/AdminUserView';


function App() {
  const user = JSON.parse(localStorage.getItem('profile'));
  const [currentId,setCurrentId] = useState(0);
  
  return (
    <Router>
      <Container maxWidth="xl">
        <Navbar />
        <Switch>
          <Route path="/" exact component={()=>(!user ? <Home/>:<Redirect to="/meals"/>)} />
          {/* <Route path="/" exact component ={Home} /> */}
          <Route path="/profile" exact component={AdminProfile} />
          <Route path="/userMealAdmin" exact component={AdminUserView} />
          <Route path="/admin/search" exact component={HomeAdmin} />
          <Route path="/admin" exact component={HomeAdmin} />
          <Route path="/meals" exact component={()=>!user?<Auth/>:<LayoutPage currentId={currentId} setCurrentId={setCurrentId}/>}/>
          <Route path='/create' exact component={()=>!user?<Auth/>:<CreateMeal currentId={currentId} setCurrentId={setCurrentId}/>}/>
          <Route path="/auth" exact component={()=>(!user? <Auth />: <Redirect to="/meals" />)} />
        </Switch>
        <Footer/>
      </Container>
    </Router>
  );
}

export default App;
