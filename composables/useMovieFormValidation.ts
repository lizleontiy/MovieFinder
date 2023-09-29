import { posterValidator } from '@/utils/posterValidator'
import { FormRules } from 'element-plus'
import { MovieFormData } from '@/types/MovieForm'

export const useMovieFormValidation = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rules = reactive<FormRules<MovieFormData<any>>>({
    title: [
      {
        required: true,
        message: 'Please fill input',
        trigger: 'blur',
      },
      {
        min: 3,
        message: 'Length should be more than 3',
        trigger: 'blur',
      },
    ],
    year: [
      {
        required: true,
        message: 'Please fill input',
        trigger: 'blur',
      },
      {
        type: 'number',
        message: 'Year must be a number',
      },
    ],
    director: [
      {
        required: true,
        message: 'Please fill input',
        trigger: 'blur',
      },
    ],
    poster: [
      {
        validator: posterValidator,
        trigger: 'blur',
      },
    ],
  })
  return rules
}