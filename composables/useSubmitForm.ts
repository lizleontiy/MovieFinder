import type { FormInstance } from 'element-plus'

export const useSubmitForm = (onSuccess: () => void, onError?: () => void) => {
  return async(formEl: FormInstance | undefined) => {
    if (!formEl) return
    return await formEl.validate((valid) => {
      if (valid) {
        onSuccess()
      } else {
        if (!onError) {
          return
        }
        onError()
      }
    })
  }
}