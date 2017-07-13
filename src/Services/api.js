// 可能需要http-proxy-middleware，否则将自动设置为localhost的请求。
export function callApi(apiurl, opt) {
  return fetch(apiurl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(opt)
  })
    .then(response => response.json().then(json => ({ json, response })))
    .then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject(json);
      }
    })
    .then(
      response => ({ response }),
      error => ({ error: error.message || "Something bad happened." })
    );
}
