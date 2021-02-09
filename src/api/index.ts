import http from './instance'
import type { YoutubeVideos } from './originType'


// https://developers.google.com/youtube/v3/docs/videos/list
export const getVideos = async (pageToken?: string) => {
  const { data: resData } = await http.request<YoutubeVideos>({
    method: 'GET',
    params: {
      // 取得指定 regionCode 或 videoCategoryId 下最熱門的影片
      chart: 'mostPopular',
      part: 'snippet',
      maxResults: 12,
      regionCode: 'TW',
      pageToken,
      key: process.env.VUE_APP_API_KEY
    }
  })

  const data = resData.items.map(({ id, snippet }) => ({
    id,
    channelTitle: snippet.channelTitle,
    title: snippet.title,
    description: snippet.description,
    thumbnail: snippet.thumbnails
  }))


  const res = {
    data,
    metadata: {
      total: resData.pageInfo.totalResults,
      nextPageToken: resData.nextPageToken,
      prevPageToken: resData.prevPageToken
    }
  }

  return res
}


export const getVideoById = async (id: string) => {
  const { data: resData } = await http.request<YoutubeVideos>({
    method: 'GET',
    params: {
      id,
      part: 'snippet',
      key: process.env.VUE_APP_API_KEY
    }
  })

  const [ data ] = resData.items.map(({ id, snippet }) => ({
    id,
    channelTitle: snippet.channelTitle,
    title: snippet.title,
    description: snippet.description,
    thumbnail: snippet.thumbnails
  }))

  return data
}

// // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// //@ts-ignore
// window.getVideoById = getVideoById

