interface IHashLink extends React.HTMLProps<HTMLAnchorElement> {}

const HashLink: React.SFC<IHashLink> = props => {
  const handleClick = e => {
    e.preventDefault()

    const target = document.querySelector(props.href)
    const rect = target.getBoundingClientRect()
    const nav = document.querySelector('#global-nav')
    const pad = Math.max(window.innerHeight * 0.2, nav.clientHeight + 16)

    if (target) {
      window.scrollTo({
        top: Math.max(document.documentElement.scrollTop + rect.top - pad, 0),
        // behavior: 'smooth',
      })
    }
  }

  return <a onClick={handleClick} {...props} />
}

export default HashLink
