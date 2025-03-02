import { log } from "../../cli/output.js";
import { imageSize } from "image-size";

/**
 * Fetches an image from a URL and returns its dimensions
 */
export const getImageDimensions = async (
  imageUrl: string
): Promise<{ width: number; height: number }> => {
  try {
    const response = await fetch(imageUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }

    const imageBuffer = Buffer.from(await response.arrayBuffer());

    // Get image dimensions directly from buffer
    const dimensions = imageSize(imageBuffer);

    if (!dimensions.width || !dimensions.height) {
      throw new Error("Could not determine image dimensions");
    }

    return {
      width: dimensions.width,
      height: dimensions.height,
    };
  } catch (error) {
    error.step = "getImageDimensions";
    log.error(error);
    throw error;
  }
};
