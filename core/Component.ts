
export interface Component {
  readonly name: string
  [propName: string]: any
}

export interface SingletonComponent {
  readonly name: string
  [propName: string]: any
}
