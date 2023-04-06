import type { AxiosProgressEvent, AxiosResponse } from "axios";
import { request } from "..";
import type { axiosResponse } from "./utilType";

function fileUpload(file:FormData,uploadProgess:(progressEvent: AxiosProgressEvent) => void ,res: (res: AxiosResponse<axiosResponse, any
    >) => void) {
    request(
        {
          url: 'file/upload',
          method: "post",
          headers:{
            'Content-Type':'multipart/form-data'
          },
          data:file,
          onUploadProgress: uploadProgess
        },
        res
      );
}

export {
  fileUpload,
}