export type MediaType = "VIDEO" | "IMAGE";

export interface MediaURL {
  url: string;
}

export type Media = {
  name?: string;
  type: MediaType;
  source: MediaURL | React.FunctionComponent;
}