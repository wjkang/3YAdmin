

//缓存远程表单选项数据，key为对应schema $id+'_'+字段名
const RemoteDataMap = new Map();

const Util = {
    addData(id, data) {
        RemoteDataMap.set(id, data)
    },
    getData(id) {
        return RemoteDataMap.get(id)
    }
}
export default Util;