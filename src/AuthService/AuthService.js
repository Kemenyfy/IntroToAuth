// src/Auth/AuthService.js

import auth0 from 'auth0-js'
import EventEmitter from 'eventemitter3'
import router from './../router'

export default class AuthService {

  authenticated = this.isAuthenticated();
  authNotifier = new EventEmitter();
  userProfile;

  constructor() {
    this.login = this.login.bind(this);
    this.setSession = this.setSession.bind(this);
    this.logout = this.logout.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.getAccessToken = this.getAccessToken.bind(this);
    this.getProfile = this.getProfile.bind(this);
  }
  
  auth0 = new auth0.WebAuth({
    domain: 'devsculture.auth0.com',
    clientID: 'mvzhSdjAjpIYWNhHqEP8UEQfOoohhZLr',
    redirectUri: 'http://localhost:8080/callback',
    responseType: 'token id_token',
    scope: 'openid profile'
  })
  
  login() {
    this.auth0.authorize()
  }

  // ...
  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult)
        router.replace('dashboard')
      } else if (err) {
        router.replace('')
        console.log(err)
        alert(`Error: ${err.error}. Check the console for further details.`)
      }
    })
  }
  
  setSession(authResult) {
    // Set the time that the Access Token will expire at
    let expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    )
    localStorage.setItem('access_token', authResult.accessToken)
    localStorage.setItem('id_token', authResult.idToken)
    localStorage.setItem('expires_at', expiresAt)
    this.authNotifier.emit('authChange', { authenticated: true })
  }
  
  logout() {
    // Clear Access Token and ID Token from local storage
    localStorage.removeItem('access_token')
    localStorage.removeItem('id_token')
    localStorage.removeItem('expires_at')
    this.userProfile = null
    this.authNotifier.emit('authChange', false)
    // navigate to the home route
    router.replace('/')
  }
  
  isAuthenticated() {
    // Check whether the current time is past the
    // Access Token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'))
    return new Date().getTime() < expiresAt
  }

  //Got from the authO React Documentation
  getAccessToken() {
   const accessToken = localStorage.getItem("access_token");
   if (!accessToken) {
     throw new Error("No Access Token found");
   }
   return accessToken;
 }

 // Got from the authO React Documentation
 getProfile(cb) {
   let accessToken = this.getAccessToken();
   this.auth0.client.userInfo(accessToken, (err, profile) => {
     if (profile) {
       this.userProfile = profile;
     }
     cb(err, profile);
   });
 }
  
}