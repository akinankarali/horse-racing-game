import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import HorseTable from '@/components/HorseTable.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('HorseTable.vue', () => {
  let getters;
  let store;

  beforeEach(() => {
    getters = {
      allHorses: () => [
        { id: 1, title: 'Thunderbolt', condition: 85, color: 'red' },
        { id: 2, title: 'Majesty', condition: 90, color: 'blue' },
      ],
    };

    store = new Vuex.Store({
      getters,
    });
  });

  it('renders a table with horse data', () => {
    const wrapper = shallowMount(HorseTable, { store, localVue });

    const headers = wrapper.findAll('th');
    expect(headers.at(0).text()).toBe('Title');
    expect(headers.at(1).text()).toBe('Condition');
    expect(headers.at(2).text()).toBe('Color');

    const rows = wrapper.findAll('tbody tr');
    expect(rows.length).toBe(2);

    const firstRowCells = rows.at(0).findAll('td');
    expect(firstRowCells.at(0).text()).toBe('Thunderbolt');
    expect(firstRowCells.at(1).text()).toBe('85');
    expect(firstRowCells.at(2).find('div').attributes('style')).toContain(
      'background-color: red'
    );

    const secondRowCells = rows.at(1).findAll('td');
    expect(secondRowCells.at(0).text()).toBe('Majesty');
    expect(secondRowCells.at(1).text()).toBe('90');
    expect(secondRowCells.at(2).find('div').attributes('style')).toContain(
      'background-color: blue'
    );
  });
});
