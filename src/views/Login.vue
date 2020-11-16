<template>
  <body>
    <b-alert
      :show="UserState.alertsec"
      dismissible
      variant="danger"
      @dismissed="UserState.alertsec=0"
    >
      {{UserState.alertmsg}}
    </b-alert>
    <div class="login">
        <center><h2 class="heading">Login</h2></center>
        <router-view/>       
        <center><label style="color:red">{{accessError}}</label></center> 
      <form>
        <div class="field-name">
          <ValidationProvider rules="username" v-slot="{ errors }">                      
              <i class="fas fa-user" style="color:black"></i>&nbsp;                       
              <input class="name-input" ref="username" type="text" placeholder="User Name" v-model="UserState.userName" @input="UserState.userName = $event.target.value.toUpperCase()" />  
              <span class="error_fields">{{ errors[0] }}</span>
          </ValidationProvider> 
        </div><br>

        <div class="field-password">
          <ValidationProvider rules="password" v-slot="{ errors }">                             
              <i class="fas fa-eye-slash" ref="password" @click="showPassword(showpass)" style="color:black"></i>&nbsp;
              <input class="password-input" ref="pwrdtext" type="password" placeholder="Password" v-model="UserState.password" />     
              <span class="error_fields">{{ errors[0] }}</span>
          </ValidationProvider> 
        </div><br>

        <div class="form-group">
          <center><button class="btn btn-primary" style="position:absolute; left:40%; width:80px;height:40px" :disabled="UserState.userPresent" @click="validUser">Login</button>
          <button class="btn btn-danger" style="position:absolute; left:55%; width:80px;height:40px"><router-link to="/" style="color:white;text-decoration: none;" >Register</router-link></button>
          </center>
        </div> 
      </form>
    </div>
 </body>
</template>

<script>
import { store } from "../store/index.ts";
import { validate } from "../store/validate.js";
import router from "../router";
import { ValidationProvider } from 'vee-validate';
import 'bootstrap-vue/dist/bootstrap-vue-icons.min.css'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'

export default {
  name: 'login',
  data()
  {
    return{
            UserState : this.$store.state,
            showpass : false,
            accessError:'',
            dismissCountDown: 0,
            alertmsg:"",
          }
  },
  
  components: {
    ValidationProvider,
  },
  methods:{
      validUser()
      {
        this.accessError="";
        if(this.$refs.username.value!=''&&this.$refs.pwrdtext.value!=''){
           if (!this.validEmail(this.$refs.username.value)) {
                this.accessError="please mention valid email as Username";
            }
          else{
            this.$store.dispatch('validateUser');
          }       
        }
        else{
          this.UserState.alertmsg="Please input credentials..!!";
          this.UserState.alertsec=2;
        }
      },
      validEmail: function(email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
      },
      showPassword(showpass)
      {
        if(showpass)
        {
          this.$refs.password.setAttribute("class","fa fa-eye");
          this.$refs.pwrdtext.setAttribute("type","text");
          this.showpass=false;
        }
        else
        {
          this.$refs.password.setAttribute("class","fa fa-eye-slash");
          this.$refs.pwrdtext.setAttribute("type","password");
          this.showpass=true;
        }      
      },
  }
}

</script>

<style lang="less">
body{
  position: relative;
}
.form-group {
    margin-bottom: 1rem;
}
.error_fields {
  color:red;
}
.field-name{
  top:40%;
  left:40%;
  background:white;
  height: 50px;
  width: 400px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  border-radius: 5px;
}
.field-password{
  top:40%;
  left:40%;
  background:white;
  height: 50px;
  width: 400px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  border-radius: 5px;
}
.name-input{
  background:none;
  border :none;
  height : 100%;
  flex:1;
  outline: none;
}
.password-input{
  background:none;
  border :none;
  height : 100%;
  flex:1;
  outline: none;
}
.heading{
  font-family: Fira Sans !important; 
  color: red !important;
}
.login{
  position: relative;
  top: 100px;
}
.form-control {
  width: 20%;
}
.mb-2{
  width: 20%;
}
 
</style>
