import { TestUrl } from "../Config/url";

function callApi(apiurl, opt) {
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

// api services
export const fetchUser = user => callApi(TestUrl, user);
