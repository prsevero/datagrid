import { shallowMount } from '@vue/test-utils';
import Input from '@/components/Input.vue';

describe('Input.vue', () => {

    let props;
    let mountedInput;
    const input = () => {
        if (!mountedInput) {
            mountedInput = shallowMount(Input, {propsData: props});
        }
        return mountedInput;
    }

    beforeEach(() => {
        props = {
            label: '',
            type: '',
        };
        mountedInput = undefined;
    });


    // All tests will go here
    it('should match snapshot', () => {
        const wrapper = input();
        expect(wrapper.vm.$el).toMatchSnapshot();
    });

    it('always render an input and a span inside a label', () => {
        const wrapper = input();
        expect(wrapper.is('label')).toBe(true);
        expect(wrapper.findAll('input').length).toBe(1);
        expect(wrapper.findAll('span').length).toBe(1);
    });

    it('should match the label prop to the span text', () => {
        const label = 'Label';
        props.label = label;
        const wrapper = input();
        expect(wrapper.find('span').text()).toBe(label);
    });

    it('should match the label prop to the span text', () => {
        const type = 'text';
        props.type = type;
        const wrapper = input();
        expect(wrapper.find('input').element.type).toBe(type);
    });

    it('should match the value prop to the input value', () => {
        const value = 'value';
        props.value = value;
        const wrapper = input();
        expect(wrapper.find('input').element.value).toBe(value);
    });

    it('should be required if the required prop is true', () => {
        props.required = true;
        const wrapper = input();
        expect(wrapper.find('input').element.required).toBeTruthy();
    });

    it('should has error class if hasError prop is true', () => {
        props.hasError = true;
        const wrapper = input();
        expect(wrapper.find('input').element.className).toBe('input-error');
    });

});
