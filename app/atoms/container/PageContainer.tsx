const PageContainer = ({ children }) => {
  return (
    <div>
      {children}
      <style jsx>{`
        div {
          max-width: 1200px;
          margin: 0 auto;
          box-sizing: border-box;
          padding: 0 48px;
        }

        @media (max-width: 840px) {
          div {
            padding: 0 32px;
          }
        }

        @media (max-width: 640px) {
          div {
            padding: 0 16px;
          }
        }
      `}</style>
    </div>
  )
}

export default PageContainer
