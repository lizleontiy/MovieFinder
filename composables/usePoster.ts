import { IMAGE_PLACEHOLDER } from '@/utils/const'

export const usePoster = (poster: string | undefined): string => {
  return poster ? poster : IMAGE_PLACEHOLDER
}