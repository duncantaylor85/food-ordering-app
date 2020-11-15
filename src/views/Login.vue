<template>
    <div id="login">
        <br>
        <v-card id="login" class="mx-auto mt-2" max-width="600" height="300" color="#FFECC8">
            <v-card-title> {{$t('loginLabel')}} </v-card-title>
            <v-form  @keyup.native.enter="login()">
                <v-card-text>
                    <v-text-field 
                        type="text"
                        :label="$t('usernameLabel')"
                        v-model="input.username" 
                    ></v-text-field>
                    <v-text-field
                        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="show ? 'text' : 'password'"
                        name="input-10-2"
                        :label="$t('passwordLabel')"
                        class="input-group--focused"
                        @click:append="show = !show"
                        v-model="input.password" 
                    ></v-text-field>
                </v-card-text>
                <v-card-actions class="pt-0">
                <v-btn
                    text
                    color="primary"
                    @click="login()"
                >
                    {{$t('loginLabel')}}
                </v-btn>
                </v-card-actions>
            </v-form>
        </v-card>
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
                },
                show: false
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
