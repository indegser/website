export const BaseButton = ({ children, styles }) => {
  return (
    <button>
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
