import { useBannerStore } from 'stores/bannerStore'
import styles from './Banner.module.scss'
import PageContainer from 'design/atoms/container/PageContainer'
import Icon from 'design/atoms/icons/Icon'
import { MouseEvent } from 'react'

const Banner = () => {
  const banner = useBannerStore(s => s.banner)
  const setBanner = useBannerStore(s => s.setBanner)
  if (!banner) return null

  const handleClose = (e: MouseEvent) => {
    e.stopPropagation()
    setBanner(null)
  }

  return (
    <div className={styles.banner}>
      <PageContainer>
        <div className={styles.content}>
          <div className={styles.message}>
            {banner.type === 'success' && '👍 '}
            {banner.message}
          </div>
          <div onClick={handleClose} className={styles.close}>
            <Icon variant="close" width={12} />
          </div>
        </div>
      </PageContainer>
    </div>
  )
}

export default Banner
