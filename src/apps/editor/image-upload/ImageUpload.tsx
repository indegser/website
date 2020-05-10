import React, { useState } from 'react'
import Label from 'common/atoms/form/Label'
import { useForm } from 'react-hook-form'
import parisApi from 'apis/parisApi'
import styled from '@emotion/styled'

const Box = styled.div`
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid var(--border100);
`

const Location = styled.div`
  margin-top: 8px;
  font-size: 14px;
  color: var(--text300);
  padding: 8px;
  border-radius: 4px;
`

const ImageUpload = () => {
  const [url, setUrl] = useState<string>()
  const { register, reset, handleSubmit } = useForm()
  const submit = async ({ url }) => {
    if (!url || url.length === 0) return
    try {
      const { location } = await parisApi.getPreviewImgUrl(url)
      setUrl(location)
      reset()
    } catch (err) {
      alert(err.message)
    }
  }
  return (
    <Box>
      <form onSubmit={handleSubmit(submit)}>
        <Label label="Image" />
        <input
          ref={register}
          placeholder="Paste url to be converted"
          name="url"
          type="text"
        />
      </form>
      {url && <Location>> {' ' + url}</Location>}
    </Box>
  )
}

export default ImageUpload
