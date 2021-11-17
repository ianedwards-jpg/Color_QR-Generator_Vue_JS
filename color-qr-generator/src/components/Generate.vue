<template>
  <div>
<b-container>
    <h1>Color QR Code Generator</h1>
    <!-- URL Input Group  -->
    <b-form-group class="colorForm" id="url_input" label="To Convert:" label-for="input-2" @submit.stop.prevent>
      <b-form-input
        id="input-2"
        v-model="form.url"
        placeholder="Enter URL"
        validated: True
        :state="validation"
        required
      ></b-form-input>
      <b-form-invalid-feedback :state="validation">
        You must enter a URL to convert.
      </b-form-invalid-feedback>
      <b-form-valid-feedback :state="validation">
        Looks Good.
      </b-form-valid-feedback>
    </b-form-group>

    <!-- Color Select Accordion -->
    <b-container class="accordion">
        <!-- <b-card no-body class="mb-1"> -->
            <!-- <b-card-header header-tag="header" class="p-1" role="tab">
                <b-button block v-b-toggle.accordion-1 variant="info">Accordion 1</b-button>
      </b-card-header> -->
      <b-button v-b-toggle.accordion-1 class="buttons" variant="info">Choose Color</b-button>
      <b-button v-b-toggle.accordion-2 class="buttons" variant="info">Pick Color</b-button>

      <b-collapse id="accordion-1" accordion="my-accordion" role="tabpanel">
        <b-card-body>
          <b-form class="colorForm" id="color_select" label="Color:" label-for="input-3" inline>
    <label class="mr-sm-2" for="inline-form-custom-select-pref">Code Color: </label>
      <b-form-select
        id="input-3"
        v-model="form.color"
        :options="colors"
      ></b-form-select>
    </b-form>
        </b-card-body>
      </b-collapse>
   
      <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
         <b-form inline>

         </b-form>
        <b-card-body>
             <label class="mr-sm-2" for="inline-form-custom-select-pref">Code Color: </label>
        <color-panel v-model="color"></color-panel>
        <color-picker v-model="color" @change="change"></color-picker>

        </b-card-body>
      </b-collapse>


    </b-container>
      <!-- <img class="img" v-bind:src="picture" :alt="`${errormsg}`" /> -->
      <img class="img" v-bind:src="picture" v-bind:alt="errormsg" />

    <br><br>
      <!-- Generate and Reset Buttons -->
      <span>
        <b-button type="submit" class="buttons" variant="primary" v-on:click="onSubmit()">Convert</b-button>
        <b-button type="reset" class="buttons" variant="danger" v-on:click="onReset()">Reset</b-button>
      </span>

      <h2>Converted URL: {{ startURL }} </h2>
     

    
    </b-container>
  </div>
</template>
<script>
// Importing Components
//import Button from "./Button";
//import GeneratedCode from "./GeneratedCode.vue"
// import image from "../assets/Example_QR_CodeMOD2.png";
import $ from 'jquery'
import image from '../assets/Example_QR_CodeMOD2.png';


export default {
  data() {
    return {
      startURL: "https://yoururlhere.fakeurl",
      // picture: 'https://api.qrserver.com/v1/create-qr-code/?data="https://musc.org/"&size=250x250',
      picture: image,
      errormsg: "Nothing To Display",

      form: {
        url: "",
        errormsg: "Nothing To Display",
        color: null,
      },
      colors: [
        { text: "Black", value: null },
        "Blue",
        "Green",
        "Red",
        "Yellow",
      ],
      show: true,
    };
  },
  name: "Generate",
  props: {
    url: String,
  },
  computed: {
    validation() {
      return this.form.url.length > 0;
    },
  },
  methods: {
    async onSubmit() {
      //Removes any white space from inputs
      this.form.url = this.form.url.trim();
      //Sets the trimmed form value as variable to inject into API call
      let urlInput = this.form.url;
      //Colormap to call selected color values
      let colorMap = {
        Blue: "0000FF",
        Green: "008000",
        Red: "FF0000",
        Yellow: "ffff00",
      };

    if($('#accordion-2').is(':visible')){
            this.picture ='https://api.qrserver.com/v1/create-qr-code/?data="' +
            urlInput +'"&size=250x250&bgcolor=' + this.color.slice(1);

            console.log("Picker Visible")
            
        } else if($('#accordion-1').is(':visible')){
            this.picture ='https://api.qrserver.com/v1/create-qr-code/?data="' +
            urlInput +'"&size=250x250&bgcolor=' + colorMap[this.form.color];

            console.log("Selector Visible")
        } 

      console.log(urlInput);
      console.log(this.form.url.length);
    //   console.log(this.color)
      console.log(this.color.slice(1))

      this.startURL = urlInput;

    //   this.picture =
    //     'https://api.qrserver.com/v1/create-qr-code/?data="' +
    //     urlInput +
    //     '"&size=250x250&bgcolor=' +
    //     colorMap[this.form.color];
    },

    onReset() {
      //   event.preventDefault();
      console.log("Clicked");
      // Reset our form values
      this.startURL = "https://yoururlhere.fakeurl";
      (this.picture = image), (this.form.url = "");
      this.form.color = null;
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
};
// Example URL'https://api.qrserver.com/v1/create-qr-code/?data="https://goqr.me/"&size=250x250'
</script>
<style scoped>
.colorForm {
  /* justify-content: space-between; */
  max-width: 1400px;
  align-items: left;
  margin: 30px auto;
}

.buttons {
  min-width: 85px;
  margin: 15px;
  justify-content: space-between;
  align-items: center;
}

.img {
  max-height: 250px;
  max-width: 250px;
}
</style>
