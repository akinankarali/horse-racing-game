import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import RaceBoard from '@/components/RaceBoard.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('RaceBoard.vue', () => {
  let getters;
  let store;

  beforeEach(() => {
    getters = {
      selectedHorses: () => [
        [
          { id: 1, title: 'Thunderbolt', position: 3, filter: 'none' },
          { id: 2, title: 'Majesty', position: 5, filter: 'grayscale(100%)' },
        ],
      ],
      currentRound: () => 0,
    };

    store = new Vuex.Store({
      getters,
    });
  });

  it('renders correctly with selected horses', () => {
    const wrapper = shallowMount(RaceBoard, {
      store,
      localVue,
    });

    expect(wrapper.find('.race-board').exists()).toBe(true);

    const horseElements = wrapper.findAll('.horse');
    expect(horseElements.length).toBe(2);

    expect(horseElements.at(0).text()).toContain('Thunderbolt');
    expect(horseElements.at(1).text()).toContain('Majesty');

    expect(horseElements.at(0).attributes().style).toContain(
      'transform: translateX(30px);'
    );
    expect(horseElements.at(1).attributes().style).toContain(
      'transform: translateX(50px);'
    );

    const horseImages = wrapper.findAll('.horse-img');
    expect(horseImages.at(0).attributes().style).toContain('filter: none;');
    expect(horseImages.at(1).attributes().style).toContain(
      'filter: grayscale(100%);'
    );
  });

  it('does not render race-board if selectedHorses[currentRound] is empty', () => {
    getters.selectedHorses = () => [[]];
    store = new Vuex.Store({
      getters,
    });

    const wrapper = shallowMount(RaceBoard, {
      store,
      localVue,
    });

    expect(wrapper.find('.race-board').exists()).toBe(false);
  });
});
