export const BaseButton = ({ children, styles, ...props }) => {
  return (
    <button {...props}>
      {children}
      <style jsx>{`
        button {
          font-size: 100%;
          font-family: inherit;
          border: 0;
          padding: 0;
          cursor: pointer;
        }
      `}</style>
      <style jsx>{styles}</style>
    </button>
  )
}
