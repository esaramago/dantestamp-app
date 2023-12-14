import database from '../database.json' assert {type: 'json'}

export async function useGetData(options) {

  if (!options.endpoint) return

  const endpoint = options.endpoint.split('/')
  const route = endpoint[0]
  const id = endpoint[1]

  const responseArray = database[route]
  let responseData = null

  if (responseArray && id) {
    responseData = responseArray.find(x => x.id == id)
  } else if (responseArray) {
    responseData = responseArray.sort((a, b) => {
      if (a.id > b.id) return -1
      if (a.id < b.id) return 1
      return 0
    })
  }
  options.success(responseData)
}