import instance from "@/utils/index.js";

export const reqPoemUpdateData = ( id, title, dynasty, writer, content, type ) => instance({
    url: "/admin/potry/update",
    method: "post",
    data: { id, title, dynasty, writer, content, type }
})