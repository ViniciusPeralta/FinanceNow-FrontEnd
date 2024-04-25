import { create } from 'zustand';

type Warning = {
  message: string
  errorWarning: boolean
  confirmWarning: boolean
}

type Actions = {
  setMessage: (message: string) => void
  showErrorWarning: () => void
  showConfirmWarning: () => void
  closeWarning: () => void
}

const initialState: Warning = {
    message: '',
    errorWarning: false,
    confirmWarning: false
}

const warningStore = create<Warning & Actions>((set) => ({
  ...initialState,
  setMessage: (message: string) => { set({ message: message }) },
  showErrorWarning: () => { set({ errorWarning: true }) },
  showConfirmWarning: () => { set({ confirmWarning: true }) },
  closeWarning: () => {
    set({
        message: '',
        errorWarning: false,
        confirmWarning: false
    })
  }
}))

export default warningStore;  