import { setActivePinia, createPinia } from 'pinia'
import { useUserStore } from '@/stores/UserStore.js'

describe('UserStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    localStorage.clear()
  })

  it('adds a user', () => {
    const store = useUserStore()
    const user = {
      name: 'Charlie',
      email: 'charlie@example.com',
      role: 'Staff',
      createdAt: '2025-10-15'
    }
    store.addUser(user)
    expect(store.users.length).toBe(3)
    expect(store.users[2].name).toBe('Charlie')
  })

  it('updates a user', () => {
    const store = useUserStore()
    const user = { ...store.users[0], role: 'Manager' }
    store.updateUser(user)
    expect(store.users[0].role).toBe('Manager')
  })
})