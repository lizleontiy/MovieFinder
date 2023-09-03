export const posterValidator = (_: any, value: any, callback: any) => {
  if (Object.keys(value).length === 0) {
    callback(new Error('Please upload file'))
  } else {
    callback()
  }
}