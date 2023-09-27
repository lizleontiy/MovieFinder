// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const posterValidator = (_: unknown, value: any, callback: any) => {
  if (Object.keys(value).length === 0) {
    callback(new Error('Please upload file'))
  } else {
    callback()
  }
}