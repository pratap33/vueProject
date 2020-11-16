<template>
  <div class="registermain">
    
    <div class="errordata" v-if="errors.length">
        <ul>
          <li v-for="error in errors" :key="error" class="errorinfo animate__bounceIn" style="color:red;animation-delay:1s;font-family: 'Shadows Into Light', cursive;line-height: 1.7;">*{{ error }}</li>
        </ul>
    </div>

    <form id="register" class="formdata" @submit="checkForm" novalidate="true">
      <h4 style="color:red;">
        <strong class="mainheading animate__fadeInDown" style="animation-delay:1s">Register Here..!</strong>
      </h4>
      <label for="firstName" ref="firstNamelb">*FirstName</label>
      <input id="firstName" ref="firstName" style="" v-model="UserState.userinfo.firstname" type="text" name="firstName" />

      <label for="lastName" ref="lastNamelb">*LastName</label>
      <input id="lastName" ref="lastName" v-model="UserState.userinfo.lastname" type="text" name="lastName" />

      <label for="email" ref="emaillb">*Email</label>
      <input id="email" ref="email" v-model="UserState.userinfo.email" @input="UserState.userinfo.email = $event.target.value.toUpperCase()" type="email" name="email" />

      <label for="password" ref="passwordlb">*Password</label>
      <input id="password" ref="password" v-model="UserState.userinfo.password" type="password" name="password" />

      <label for="cnfpawrd" ref="cnfpawrdlb">*confirmpassword</label>
      <input id="cnfpawrd" ref="cnfpawrd" v-model="cnfpawrd" type="password" name="cnfpawrd" />

      <label for="age" ref="agelb">*Age</label>
      <input id="age"  ref="age" v-model="UserState.userinfo.age" type="text" name="age" />

      <label for="mobile" ref="mobilelb">*Mobile</label>
      <input id="mobile" ref="mobile" v-model="UserState.userinfo.mobile" type="text" name="mobile" /><br/><br/>
      <div>
      <button class="btn btn-success" style="position:absolute; left:30%; width:80px; height:40px" type="submit" value="Submit" >Submit</button>
      <button class="btn btn-warning" style="position:absolute; left:60%; width:80px; height:40px" @click="gotoLogin">Login</button>
      </div>
    </form>
  </div>
</template>

<script>
import router from "../router";

export default {
  name: "register",
  data() {
    return {
      errors: [],
      errorcount:0,
      UserState : this.$store.state,
      cnfpawrd:'',
    };
  },
  computed:{
    // dummy(){
    //   console.log(this.$refs.file.value);
    //   return this.$refs.file.value;
    // }
  },
  methods: {
    
    checkForm: function(e) {
      this.errors = [];
      this.errorcount=0;
      e.preventDefault(); 
      if (!this.UserState.userinfo.firstname) {
        this.$refs.firstNamelb.setAttribute("style","color:red;");
        this.$refs.firstName.setAttribute("style","border: 1px solid red;");
        this.errorcount++;
      }
      if (!this.UserState.userinfo.lastname) {
        this.$refs.lastNamelb.setAttribute("style","color:red;");
        this.$refs.lastName.setAttribute("style","border: 1px solid red;");
        this.errorcount++;
      }
      if (!this.UserState.userinfo.email) {
        this.$refs.emaillb.setAttribute("style","color:red;");
        this.$refs.email.setAttribute("style","border: 1px solid red;");
        this.errorcount++;
      } else if (!this.validEmail(this.UserState.userinfo.email)) {
        this.errors.push("Valid email required.");
      }
      if (!this.UserState.userinfo.age) {
        this.$refs.agelb.setAttribute("style","color:red;");
        this.$refs.age.setAttribute("style","border: 1px solid red;");
        this.errorcount++;
      }else if(!(parseInt(this.UserState.userinfo.age)<=99 && parseInt(this.UserState.userinfo.age)>=15)){
        this.errors.push("Valid Age required.");
      }
      if(!this.cnfpawrd){
        this.$refs.cnfpawrdlb.setAttribute("style","color:red;");
        this.$refs.cnfpawrd.setAttribute("style","border: 1px solid red;");
        this.errorcount++;
      }
      if(!this.UserState.userinfo.password){
        this.$refs.passwordlb.setAttribute("style","color:red;");
        this.$refs.password.setAttribute("style","border: 1px solid red;");
        this.errorcount++;
      }else if((this.UserState.userinfo.password===this.cnfpawrd)==false){
        this.errors.push("Confirmpassword must be same as password.");
        this.cnfpawrd='';
      }else if(!this.validPassword(this.UserState.userinfo.password)){
        this.errors.push("Password between 7 to 15 characters which contain at least one numeric digit and a special character");
      }
      if (!this.UserState.userinfo.mobile) {
        this.$refs.mobilelb.setAttribute("style","color:red;");
        this.$refs.mobile.setAttribute("style","border: 1px solid red;");
        this.errorcount++;
      }else if(this.UserState.userinfo.mobile.length!=10 || isNaN(this.UserState.userinfo.mobile)){
        this.errors.push("Valid mobile number required.");
      }
      if (!this.errors.length&& this.errorcount==0) {
        this.validateData();
        return true;
      }else{
        console.log("Errors need to be solved..")
      }
           
    },
    validEmail: function(email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    validPassword(password){
      const re=/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
      return re.test(password);
    },
    validateData(){ 
      this.$store.dispatch("validateData");
    },
    gotoLogin(){
      router.replace('/login')
    }
  }
};
</script>
<style lang="less">
* {
  padding: 0;
  margin: 0;
}

main {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
// .registermain {
//   background-color: blueviolet;
// }
.errordata{
  position: absolute;
  top:120px;
  width:20%;
  left:70%;
  padding: 2rem;
}
.formdata {
  position: absolute;
  width: 400px;
  border: solid 1px #ebebeb;
  padding: 1rem;
  left: 40%;
  top: 110px;
  border-color: black;
  line-height: 2;
  height:600px;
}
.profilepic{
  position: absolute;
  width: 60px;
  height: 60px;
}
label,input{
  display: inline-block;
}
label {
  margin: 1em 0;
  width:40%;
  text-align: left;
  //line-height: 2;
}
// .btn{
//   position: absolute;
//   margin: 1em 0;
 
// }

input+input {
    float: right;
}
// button {
//   margin-top: 2rem;
// }
//@import url("https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css");
@import "../assets/styles/animate.css";
</style>