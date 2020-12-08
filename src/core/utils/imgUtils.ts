import config from '../config/config';

export const getMeta = (filePath: string|null) => {
  return new Promise((resolve) => {
    if (!filePath || filePath.length < 5) return resolve(null);
    config.ffmpeg.ffprobe(filePath, (err: any, metadata: any) => {
      // console.log(err);
      if (metadata) {
        const meta: any = {};
        meta.width = metadata.streams[0].width;
        meta.height = metadata.streams[0].height;
        return resolve(meta);
      }
      resolve(null);
    });
  });
};

export const optimize = async (options: any, filePath: string|null) => {
  const meta: any = await getMeta(filePath);
  if (!meta) return options;
  if (options.width && options.height) {
    if (meta.width >= options.width && meta.height >= options.height) return options;
    const ref = meta.width > meta.height ? meta.height : meta.width;
    const ref2 = meta.width > meta.height ? options.height : options.width;
    const newW = Math.round(options.width / (ref2 / ref));
    const newH = Math.round(options.height / (ref2 / ref));
    console.log(newH, ' -- ', newW, options);
    return { ...options, width: newW, height: newH };
  }
  if (options.width) {
    if (options.width <= meta.width) return options;
    return { ...options, width: meta.width };
  }
  if (options.height) {
    if (options.height <= meta.height) return options;
    return { ...options, height: meta.height };
  }
  return options;
};
