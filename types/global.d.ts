interface ResponseData<T> {
  body?: {
    list: T[]
    total: number
  }
}
