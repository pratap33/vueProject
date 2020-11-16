<template>
 <div class="profile" v-if="loaduserinfo" > 
  <div class="profile-info">
    <h4 class="title" style="float:left"><i class="fa fa-heart" aria-hidden="true"></i>Profile</h4>
    <h4 class="homelabel" style="float:left"><a class="homelink" href="#/home"><i class="fa fa-home" aria-hidden="true"></i>Home</a></h4>
    <h4 class="logoutlabel" style="float:left"><a class="logoutlink" href="#/login"><i class="fas fa-sign-out-alt" style="color:black;" aria-hidden="true"></i>sign-out</a></h4>
    <button class="btn-danger" id="editProfile" @click="editClick">EditProfile</button>
    <button class="btn-success" @click="editDone" v-if="this.edit">done</button><br><br>
    <b-alert v-if="this.showalert" show variant="success"><a href="#" class="alert-link">Profile Updated SuccessFully...!!</a><button class="close" @click="showalert=false">&times;</button></b-alert>                     
    <center><b-avatar style="left:20%" variant="light" :src="profileDetail.userinfo.profilepic" size="6rem" ></b-avatar><br><br>
    <div>
      <label class="upload-group">
        <i class="fas fa-plus"><input type="file" class="upload-group" style="color:red;" @change="showUpload" name="data" ref="file"></i>
      </label>
        <!-- <img :src="profilepic" class="profilepic"  ref="profilepic" hidden> -->
      <button class="btn btn-primary" type="button" ref="uploadbtn" @click="uploadImage" hidden>uploadImage</button>
    </div>
    <h3>{{profiledata.lastname}} {{profiledata.firstname}}</h3></center><br><br>
    <label class="label-Email">Email</label><label class="label-mobile" ref="Moblabel">Mobile</label><br><br>
    <input class="input-Email" v-model="profiledata.email" readonly>
    <input class="input-Mobile" ref="Mobile" v-model="profiledata.mobile" readonly><br><br>
    <label class="label-Address">Address :</label><br>
    <textarea ref="Address" class="text-Address" v-model="profiledata.address" readonly></textarea>
  </div>
 </div> 
</template>

<script>
import { numeric } from 'vee-validate/dist/rules';

export default {
  name: 'profile',
  data()
  {
    return{       
           profileDetail: this.$store.state,
           edit:false,
           showalert:false,
           profilepic:undefined,
           imageinfo:undefined,
           profiledata:{
             address:"",
             mobile:"",
             email:"",
             firstname:"",
             lastname:""
           },
          }
  },
  methods:{
    showUpload(){
      this.$refs.uploadbtn.removeAttribute("hidden");
      this.imageinfo=this.$refs.file.files[0];
      if(this.imageinfo){
        //this.$refs.profilepic.removeAttribute("hidden");
        this.profilepic=URL.createObjectURL(this.imageinfo);
      }
      else{
        window.alert("Error While submitting the profile image...")
      }
    },
    async uploadImage(){
      await this.$store.dispatch("uploadFile",this.imageinfo);
      this.$refs.uploadbtn.setAttribute("hidden","true");
      this.$refs.file.value="";
      // if(!file || file.type !== 'text/plain') 
    },
    editClick(){
      console.log('ProfileClick.....!!'); 
      this.edit=true;   
      this.$refs.Mobile.removeAttribute("readonly");
      //this.$refs.Email.removeAttribute("readonly");
      this.$refs.Address.removeAttribute("readonly");
      //document.querySelector('.input-Mobile').outerHTML='<input class="input-Mobile" v-bind="phone">';
      document.querySelector('.input-Mobile').focus(); 
      this.showalert=false;
    },
    editDone(){
      if(this.$refs.Mobile.value.length!=10 || isNaN(this.$refs.Mobile.value)){   
        this.$refs.Mobile.setAttribute("style","border:2px solid red;");
        this.$refs.Mobile.setAttribute("style","background-color: red;");
        this.$refs.Moblabel.setAttribute("style","color:red;");
      }
      //console.log(this.validEmail(this.profileDetail.userinfo.email));
      // if(!this.validEmail(this.profileDetail.userinfo.email)){
      //   console.log('ProfileClickDone.....Email__2!!'); 
      //   this.$refs.Email.setAttribute("style","border:2px solid red;");
      //   this.$refs.Email.setAttribute("style","background-color: red;");
      //   this.$refs.Emaillabel.setAttribute("style","color:red;");
      // }
      if(this.$refs.Mobile.value.length==10 && !isNaN(this.$refs.Mobile.value) ){
        this.edit=false;
        this.$refs.Mobile.setAttribute("readonly","true");
        this.$refs.Mobile.setAttribute("style","border:none;");
        this.$refs.Moblabel.setAttribute("style","color:black;");
        //this.$refs.Email.setAttribute("readonly","true");
        //this.$refs.Email.setAttribute("style","border:none;");
        //this.$refs.Emaillabel.setAttribute("style","color:black;");
        this.$refs.Address.setAttribute("readonly","true"); 
        this.$store.dispatch("updateuserdetail",this.profiledata) 
        this.showalert=true;
      }
    },
    test(testdata){
      this.profiledata={
        address:testdata.address,
        email:testdata.email,
        firstname:testdata.firstname,
        lastname:testdata.lastname,
        mobile:testdata.mobile
        }
      return true;
    }
  },
  computed:{
      loaduserinfo(){
        const userinfo=this.$store.getters.loaduserdetail;
        this.test(userinfo);
        return true
    }
  }
}
</script>

<style lang="less">
.profile{
  background-color: rgb(11, 168, 134);
  width: auto;
  height: 800px;
  font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}
.btn-danger{
  position: absolute;
  height: 2vw;
  width: 6vw;
  font-size: 1vw;
  left:70%;
  text-align: center;
  border: white;
  font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}
.btn-danger:hover{
  color: black;
  background-color:green;
}
.btn-success{
  position: absolute;
  height: 2vw;
  width: 6vw;
  font-size: 1vw;
  left:85%;
  text-align: center;
  border: white;
  font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}
.label-Email{
  position: absolute;
  color:black;
  left: 25%;
}
.label-mobile{
  position: absolute;
  color:black;
  left: 70%;
}
.input-Email{
  position: absolute;
  border: none;
  background-color: rgb(11, 168, 134);
  left: 15%;
  width: 30%;
  text-align: center;
}
.input-Mobile{
  position: absolute;
  border:none;
  //border-color: rgb(11, 168, 134);
  background-color: rgb(11, 168, 134);
  left: 58%;
  width: 30%;
  text-align: center;
}
// input-Mobile:read-only
.title{
  font-size: 1.5vw;
}
.title:hover{
  color: red;
}
.profile-info{
  position: absolute;
  background-color: white;
  top:10%;
  left: 25%;
  width: 50%;
  height: 700px;
  border:white;
  padding: 20px;
}
.text-Address{
  width:50%;
  height:20%;
  border-color:black;
}
.homelabel{
  position: absolute;
  font-size: 1.5vw;
  color: black;
  left:20%;
}
.logoutlabel{
  position: absolute;
  color: black;
  font-size: 1.5vw;
  left:35%;
}
.homelabel:hover{
  text-decoration: none; 
  color: red;
}
.homelink{
  color: black;
}
.logoutlink{
  color: black;
}
.homelink:hover{
  text-decoration: none; 
  color: red;
}
.logoutlink:hover{
  text-decoration: none; 
  color: red;
}
</style>
