import instance from "@/utils/index.js";

//添加公告
export const addNoticeData = ( params ) => instance({
    url: "/notice/add",
    method: "post",
    data: params
})

//批量删除公告
export const deleteNoticeData = ( ids ) => instance({
    url: "/notice/delete",
    method: "post",
    data:  ids
})

//获取公告列表(一次获取十条)
export const getNoticeData = ( params ) => instance({
    url: "/notice/getList",
    method: "get",
    params
})

//更改公告
export const changeNoticeData = ( params ) => instance({
    url: "/notice/update",
    method: "post",
    data: params
})