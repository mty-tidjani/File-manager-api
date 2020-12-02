import fluentFfmpeg from 'fluent-ffmpeg';

export interface IMetadata extends fluentFfmpeg.FfprobeData  {
  width: number | undefined;
  height: number | undefined;
  size?: number | undefined;
  thumbnail?: string | undefined;
  duration?: number | undefined;
}

export interface FileWithMeta extends Express.Multer.File {
  meta?: IMetadata;
}
