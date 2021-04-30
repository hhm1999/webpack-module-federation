import createAxios from '../../utils/http';
const http = createAxios({
  baseURL: 'hhm',
});
// 数据初始化
export default {
  async init({ state, commit }) {
    try {
      console.log(123);
        const { data } = await http.post('hhm/123', { uid: 456 });
        
        // countServerTime(state, data.serverTime);
        return data;
    } catch (e) {
        return false;
    }
  }
}
