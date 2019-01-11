import { shallowMount } from '@vue/test-utils';
import Button from '@/components/Button.vue';

describe('Button.vue', () => {

    let props;
    let mountedButton;
    const button = () => {
        if (!mountedButton) {
            mountedButton = shallowMount(Button, {propsData: props});
        }
        return mountedButton;
    }

    beforeEach(() => {
        props = {
            label: '',
        };
        mountedButton = undefined;
    });


    // All tests will go here
    it('should match snapshot', () => {
        const wrapper = button();
        expect(wrapper.vm.$el).toMatchSnapshot();
    });

    it('always render a button', () => {
        const wrapper = button();
        expect(wrapper.is('button')).toBe(true);
    });

    it('should match the label prop to the rendered button text', () => {
        const label = 'Label';
        props.label = label;
        const wrapper = button();
        expect(wrapper.text()).toMatch(label);
    });

    it('should match the prop type to the type of the rendered button', () => {
        const type = 'button';
        props.type = type;
        const wrapper = button();
        expect(wrapper.element.type).toMatch(type);
    });

});
