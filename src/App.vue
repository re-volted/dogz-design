<template>
   <div id="app">
      <div v-if="loading" class="overlay">
         <div class="loader" />
      </div>
      <div class="container">
         <form @submit="handleSubmit" method="post">
            <h1>Sign in form</h1>
            <k-input
               name="email"
               type="email"
               label="E-mail"
               :required="true"
               v-model="form.email"
            />
            <k-input
               name="password"
               type="password"
               label="Password"
               :required="true"
               v-model="form.password"
            />
            <input type="submit" class="k-button" value="Log in" />
         </form>
      </div>
      <kendo-notification ref="popupNotification"></kendo-notification>
   </div>
</template>

<script>
   export default {
      data: () => {
         return {
            form: {
               email: "",
               password: "",
            },
            loading: false,
         };
      },
      mounted: function() {
         this.popupNotificationWidget = this.$refs.popupNotification.kendoWidget();
      },
      methods: {
         async handleSubmit(e) {
            this.loading = true;
            e.preventDefault();
            const data = JSON.stringify(this.form);

            await this.$http({
               method: "post",
               url: "https://dogz.studio/api/login",
               data,
               validateStatus: function(status) {
                  return (status >= 200 && status < 300) || status === 401; // fix for problem with retrieving data when "error" as password provided
               },
            })
               .then((result) => {
                  if (result.data.error) {
                     this.showPopupNotification(result.data.message, "error");
                  } else {
                     this.showPopupNotification(result.data.message, "success");
                  }
               })
               .catch((err) => {
                  console.error("err", err);
               })
               .finally(() => {
                  this.loading = false;
                  this.clearForm();
               });
         },
         showPopupNotification(message, context) {
            this.popupNotificationWidget.show(message, context);
         },
         clearForm() {
            this.form.email = "";
            this.form.password = "";
         },
      },
   };
</script>

<style>
   #app {
      font-family: Avenir, Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      color: #2c3e50;
      position: relative;
   }

   .container {
      max-width: 320px;
      margin: 0 auto;
   }

   form {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      border: 1px solid #2c3e50;
      border-radius: 3px;
      background-color: rgba(0, 0, 0, 0.05);
      padding: 4rem 2rem 3rem;
      margin-top: 60px;
   }

   form > h1 {
      font-size: 26px;
      margin: 0;
   }

   input:last-child {
      margin-top: 1.5rem;
   }

   .overlay {
      position: absolute;
      z-index: 1040;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: rgba(255, 255, 255, 0.5);
   }

   /* ready solution from web styling */
   .loader,
   .loader:before,
   .loader:after {
      background: #2c3e50;
      -webkit-animation: load 1s infinite ease-in-out;
      animation: load 1s infinite ease-in-out;
      width: 1em;
      height: 4em;
   }
   .loader {
      color: #2c3e50;
      margin: 88px auto;
      position: relative;
      font-size: 11px;
      -webkit-transform: translateZ(0);
      -ms-transform: translateZ(0);
      transform: translateZ(0);
      -webkit-animation-delay: -0.16s;
      animation-delay: -0.16s;
   }
   .loader:before,
   .loader:after {
      position: absolute;
      top: 0;
      content: "";
   }
   .loader:before {
      left: -1.5em;
      -webkit-animation-delay: -0.32s;
      animation-delay: -0.32s;
   }
   .loader:after {
      left: 1.5em;
   }
   @-webkit-keyframes load {
      0%,
      80%,
      100% {
         box-shadow: 0 0;
         height: 4em;
      }
      40% {
         box-shadow: 0 -2em;
         height: 5em;
      }
   }
   @keyframes load {
      0%,
      80%,
      100% {
         box-shadow: 0 0;
         height: 4em;
      }
      40% {
         box-shadow: 0 -2em;
         height: 5em;
      }
   }
</style>
