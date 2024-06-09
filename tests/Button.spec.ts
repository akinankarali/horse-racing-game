// import { shallowMount } from '@vue/test-utils';
// import Button from '@/components/Button.vue';

// describe('Button.vue', () => {
//   it('renders props.title when passed', () => {
//     const title = 'Click Me';
//     const wrapper = shallowMount(Button, {
//       propsData: { title }
//     });
//     expect(wrapper.text()).toContain(title);
//   });

//   it('emits an action event when clicked', async () => {
//     const wrapper = shallowMount(Button);
//     await wrapper.find('button').trigger('click');
//     expect(wrapper.emitted().action).toBeTruthy();
//   });

//   it('disables the button when disabled prop is true', () => {
//     const wrapper = shallowMount(Button, {
//       propsData: { disabled: true }
//     });
//     expect(wrapper.find('button').attributes('disabled')).toBe('disabled');
//   });

//   it('enables the button when disabled prop is false', () => {
//     const wrapper = shallowMount(Button, {
//       propsData: { disabled: false }
//     });
//     expect(wrapper.find('button').attributes('disabled')).toBeUndefined();
//   });
// });