import type { FormInstance } from 'element-plus'

export const useValidateForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  return await formEl.validate((valid) => {
    return valid
  })
}