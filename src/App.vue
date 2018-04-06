<template>
  <div id="app">
      <keep-alive>
        <router-view class="Router" v-if="!$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    <Navbar v-show="navbarShow"></Navbar>
  </div>
</template>

<script>
  import Navbar from './components/navbar/Navbar.vue'
  import { mapGetters } from 'vuex'

  export default {
    data () {
      return {
        isLogin: false,
        transitionName: 'slide-right'
      }
    },
    computed: mapGetters([
                   'navbarShow',
                   'loading'
                 ]),

    watch: {
      $route (to, from) {
        if (to.path == '/home' || to.path == '/lotteryCentre' || to.path == '/trend' || to.path == '/userInfo' || to.path == '/userinfo') {
          this.$store.dispatch('showNavbar')
        } else {
          this.$store.dispatch('hideNavbar')
        }
        this.$nextTick(() => {
          this.objBlur()
        })
      }
    },
    methods: {
      objBlur(times){
        let obj = document.getElementsByTagName('input'),
          timess = times || 300,
          docTouchend = function(event){
            if(event.target.tagName.toLocaleLowerCase() != 'input'){
              setTimeout(function(){
                for(let i = 0;i < obj.length;i++){
                  obj[i].blur()
                  document.body.scrollTop = 0
                }
                document.removeEventListener('touchend', docTouchend,false)
              },timess);
            }else{
              document.removeEventListener('touchend', docTouchend,false)
            }
          }
        if(obj){
          for(let i = 0;i<obj.length;i++){
            obj[i].addEventListener('focus', function(){
              document.addEventListener('touchend', docTouchend,false)
            },false)
            obj[i].addEventListener('keyup',function(e){
              if(event.keyCode == 13){
                setTimeout(function(){
                  for(let i = 0;i < obj.length;i++){
                    obj[i].blur()
                  }
                },300);
              }
            })
          }
        }
      }
    },
    components: {
      Navbar
    }
  }
</script>

<style>
  .Router {
    position: absolute;
    width: 100%;
    transition: all .8s ease;
  }


</style>
