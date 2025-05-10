import type { ExtractPublicPropTypes, PropType } from 'vue'

export const scrollbarProps = {
  xScrollable: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
}

export type ScrollbarProps = ExtractPublicPropTypes<typeof scrollbarProps>
