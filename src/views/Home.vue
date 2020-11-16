<template>
<body class="page-body">
  <modal name="ItemExceeded" height="auto" :scrollable="true" :draggable="true">
      <div class="modal-header">
        <h5 class="modal-title">Quantity Exceeded</h5>
        <button class="close" @click="$modal.hide('ItemExceeded')">&times;</button>
      </div>
      <div class="modal-body">
        <p style="color:red"><b>Sorry, you can't add more than <strong>10 Quantity</strong> per Item....</b></p>
      </div>
  </modal>
  <div id="Home" class="home">
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    </head>
    <scroll-fixed-header :fixed.sync="fixed" :threshold="56">
      <b-navbar toggleable="lg" type="danger" variant="warning">
        <slider
          id="menu-bar"
          :width="200"
          style="format='push'; direction='left'; :opacity='0.15;"
          :links="pages"
        >slider</slider>
        <b-navbar-toggle target="nav-collapse" left></b-navbar-toggle>
        <b-navbar-brand class="welcome_board" style="left:100px">WELCOME</b-navbar-brand>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="navopt">
            <b-nav-item href="#/home">Home</b-nav-item>
            <b-nav-item href="#/about">About</b-nav-item>
            <b-nav-item href="#/contact">Contact</b-nav-item>
            <b-nav-item href="#/review">CustomerReviews</b-nav-item>
            <b-nav-item href="#" disabled>More Details</b-nav-item>
            <b-nav-item class="Addtocart">
              <cart ref="cartdata"></cart>
            </b-nav-item>
          </b-navbar-nav>
          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-form>
              <b-form-input
                size="sm"
                v-model="UserDetail.search"
                class="mr-sm-2"
                placeholder="Search"
              ></b-form-input>
              <b-button size="sm" @click="filterProducts" class="my-2 my-sm-0" type="submit">Search</b-button>
            </b-nav-form>
            <b-nav-item-dropdown right>
              <!-- Using 'button-content' slot -->
              <template v-slot:button-content>
                <em>
                  <b-avatar variant="danger" size="2rem" :src="UserDetail.userinfo.profilepic" square right></b-avatar>
                </em>
              </template>
              <b-dropdown-item href="#/profile">Profile</b-dropdown-item>
              <b-dropdown-item href="#/login" @click="singOut">Sign Out</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </scroll-fixed-header>
    <div>
      <b-alert
        class="alertbox"
        :show="dismissCountDown"
        dismissible
        variant="danger"
        @dismissed="dismissCountDown=0"
        @dismiss-count-down="countDownChanged"
      >
        <center>
          <p class="font-italic font-weight-bold" style="color:red;">Search Not Found...!!</p>
        </center>
      </b-alert>
    </div>
    <div>
      <b-carousel id="carousel-1" style="text-shadow: 0px 0px 2px #000" interval:2000 indicators>
        <b-carousel-slide>
          <template v-slot:img>
            <div class="carousel-caption">
              <a
                class="button animated bounceInUp"
                href="#"
                target="_blank"
                style="float: left; animation-delay: 2s"
                role="button"
              >PURCHASE NOW</a>
            </div>
            <img
              class="responsive"
              width="100%"
              height="500px"
              src="https://www.tulasipickles.com//image/catalog/3.jpg"
              alt="image slot"
            />
            <div class="topleft1 animated bounceInDown" style="animation-delay: 1s">
              <b>WELCOME TO</b>
            </div>
            <div class="topleft2 animated bounceInDown" style="animation-delay: 1s;">
              <b>LAKSHMI PICKLES</b>
            </div>
            <div
              class="topleft3 animated bounceInDown"
              style="animation-delay: 1s;"
            >Homemade Authentic Telugu Pickles</div>
          </template>
        </b-carousel-slide>
        <b-carousel-slide
          caption-html="<a class='button1 animated bounceInUp' href='' target='_blank' style='float: left; animation-delay: 3s;' role='button'>FOLLOW AND LIKE US</a>"
        >
          <template v-slot:img>
            <img
              class="responsive"
              width="100%"
              height="500px"
              src="https://www.tulasipickles.com//image/catalog/5.jpg"
              alt="image slot"
            />
            <div class="topleft5 animated bounceInUp" style="animation-delay: 1s;">
              <b>LAKSHMI PICKLES</b>
            </div>
            <div
              class="topleft4 animated bounceInUp"
              style="animation-delay: 2s;"
            >Home for Authentic Veg and Non Veg Pickles</div>
          </template>
        </b-carousel-slide>
      </b-carousel>
    </div>
    <br />

    <center>
      <h2
        class="content-heading"
        style="font-family: Comic Sans MS, cursive, sans-serif; color: #55b34c !important;"
      >Top Sellers</h2>
      <div class="content-subheading">
        <b-spinner variant="danger" type="grow"></b-spinner>Non Veg Pickles
        <b-spinner variant="warning" type="grow"></b-spinner>
      </div>
    </center>
    <div>.</div>

    <carousel :per-page="1">
      <slide>
        <div class="container">
          <div class="row">
            <div class="col-lg-4" v-for="product in this.products" :key="product.productID">
              <b-card border-variant="warning" style="max-width: 20rem;" class="product-card">
                <b-card-img :src="product.image" class="img-responsive-product" alt="Image" top></b-card-img>
                <center>
                  <h4>
                    <i>
                      <a class="product-name" href="#/home">{{product.name}} Pickle - 450 Gms</a>
                    </i>
                  </h4>
                  <label class="price">{{product.price|currency}}</label>
                  <br />
                  <button
                    @click="product.Quantity==10 ? $modal.show('ItemExceeded') : addToCart(product)"
                    class="addcart-btn"
                  >ADD TO CART</button>
                </center>
              </b-card>
              <br />
              <br />
              <div></div>
            </div>
          </div>
        </div>
      </slide>

      <slide>
        <div class="container">
          <div class="row">
            <div class="col-lg-4" v-for="product in this.products" :key="product.productID">
              <b-card border-variant="warning" style="max-width: 20rem;" class="product-card">
                <b-card-img :src="product.image" class="img-responsive-product" alt="Image" top></b-card-img>
                <center>
                  <h4>
                    <i>
                      <a class="product-name" href="#/home">{{product.name}} Pickle - 450 Gms</a>
                    </i>
                  </h4>
                  <label class="price">{{product.price|currency}}</label>
                  <br />
                  <button
                    @click="product.Quantity==10 ? $modal.show('ItemExceeded') : addToCart(product)"
                    class="addcart-btn"
                  >ADD TO CART</button>
                </center>
              </b-card>
              <br />
              <br />
              <div></div>
            </div>
          </div>
        </div>
      </slide>
    </carousel>
    <br />

    <!-- <v-badge left>
      <template v-slot:badge>
        <span>6</span>
      </template>
      <v-icon
        large
        color="grey lighten-1"
      >
        shopping_cart
      </v-icon>
    </v-badge>-->
    <div class="text-center">
      <i
        class="fab fa-whatsapp"
        style="font-size:30px;color:green;"
        ref="whatsapp-ion"
        @click="gotoWhatsapp"
        id="popover-button-open"
      ></i>
      <b-popover show target="popover-button-open" title="Message us"></b-popover>
    </div>
    <homecard></homecard>
    <homefooter></homefooter>
  </div>
</body>
</template>

<script>
// @ is an alias to /src
import Vue from "vue";
import { store } from "../../src/store/index.ts";
import {
  BootstrapVue,
  IconsPlugin,
  BCarousel,
  BCarouselSlide,
  BAlert,
  AvatarPlugin
} from "bootstrap-vue";
import { Carousel, Slide } from "vue-carousel";
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";
import * as Slider from "@jeremyhamm/vue-slider";
import ScrollFixedHeader from "vuejs-scroll-fixed-header";
import Cart from "../../src/components/cart.vue";
import Homefooter from "../../src/components/homefooter.vue";
import Homecard from "../../src/components/Homecard.vue";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import router from "../router";
import VModal from "vue-js-modal";

Vue.use(VModal);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(AvatarPlugin);
Vue.use(Slider);
Vue.use(ScrollFixedHeader);

export default {
  name: "home",
  data() {
    return {
      pages: [
        { id: 1, text: "HOME", url: "#/home" },
        { id: 2, text: "ABOUT US", url: "#/about" },
        { id: 3, text: "CONTACT US", url: "#/Contact" }
      ],
      fixed: false,
      UserDetail: this.$store.state,
      products: this.$store.state.products,
      alertcount: false,
      dismissSecs: 5,
      dismissCountDown: 0
    };
  },
  components: {
    "b-carousel": BCarousel,
    "b-carousel-slide": BCarouselSlide,
    slider: Slider,
    cart: Cart,
    homefooter: Homefooter,
    homecard: Homecard,
    "b-alert": BAlert,
    Carousel,
    Slide
  },
  methods: {
    singOut() {
      this.$store.dispatch("singOut");
    },
    addToCart(product) {
      this.$store.dispatch("addToCart", product);
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    filterProducts() {
      if (this.$store.getters.filterProducts.length == 0) {
        this.alertcount = true;
        this.dismissCountDown = this.dismissSecs;
        this.products = this.$store.state.products;
      } else {
        this.products = this.$store.getters.filterProducts;
      }
    },
    gotoWhatsapp() {
      window.location.assign("https://api.whatsapp.com/send?phone=+919492290577");
    }
  },
  // computed: {
  //   loadCart(){
  //     return this.$store.dispatch("loadCart");
  //   }
  //}
};
</script>

<style lang="less">
i.fas,
.fa-shopping-cart {
  color: green;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.alertbox {
  height: 4vw;
}
.cart-icon {
  background-image: url();
  background-size: 350px;
}
.page-body {
  background: url("https://www.publicdomainpictures.net/pictures/30000/velka/plain-white-background.jpg")
    no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
}
.img-responsive-product {
  padding: 10px;
  width: 200px;
  height: 300px;
  transition: width 1s, height 1s;
}
.img-responsive-product:hover {
  width: 300px;
  height: 320px;
}
.fa-whatsapp {
  position: fixed;
  top: 80%;
  left: 90%;
  z-index: 2;
}
.price {
  font-family: Fira Sans !important;
  color: #e54c2a;
  font-weight: 400;
  font-size: 18px;
}
.product-name {
  outline: none;
  font-family: Fira Sans !important;
  text-align: center;
  color: #909090;
}
.product-name:hover {
  text-decoration: none;
  color: red;
}
.row {
  display: flex;
}

.column {
  flex: 33.33%;
  padding: 5px;
}
.navbar.vue-fixed-header--isFixed {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
}
.content-subheading {
  color: #e54c2a;
  font-family: "Shadows Into Light", cursive;
  font-size: 1.5vw;
}
.content-heading {
  font-size: 1.5vw;
}
.welcome_board {
  font-family: Satisfy !important;
  font-size: 1vw;
}
.mb-4 {
  float: right;
  width: 200px;
  border-radius: 8px;
  padding: 17px;
  margin: 1px;
  font-size: 20px;
}
.topleft1 {
  position: absolute;
  top: 3vw;
  left: 10px;
  font-size: 3vw;
  text-transform: uppercase;
  color: black;
  letter-spacing: 3px;
}
.topleft2 {
  position: absolute;
  top: 6vw;
  left: 10px;
  text-transform: uppercase;
  color: #ff6600;
  font-size: 4vw;
  letter-spacing: 3px;
}
.navopt {
  color: red;
}
.topleft3 {
  position: absolute;
  top: 12vw;
  left: 10px;
  font-size: 2vw;
  text-transform: uppercase;
  color: black;
  letter-spacing: 3px;
}
.topleft4 {
  position: absolute;
  top: 9vw;
  left: 0%;
  font-size: 2vw;
  text-transform: uppercase;
  color: white;
  letter-spacing: 3px;
}
.topleft5 {
  position: absolute;
  top: 4vw;
  left: 0%;
  text-transform: uppercase;
  color: #ff6600;
  font-size: 3vw;
  letter-spacing: 3px;
}
.button {
  display: inline-block;
  padding: 15px 25px;
  font-size: 15px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  outline: none;
  color: black;
  border: 2px solid orangered;
  border-radius: 15px;
  letter-spacing: 3px;
}
.button:hover {
  background-color: orangered;
  text-decoration: none;
  color: white;
}
.addcart-btn {
  width: 120px;
  height: 40px;
  background-color: green;
  border: 2px solid green;
  color: white;
}
.addcart-btn:hover {
  width: 140px;
  height: 50px;
  color: black;
}
.responsive{
  object-fit: cover;
}
.button1 {
  display: inline-block;
  padding: 15px 25px;
  font-size: 15px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  outline: none;
  color: orangered;
  border: 2px solid orangered;
  border-radius: 15px;
  letter-spacing: 2px;
}
.button1:hover {
  background-color: orangered;
  text-decoration: none;
  color: white;
}
.button:active {
  background-color: #3e8e41;
  box-shadow: 0 5px #666;
  transform: translateY(4px);
}
.btn-danger {
  height: 80px;
  width: 25%;
}
.carousel-caption {
  padding-bottom: 150px;
}
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.navbar.vue-fixed-header--isFixed {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
}
.product-card {
  font-size: 1vw;
}
@import "../assets/styles/animate.css";
</style>
