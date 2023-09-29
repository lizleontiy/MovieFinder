import type { FormRules } from 'element-plus'
import { SearchFormData } from '@/types/Search'

export const useSearchFormValidation = () => {
  const searchFormValidation = reactive<FormRules<SearchFormData>>({
    search: [
      {
        required: true,
        message: 'Please fill input',
        trigger: 'blur',
      },
      {
        min: 3,
        message: 'Length should be more than 3 letters',
        trigger: 'blur',
      },
    ],
  })
  return searchFormValidation
}