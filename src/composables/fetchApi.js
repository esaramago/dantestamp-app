import axios from 'axios'
const apiUrl = import.meta.env.VITE_API_URL
const token = import.meta.env.VITE_API_TOKEN

export async function useFetchApi(options) {

  const endpoint = options.endpoint
  const method = options.method || 'GET'
  const data = options.request ? { data: options.request } : null

  if (!endpoint) return

  try {
    return axios({
      method,
      url: `${apiUrl}/${endpoint}`,
      data,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer${token}`,
      }
    })
    .then((response) => {
      return response.data
    })

  } catch (errors) {
    if (options.error) {
      options.error(errors)
    } else {
      console.error(errors)
    }
  }
}