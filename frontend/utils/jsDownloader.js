import jsDownload from 'js-file-download'

export function downloadJsonData(name, jsonData) {
  jsDownload(JSON.stringify(jsonData), `${name}.json`)
}
