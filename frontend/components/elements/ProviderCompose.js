// 參考做法： https://stackoverflow.com/questions/51504506/too-many-react-context-providers/58924810#58924810

export const provider = (provider, props = {}) => [provider, props]

export default function ProviderComposer({providers = [], children}) {
  return providers.reduceRight((acc, [Provider, props]) => {
    return <Provider {...props}>{acc}</Provider>
  }, children)
}
