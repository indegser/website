export const BaseAvatar = ({ src, styles }) => {
  return (
    <div>
      <div className="avatar">
        <img src={src} />
      </div>
      <style jsx>
        {`
          .avatar {
            --avatar-size: 40px;
            width: var(--avatar-size);
            height: var(--avatar-size);
            border-radius: 999rem;
            overflow: hidden;
          }

          img {
            width: 100%;
            height: 100%;
            display: block;
            object-fit: cover;
            object-position: center;
          }
        `}
      </style>
      <style jsx>{styles}</style>
    </div>
  )
}
