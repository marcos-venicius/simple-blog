import { create } from 'zustand'

export enum ModalType {
  CreateBlog = 'create-blog'
}

interface Modal {
  type: ModalType | null
  isOpen: boolean
  onOpen: (type: ModalType) => void
  onClose: () => void
}

export const useModal = create<Modal>(set => ({
  isOpen: false,
  type: null,
  onOpen(type) {
    set({ isOpen: true, type })
  },
  onClose() {
    set({ type: null, isOpen: false })
  }
}))
