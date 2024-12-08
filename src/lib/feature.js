export const fileFormat = (url = "") => {
  const exe = url.split(".").pop().toLowerCase();
  if (exe === "mp4" || exe === "ogg" || exe === "webm") {
    return "video";
  }
  if (exe === "jpg" || exe === "jpeg" || exe === "png") {
    return "image";
  }
  if (exe === "mp3" || exe === "wav") {
    return "audio";
  }
  if (exe === "pdf") {
    return "pdf";
  }

  return "file";
};

export const transformImage = (url = "", width = 100) => {
  return url;
};
