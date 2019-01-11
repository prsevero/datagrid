import { createLocalVue, shallowMount } from '@vue/test-utils';
import VueRouter from 'vue-router';
import Button from '@/components/Button.vue';
import Input from '@/components/Input.vue';
import Login from '@/views/Login.vue';


const localVue = createLocalVue();
localVue.use(VueRouter);
const router = new VueRouter();


describe('Login.vue', () => {

    let mountedLogin;
    const login = () => {
        if (!mountedLogin) {
            mountedLogin = shallowMount(Login, {localVue, router});
        }
        return mountedLogin;
    }

    beforeEach(() => {
        localStorage.removeItem('token');
        mountedLogin = undefined;
    });

    it('should match snapshot', () => {
        const wrapper = login();
        expect(wrapper.vm.$el).toMatchSnapshot();
    });

    it('always render login div', () => {
        const wrapper = login();
        expect(wrapper.element.id).toMatch('login');
        expect(wrapper.is('div')).toBe(true);
    });

    it('always render a form', () => {
        const wrapper = login();
        expect(wrapper.findAll('form').length).toBe(1);
    });

    it('always render an image', () => {
        const wrapper = login();
        expect(wrapper.findAll('img').length).toBe(1);
    });

    it('always render the username and the password inputs', () => {
        const wrapper = login();
        const inputs = wrapper.findAll(Input);
        expect(inputs.length).toBe(2);
        expect(inputs.at(0).attributes().label).toBe('Username');
        expect(inputs.at(1).attributes().label).toBe('Password');
    });

    it('always render the submit button', () => {
        const wrapper = login();
        const button = wrapper.find(Button);
        expect(button.exists());
        expect(button.attributes().type).toBe('submit');
    });

    it('does not set localStorage token if the credentials are invalid', () => {
        const wrapper = login();
        const button = wrapper.find(Button);
        button.trigger('submit');
        expect(localStorage.getItem('token')).toBeNull();
    });

    describe('when the credentials are valid', () => {
        it('sets localStorage token', () => {
            const wrapper = login();
            const button = wrapper.find(Button);
            wrapper.setData({username: 'username', password: 'password'});
            button.trigger('submit');
            expect(localStorage.getItem('token')).toBe('SAMPLE_TOKEN');
        });

        it('redirects to home', () => {
            const wrapper = login();
            const button = wrapper.find(Button);
            wrapper.setData({username: 'username', password: 'password'});
            button.trigger('submit');
            expect(router.history.current.path).toBe('/');
        });
    });

    it('removes the token from localStorage when logouts', () => {
        const wrapper = login();
        wrapper.vm.login('SAMPLE_TOKEN');
        expect(localStorage.getItem('token')).toBe('SAMPLE_TOKEN');
        wrapper.vm.logout();
        expect(localStorage.getItem('token')).toBeNull();
    });

});
