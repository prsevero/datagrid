import { shallowMount } from '@vue/test-utils';
import Loading from '@/components/Loading.vue';

describe('Loading.vue', () => {

    let props;
    let mountedLoading;
    const loading = () => {
        if (!mountedLoading) {
            mountedLoading = shallowMount(Loading, {propsData: props});
        }
        return mountedLoading;
    }

    beforeEach(() => {
        mountedLoading = undefined;
    });


    // All tests will go here
    it('should match snapshot', () => {
        const wrapper = loading();
        expect(wrapper.vm.$el).toMatchSnapshot();
    });

    it('always render an img', () => {
        const wrapper = loading();
        expect(wrapper.is('img')).toBe(true);
    });

});
