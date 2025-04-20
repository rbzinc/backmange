import instance from "@/utils/index.js";
export const PoemDatas = (  ) => instance({
    url: "/admin/potry/GetCount",
    method: "get",
})

export const PoetDatas = (  ) => instance({
    url: "/admin/writer/getCount",
    method: "get",
})

export const SentenceDatas = () => instance({
    url: "/getCount",
    method: "get",
})

export const UserDatas = () => instance({
    url: "/admin/getUserCount",
    method: "get",
})


