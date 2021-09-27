/**
 *
 */

import axios from '@/utils/http'

const request = (path, data, method = 'post', msgAlert = true) => {
  const params = new URLSearchParams(data)
  let url = DocConfig.server + path
  return axios({
    url: url,
    method: method,
    data: params
  })
}

export default request
