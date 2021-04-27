

const app = Vue.createApp({
  data() {
      return {

      }
  }
});


app.component('app-header', {
  name: 'AppHeader',
  template: `
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top" id="nav-resize" :key="$route.fullPath">
  <router-link class="nav-link text-white" to="/" v-if="!isLoggedIn()"><i class="fa fa-car"></i>&nbsp&nbsp&nbsp&nbspUnited Auto Sales</router-link>
  <router-link class="nav-link text-white" to="/explore" v-if="isLoggedIn()"><i class="fa fa-car"></i>&nbsp&nbsp&nbsp&nbspUnited Auto Sales</router-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
  
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      
      <ul class="navbar-nav once_loggedIn mr-auto" v-if="isLoggedIn()">
          <li class="nav-item active">
              <router-link class="nav-link" to="/cars/new">Add Car <span class="sr-only">(current)</span></router-link>
          </li>
          <li class="nav-item active">
              <router-link class="nav-link" to="/explore">Explore <span class="sr-only">(current)</span></router-link>
          </li>
          <li class="nav-item active">
              <a href="#" class="nav-link" @click="idpush" >My Profile <span class="sr-only">(current)</span></a>
          </li>
      </ul>
    
      <ul class="navbar-nav ml-auto">
        <li class="nav-item active" v-if="!isLoggedIn()">
          <router-link class="nav-link" to="/register">Register <span class="sr-only">(current)</span></router-link>
        </li>
        <li class="nav-item active" v-if="!isLoggedIn()">
          <router-link class="nav-link" to="/login">Login <span class="sr-only">(current)</span></router-link>
        </li>
        <li class="nav-item active" v-if="isLoggedIn()">
          <router-link class="nav-link" to="/logout">Logout <span class="sr-only">(current)</span></router-link>
        </li>
      </ul>

    </div>
  </nav>
  `,
  data() {
    return {}
}, 
methods: {
    isLoggedIn: function() {
        if (localStorage.hasOwnProperty('token') === true) {
            return true;
        }
        return false;
    },
    idpush(){
        let user=localStorage.getItem("current_user");
        router.push({ name: 'users', params: { id: user}}); 
    }
}
});

app.component('app-footer', {
  name: 'AppFooter',
  template: `
  <footer>
      <br><br>
      <div class="container">
          <p>Copyright &copy; United Auto Sales.</p>
      </div>
  </footer>
  `
});

const Home = {
    name: 'Home',
    template: `
    <br><br>
        <div class="d-flex align-items-center home-div col-md-12">
            <div class="row align-items-center col-md-6 intro">
                <h1 class="font-weight-bold">Buy and Sell Cars Online</h1>
                <p class="mt-2 mb-4 text-secondary">United Auto Sales provides the fastest, easiest and most user friendly way to buy or sell cars online.
                 Find a Great Price on the Vehicle You Want</p>
                <div class="flex-area">
                    <button @click="toRegister" class="btn bg-primary text-white" type="button">Register</button>
                    <button @click="toLogin" class="btn text-white btn_color" type="button">Login</button>
                </div>
            </div>
            <div class="fit col-md-6">
                <img  src="static/imgs/audi.jpg">
            </div>
        </div>
    `,
    data() {
        return {}
    }, 
    methods: {
        toRegister: function() {
            this.$router.push({ path: '/register' });
        },
        toLogin: function() {
            this.$router.push({ path: '/login' });
        }
    },
};

// forms
 
const registerForm = {
  name:'register-form', 
  template: `
  <br><br> <br><br>         
  <div class="container">
      <div id="centerDiv">
          <div class="register-form center-block">
              <div id = "message">
                  <p class="alert alert-success" v-if="success" id = "success"> {{ message }} </p>
                  <ul class="alert alert-danger" v-if="outcome === 'failure'" id = "errors">
                      <li v-for="error in errors" class="news__item"> {{ error }}</li>
                  </ul> 
              </div>
              <h1>Register New User</h1>
              <form id="registerForm" @submit.prevent="registerUser" method="post" enctype="multipart/form-data">
                  <div class="form-group">
                      <label for="username"><b>Username</b></label> <input class="form-control" id="username" name="username" type="text" value="">
                  </div>
                  <div class="form-group">
                      <label for="password"><b>Password</b></label> <input class="form-control" id="password" name="password" type="password" value="">
                  </div>
                  <div class="form-group">
                      <label for="firstName"><b>Fullname</b></label> <input class="form-control" id="fullName" name="firstName" type="text" value="">
                  </div>
                  <div class="form-group">
                      <label for="email"><b>Email</b></label> <input class="form-control" id="email" name="email" type="text" value="">
                  </div>
                  <div class="form-group">
                      <label for="location"><b>Location</b></label> <input class="form-control" id="location" name="location" type="text" value="">
                  </div>
                  <div class="form-group">
                      <label for="biography"><b>Biography</b></label> <textarea class="form-control" id="biography" name="biography"></textarea>
                  </div>
                  <div class="form-group">
                      <label for="photo">Profile Photo</label>
                      <input class="form-control"  id="photo" name="photo" type="file">
                  </div>
                
                  <button type="submit" name="submit" class="btn btn-primary btn-block"><b>Register</b></button>
              </form>
        </div>
      </div>
  </div>
  `,
  data(){
      return {
        outcome: '',
        errors: [],
        message: '',
        success: false
      }
  },
  methods: {
    registerUser() {
      let router = this.$router;
      let registerForm = document.getElementById('registerForm');
      let form_data = new FormData(registerForm);
      let self = this;
      fetch("/api/users/register", {
        method: 'POST',
        body: form_data,
        headers: {
          'X-CSRFToken': token
        },
        credentials: 'same-origin'
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (jsonResponse) {
          // display a success message
          console.log(jsonResponse);
          if(jsonResponse.hasOwnProperty('registerError')) {
            self.errors = jsonResponse.registerError.errors;
            self.outcome = 'failure';
          } else {
            successMsg = jsonResponse.successMsg.message;
            displaySuccessMsg = true;
            router.push('login')
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }
};


const loginForm = {
  name:'login-form', 
  template: ` <br><br>
  <div class="center-form m-4 login">
      <h2 class="text-center mb-4">Login to your account</h2>
      <form method="POST" class="form" action="" id="login-form" @submit.prevent="loginUser()">
          <div class="mt-sm-1 mb-sm-1">
              <label class="" for="username">Username</label><br>
              <input type="text" class="form-control form-field login-field" name="username" required>
          </div>
          <div class="mt-sm-3 mb-sm-1">
              <label class="" for="biography">Password</label><br>
              <input type="password" class="form-control form-field login-field" name="password" required>
          </div>
          <button type="submit" name="submit" class="btn  text-white mt-sm-3 mb-sm-1  login-field">Login</button>
      </form>
  </div>
`,
data() {
  return {}
},
methods: {
  loginUser: function() {
      let self = this;
      let loginForm = document.getElementById('login-form');
      let form_data = new FormData(loginForm);

      fetch("/api/auth/login", {
          method: 'POST',
          body: form_data,
          headers: {
              'X-CSRFToken': token
          },
          credentials: 'same-origin'        
      })
      .then(function(response) {
          return response.json();
      })
      .then(function(jsonResponse) {
          if(jsonResponse.errors==undefined){
              if(jsonResponse.token !== null) {
                  let jwt_token = jsonResponse.data.token;
                  let id = jsonResponse.data.id;
                  
                  localStorage.setItem('token', jwt_token);
                  localStorage.setItem('current_user', id);
                  router.push('/explore');
                  swal({title: "Login",text: jsonResponse.data.message,icon: "success",button: "Proceed"});
              }
          }else{
              swal({title: "Logged In",text: jsonResponse.errors[0],icon: "error",button: "Try Again"});  
          }

      })
      .catch(function(error) {
          console.log(error);
      });

  }
}
};

const logout = {
    name: 'Logout',
    template: `
    <h1 class="mt-sm-3">Logging out</h1>
    `,
    created: function() {
        fetch("api/auth/logout", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': token,
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            credentials: 'same-origin'
        })
        .then(function(response){
          return response.json();
        })
        .then(function(jsonResponse){
            window.localStorage.removeItem('token');
            window.localStorage.removeItem('current_user');
            router.push('/');
        })
        .catch(function(error){
          console.log(error);
        });
    }
};

const explorepage = {
  name: 'explorepage',
  template: ` <br><br>
      <div class="container maincontainer" >
          <div id="displayexplore">
              <h2>Explore</h2>
              <div id="explore-search">
                  <form @submit.prevent="search()" id="explore-form" method="GET" >
                      <div class="form-group col-4">
                          <label for="make">Make</label>
                          <input type="text" class="form-control" name="make" />
                      </div>
                      <div class="form-group col-4">
                          <label for="model">Model</label>
                          <input name="model" type="text" class="form-control" />
                      </div>
                      <div class="form-group search-btn-div">
                          <button type="submit" class="btn btn-success  search-btn">Search</button>
                          </div>
                  </form>
              </div>  
              <div class="carslist" v-if="listOfCars[0]">
              <div v-for="cars in listOfCars">
                  <div class="card" style="width: 15rem;">
                      <img class="card-img-top "  :src="cars.photo">
                    <div class="card-body">
                        <div class="name-model-price">
                       <div class="name-model">
                            <span  class="car-name">{{cars.year.concat(" ",cars.make)}}</span>
                         <span class="graytext">{{cars.model}}</span>
                         </div>
                         <a href="#" class="btn btn-success  card-price-btn">
                         <img class="icons" src='/static/images/tagicon.png'>
                         <span><span>$</span>{{cars.price}}</span>
                       </a>
                      </div>
                      <a :href="cars.id" @click="getCarDetails" class="btn btn-primary card-view-btn">View more details</a>
                </div>
                </div>
              </div>
              </div>
          </div>
      </div>
  `,
  created() {
      let self = this;
      fetch("/api/cars", {
          method: 'GET',
          headers: {
              'X-CSRFToken': token,
              'Authorization': 'Bearer ' + localStorage.getItem('token')
          },
          credentials: 'same-origin'        
      })
      .then(function(response) {
          return response.json();
      })
      .then(function(jsonResponse) {
          let count=0
          let temp=[]
          let carz=jsonResponse.data.reverse()
          for (let index = 0; index < carz.length; index++) {
              if (index==3){
                  break;
              }
              temp.push(jsonResponse.data[index]); 
          }
          self.listOfCars=temp;
      })
      .catch(function(error) {
          console.log(error);
      });
  },
  data() {
      return {
          listOfCars : []
      }
  },
  methods: {
      getCarDetails: function(event) {
          event.preventDefault();
          let carid=event.target.getAttribute("href");
          router.push({ name: 'details', params: { id: carid}}); 
      },

      search: function() {
          let self = this;
          let exploreForm = document.getElementById('explore-form');
          let form_data = new FormData(exploreForm);
          
          let form_values = []

          for (var p of form_data) {
              form_values.push(p[1].trim());
          }

          let make = form_values[0];
          let model = form_values[1];

          fetch("/api/search?make=" + make + "&model=" + model, {
              method: 'GET',
              headers: {
                  'X-CSRFToken': token,
                  'Authorization': 'Bearer ' + localStorage.getItem('token')
              },
              credentials: 'same-origin'        
          })
          .then(function(response) {
              return response.json();
          })
          .then(function(jsonResponse) {
              self.listOfCars = jsonResponse.data.reverse();
          })
          .catch(function(error) {
              console.log(error);
          });
      }
  }
};

const User_Page = {
  name: 'User_Page',
  template: ` <br><br>
      <div class="container maincontainer">
          <div id="displayfav">
              <div id="profile">
                  <div id="profileimagediv">
                      <img class="favcar" id="round" :src="user.photo">
                  </div>
                  <div id="profiledetailsdiv" class="descriptions">
                      <h2 id="profile-name">{{user.name}}</h2>
                      <h4 class="graytext">@<span>{{user.username}}</span></h4>
                      <p class="graytext">{{user.biography}}</p>
                      <div >
                          <div>
                              <p class="profile-user-info graytext">Email</p>
                              <p class="profile-user-info graytext">Location</p>
                              <p class="profile-user-info graytext">Joined</p>
                          </div>
                          <div>
                              <p class="profile-user-info">{{user.email}}</p>
                              <p class="profile-user-info">{{user.location}}</p>
                              <p class="profile-user-info">{{user.date_joined}}</p>
                          </div>
                      </div> 
                  </div>
              </div>
              <div ><h1>Cars Favourited</h1></div>
              <div class="carslist">
              <div v-for="cars in listOfCars">
                  <div class="card" style="width: 18rem;">
                      <img class="card-img-top favcar"  :src="cars.photo">
                      <div class="card-body">
                          <div class="name-model-price">
                              <div class="name-model">
                                  <span  class="car-name">{{cars.year.concat(" ",cars.make)}}</span>
                                  <span class="graytext">{{cars.model}}</span>
                              </div>
                              <a href="#" class="btn btn-success card-price-btn">
                                  <img class="icons" src='/static/images/'>
                                  <span><span>$</span>{{cars.price}}</span>
                              </a>
                          </div>
                          <a :href="cars.id" class="btn btn-primary card-view-btn" @click="getCarFavDetails">View more details</a>
                      </div>
                  </div>
              </div>
              </div>
          </div>
      </div>  
  `, 
  created: function() {
      let self=this;
          fetch("/api/users/"+ localStorage.getItem('current_user'), {
              method: 'GET',
              headers: {
                  'X-CSRFToken': token,
                  'Authorization': 'Bearer ' + localStorage.getItem('token')
              },
              credentials: 'same-origin'        
          })
          .then(function(response) {
              return response.json();
          })
          .then(function(jsonResponse) {
              self.userInfo = jsonResponse.data;
              fetch("/api/users/"+ localStorage.getItem('current_user') + "/favourites", {
                  method: 'GET',
                  headers: {
                      'X-CSRFToken': token,
                      'Authorization': 'Bearer ' + localStorage.getItem('token')
                  },
                  credentials: 'same-origin'        
              })
              .then(function(response) {
                  return response.json();
              })
              .then(function(jsonResponse) {
                  self.listOfCars = jsonResponse.data;
              })
              .catch(function(error) {
                  console.log(error);
              });
          })
          .catch(function(error) {
              console.log(error);
          });      
  },
  methods:{
      getCarFavDetails: function(event) {
          event.preventDefault();
          let carid=event.target.getAttribute("href");
          router.push({ name: 'details', params: { id: carid}}); 
      }
  },
  data() {
      return {
          listOfCars: [],
          userInfo: [],
          host:window.location.protocol + "//" + window.location.host
      }
  }
};

const Details = {
  name: 'Details',
  template: ` <br><br>
      <div class="container maincontainer">
          <div id="display-car-details" v-if="details[0]">
              <div id="car-details-card">
                  <img id="car-d-image" class="car-detail-image" :src="details[0].photo" alt="car image in card">
                  <div id="car-details">
                      <h1 id="car-d-heading" > {{details[0].year.concat(" ",details[0].make)}}</h1>
                      <h4 class="graytext">{{details[0].model}}</h4>
                      <p class="car-d-description graytext">{{details[0].description}}</p>
                      <div id="reduce-gap">
                          <div class="cpbd">
                              <div class="cp">
                                  <div>
                                      <p class="car-d-spec graytext">Color</p>
                                  </div>
                                  <div>
                                      <p class="car-d-spec">{{details[0].colour}}</p>
                                  </div>
                              </div>
                              <div class="bd">
                                  <div>
                                      <p class="car-d-spec graytext">Body Type</p>
                                  </div>
                                  <div>
                                      <p class="car-d-spec">{{details[0].type}}</p>
                                  </div>
                              </div>
                              <br>
                          </div>
                          <div class="cpbd">
                              <div class="cp">
                                  <div>
                                      <p class="car-d-spec graytext">Price</p>
                                  </div>
                                  <div>
                                      <p class="car-d-spec">{{details[0].price}}</p>
                                  </div>
                              </div>
                              <div class="bd">
                                  <div>
                                      <p class="car-d-spec graytext">Transmission</p>
                                  </div>
                                  <div>
                                      <p class="car-d-spec">{{details[0].transmission}}</p>
                                  </div>
                              </div>
                              <br>
                          </div>
                      </div>
                      <div id="card-d-btns" >
                          <a href="#" class="btn btn-success ">Email Owner</a>
                          <div " >
                              <button href="#" v-if="fav()" @click="addFavourite" id="heartbtn" class="heart fa fa-heart"></button>
                              <button href="#" v-else @click="addFavourite" id="heartbtn" class="heart fa fa-heart-o fa-heart"></button>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div> 
  `,
  created(){
      let self=this;
      fetch("/api/cars/"+this.$route.params.id, {
          method: 'GET',
          headers: {
              'X-CSRFToken': token,
              'Authorization': 'Bearer ' + localStorage.getItem('token')
          },
          credentials: 'same-origin'        
      })
      .then(function(response) {
          return response.json();
      })
      .then(function(jsonResponse){
          self.details = jsonResponse.data;
          this.isFav=jsonResponse.isFav;
      })
      .catch(function(error) {
          console.log(error);
      });
  }, 
  methods: {
      addFavourite: function(event) {
          event.target.classList.toggle("fa-heart-o");
          if(event.target.classList.contains("fa-heart-o")===false){
              fetch("/api/cars/"+this.$route.params.id+"/favourite", {
                  method: 'POST',
                  body: JSON.stringify({"car_id": this.$route.params.id,"user_id": localStorage.getItem("current_user")}),
                  headers: {
                      'Content-Type': 'application/json',
                      'X-CSRFToken': token,
                      'Authorization': 'Bearer ' + localStorage.getItem('token')
                  },
                  credentials: 'same-origin' 
              })
              .then(function(response) {
                  return response.json();
              })
              .then(function(jsonResponse) {
                  if (jsonResponse.message!=undefined) {
                      
                  }
              })
              .catch(function(error) {
                  console.log(error);
              });
          }
          else{
              fetch("/api/cars/"+this.$route.params.id+"/favourite/remove", {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                      'X-CSRFToken': token,
                      'Authorization': 'Bearer ' + localStorage.getItem('token')
                  },
                  credentials: 'same-origin' 
              })
              .then(function(response) {
                  return response.json();
              })
              .then(function(jsonResponse) {
                  console.log(jsonResponse.data)
              })
              .catch(function(error) {
                  console.log(error);
              });
          }
      },
      fav(){
          if (self.isFav) {
              return true;
          }
          return false;
      
      }
  },
  data(){
      return {
          details: [],
          isFav: false
      }
  }
};


const AddCarForm = {
  name: 'AddCarForm',
  template: ` <br><br>
  <div class="container maincontainer">
  <div class="m-4 ">
      <h2 id="newcar" class="mb-4" >Add New Car</h2>
      <form  @submit.prevent="addCar()" class="form" method="POST" action="" id="car-form" >
          <div class="mt-sm-1 mb-sm-1 d-flex flex-area1">
              <div>
                  <label class="" for="make">Make</label><br>
                  <input type="text" class="form-control form-field" name="make" required>
              </div>
              <div>
                  <label class="" for="model">Model</label><br>
                  <input type="text" class="form-control form-field" name="model" required>
              </div>
          </div>
          <div class="mt-sm-3 mb-sm-1 d-flex flex-area1">
              <div>
                  <label class="" for="colour">Colour</label><br>
                  <input type="text" class="form-control form-field" name="colour" required>
              </div>
              <div>
                  <label class="" for="year">Year</label><br>
                  <input type="text" class="form-control form-field" name="year" required>
              </div>
          </div>
          <div class="mt-sm-3 mb-sm-1 d-flex flex-area1">
              <div>
                  <label class="" for="price">Price</label><br>
                  <input type="number" class="form-control form-field" name="price" required>
              </div>
              <div>
                  <label class="" for="ctype">Car Type</label><br>
                  <select name="ctype" class="form-control form-field" required>
                      <option value="SUV">SUV</option>
                      <option value="Sedan">Sedan</option>
                      <option value="Truck">Truck</option>
                      <option value="Hybrid/Electric">Hybrid/Electric</option>
                      <option value="Coupe">Coupe</option>
                      <option value="Sports Car">Sports Car</option>
                      <option value="Diesel">Diesel</option>                    
                      <option value="Super Car">Super Car</option>
                      <option value="Van">Van</option>
                  </select>
              </div>
          </div>
          <div >
              <label class="" for="transmission">Transmission</label><br>
              <select name="transmission" class="form-control form-field" required>
                  <option value="Automatic">Automatic</option>
                  <option value="Manual">Manual</option>
              </select>
          </div>
          <div>
              <label class="" for="description">Description</label><br>
              <textarea name="description" class="form-control" rows="4" required></textarea><br>
          </div>
          <div class="">
              <label class="" for="photo">Submit Photo</label><br>
              <input type="file" class="form-control form-field" name="photo" accept=".jpeg, .jpg, .png" required>
          </div>
          <button type="submit" name="submit" class="btn color text-white mt-sm-3 mb-sm-1">Save</button>
      </form>
  </div>
  </div>
  `,
  data() {
      return {}
  }, 
  methods: {
      addCar: function() {

          let self = this;
          let CarForm = document.getElementById('car-form');
          let form_data = new FormData(CarForm);

          fetch("/api/cars", {
              method: 'POST',
              body: form_data,
              headers: {
                  'X-CSRFToken': token,
                  'Authorization': 'Bearer ' + localStorage.getItem('token')
              },
              credentials: 'same-origin'        
          })
          .then(function(response) {
              console.log(response);
              return response.json();
          })
          .then(function(jsonResponse) {
              if(jsonResponse.data){
                  router.push('/explore');
                  swal({title: "Add Car",text: jsonResponse.message,icon: "success",button: "Proceed"});
              }else{
                  swal({title: "Add Car",text: jsonResponse.errors[0],icon: "error",button: "Try Again"});
              }
              
          })
          .catch(function(error) {
              console.log(error);
          });
  
      }
      
  }
};



const NotFound = {
  name: 'NotFound',
  template: `
  <div>
      <h1>404 - Not Found</h1>
  </div>
  `,
  data() {
      return {}
  }
};

// Define Routes
const routes = [
  { path: "/", component: Home },

  {path: "/register", component: registerForm},

  {path: "/login", component: loginForm},
  
  { path: "/users/:id",name:"users", component: User_Page },

  {path: "/cars/:id",name:"details", component: Details},

  {path: "/addcar", component: AddCarForm},

  {path: "/explore", component: explorepage},

  // This is a catch all route in case none of the above matches
  {path: "/logout", component: logout},
  
  { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFound }
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes, // short for `routes: routes`
});

app.use(router);

app.mount('#app');
  