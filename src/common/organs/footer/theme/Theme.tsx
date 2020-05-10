import { useAdaptiveTheme, useThemeStore } from './Theme.hooks'
import { capitalize } from 'utils/stringUtils'

const Theme = () => {
  const scheme = useThemeStore((s) => s.scheme)
  const { handleChange } = useAdaptiveTheme()

  const opts = ['light', 'dark']
  return (
    <div>
      <select value={scheme} onChange={handleChange}>
        {opts.map((o) => (
          <option key={o} value={o}>
            {capitalize(o)}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Theme
