const BASE_URL = 'http://localhost:3031/api/resize/'

const parisApi = {
  resize: (src, resizeOption: { width?: number; height?: number }) => {
    const { width, height } = resizeOption
    const url = new URL(BASE_URL + encodeURIComponent(src))
    if (width) {
      url.searchParams.append('w', width.toString())
    }

    if (height) {
      url.searchParams.append('h', height.toString())
    }

    return url.href
  },
}

export default parisApi
