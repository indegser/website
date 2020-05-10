import { ChangeEvent } from 'react'
import create from 'zustand'
import produce from 'immer'

const getScheme = () => {
  if (!process.browser || !window.matchMedia) return 'light'

  const detector = window.matchMedia('(prefers-color-scheme: dark)')

  if (detector.matches) {
    return 'dark'
  }
  return 'light'
}

interface ThemeStore {
  keyColor: string
  scheme: 'light' | 'dark'
  setScheme: (scheme: ThemeStore['scheme']) => void
  setKeyColor: (keyColor: string) => void
}

export const [useThemeStore, themeStoreApi] = create<ThemeStore>((set) => ({
  keyColor: '#0088ff',
  scheme: getScheme(),
  setScheme: (scheme) =>
    set(
      produce((state) => {
        state.scheme = scheme
      })
    ),
  setKeyColor: (keyColor) =>
    set(
      produce((state) => {
        state.keyColor = keyColor
      })
    ),
}))

export const useAdaptiveTheme = () => {
  const handleColorChange = (e: ChangeEvent<HTMLInputElement>) => {
    themeStoreApi.setState({ keyColor: e.target.value })
  }
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    themeStoreApi.setState({
      scheme: e.target.selectedIndex === 0 ? 'light' : 'dark',
    })
  }
  return {
    handleChange,
    handleColorChange,
  }
}
