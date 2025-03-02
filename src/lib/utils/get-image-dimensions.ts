import { imageSize } from "image-size";

/**
 * Fetches an image from a URL and returns its dimensions
 */
export const getImageDimensions = async (
  imageUrl: string
): Promise<{ width: number; height: number }> => {
  const response = await fetch(imageUrl);
  const imageBuffer = Buffer.from(await response.arrayBuffer());

  // Get image dimensions directly from buffer
  const dimensions = imageSize(imageBuffer);
  return {
    width: dimensions.width!,
    height: dimensions.height!,
  };
};
