/**
 * github.com/guren-cloud/v-request
 * reverse request::cloud code
 * 无限制的小程序HTTP请求云函数
 * 你可以使用此功能，在小程序上请求访问如下类型的HTTP数据：
 * 1. 未进行备案的
 * 2. 未上HTTPS证书的
 * 3. 没绑定域名，直接IP地址访问的
 * ==========================
 * 注意：请勿使用此功能于非法用途！！仅供开发者学习使用！！
 */

const request = require('request');
exports.main = (evt, ctx) => {
  console.log('in', evt,ctx)
  return new Promise((RES, REJ) => {
    request(evt.options, (err, res, body) => {
      console.log('out', err,res,body)
      if (err) return REJ(err);
      RES(res);
    })
  });
}

