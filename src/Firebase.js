import * as Firebase from 'firebase';

const config = {
    apiKey: "AIzaSyB5U8MkEOKC2phPkHn6hi-HOiqa0gblGgA",
    authDomain: "clone-netflix-729cc.firebaseapp.com",
    databaseURL: "https://clone-netflix-729cc.firebaseio.com",
    projectId: "clone-netflix-729cc",
    storageBucket: "clone-netflix-729cc.appspot.com",
    messagingSenderId: "297492473830"
};

export default Firebase.initializeApp(config);