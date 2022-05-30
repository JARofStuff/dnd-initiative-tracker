export const SUPPORTED_IMAGE_FORMATS = [
  'image/apng',
  'image/avif',
  'image/gif',
  'image/jpeg',
  'image/png',
  'image/svg+xml',
  'image/webp',
];

export const fetchImageBlobFromUrl = async (url: string) => {
  try {
    const response = await fetch(url);
    return response.blob();
  } catch (error) {
    throw new Error('Could not load image');
  }
};

export const imageFormatIsSupported = (image: Blob) => {
  return SUPPORTED_IMAGE_FORMATS.includes(image.type);
};
