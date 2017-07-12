import crypto from "crypto";

// 使用随机值加盐，MD5加密
export function cryptPwd(password) {
  //   const salt = Math.random().toString().slice(2, 5);
  // 密码“加盐”
  //   const saltPassword = password + ':' + salt;
  const saltPassword = password;
  // 加盐密码的md5值
  const md5 = crypto.createHash("md5");
  const result = md5.update(saltPassword).digest("hex");
  return result;
}
