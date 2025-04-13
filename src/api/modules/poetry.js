import instance from '@/utils/index.js';

export const getPoemData = (pageNum, pageSize) => instance({
    url: "/admin/potry/GetPoemPage",
    method: "get",
    query: {
        pageNum,
        pageSize,
    },
});

//古诗修改数据
export const reqPoemUpdateData = ( id, title, dynasty, writer, content, type ) => instance({
    url: "/admin/potry/update",
    method: "post",
    data: { id, title, dynasty, writer, content, type }
})

//古诗增加数据
export const reqPoemAddData = (id, title, dynasty, writer, content, type ) => instance({
    url: "/admin/potry/add",
    method: "post",
    data: { id, title, dynasty, writer, content, type }
})

//古诗搜索数据


//古诗删除数据
// src/api/modules/poetry.js
export const reqPoemDeleteData = (ids) => {



    return instance({
        url: "/admin/potry/delete",
        method: "post",
        data: ids// 根据后端需求选择格式
        // 如果后端需要逗号分隔字符串：
        // data: { ids: idArray.join(",") }
    });
};

export const getPoetData = (pageNum, pageSize) => instance({
    url: "/admin/writer/GetWritersByPage",
    method: "get",
    query: {
        pageNum,
        pageSize,
    },
});

//诗人修改数据
export const reqPoetUpdateData = ( id, title, dynasty, writer, content, type ) => instance({
    url: "/admin/potry/update",
    method: "post",
    data: { id, title, dynasty, writer, content, type }
})

//诗人增加数据
export const reqPoetAddData = (id, title, dynasty, writer, content, type ) => instance({
    url: "/admin/potry/add",
    method: "post",
    data: { id, title, dynasty, writer, content, type }
})

//诗人删除数据
export const reqPoetDeleteData = (pageNum, pageSize) => instance({
    url: "/admin/potry/GetPoemPage",
    method: "get",
    query: {
        pageNum,
        pageSize,
    },
});


export const getSentenceData = (pageNum, pageSize) => instance({
    url: "/GetAll",
    method: "get",
    query: {
        pageNum,
        pageSize,
    },
});

//名句修改数据
export const reqSentenceUpdateData = ( id, name, fromm) => instance({
    url: "/update",
    method: "post",
    data: { id, name, fromm }
})

//名句增加数据
export const reqSentenceAddData = (id, name, fromm) => instance({
    url: "/add",
    method: "post",
    data: { id, name, fromm }
})

//名句删除数据
export const reqSentenceDeleteData = (data) => instance({
    url: "/delete",
    method: "post",
    query: {
        ids:data

    },
});