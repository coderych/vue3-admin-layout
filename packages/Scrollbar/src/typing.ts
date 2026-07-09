import type { ExtractPropTypes, ExtractPublicPropTypes, PropType } from 'vue'

export const scrollbarProps = {
  autoHide: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
  xScrollable: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  nativeScrollbar: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  size: {
    type: Number as PropType<number>,
    default: 5,
  },
  height: {
    type: String as PropType<string>,
  },
}

export type ScrollbarProps = ExtractPublicPropTypes<typeof scrollbarProps>
export type _ScrollbarProps = ExtractPropTypes<typeof scrollbarProps>
