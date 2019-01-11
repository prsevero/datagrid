import { createLocalVue, shallowMount } from '@vue/test-utils';
import VueRouter from 'vue-router';
import Navigation from '@/components/Navigation.vue';


const localVue = createLocalVue();
localVue.use(VueRouter);


describe('Navigation.vue', () => {

    let mountedNavigation;
    const navigation = () => {
        if (!mountedNavigation) {
            mountedNavigation = shallowMount(Navigation, {localVue});
        }
        return mountedNavigation;
    }

    beforeEach(() => {
        mountedNavigation = undefined;
    });


    // All tests will go here
    it('should match snapshot', () => {
        const wrapper = navigation();
        expect(wrapper.vm.$el).toMatchSnapshot();
    });

    it('always render a nav', () => {
        const wrapper = navigation();
        expect(wrapper.is('nav')).toBe(true);
    });

    it('the rendered navigation contains a home link', () => {
        const wrapper = navigation();
        expect(wrapper.findAll('router-link-stub[to="/"]').length).toBeGreaterThan(0);
    });

    it('the rendered navigation contains a logout link', () => {
        const wrapper = navigation();
        expect(wrapper.findAll('router-link-stub[to="/logout"]').length).toBeGreaterThan(0);
    });

});
