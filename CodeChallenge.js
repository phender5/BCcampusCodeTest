import Vue from "vue";
import moment from "moment";

var app = new Vue({
  
    el : '#app',
    
    data : function(){
      return {
        sources : [
          {
            name: 'collection.bccampus.ca',
            on: true,
            url : 'https://collection.bccampus.ca/wp-json/wp/v2/oer?per_page=13&order=asc',
            posts : []
          },
          {
            name: 'open.bccampus.ca',
            on: true,
            url : 'https://open.bccampus.ca/wp-json/wp/v2/posts?per_page=7&order=asc',
            posts : []
          }
        ]
      }
    },
    
    filters: {
      
      // Using Moment.js to convert post date to a readable format
      prettyDate: function(value){
        
        // Return if date is empty
        if(!value) return '';
        
        // Convert date to Moment.js
        var date = moment.utc(value);
        
        // Return formatted date
        return date.format("MMMM DD, YYYY,");
        
      }
      
    }, 
    
    methods: {
      
      // Load all posts from separate APIs
      loadPosts : function(){
        
        var self = this;
        
        self.sources.forEach(function(source, index){
          
          self.$delete(source, 'posts');
            
          // Get API with vue-resource     
          self.$http.get(source.url).then(function(response)  {
  
            self.$set(source, 'posts', response.data);
  
          }, function(response) {
  
            console.log('Error');
  
          });
          
        });
        
      }
      
    },
    
    mounted : function(){
      
      this.$nextTick(function(){
  
        // Load posts on initial page load
        this.loadPosts();
        
      });
      
    }
    
  });
