import axios, { type RawAxiosRequestHeaders } from "axios";
import { useAppStore } from "~/stores/app";
//import { useAppStore } from "~/stores/app";


//一般数据请求函数，参数为url后台接口映射全路径，和data 为传递后台的数据，返回值为服务器返回的data
export async function generalRequest(
  url: string,
  data: any | null
): Promise<any> {
  
  const res = await axios.post(
    url,
    {
      data: data,
    },
    // {
    //   headers: getAuthHeader(),
    // }
  );
  if (res.status != 200) {
    console.log("Error: " + res.status);
    return;
  }
  return res.data;
}

// export function getAuthHeader(): any {
//   return {
//     Authorization: "Bearer " + useAppStore().userInfo.jwtToken,
//   };
// }
export async function uploadRequest(
  url: string,
  data: any | null
): Promise<any> {
  const res = await axios.post(url, data, {
    headers: getAuthHeaderFile(),
  });
  if (res.status != 200) {
    console.log("Error: " + res.status);
    return;
  }
  return res.data;
}

export function getAuthHeaderFile(): RawAxiosRequestHeaders {
  return {
    Authorization: "Bearer " + useAppStore().userInfo.jwtToken,
    "Content-Type": "multipart/form-data",
  };
}