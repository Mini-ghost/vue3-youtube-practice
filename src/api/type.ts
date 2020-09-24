import { getVideos } from './index'

// https://stackoverflow.com/questions/48011353/how-to-unwrap-type-of-a-promise
export type Await <T> = T extends PromiseLike<infer U> ? U :
  T extends ((...args: unknown[]) => PromiseLike<infer V>) ? V :
  T

export type VideoInfo = Await<ReturnType<typeof getVideos>>

