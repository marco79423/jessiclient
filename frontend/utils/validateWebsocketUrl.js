export default function validateWebsocketUrl(url) {
  return typeof url === 'string' && /^wss?:\/\//i.test(url)
}
