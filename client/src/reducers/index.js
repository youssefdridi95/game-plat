import { combineReducers } from 'redux';
import adoptPosts from './adoptPosts';
import auth from './auth';
import profile from './profile';
import itemShop from './itemShop';
import petProfile from './petProfile';
import petShopPosts from './petShopPosts';
import alert from './alert';
import admin from './adminRed';

export default combineReducers({
   adoptPosts,
   alert,
   auth,
   admin,
   profile,
   itemShop,
   petProfile,
   petShopPosts
});
