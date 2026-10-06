import Imagekit, { toFile } from "@imagekit/nodejs";

const imagekit = new Imagekit({ privateKey: process.env.IMAGEKIT_PRIVATE_KEY });

export const hasImageKitConfig = () => {
  return Boolean(process.env.IMAGEKIT_PRIVATE_KEY);
};

// originalName= "My Photo (1).png"
// result: "chat-1749300000000-My_Photo__1_.png"
// this helper makes a safe, unique filename for uploaded files.
const createFileName = (originalName = "upload") => {
  const safeName = originalName.replace(/[^a-zA-Z0-9._-]/g, "_");
  return `chat-${Date.now()}-${safeName}`;
};

export const uploadChatMedia = async (file) => {
  const fileName = createFileName(file.originalname);

  const result = await imagekit.files.upload({
    file: await toFile(file.buffer, filename, { type: file.mimetype }),
    fileName,
    folder: "/chat",
  });
  return result.url;
};
