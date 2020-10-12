export type MediaType = "VIDEO" | "IMAGE";

export interface MediaSource {
  url: string;
  type?: string;
}

export interface Media {
  name?: string;
  type: MediaType;
  source: MediaSource;
}