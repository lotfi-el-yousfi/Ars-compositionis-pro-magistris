import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import ComponentToTest from './usercomponent.vue'
describe('App startup', () => {
  it('should mount with user data and update profile', async () => {
    const wrapper = mount(ComponentToTest, {
      props: {
        user: {
          avatar: 'avatar_test_value',
          name: 'name_test_value',
          email: 'email_test_value'
        }
      }
    })
    expect(wrapper.text()).toContain('avatar_test_value')
    expect(wrapper.text()).toContain('name_test_value')
    expect(wrapper.text()).toContain('email_test_value')
  })
})
