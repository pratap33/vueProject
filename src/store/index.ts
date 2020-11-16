//JAYARAJU2103@GMAIL.COM

import Vue from 'vue'
import Vuex from 'vuex'
// import axios from "axios" 
import router from "../router";
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyC5cAmxHyyCOXJZRLh08PcCvovRqq5eZyM",
  authDomain: "laksmipickles.firebaseapp.com",
  databaseURL: "https://laksmipickles.firebaseio.com",
  projectId: "laksmipickles",
  storageBucket: "laksmipickles.appspot.com",
  messagingSenderId: "632277306780",
  appId: "1:632277306780:web:fcd901128a60795c038c59",
  measurementId: "G-EY26VWET14"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
const database = firebase.database();
const rootRef = database.ref('users');
const cartref = database.ref('cart');

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userinfo: {
      firstname: "",
      lastname: "",
      email: "",
      password: undefined,
      mobile: undefined,
      age: undefined,
      address: "India",
      profilepic: ""
    },
    userName: "",
    password: "",
    userPresent: false,
    accessError: "",
    alertsec: 0,
    alertmsg:"",
    cartItems: [] as any,
    total: 0,
    search: '',
    usercount: 0,
    products:
      [
        {
          productID: 1,
          name: 'Chicken',
          image: 'https://www.tulasipickles.com/image/catalog/chicken-pickle-online.jpg',
          price: 450,
          stock: 10,
          Quantity: 1
        },
        {
          productID: 2,
          name: 'Prawns',
          image: 'https://www.tulasipickles.com/image/cache/catalog/prawns-pickle-online-200x250.jpg',
          price: 550,
          stock: 10,
          Quantity: 1
        },
        {
          productID: 3,
          name: 'Fish',
          image: 'https://www.tulasipickles.com/image/catalog/fish-pickle-online.jpg',
          price: 500,
          stock: 10,
          Quantity: 1
        },
        {
          productID: 4,
          name: 'Chicken',
          image: 'https://www.tulasipickles.com/image/catalog/chicken-pickle-online.jpg',
          price: 450,
          stock: 10,
          Quantity: 1
        },
        {
          productID: 5,
          name: 'Prawns',
          image: 'https://www.tulasipickles.com/image/cache/catalog/prawns-pickle-online-200x250.jpg',
          price: 550,
          stock: 10,
          Quantity: 1
        },
        {
          productID: 6,
          name: 'Fish',
          image: 'https://www.tulasipickles.com/image/catalog/fish-pickle-online.jpg',
          price: 500,
          stock: 10,
          Quantity: 1
        },
      ]
  },
  mutations: {
    singOut(state) {
      state.userPresent = false;
      state.userName = "";
      state.password = "";
      router.push("/login");
    },
    async addToCart(state, product) {
      let present = false
      state.cartItems.forEach((element: any) => {
        if (element.productID == product.productID) {
          element.Quantity = element.Quantity + 1
          cartref.child(state.userName.split("@")[0]+product.productID).update({Quantity:element.Quantity});
          console.log("Item Quantity Increased.....123456")
          present = true
        }
      });
      if (!present) {
        state.cartItems.push(product)
        //Insert the product into cart table
        try {
          const autoID = state.userName.split("@");
          if (autoID[0] != null) {
            await new Promise((resolve, reject) => {
              resolve(cartref.child(autoID[0]+product.productID).set
                ({
                  cartID:state.userName,
                  productID: product.productID,
                  name: product.name,
                  image: product.image,
                  price: product.price,
                  Quantity: 1
                }))
            });
            console.log("added to db cart successfully ....");
          }
          else {
            throw "Error in key generation at database";
          }
        }
        catch (error) {
          window.alert("Error while adding product to cart .." + error);
        }
        console.log(state.cartItems)
        console.log("Item Added")
        console.log(product)
      }
    },
    async updateuserdetail(state,userdetail){
      await rootRef.orderByChild('email').equalTo(state.userName).once("value").then(function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          childSnapshot.ref.update({
            firstname: userdetail.firstname,
            lastname: userdetail.lastname,
            mobile: userdetail.mobile,
            address: userdetail.address,
          }).then(function () {
            console.log("profile updated in database...")
            state.userinfo.mobile=userdetail.mobile
            state.userinfo.firstname=userdetail.firstname
            state.userinfo.lastname=userdetail.lastname
            state.userinfo.address=userdetail.address
          });
          return true;
        });
      })
    },
    async validateUser(state) {
      try {
        const ee: object = await new Promise((resolve, rejected) => {
          rootRef.orderByChild("email").equalTo(state.userName).on('value', data => {
            resolve(data.val());
          });
        })
        const info = (Object as any).values(ee)
        Object.keys(info).forEach(function (key: any) {
          state.userinfo.password = info[key].password;
          state.userinfo.firstname = info[key].firstname;
          state.userinfo.lastname = info[key].lastname;
          state.userinfo.email = info[key].email;
          state.userinfo.mobile = info[key].mobile;
          state.userinfo.address = info[key].address;
          state.userinfo.profilepic = info[key].profilepic;

        });
        if (state.userinfo.password == state.password) {
          state.userPresent = true;
          const cartdata:object = await new Promise(function (resolve, reject) {
            cartref.orderByChild("cartID").equalTo(state.userName).on('value', data => {
              resolve(data.val());
            })
          });
          const cartinfo = (Object as any).values(cartdata)
            Object.keys(cartinfo).forEach(function (key: any) {
              state.cartItems.push(cartinfo[key]);
            });
          router.push('/home');
        }
        else {
          //window.alert("Invalid credentials");
          state.alertmsg="Invalid credentials";
          state.alertsec=2;
          state.userPresent = false;
        }
      }
      catch (error) {
        //window.alert("Invalid credentials");
        state.alertmsg="Invalid credentials";
          state.alertsec=2;
        state.userPresent = false;
      }
    },
    quantityChange(state, [productID, num]) {
      state.cartItems.forEach((element: any) => {
        if (element.productID == productID) {
          if (element.Quantity > 1 && num == -1) {
            element.Quantity = element.Quantity - 1
            cartref.child(state.userName.split("@")[0]+element.productID).update({Quantity:element.Quantity});
          }
          else if (element.Quantity >= 1 && num == 1) {
            element.Quantity = element.Quantity + 1
            cartref.child(state.userName.split("@")[0]+element.productID).update({Quantity:element.Quantity});
          }
          else {
            state.cartItems.splice(state.cartItems.indexOf(element), 1)
            cartref.child(state.userName.split("@")[0]+element.productID).remove();
          }
        }
      });
    },
    removeFromCart(state, data) {
      state.cartItems.forEach((element: any) => {
        if (element.productID == data.productID) {
          element.Quantity = 1
          state.cartItems.splice(state.cartItems.indexOf(data), 1);
          cartref.child(state.userName.split("@")[0]+element.productID).remove();
        }
      });
    },
    eraseUseer(state) {
      state.userPresent = false;
    },
    async validateData(state) {
      try {
        const data = new Promise(function (resolve, reject) {
          rootRef.orderByChild("email").equalTo(state.userinfo.email).on('value', data => {
            resolve(data.val());
          })
        });
        const d = await data;
        if (d != null) {
          window.alert("Email Already registered....");
        }
        else {
          try {
            const autoID = (rootRef.push().key || 'error');
            if (autoID != "error") {
              await new Promise((resolve, reject) => {
                resolve(rootRef.child(autoID).set
                  ({
                    firstname: state.userinfo.firstname,
                    lastname: state.userinfo.lastname,
                    email: state.userinfo.email,
                    age: state.userinfo.age,
                    mobile: state.userinfo.mobile,
                    password: state.userinfo.password,
                    address: state.userinfo.address,
                    profilepic: state.userinfo.profilepic,
                  }))
              });
              window.alert("Registered successfully ....");
            }
            else {
              throw "Error in key generation at database";
            }
          }
          catch (error) {
            window.alert("Error while Submitting data.." + error);
          }
        }
        router.push('/login');
      }
      catch (error) {
        console.log(error);
        window.alert(error);
      }
    },
    async uploadFile(state, picdata) {
      const today = new Date();
      const timestamp = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + '-' + today.getDate() + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();;
      const uploadTask = firebase.storage().ref('userprofileImages/' + state.userinfo.email + timestamp).put(picdata);
      uploadTask.on('state_changed', function (snapshot) {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused');
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running');
            break;
        }
      }, function (error) {
        // Handle unsuccessful uploads
        console.log(error +"Upload Unsuccessful..!!")
      }, function () {
        uploadTask.snapshot.ref.getDownloadURL().then(async function (downloadURL) {
          console.log('File available at', downloadURL);
          console.log(state.userinfo.profilepic);
          if (downloadURL && state.userinfo.profilepic != "") {
              const desertRef = firebase.storage().refFromURL(state.userinfo.profilepic);
              // Delete the file
              desertRef.delete().then(function () {
                console.log("Old File deleted successfully");
              }).catch(function (error) {
                console.log(error);
                window.alert("Uh-oh, an error occurred!");
              });
          }
            try {
              await rootRef.orderByChild('email').equalTo(state.userName).once("value").then(function (snapshot) {
                snapshot.forEach(function (childSnapshot) {
                  childSnapshot.ref.update({
                    "profilepic": downloadURL
                  }).then(function () {
                    window.alert("Profile pic updated ..!!");
                  });
                  return true;
                });
              })
              state.userinfo.profilepic = downloadURL;
              
            }
            catch (error) {
              window.alert("Error while updation of profile pic");
            }
        });
      });
    },
  },
  actions: {
    validateUser(context) {
      context.commit('validateUser')
    },
    singOut(context) {
      context.commit('singOut')
    },
    addToCart(context, product) {
      context.commit('addToCart', product)
    },
    quantityChange(context, [productID, num]) {
      context.commit('quantityChange', [productID, num])
    },
    removeFromCart(context, data) {
      context.commit('removeFromCart', data)
    },
    updateuserdetail(context,data){
      context.commit('updateuserdetail',data)
    },
    validateData(context) {
      context.commit('validateData')
    },
    uploadFile(context, picdata) {
      context.commit('uploadFile', picdata)
    },
  },
  modules: {
  },
  getters: {
    cartvalue(state) {
      state.total = 0
      state.cartItems.forEach((element: any) => {
        state.total = element.Quantity * element.price + state.total
      });
      return state.total
    },
    filterProducts(state) {
      return state.products.filter((product) => {
        return product.name.includes(state.search.charAt(0).toUpperCase())
      })
    },
    loaduserdetail(state){
      return state.userinfo
    }
  }
})

export default store
