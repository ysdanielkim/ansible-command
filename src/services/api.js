import { response } from './sampleResponse'

export async function makeRequest(url) {
  console.debug(`Send API request to ${url}`)

  return new Promise ((resolve) => {
    setTimeout(() => {
      console.debug('Simulated response in after one second.')
      resolve(response)
    }, 1000)
  })
}