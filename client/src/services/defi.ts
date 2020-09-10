import moment from "moment";
import Taro from "@tarojs/taro";


// content: "去中心化交易所Uniswap在过去一周内增加了1000个新代币交易对，其中许多的质量令人怀疑。自9月初以来，平均每天增加150对。对此，Messari去中心化金融分析师Jack Purdy表示，Uniswap上的交易对数量呈指数增长是“一件好事”，因为它“显示了完全开放、无需许可的金融原始的力量”。（coindesk）"
// content_prefix: "Uniswap过去一周增加了1000个新交易对"
// created_at: "2020-09-09T20:36:23.000Z"
// id: 703166
// link: "https://www.coindesk.com/uniswap-1000-token-pairs-one-week-defi-craze"
// link_name: "原文链接"
export type NewItem = {
  content: String,
  content_prefix: String,
  created_at: String,
  id: Number,
  link: String,
  link_name: String,
  platform: String
}

const params = `{
    find_live (
      order: "-id",
      limit: 20,
      where: {
        show: "1",
        created_at:{
          lt: "${moment(Date.now()).format("yyyy-MM-DD HH:MM:ss")}"
        }
      }
    ) {
      id
      created_at
      content
      content_prefix
      link_name
      link
      platform
    }
  }`;

export default function getNews() {
  return Taro.request({
    url: 'http://defi.cn/1.0/app',
    method: 'POST',
    data: params,
    header: {
      'Content-Type': 'application/graphql',
      // Authentication: token,
    },
  });
}

