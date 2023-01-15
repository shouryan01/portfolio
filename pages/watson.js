// if (typeof window !== 'undefined') {
//   (function (d, t) {
//     var BASE_URL = 'https://app.chatwoot.com'
//     var g = d.createElement(t),
//       s = d.getElementsByTagName(t)[0]
//     g.src = BASE_URL + '/packs/js/sdk.js'
//     g.defer = true
//     g.async = true
//     s.parentNode.insertBefore(g, s)
//     g.onload = function () {
//       window.chatwootSDK.run({
//         websiteToken: 'xizrgbZhdLe71eA8dr3uXYBM',
//         baseUrl: BASE_URL,
//       })
//     }
//   })(document, 'script')
// }

if (typeof window !== 'undefined') {
  window.watsonAssistantChatOptions = {
    integrationID: '36111b20-9883-49c3-9e04-df0110afe0c3', // The ID of this integration.
    region: 'us-east', // The region your integration is hosted in.
    serviceInstanceID: 'bf5215e7-2cf7-4fb7-8bda-09d547f261d0', // The ID of your service instance.
    onLoad: function (instance) {
      instance.render()
    },
  }
  setTimeout(function () {
    const t = document.createElement('script')
    t.src =
      'https://web-chat.global.assistant.watson.appdomain.cloud/versions/' +
      (window.watsonAssistantChatOptions.clientVersion || 'latest') +
      '/WatsonAssistantChatEntry.js'
    document.head.appendChild(t)
  })
}
