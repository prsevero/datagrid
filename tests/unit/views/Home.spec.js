import { shallowMount } from '@vue/test-utils';
import Home from '@/views/Home.vue';
import fetch from 'node-fetch';
global.fetch = fetch;


describe('Home.vue', () => {

    let mountedHome;
    const home = () => {
        if (!mountedHome) {
            mountedHome = shallowMount(Home, {
                mocks: {
                    fetch: (url) => {
                        return Promise.resolve({data: 'testing'});
                    },
                },
            });
        }
        return mountedHome;
    }

    beforeEach(() => {
        mountedHome = undefined;
    });

    it('should match snapshot', () => {
        const wrapper = home();
        expect(wrapper.vm.$el).toMatchSnapshot();
    });

    it('always render home div', () => {
        const wrapper = home();
        expect(wrapper.element.className).toMatch('home');
        expect(wrapper.is('div')).toBe(true);
    });

    it('should fetch data when mount', done => {
        const wrapper = home();
        expect(wrapper.vm.isLoading).toBeTruthy();
        setTimeout(() => {
            expect(wrapper.vm.isLoading).toBeFalsy();
            done();
        }, 500);
    });

    it('should set items when saving data', done => {
        const data = [0, 1, 2, 3];
        const wrapper = home();
        wrapper.vm.save(data);
        setTimeout(() => {
            expect(wrapper.vm.items).toEqual(data);
            done();
        }, 500);
    });

});
