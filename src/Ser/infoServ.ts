import { DataResponse } from "../model/general";
import { generalRequest ,uploadRequest} from "./genServ";
export async function studentDelete(id: number): Promise<DataResponse> {
    alert("iop");
    const res = await generalRequest("user/delete", {
      id: id,
    });
    alert("ilk");
    return res as DataResponse;
    
  }
  export async function uploadPhoto(remoteFile: string, file: any): Promise<any> {
    console.log(remoteFile);
    console.log(file);
    const formData = new FormData();
    formData.append("file", file);
    const res = await uploadRequest(
      "/api/base/uploadPhotoWeb?remoteFile=" + remoteFile,
      formData
    );
    return res as DataResponse;
  }
  export async function getPhotoImageStr(
    fileName: String
  ): Promise<DataResponse> {
    const res = await generalRequest("/api/base/getPhotoImageStr", {
      fileName: fileName,
    });
    return res as DataResponse;
  }
  