<template>
    <div id="secure">
        <h1>{{$t('adminPageTitle')}}</h1>
        <p>
            This is a secure area
        </p>
        <v-btn @click="getProducts">click </v-btn>
    </div>
</template>

<script>
    import db from '../components/firebaseInit'
    export default {
        name: 'Secure',
        data() {
            return {

            };
        },
        methods: {
            getProducts () {
                var docRef = db.collection("products").doc("empanadas");
                docRef.get().then(function(doc) {
                    if (doc.exists) {
                        console.log("Document data:", doc.data());
                    } else {
                        // doc.data() will be undefined in this case
                        console.log("No such document!");
                    }
                }).catch(function(error) {
                    console.log("Error getting document:", error);
                });
            },
        }
    }
</script>