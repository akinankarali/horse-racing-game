import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Race from '@/components/Race.vue';
import Button from '@/components/Button.vue';
import HorseTable from '@/components/HorseTable.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('Race.vue', () => {
  let actions;
  let getters;
  let store;

  beforeEach(() => {
    actions = {
      generateHorses: jest.fn(),
      generateRaceSchedule: jest.fn(),
      startRace: jest.fn(),
    };

    getters = {
      allHorses: () => [
        { id: 1, title: 'Thunderbolt', condition: 85, color: 'red' },
        { id: 2, title: 'Majesty', condition: 90, color: 'blue' },
      ],
      raceResults: () => [],
      selectedHorses: () => [],
    };

    store = new Vuex.Store({
      actions,
      getters,
    });
  });

  it('renders correctly and buttons work as expected', async () => {
    const wrapper = shallowMount(Race, {
      store,
      localVue,
      stubs: {
        HorseTable,
        Button,
      },
    });

    expect(wrapper.findComponent(HorseTable).exists()).toBe(true);
    const buttons = wrapper.findAllComponents(Button);
    expect(buttons.length).toBe(2);

    expect(buttons.at(0).props('title')).toBe('Generate Race Schedule');
    expect(buttons.at(1).props('title')).toBe('Start Race');
    expect(buttons.at(1).props('disabled')).toBe(true);

    await buttons.at(0).vm.$emit('action');
    expect(actions.generateRaceSchedule).toHaveBeenCalled();
    expect(wrapper.vm.isDisabled).toBe(false);

    await buttons.at(1).vm.$emit('action');
    expect(actions.startRace).toHaveBeenCalled();
  });

  it('calls generateHorses on mount', () => {
    shallowMount(Race, {
      store,
      localVue,
      stubs: {
        HorseTable,
        Button,
      },
    });
    expect(actions.generateHorses).toHaveBeenCalled();
  });
});
