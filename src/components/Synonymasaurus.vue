<template>
  <div class="synonymasaurus">
    <form v-on:submit.prevent="findWords"><!-- event handler to allow the findWords method to handle this form submission. -->
      <p>Find synonyms for <input type="text" v-model="synonym"><button type="submit">Search</button></p>
    </form>
    <!-- results list shows only if there are results and if the length is greater than 0. -->
    <ul class="results" v-if="((results)&&(results.length>0))">
      <!-- loops through the items in the results. -->
      <li class="item" v-for="item in results">
        <p><strong>{{item.word}}</strong></p>
        <p>{{item.score}}</p>
      </li>
    </ul>
    <!-- this message only shows if there are no results returned (but we have actually attempted a request). -->
    <div class="no-results" v-if="results==0">
      <h2>No Words Found</h2>
      <p>Please adjust your search to find more words.</p>
    </div>

    <!--this errors list shows only if there are errors and if the length is greater than 0. -->
    <ul class="errors" v-if="errors.length>0">
      <!--loops through the errors. -->
      <li v-for="error in errors">
        {{error.message}}
      </li>
    </ul>
    <ul class="links">
  <li><router-link v-bind:to = "{name:'Rhymesaurus'}">Rhymesaurus</router-link></li>  
  </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Synonymasaurus',
  data () {
    return {
      results: null,
      errors: [],
      synonym: ''
    }
  },
    //findWords method.
    methods: {
      findWords:function() {
        axios.get('https://api.datamuse.com/words', {
          params: {
            rel_syn:this.synonym
          }
          })
          .then(response=> {
            this.results=response.data;
          })
          .catch(error => {
            this.errors.push(error);
          });
        }
      }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.synonymasaurus {
  font-size: 1.4rem;
}

input[type="text"]{
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 1px solid #333;
  width: 300px;
  font-size: 1.4rem;
  color: #2c3e50;
  font-weight: 300;
  background: rgba(0,0,0,0.02);
  padding: 0.5rem;
}
button{
  background: #333;
  padding: 0.5rem;
  font-weight: 300;
  color: #fff;
  border: none;
  cursor: pointer;
  font-size: 1.4rem;
}
h1, h2 {
  font-weight: normal;
}

ul.results {
  list-style-type: none;
  padding: 0;
}
ul.links {
  list-style-type:none;
}

.results li {
  display: inline-block;
  margin: 10px;
  border: solid 1px #333;
  padding: 0.5rem;
  width: 200px;
  min-height: 100px;
  color: #fff;
  background: rgba(0,0,0,0.7);
}
ul.errors {
  list-style-type: none;
}
.errors li {
  border: 1px solid red;
  color: red;
  padding: 0.5rem;
  margin: 10px 0;
}

a {
  color: #42b983;
}
</style>
