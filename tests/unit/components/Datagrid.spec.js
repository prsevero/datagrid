import { shallowMount } from '@vue/test-utils';
import Datagrid from '@/components/Datagrid.vue';
import moment from 'moment';


describe('Datagrid.vue', () => {

    let props;
    let mountedDatagrid;
    const datagrid = () => {
        if (!mountedDatagrid) {
            mountedDatagrid = shallowMount(Datagrid, {propsData: props});
        }
        return mountedDatagrid;
    }

    beforeEach(() => {
        props = {
            itemKeys: [],
            items: [],
            save: jest.fn(),
        };
        mountedDatagrid = undefined;
    });


    // All tests will go here
    it('should match snapshot', () => {
        const wrapper = datagrid();
        expect(wrapper.vm.$el).toMatchSnapshot();
    });


    it('always render a datagrid', () => {
        const wrapper = datagrid();
        expect(wrapper.is('table')).toBe(true);
    });


    describe('Headers', () => {
        it('should not render headers if it is not passed', () => {
            const wrapper = datagrid();
            expect(wrapper.findAll('thead').length).toBe(0);
        });


        it('should not render headers if it is passed, but do not has itemKeys', () => {
            const headers = [0, 'ID', {key: 0}, {key: 'ID'}];
            props.headers = headers;
            const wrapper = datagrid();
            expect(wrapper.findAll('thead').length).toBe(0);
        });


        it('should render headers and filters correctly if it is passed the headers and itemKeys', () => {
            const headers = [0, 'ID', 2, '3'];
            const itemKeys = [0, 1, {key: 2}, {key: 3}];
            props.headers = headers;
            props.itemKeys = itemKeys;

            const wrapper = datagrid();
            expect(wrapper.findAll('thead').length).toBe(1);
            expect(wrapper.findAll('tr:first-child th').length).toBe(headers.length);
            expect(wrapper.findAll('tr:last-child th').length).toBe(headers.length);
            expect(wrapper.findAll('tr:last-child input').length).toBe(headers.length);
        });


        it('should render headers with the passed values if it is passed the headers and itemKeys', () => {
            const headers = [0, 'ID', '2'];
            const itemKeys = [0, 1, {key: 2}, 3];
            props.headers = headers;
            props.itemKeys = itemKeys;

            const wrapper = datagrid();
            const ths = wrapper.findAll('tr:first-child th');
            expect(ths.at(0).text()).toBe(`${headers[0]}`);
            expect(ths.at(1).text()).toBe(headers[1]);
            expect(ths.at(2).text()).toBe(`${headers[2]}`);
        });


        it('should render the style if it is passed', () => {
            const headers = [0, 'ID', '2'];
            const itemKeys = [
                {key: 0, style: {textAlign: 'center'}},
                1,
                {key: 2, style: {textAlign: 'center'}},
            ];
            props.headers = headers;
            props.itemKeys = itemKeys;
            const wrapper = datagrid();

            const ths = wrapper.findAll('thead tr:first-child th');
            expect(ths.at(0).attributes().style).toBe('text-align: center;');
            expect(ths.at(1).attributes().style).toBeUndefined();
            expect(ths.at(2).attributes().style).toBe('text-align: center;');
        });
    });


    describe('Body', () => {

        it('should always render tbody', () => {
            const wrapper = datagrid();
            expect(wrapper.findAll('tbody').length).toBe(1);
        });


        it('should not render any row in tbody if there is no items', () => {
            const wrapper = datagrid();
            expect(wrapper.findAll('tbody tr').length).toBe(0);
        });


        it('tbody rows should match the items length when itemKeys is also passed', done => {
            const itemKeys = [0, 0, 0, 0];
            const items = [[0], [1], [2], ['3']];
            props.itemKeys = itemKeys;
            props.items = items;
            const wrapper = datagrid();

            setTimeout(() => {
                expect(wrapper.findAll('tbody tr').length).toBe(items.length);
                done();
            }, 100);
        });


        it('should handle both index as integer or object', done => {
            const itemKeys = [0, {key: 0}];
            const items = [['ID'], ['Name']];
            props.itemKeys = itemKeys;
            props.items = items;
            const wrapper = datagrid();

            setTimeout(() => {
                const trs = wrapper.findAll('tbody tr');
                expect(trs.at(0).find('td').text()).toBe(items[0][itemKeys[0]]);
                expect(trs.at(1).find('td').text()).toBe(items[1][itemKeys[1].key]);
                done();
            }, 100);
        });


        it('should format a date correctly', done => {
            const today = moment();
            const tomorrow = today.clone().add(1, 'day');
            const format = 'YYYY-MM-DD';

            const itemKeys = [{fn: 'format', format: format, key: 0, type: 'date'}];
            const items = [[today.toDate()], [tomorrow.toDate()]];
            props.itemKeys = itemKeys;
            props.items = items;
            const wrapper = datagrid();

            setTimeout(() => {
                const trs = wrapper.findAll('tbody tr');
                expect(trs.at(0).find('td').text()).toBe(today.format(format));
                expect(trs.at(1).find('td').text()).toBe(tomorrow.format(format));
                done();
            }, 100);
        });


        it('should parse a string as a number when sorting when the type is specified', done => {
            const itemKeys = [0];
            const items = [['1'], ['2.2']];
            props.itemKeys = itemKeys;
            props.items = items;
            const wrapper = datagrid();

            setTimeout(() => {
                wrapper.vm.sort({key: 0, type: 'number'});
                const trs = wrapper.findAll('tbody tr');
                expect(parseFloat(trs.at(0).find('td').text())).toBe(1);
                expect(parseFloat(trs.at(1).find('td').text())).toBe(2.2);
                done();
            }, 100);
        });


        it('should render an input if the item index is editable', done => {
            const itemKeys = [0, {key: 1}, {key: 2, editable: true}];
            const items = [['ID', 'Name', 'Description'], ['ID', 'Name', 'Description']];
            props.itemKeys = itemKeys;
            props.items = items;
            const wrapper = datagrid();

            setTimeout(() => {
                const trs = wrapper.findAll('tbody tr');
                expect(trs.at(0).findAll('input').length).toBe(1);
                expect(trs.at(1).findAll('input').length).toBe(1);
                done();
            }, 100);
        });


        it('should call onSave function when blur or press enter in an editable input', done => {
            const itemKeys = [0, {key: 1}, {key: 2, editable: true}];
            const items = [['ID', 'Name', 'Description'], ['ID', 'Name', 'Description']];
            props.itemKeys = itemKeys;
            props.items = items;
            const wrapper = datagrid();
            wrapper.setMethods({onSave: jest.fn()});

            setTimeout(() => {
                const trs = wrapper.findAll('tbody tr');
                const input = trs.at(0).find('input');
                expect(wrapper.vm.onSave).toHaveBeenCalledTimes(0);
                input.trigger('blur');
                expect(wrapper.vm.onSave).toHaveBeenCalledTimes(1);
                input.trigger('keyup.enter');
                expect(wrapper.vm.onSave).toHaveBeenCalledTimes(2);
                done();
            }, 100);
        });


        it('should render the td style if it is passed', done => {
            const itemKeys = [
                {key: 0, tdStyle: {textAlign: 'center'}},
                1,
                {key: 2, tdStyle: {textAlign: 'center'}},
            ];
            const items = [['ID', 'Name', 'Description']];
            props.itemKeys = itemKeys;
            props.items = items;
            const wrapper = datagrid();

            setTimeout(() => {
                const trs = wrapper.findAll('tbody tr');
                expect(trs.at(0).findAll('td').at(0).attributes().style).toBe('text-align: center;');
                expect(trs.at(0).findAll('td').at(2).attributes().style).toBe('text-align: center;');
                done();
            }, 100);
        });


        it('should render both style and td style if it is passed', done => {
            const itemKeys = [
                {key: 0, style: {fontSize: '20px'}, tdStyle: {textAlign: 'center'}},
                1,
                {key: 2, style: {fontSize: '20px'}, tdStyle: {textAlign: 'center'}},
            ];
            const items = [['ID', 'Name', 'Description']];
            props.itemKeys = itemKeys;
            props.items = items;
            const wrapper = datagrid();

            setTimeout(() => {
                const trs = wrapper.findAll('tbody tr');
                expect(trs.at(0).findAll('td').at(0).attributes().style).toBe('font-size: 20px; text-align: center;');
                expect(trs.at(0).findAll('td').at(2).attributes().style).toBe('font-size: 20px; text-align: center;');
                done();
            }, 100);
        });


        it('should sort things correctly by the parameter', done => {
            const headers = ['Name', 'Value'];
            const itemKeys = [0, 1];
            const items = [['Z', 10], ['P', -5], ['M', 0], ['A', 5]];
            props.headers = headers;
            props.itemKeys = itemKeys;
            props.items = items;
            const wrapper = datagrid();

            setTimeout(() => {
                const ths = wrapper.findAll('thead tr:first-child th');
                let trs = wrapper.findAll('tbody tr');

                // Original order
                expect(trs.at(0).findAll('td').at(0).text()).toBe('Z');
                expect(trs.at(0).findAll('td').at(1).text()).toBe('10');
                expect(trs.at(1).findAll('td').at(0).text()).toBe('P');
                expect(trs.at(1).findAll('td').at(1).text()).toBe('-5');
                expect(trs.at(2).findAll('td').at(0).text()).toBe('M');
                expect(trs.at(2).findAll('td').at(1).text()).toBe('0');
                expect(trs.at(3).findAll('td').at(0).text()).toBe('A');
                expect(trs.at(3).findAll('td').at(1).text()).toBe('5');

                // Order by name
                ths.at(0).trigger('click');
                trs = wrapper.findAll('tbody tr');
                expect(trs.at(0).findAll('td').at(0).text()).toBe('A');
                expect(trs.at(0).findAll('td').at(1).text()).toBe('5');
                expect(trs.at(1).findAll('td').at(0).text()).toBe('M');
                expect(trs.at(1).findAll('td').at(1).text()).toBe('0');
                expect(trs.at(2).findAll('td').at(0).text()).toBe('P');
                expect(trs.at(2).findAll('td').at(1).text()).toBe('-5');
                expect(trs.at(3).findAll('td').at(0).text()).toBe('Z');
                expect(trs.at(3).findAll('td').at(1).text()).toBe('10');

                // Order by name descendent
                ths.at(0).trigger('click');
                trs = wrapper.findAll('tbody tr');
                expect(trs.at(0).findAll('td').at(0).text()).toBe('Z');
                expect(trs.at(0).findAll('td').at(1).text()).toBe('10');
                expect(trs.at(1).findAll('td').at(0).text()).toBe('P');
                expect(trs.at(1).findAll('td').at(1).text()).toBe('-5');
                expect(trs.at(2).findAll('td').at(0).text()).toBe('M');
                expect(trs.at(2).findAll('td').at(1).text()).toBe('0');
                expect(trs.at(3).findAll('td').at(0).text()).toBe('A');
                expect(trs.at(3).findAll('td').at(1).text()).toBe('5');

                // Order by value
                ths.at(1).trigger('click');
                trs = wrapper.findAll('tbody tr');
                expect(trs.at(0).findAll('td').at(0).text()).toBe('P');
                expect(trs.at(0).findAll('td').at(1).text()).toBe('-5');
                expect(trs.at(1).findAll('td').at(0).text()).toBe('M');
                expect(trs.at(1).findAll('td').at(1).text()).toBe('0');
                expect(trs.at(2).findAll('td').at(0).text()).toBe('A');
                expect(trs.at(2).findAll('td').at(1).text()).toBe('5');
                expect(trs.at(3).findAll('td').at(0).text()).toBe('Z');
                expect(trs.at(3).findAll('td').at(1).text()).toBe('10');

                // Order by value descendent
                ths.at(1).trigger('click');
                trs = wrapper.findAll('tbody tr');
                expect(trs.at(0).findAll('td').at(0).text()).toBe('Z');
                expect(trs.at(0).findAll('td').at(1).text()).toBe('10');
                expect(trs.at(1).findAll('td').at(0).text()).toBe('A');
                expect(trs.at(1).findAll('td').at(1).text()).toBe('5');
                expect(trs.at(2).findAll('td').at(0).text()).toBe('M');
                expect(trs.at(2).findAll('td').at(1).text()).toBe('0');
                expect(trs.at(3).findAll('td').at(0).text()).toBe('P');
                expect(trs.at(3).findAll('td').at(1).text()).toBe('-5');

                done();
            }, 100);
        });


        it('should filter things correctly by the parameter', done => {
            const headers = ['Name', 'Value'];
            const itemKeys = [0, 1];
            const items = [['Z', 0], ['P', -5], ['M', 0], ['A', 5]];
            props.headers = headers;
            props.itemKeys = itemKeys;
            props.items = items;
            const wrapper = datagrid();

            setTimeout(() => {
                const ths = wrapper.findAll('thead tr:first-child th');
                let trs = wrapper.findAll('tbody tr');

                // Original data
                expect(trs.length).toBe(items.length);

                // Filter by name
                wrapper.setData({filters: ['a']});
                wrapper.find('thead input').trigger('input');
                trs = wrapper.findAll('tbody tr');
                expect(trs.length).toBe(1);
                expect(trs.at(0).findAll('td').at(0).text()).toBe('A');
                expect(trs.at(0).findAll('td').at(1).text()).toBe('5');

                // Filter by unexisting name
                wrapper.setData({filters: ['B']});
                wrapper.find('thead input').trigger('input');
                trs = wrapper.findAll('tbody tr');
                expect(trs.length).toBe(0);

                // Filter by value
                wrapper.setData({filters: [, 0]});
                wrapper.find('thead input').trigger('input');
                trs = wrapper.findAll('tbody tr');
                expect(trs.length).toBe(2);
                expect(trs.at(0).findAll('td').at(0).text()).toBe('Z');
                expect(trs.at(0).findAll('td').at(1).text()).toBe('0');
                expect(trs.at(1).findAll('td').at(0).text()).toBe('M');
                expect(trs.at(1).findAll('td').at(1).text()).toBe('0');

                // Filter by unexisting value
                wrapper.setData({filters: [, 2]});
                wrapper.find('thead input').trigger('input');
                trs = wrapper.findAll('tbody tr');
                expect(trs.length).toBe(0);

                // Filter by name and value
                wrapper.setData({filters: ['z', 0]});
                wrapper.find('thead input').trigger('input');
                trs = wrapper.findAll('tbody tr');
                expect(trs.length).toBe(1);
                expect(trs.at(0).findAll('td').at(0).text()).toBe('Z');
                expect(trs.at(0).findAll('td').at(1).text()).toBe('0');

                // Filter by unexisting name and value
                wrapper.setData({filters: ['z', 1]});
                wrapper.find('thead input').trigger('input');
                trs = wrapper.findAll('tbody tr');
                expect(trs.length).toBe(0);

                done();
            }, 100);
        });

    });

});
