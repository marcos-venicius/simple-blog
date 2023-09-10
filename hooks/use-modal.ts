import { create } from 'zustand'

export enum ModalType {
  CreateBlog = 'create-blog',
  DeleteBlog = 'delete-blog'
}

type Data = {
  [ModalType.CreateBlog]: null
  [ModalType.DeleteBlog]: {
    id: string
    slug: string
    imageUrl: string
  }
}

interface Modal<T extends ModalType> {
  type: ModalType | null
  isOpen: boolean
  data: Data[T] | null
  onOpen: <T extends ModalType>(type: T, data?: Data[T] | null) => void
  onClose: () => void
}

const useStore = create<Modal<any>>(set => ({
  isOpen: false,
  type: null,
  data: null,
  onOpen(type, data) {
    set({ isOpen: true, type, data })
  },
  onClose() {
    set({ type: null, isOpen: false, data: null })
  }
}))

export function useModal<T extends ModalType>() {
  const store = useStore()

  return store as Modal<T>
}
