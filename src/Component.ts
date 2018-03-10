
export interface Component {
  name: string
  [propName: string]: any
}

export interface SingletonComponent {
  [propName: string]: any
}
