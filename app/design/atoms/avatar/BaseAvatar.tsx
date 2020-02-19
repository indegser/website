interface Props {
  src: string | null
  styles: any
}

export const BaseAvatar: React.SFC<Props> = ({ src, styles }) => {
  return (
    <div>
      <div className="avatar">
        {src ? <img src={src} /> : <div className="placeholder" />}
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

          .placeholder {
            width: 100%;
            height: 100%;
            background: #eee;
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
