import { shallowMount } from '@vue/test-utils';
import Button from '@/components/Button.vue';

describe('Button.vue', () => {
  it('renders props.title when passed', () => {
    const title = 'Test Button';
    const wrapper = shallowMount(Button, {
      propsData: { title },
    });
    expect(wrapper.text()).toMatch(title);
  });

  it('emits an action event when clicked', async () => {
    const wrapper = shallowMount(Button, {
      propsData: { title: 'Test Button' },
    });
    await wrapper.find('button').trigger('click');
    expect(wrapper.emitted().action).toBeTruthy();
  });

  it('is disabled when the disabled prop is true', () => {
    const wrapper = shallowMount(Button, {
      propsData: {
        title: 'Test Button',
        disabled: true,
      },
    });
    expect(wrapper.find('button').attributes('disabled')).toBe('disabled');
  });

  it('is not disabled when the disabled prop is false', () => {
    const wrapper = shallowMount(Button, {
      propsData: {
        title: 'Test Button',
        disabled: false,
      },
    });
    expect(wrapper.find('button').attributes('disabled')).toBeUndefined();
  });
});
