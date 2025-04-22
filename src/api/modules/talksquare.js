import instance from "@/utils/index.js";

//获取日志(分页展示一页十条)
export const postTalksquareData = ( params ) => instance({
    url: "/admin/blog/getAllBlog",
    method: "get",
    params
})

//批量删除帖子
export const deleteTalksquareData = ( ids ) => instance({
    url: "/admin/blog/deleteBlog",
    method: "post",
    params:{
        ids
    }
})