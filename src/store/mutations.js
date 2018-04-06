import getters from './getters'

const state={
    // header:true,
    loading:false,
    navbar:true
};
const mutations={
    // showHeader(state){
    //     state.header=true;
    // },
    // hideHeader(state){
    //     state.header=false;
    // },
    showLoading(state){
        state.loading=true;
    },
    hideLoading(state){
        state.loading=false;
    },
    showNavbar(state){
        state.navbar=true;
    },
    hideNavbar(state){
        state.navbar=false;
    }
};

export default{
    state,
    mutations,
    getters
}
