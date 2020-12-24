import NavMenu from '../components/nav-menu.vue';
import $ from "jquery";
import VueRouter from 'vue-router';

export default {
    name: 'nav-menu',
    components: {
        NavMenu,
        VueRouter
    },
    data() {
        return {

        }
    },
    created() {

    },
    methods: {
        // Функция отображает/скрывает левую панель.
        onStateLeftPanel() {
            this.bHideLeftPanel = $(".left-menu").hasClass("left-panel");
            this.bHideLeftPanel ? $(".left-menu").removeClass("left-panel").addClass("left-panel-not-left") : $(".left-menu").removeClass("left-panel-not-left").addClass("left-panel");
        }
    }
}