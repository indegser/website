import create from 'zustand'
import produce from 'immer'

export enum BannerType {
  success,
  failure,
}

interface Banner {
  id: number
  type: keyof typeof BannerType
  message: string
  link?: string
}

interface BannerStore {
  banner: Banner
  setBanner: (banner?: Omit<Banner, 'id'>) => void
}

export const [useBannerStore, bannerStoreApi] = create<BannerStore>((set) => ({
  banner: null,
  setBanner: (banner) =>
    set(
      produce((state) => {
        if (!banner) {
          state.banner = null
        } else {
          state.banner = {
            ...banner,
            id: Date.now(),
          }
        }
      })
    ),
}))
