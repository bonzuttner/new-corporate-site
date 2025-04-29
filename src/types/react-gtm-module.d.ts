declare module 'react-gtm-module' {
    interface TagManagerArgs {
      gtmId: string
      dataLayer?: object
      dataLayerName?: string
      auth?: string
      preview?: string
    }
  
    const TagManager: {
      initialize: (args: TagManagerArgs) => void
      dataLayer: {
        push: (args: object) => void
      }
    }
  
    export default TagManager
  }