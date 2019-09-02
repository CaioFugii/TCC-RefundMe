import apiStark from "./apiStark";

export const uploadFile = async (file: any) => {
  try {
    let urlImage;
    if (file && file.name) {
      const config = {
        "Content-Type": "application/x-www-form-urlencoded",
        "x-ms-blob-type": "BlockBlob",
        "x-ms-blob-content-type": file.type
      };

      const url = await apiStark.get(
        `uploadfile/${file.name.replace(/ /g, "")}`
      );

      const res: any = await apiStark.put(url.data, file, { headers: config });

      if (res.statusText === "Created") {
        let URLimage = res.config.url.split("?");
        urlImage = URLimage[0];
      }
    }

    return urlImage;
  } catch (error) {
    console.log(error);
  }
};
