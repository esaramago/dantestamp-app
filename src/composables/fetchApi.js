import axios from 'axios'

export async function useFetchApi(options) {

  const data = options.request ? { data: options.request } : null

  if (!options.endpoint) return

  const endpoint = options.endpoint.split('/')
  const route = endpoint[0]
  const id = endpoint[1]

  try {
    return axios({
      method: options.method || 'GET',
      url: 'database.json',
      data
    })
    .then((response) => {
      if (response.statusText === 'OK') {
        const responseArray = response.data[route]
        let responseData = null

        if (responseArray && id) {
          responseData = responseArray.find(x => x.id == id)
        } else if (responseArray) {
          responseData = responseArray
        }
        if (options.success) {
          options.success(responseData)
        }
        return responseData
      }
    })

  } catch (errors) {
    if (options.error) {
      options.error(errors)
    } else {
      console.error(errors)
    }
  }
}