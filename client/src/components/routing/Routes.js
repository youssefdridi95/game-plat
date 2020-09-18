import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Register from '../auth/Register';
import Login from '../auth/Login';
import Alert from '../layout/Alert';

import AdminAccessControl from '../dashboard/AdminAccessControl';

import Home from '../homepage/Home';
import PetShop from "../PetShop/Posts";
import Post from "../post/post";
import Posts from '../adoption/posts'
import AdoptPost from '../adoption/AdoptPost'
import Itemshop from '../itemshop/Itemshop';
import ItemPost from '../itemshop/Post'
// import CreateProfile from '../profile-forms/CreateProfile';
// import EditProfile from '../profile-forms/EditProfile';
// import AddExperience from '../profile-forms/AddExperience';
// import AddEducation from '../profile-forms/AddEducation';
// import Profiles from '../profiles/Profiles';
import Profile from '../profile/Profile';
// import Posts from '../posts/Posts';
// import Post from '../post/Post';
// import NotFound from '../layout/NotFound';
// import PrivateRoute from '../routing/PrivateRoute';
import PetshopPost from '../PetShop/petshopPost/post'

const Routes = () => {
  return (
    <section className='container'>

      <Alert />
      <Switch>
        <Route exact path='/admin' component={AdminAccessControl} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/posts' component={Posts} />
        <Route exact path='/adoption' component={AdoptPost} />
        <Route exact path='/profile' component={Profile} />
        <Route exact path='/posts/:id' component={Post} />
        <Route exact path='/itemshop' component={Itemshop} />
        <Route exact path='/itemshop/:id' component={ItemPost} />
        <Route exact path='/' component={Home} />
        <Route exact path='/petShop' component={PetShop} />
        <Route exact path='/adoptposts/:id' component={Post} />
        <Route exact path='/petShopPost/:id' component={PetshopPost} />

        {/* <Route exact path='/profiles' component={Profiles} />
      <Switch>
      <Route exact path='/adoption' component={AdoptPost} />
        {/*<PrivateRoute exact path='/dashboard' component={Dashboard} />
        <PrivateRoute exact path='/create-profile' component={CreateProfile} />
        <PrivateRoute exact path='/edit-profile' component={EditProfile} />
        <PrivateRoute exact path='/add-experience' component={AddExperience} />
        <PrivateRoute exact path='/add-education' component={AddEducation} />
        <PrivateRoute exact path='/posts' component={Posts} />
        <PrivateRoute exact path='/posts/:id' component={Post} />
        <Route component={NotFound} /> */}

      </Switch>
    </section>
  );
};

export default Routes;
