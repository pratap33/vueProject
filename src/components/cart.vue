<template>
  <div class="cart">
    <i class="fa fa-shopping-cart" style="font-size:24px;color:black" @click="show(!res)"></i>
    <span class="cart-number" @click="show(!res)">{{ Items.cartItems.length }}</span>
    <modal name="ItemExceed" height="auto" :scrollable="true" :draggable="true" :adaptive="true">
      <div class="modal-header">
        <h5 class="modal-title">Quantity Exceeded</h5>
        <button class="close"  @click="exceedAlert(false)">&times;</button>
      </div>
      <div class="modal-body">
        <p style="color:red"><b>Sorry, you can't add more than <strong>10 Quantity</strong> per Item....</b></p>
      </div>
    </modal>
    <modal name="showcart" ref="cartitem" height="auto" :scrollable="true" :draggable="true" :adaptive="true" width="80%" >
      <div>
        <div class="modal-content" v-if="Items.cartItems.length!=0">
          <div class="modal-header">
            <h5 class="modal-title" ref="dummy" style="color:green">My cart</h5>
            <button class="close" @click="$modal.hide('showcart')">&times;</button>
          </div>
          <div class="modal-body">
            <b-table
              striped
              hover
              :items="Items.cartItems"
              :fields="fields"
              :borderless="true"
              responsive
              :sticky-header="true"
            >
              <template v-slot:cell(image)="data">
                <b-avatar variant="danger" href :src="data.value" size="2rem" square></b-avatar>
              </template>
              <template v-slot:cell(price)="data">
                <b class="text-info">{{ data.value | currency }}</b>
              </template>
              <template v-slot:cell(Quantity)="data">
                <button @click="quantityChange(data.item.productID,-1)">
                  <i class="close fa fa-minus" style="font-size:14px;"></i>
                </button>&nbsp;
                <b class="text-info">{{ data.value }}</b>&nbsp;
                <button
                  @click="data.value==10 ? exceedAlert(!outcome) : quantityChange(data.item.productID,1)"
                >
                  <i class="close fa fa-plus" style="font-size:14px;"></i>
                </button>
                <!-- <b-form-spinbutton id="demo-sb" v-model="items.Quantity" min="1" max="10"></b-form-spinbutton> -->
              </template>
              <template v-slot:cell(productID)="data">
                <button class="remove" @click="removeFromCart(data.item)">&times;</button>
              </template>
            </b-table>
            <p>
              <b-button class="cartvalue" size="sm">{{ cartvalue | currency}}</b-button>
            </p>
            <br />
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              @click="$modal.hide('showcart')"
            >Keep shopping</button>
            <button type="button" class="btn btn-primary" @click="payment">Check out</button>
          </div>
        </div>
        <div class="modal-content" v-if="Items.cartItems.length==0">
          <div class="modal-header">
            <h5 class="modal-title">
              <center>Your cart is Empty...!</center>
            </h5>
            <button class="close" @click="$modal.hide('showcart')">&times;</button>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              @click="$modal.hide('showcart')"
            >Keep shopping</button>
          </div>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
import router from "../router";

export default {
  name: "cart",
  data() {
    return {
      res: false,
      outcome:false,
      cartSize: 0,
      Items: this.$store.state,
      fields: [
        {
          key: "image",
          label: "Item",
          sortable: false
        },
        {
          key: "name",
          sortable: false
        },
        {
          key: "price",
          sortable: true,
          variant: "danger"
        },
        {
          key: "Quantity",
          label: "QTY",
          sortable: true
        },
        {
          key: "productID",
          label: "",
          sortable: false
        }
      ]
    };
  },
  methods: {
    quantityChange(productID, num) {
      this.$store.dispatch("quantityChange", [productID, num]);
    },
    removeFromCart(data) {
      this.$store.dispatch("removeFromCart", data);
    },
    payment() {
      this.$modal.hide("showcart");
      router.push("/payment");
    },
    show(res) {
        if(res){
            this.$modal.show("showcart");
        }
        // else if(res && (this.Items.cartItems.length ==0||this.Items.cartItems.length ==1)){
        //     // this.$refs.dummy.setAttribute("style","color:red;");
        //     this.$modal.hide("showcart");
        //     this.$modal.show("noItem");       
        // }
        else{
          this.$modal.hide("showcart");
        }
    },
    exceedAlert(outcome){
        if(outcome){
            this.$modal.hide("showcart");
            this.$modal.show('ItemExceed');
        }
        else{
            this.$modal.hide('ItemExceed');
            this.$modal.show("showcart");
        }
            
    }
  },
  computed: {
    cartvalue() {
      return this.$store.getters.cartvalue;
    }
  }
};
</script>

<style lang="less">
.cartvalue {
  position: absolute;
  left: 480px;
}
.modal {
  position: absolute;
  z-index: -1;
}
.cart-number {
  position: absolute;
  background: #e54c2a;
  color: #fff;
  text-align: center;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: solid 1px #fff;
  z-index: 2;
}
.remove {
  background-color: red;
  border: red;
  color: white;
  text-align: center;
  height: 25px;
  width: 20px;
}
.remove:hover {
  color: black;
  border: black;
}
@import "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css";
</style>