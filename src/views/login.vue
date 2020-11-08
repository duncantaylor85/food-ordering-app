<template>
    <div id="login">
        <br>
        <h2>{{$t('loginLabel')}}</h2>
        <br>
         <v-text-field
            type="text"
            :label="$t('usernameLabel')"
            v-model="input.username" 
          ></v-text-field>
          <v-text-field
            type="text"
            :label="$t('passwordLabel')"
            v-model="input.password" 
          ></v-text-field>
          <br>
        <v-btn color="primary" v-on:click="login()">{{$t('loginLabel')}}</v-btn>
    </div>
</template>

<script>
    export default {
        name: 'Login',
        data() {
            return {
                input: {
                    username: "",
                    password: ""
                }
            }
        },
        methods: {
            login() {
                if(this.input.username != "" && this.input.password != "") {
                    if(this.input.username == 'natalya' && this.input.password == 'natalya123') {
                        this.$emit("authenticated", true);
                        this.$router.replace({ name: "secure" });
                    } else {
                        console.log("The username and / or password is incorrect");
                    }
                } else {
                    console.log("A username and password must be present");
                }
            }
        }
    }
</script>
