import instance from '@/utils/index.js';


//古诗获取信息
export const getPoemData = ( params ) => instance({
    url: "/admin/potry/GetPoemPage",
    method: "get",
    params
});

//古诗修改数据
export const reqPoemUpdateData = ( params ) => instance({
    url: "/admin/potry/update",
    method: "post",
    data: params
})

//古诗增加数据
export const reqPoemAddData = (data) => instance({
    url: "/admin/potry/add",
    method: "post",
    data:data
})

//古诗搜索数据
export const reqPoemSearchData = ( word,pagenum) => instance({
    url: "/admin/potry/getPoem",
    method: "get",
    params:{
        word:word,
        pageNum:pagenum,
        pageSize:10
    }
})

//古诗删除数据
export const reqPoemDeleteData = (ids) => instance({
        url: "/admin/potry/delete",
        method: "post",
        data: ids
    });

//获取诗人信息
export const getPoetData = (params) => instance({
    url: "/admin/writer/GetWritersByPage",
    method: "get",
    params
});

//诗人修改数据
export const reqPoetUpdateData = ( params ) => instance({
    url: "/admin/writer/update",
    method: "post",
    data: params
})

//诗人增加数据
export const reqPoetAddData = ( params ) => instance({
    url: "/admin/writer/add",
    method: "post",
    data: params
})

//诗人删除数据
export const reqPoetDeleteData = (ids) => instance({
    url: "/admin/writer/delete",
    method: "post",
    params:{
        ids
    }
});

//
export const reqSerPoetDeleteData = (ids) => instance({
    url: "/admin/potry/GetPoemPage",
    method: "get",
    params:{
        ids: ids
    }
});

//诗人搜索数据
export const reqPoetSearchData = (data) => instance({
    url: "/admin/writer/getWriterByName",
    method: "get",
    params: {
        name:data
    },
});

//获取名句数据
export const getSentenceData = (params) => instance({
    url: "/GetAll",
    method: "get",
    params
});

//名句修改数据
export const reqSentenceUpdateData = ( params) => instance({
    url: "/update",
    method: "post",
    data: params
})

//名句增加数据
export const reqSentenceAddData = (params) => instance({
    url: "/add",
    method: "post",
    data: params
})

//名句删除数据
export const reqSentenceDeleteData = (ids) => instance({
    url: "/delete",
    method: "post",
    params:{
        ids
    }
});

//名句搜索数据
export const reqSentenceSearchData = (data) => instance({
    url: "/getRhesisByPoemName",
    method: "get",
    params: {
        name:data
    },
});