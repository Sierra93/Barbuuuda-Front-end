import Main from '../components/main.vue';
import NavMenu from '../components/nav-menu.vue';
// import $ from "jquery";

export default {
    name: 'main-page',
    components: {
        Main,
        NavMenu
    },
    data() {
        return {

        }
    },
    created() {

    },
    methods: {
        // onChangeTab(evt, type) {
        //     var i, tabcontent, tablinks;
        
        //     if (type == "login") {
        //       $(".tab-role").removeClass("role-show");
        //       $(".tab-role").addClass("role-hide");
        //       $(".register").removeClass("selected-role");
        //       $(".tab-role").addClass("not-selected-role");
        //     }
        
        //     if (type == "register") {
        //       $(".tab-role").removeClass("role-hide");
        //       $(".tab-role").addClass("role-show");
        //       $(".register").addClass("selected-role");
        //     }
        
        //     // Get all elements with class="tabcontent" and hide them
        //     tabcontent = document.getElementsByClassName("tabcontent");
        
        //     for (i = 0; i < tabcontent.length; i++) {
        //       tabcontent[i].style.display = "none";
        //     }
        
        //     // Get all elements with class="tablinks" and remove the class "active"
        //     tablinks = document.getElementsByClassName("tablinks");
        
        //     for (i = 0; i < tablinks.length; i++) {
        //       tablinks[i].className = tablinks[i].className.replace(" active", "");
        //     }
        
        //     // Show the current tab, and add an "active" class to the button that opened the tab
        //     document.getElementById(type).style.display = "block";
        //     evt.currentTarget.className += " active";
        //   }
    }
}