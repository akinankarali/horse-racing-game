import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import RaceResults from '@/components/RaceResults.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('RaceResults.vue', () => {
  let getters;
  let store;

  beforeEach(() => {
    getters = {
      raceResults: () => [
        { winnerResult: '' },
        { winnerResult: 'Thunderbolt' },
      ],
    };

    store = new Vuex.Store({
      getters,
    });
  });

  it('renders correctly with race results', () => {
    const wrapper = shallowMount(RaceResults, {
      store,
      localVue,
    });

    expect(wrapper.find('h3').text()).toBe('Race Results');

    const raceResultDivs = wrapper.findAll('div > div');
    expect(raceResultDivs.length).toBe(2);

    expect(raceResultDivs.at(0).find('.loader').text()).toBe(
      'The Race Continues...'
    );

    expect(raceResultDivs.at(1).find('table').exists()).toBe(true);
    expect(raceResultDivs.at(1).find('td').text()).toBe('Thunderbolt');
  });

  it('renders "The Race Continues..." when winnerResult is empty', () => {
    getters.raceResults = () => [{ winnerResult: '' }];
    store = new Vuex.Store({
      getters,
    });

    const wrapper = shallowMount(RaceResults, {
      store,
      localVue,
    });

    expect(wrapper.find('.loader').text()).toBe('The Race Continues...');
  });

  it('renders the winner result when winnerResult is not empty', () => {
    getters.raceResults = () => [{ winnerResult: 'Thunderbolt' }];
    store = new Vuex.Store({
      getters,
    });

    const wrapper = shallowMount(RaceResults, {
      store,
      localVue,
    });

    expect(wrapper.find('table').exists()).toBe(true);
    expect(wrapper.find('td').text()).toBe('Thunderbolt');
  });
});
