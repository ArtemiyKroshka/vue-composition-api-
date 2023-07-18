import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import FormInput from './FormInput.vue';
import { computed, defineComponent, ref } from 'vue';

describe("FormInput", () => {
  it('test validation', async () => {
    const Parent = defineComponent({
      components: { FormInput },
      template: `
        <FormInput
          name="foo"
          type="input"
          :status="status"
          v-model="formValue"
        />
      `,
      setup() {
        const formValue = ref('foo');
        const status = computed(() => {
          if(formValue.value.length > 5) {
            return {
              valid: true
            }
          } else {
            return {
              valid: false,
              message: 'error'
            }
          }
        })
      }
    })
  })

  it("render with error", () => {
    const wrapper = mount(FormInput, {
      props: {
        name: 'foo',
        modelValue: 'bar',
        status: {
          valid: false,
          message: 'error',
        },
        type: 'input'
      }
    });
    console.log(wrapper.html());

    expect(wrapper.find('.is-danger').exists()).toBe(true);
  })

  it("render with no error", () => {
    const wrapper = mount(FormInput, {
      props: {
        name: 'foo',
        modelValue: 'bar',
        status: {
          valid: true,
          message: 'error',
        },
        type: 'input'
      }
    });
    console.log(wrapper.html());

    expect(wrapper.find('.is-danger').exists()).toBe(false);
  })
});