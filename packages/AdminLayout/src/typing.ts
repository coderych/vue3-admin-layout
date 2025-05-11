import type { Component, ExtractPropTypes, ExtractPublicPropTypes, PropType } from 'vue'

export type LayoutType = 'side' | 'mix' | 'top'

export interface MenuProps {
  collapsed?: boolean
  options?: any[]
  mode?: 'vertical' | 'horizontal'
  accordion?: boolean
  collapsedWidth?: number
  inverted?: boolean
  value?: string
  [key: string]: any
}

export interface MenuOption {
  key?: string
  label?: string
  icon?: Component
  children?: MenuOption[]
  [key: string]: any
}

export enum CssVars {
  BgColor = '--admin-layout-bg-color',
  BaseColor = '--admin-layout-base-color',
  PrimaryColor = '--primary-color',
  SiderCollapsedWidth = '--admin-layout-sider-collapsed-width',
  SiderWidth = '--admin-layout-sider-width',
  TransitionDuration = '--admin-layout-transition-duration',
  TransitionBezier = '--admin-layout-transition-bezier',
  TextColor = '--admin-layout-text-color',
  TextColorInverted = '--admin-layout-text-color-inverted',
  BorderColor = '--admin-layout-border-color',
  BorderColorInverted = '--admin-layout-border-color-inverted',
  ScrollbarColor = '--admin-layout-scrollbar-color',
  ScrollbarHoverColor = '--admin-layout-scrollbar-hover-color',
  ScrollbarSize = '--admin-layout-scrollbar-size',
  ScrollbarBorderRadius = '--admin-layout-scrollbar-border-radius',
}

export const adminLayoutProps = {
  mode: {
    type: String as PropType<LayoutType>,
    default: 'side',
  },
  splitMenu: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
  collapsed: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  isMobile: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  menuOptions: {
    type: Array as PropType<MenuOption[]>,
    default: () => [],
  },
  logo: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
  logoUrl: {
    type: String as PropType<string>,
    default: undefined,
  },
  title: {
    type: String as PropType<string>,
    default: '',
  },
  isFull: {
    type: Boolean as PropType<boolean>,
    default: false,
  },

  header: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
  headerHeight: {
    type: Number as PropType<number>,
    default: 48,
  },
  headerTheme: {
    type: String as PropType<string>,
    default: '#fff',
  },
  headerFixed: {
    type: Boolean as PropType<boolean>,
    default: false,
  },

  sider: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
  siderWidth: {
    type: Number as PropType<number>,
    default: 200,
  },
  siderCollapsedWidth: {
    type: Number as PropType<number>,
    default: 48,
  },
  siderTheme: {
    type: String as PropType<string>,
    default: '#fff',
  },
  siderFixed: {
    type: Boolean as PropType<boolean>,
    default: true,
  },

  prefix: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
  prefixHeight: {
    type: Number as PropType<number>,
    default: 36,
  },
  prefixFixed: {
    type: Boolean as PropType<boolean>,
    default: false,
  },

  suffix: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
  suffixHeight: {
    type: Number as PropType<number>,
    default: 32,
  },
  suffixFixed: {
    type: Boolean as PropType<boolean>,
    default: false,
  },

  accordion: {
    type: Boolean as PropType<boolean>,
    default: false,
  },

  renderMenu: {
    type: Function as PropType<(props: MenuProps) => any>,
    default: undefined,
  },
  activeKey: {
    type: String as PropType<string>,
    default: undefined,
  },
  cssVars: {
    type: Object as PropType<Record<CssVars | string, string>>,
    default: () => ({}),
  },
}

export type AdminLayoutProps = ExtractPublicPropTypes<typeof adminLayoutProps>
export type _AdminLayoutProps = ExtractPropTypes<typeof adminLayoutProps>

export interface SiderLeftProps extends AdminLayoutProps {
  open: (show: boolean) => void
  show: boolean
}
