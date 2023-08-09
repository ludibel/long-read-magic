export interface AttributesProps {
    title?: string
    description?: string
    buttonName?: string
    content?: Array<object>
    tabs?: Array<object>
    link?: string
    nameLink?: string
  }
  
  export interface ItemProps {
    title?: string
    description?: string
    paragraph?: string
    workflow?: Array<string>
    name?: string
  }
  export interface TabProps {
    name: string
    content: Array<ItemProps>
    workflow: Array<ItemProps>
  }