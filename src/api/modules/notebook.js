import instance from "@/utils/index.js";

//获取日志(分页展示一页十条)
export const postNotebookData = ( params ) => instance({
    url: "/admin/log/get",
    method: "get",
    params
})

//删除日志(分页展示一页十条)
export const deleteNotebookData = (ids) => instance({
    url: "/admin/log/delete",
    method: "get",
    query: ids
});