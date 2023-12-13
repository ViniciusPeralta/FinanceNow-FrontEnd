import { create } from 'zustand';

type User = {
  userId: number,
  name: string
  email: string
}

type Actions = {
  setUserId: (id: number) => void
  setUsername: (name: string) => void
  setEmail: (email: string) => void
  logout: () => void
}

const initialState: User = {
  userId: 0,
  name: '',
  email: ''
}

const userStore = create<User & Actions>((set) => ({
  ...initialState,
  setUserId: (id: number) => { set({ userId: id }) },
  setUsername: (name: string) => { set({ name: name }) },
  setEmail: (email: string) => { set({ email: email }) },
  logout: () => {
    set({
      userId: 0,
      name: '',
      email: ''
    })
  }
}))

export default userStore;  