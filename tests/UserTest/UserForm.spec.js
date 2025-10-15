import { mount, flushPromises } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import UserForm from '@/views/user/UserForm.vue'
import { createTestingPinia } from '@pinia/testing'

const mockPush = vi.fn()
const mockUseRoute = vi.fn()

vi.mock('vue-router', () => ({
  useRoute: () => mockUseRoute(),
  useRouter: () => ({ push: mockPush })
}))

describe('UserForm.vue', () => {
  beforeEach(() => {
    mockPush.mockClear()
    mockUseRoute.mockClear()
  })

  it('renders add user form with correct elements', () => {
    mockUseRoute.mockReturnValue({ params: {} })
    
    const wrapper = mount(UserForm, {
      global: {
        plugins: [createTestingPinia({ stubActions: false })]
      }
    })
    
    expect(wrapper.find('h2').text()).toBe('Add New User')
    expect(wrapper.find('button').text()).toBe('Add User')
    expect(wrapper.find('input[placeholder="Enter name"]').exists()).toBe(true)
    expect(wrapper.find('input[placeholder="Enter email"]').exists()).toBe(true)
    expect(wrapper.find('select').exists()).toBe(true)
  })

  it('renders edit user form when user id is provided', async () => {
    mockUseRoute.mockReturnValue({ params: { id: '1' } })
    
    const wrapper = mount(UserForm, {
      global: {
        plugins: [createTestingPinia({
          stubActions: false,
          initialState: {
            user: {
              users: [
                { 
                  id: 1, 
                  name: 'Alice', 
                  email: 'alice@example.com', 
                  role: 'Admin', 
                  createdAt: '2025-10-14', 
                  updatedAt: '2025-10-15' 
                }
              ]
            }
          }
        })]
      }
    })
    
    // Wait for onMounted to complete
    await flushPromises()
    
    expect(wrapper.find('h2').text()).toBe('Edit User')
    expect(wrapper.find('button').text()).toBe('Update User')
  })
})