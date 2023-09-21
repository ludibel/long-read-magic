export interface AttributesProps {
    title?: string
    description?: string
    buttonName?: string
    content?: Array<object>
    tabs?: Array<object>
    link?: string
    nameLink?: string
    researcher?: Array<object>
    nameLab?: string,
    linkLab?: string,
    linkGoogleScholar?: string,
    linkOrcid?: string,
    imageUrl?: string,
    imageAlt?: string,
    tools?: Array<object>
    linkUrl?: string
    linkString?: string
    subTitle?: string
    image?: string
    paragraph?: Array<object>
    imageHero?: Array<object>
    imageForm?: Array<object>
    illustrationImage?: Array<object>

  }
  
  export interface ItemProps {
    title?: string
    description?: string
    paragraph?: string
    workflow?: Array<string>
    name?: string
    url?: string
    alt?: string
  }
  export interface TabProps {
    name: string
    content: Array<ItemProps>
    workflow: Array<ItemProps>
    link?: string

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
    linkGoogleScholar: string,
    imageUrl: string,
    nameLab: string,
    linkOrcid: string,
  }

  export interface LinkAboutProps {
    urlGoogleScholar: string
    urlOrcid: string
  }

  export interface ResourceProps {
    data : {
      title: string,
      description: string,
      subTitle?: string,
      contentResources?: string
      imageResources?: Array<ItemProps>,
      imageHero?: Array<ItemProps>,
      tools?: Array<ItemProps>,
    },
  }

  export interface ToolProps {
    name: string,
    inputFiles?: string,
    outputFiles?: string,
    informationObtained?: string,
    utility?: string,
    peeks?: string,
    drawbacks?: string,
  }
  
  export interface TermsOfUseProps {
    title: string,
    paragraph: string,
  }

 export  type ImageProps = {
    url: string
    alt: string
  }

