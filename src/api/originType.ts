export interface YoutubeVideos {
  kind: string;
  etag: string;
  items: VideoItem[];
  pageInfo: PageInfo;
  nextPageToken?: string;
  prevPageToken?: string;
}

export interface VideoItem {
  kind: string;
  etag: string;
  id: string;
  snippet: Snippet;
}

export interface Snippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: Thumbnails;
  channelTitle: string;
  tags: string[];
  categoryId: string;
  liveBroadcastContent: string;
  localized: Localized;
  defaultAudioLanguage?: string;
  defaultLanguage?: string;
}

type ThumbnailList = 'default' | 'medium' | 'high' | 'standard' | 'maxres'
type Thumbnails<K extends ThumbnailList = ThumbnailList> = {
  [key in K]: ThumbnailsDetail;
}

export interface ThumbnailsDetail {
  url: string;
  width: number;
  height: number;
}


export interface Localized {
  title: string;
  description: string;
}

export interface PageInfo {
  totalResults: number;
  resultsPerPage: number;
}
