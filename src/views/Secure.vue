<template>
    <div id="secure">
        <h1>{{$t('adminPageTitle')}}</h1>
        <div class="d-flex" v-for="(product, index) in products.rellenos" :key="index">
        <v-card-text>{{ product }}</v-card-text>
        <v-card-actions>
          <v-btn icon @click="deleteProduct(index)"
            ><v-icon>mdi-minus</v-icon></v-btn
          >
        </v-card-actions>
      </div>
    </div>
</template>

<script>
    import db from '../components/firebaseInit'

    export default {
        name: 'Secure',
        data() {
            return {
                products: [] 
            };
        },
        methods: {
            deleteProduct(index) {
                var docRef =  db.collection("products").doc("empanadas");
                const newProducts = {
                    products: {
                        rellenos: this.products.rellenos.splice(index, 1)
                    }
                };
                 docRef.set(newProducts).then(function(doc) {
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
        },
        firestore: {
            products: db.collection("products").doc("empanadas")
        } 
    }
</script>