export interface AttributesProps {
    title?: string
    description?: string
    buttonName?: string
    content?: Array<object>
    tabs?: Array<object>
    link?: string
    nameLink?: string
    researcher?: Array<object>
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

  export interface FormProps {
    title: string,
    description: string,
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void,
  }

  export interface ResearcherProps {
    name: string,
    job: string,
    profile: string,
    linkLab: string,
    linkReseau: string,
    imageUrl: string,
    nameLab: string,
  }

