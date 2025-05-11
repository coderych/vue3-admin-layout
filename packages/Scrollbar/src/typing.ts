import type { ExtractPublicPropTypes, PropType } from 'vue'

export const scrollbarProps = {
  trigger: {
    type: String as PropType<'hover' | 'none'>,
    default: 'hover',
  },
  xScrollable: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
}

export type ScrollbarProps = ExtractPublicPropTypes<typeof scrollbarProps>
