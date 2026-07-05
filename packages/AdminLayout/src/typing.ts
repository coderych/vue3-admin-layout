import type { Component, ExtractPropTypes, ExtractPublicPropTypes, PropType, ShallowUnwrapRef } from 'vue'
import type { ScrollbarProps } from '../../Scrollbar'
import type { AdminLayoutState } from './context'

export type LayoutType = 'side' | 'mix' | 'top'

export type MenuOptionLabel = string | ((option: MenuOption) => string)

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
  label?: MenuOptionLabel
  icon?: Component | string
  children?: MenuOption[]
  [key: string]: any
}

export enum CssVars {
  BgColor = '--admin-layout-bg-color',
  BaseColor = '--admin-layout-base-color',
  PrimaryColor = '--primary-color',
  SiderCollapsedWidth = '--admin-layout-sider-collapsed-width',
  SiderWidth = '--admin-layout-sider-width',
  HeaderHeight = '--admin-layout-header-height',
  TransitionDuration = '--admin-layout-transition-duration',
  TransitionBezier = '--admin-layout-transition-bezier',
  TextColor = '--admin-layout-text-color',
  BorderColor = '--admin-layout-border-color',
  SkinBlur = '--admin-layout-skin-blur',
  SkinBgLight = '--admin-layout-skin-bg-light',
}

export const DefaultColor = {
  BgColor: 'rgb(240, 242, 245)',
  BaseColor: 'rgb(255,255,255)',
  PrimaryColor: '#1890ff',
  TextColor: 'rgb(51, 54, 57)',
  BorderColor: 'rgb(239, 239, 245)',
}

export const DefaultDarkColor = {
  BgColor: 'rgb(16, 16, 20)',
  BaseColor: 'rgb(24, 24, 28)',
  PrimaryColor: '#409eff',
  TextColor: 'rgba(255, 255, 255, 0.85)',
  BorderColor: 'rgba(255, 255, 255, 0.09)',
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
    default: true,
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
  skin: {
    type: String as PropType<string>,
    default: undefined,
  },
  siderFixed: {
    type: Boolean as PropType<boolean>,
    default: true,
  },

  contentHeader: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
  contentHeaderHeight: {
    type: Number as PropType<number>,
    default: 36,
  },
  contentHeaderFixed: {
    type: Boolean as PropType<boolean>,
    default: true,
  },

  contentFooter: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
  contentFooterHeight: {
    type: Number as PropType<number>,
    default: 32,
  },
  contentFooterFixed: {
    type: Boolean as PropType<boolean>,
    default: false,
  },

  contentWidth: {
    type: [String, Number] as PropType<string | number>,
    default: '100%',
  },

  accordion: {
    type: Boolean as PropType<boolean>,
    default: false,
  },

  activeKey: {
    type: String as PropType<string>,
    default: undefined,
  },
  cssVars: {
    type: Object as PropType<Record<CssVars | string, string>>,
    default: () => ({}),
  },

  scrollbarProps: {
    type: Object as PropType<ScrollbarProps>,
  },
}

export type AdminLayoutProps = ExtractPublicPropTypes<typeof adminLayoutProps>
export type _AdminLayoutProps = ExtractPropTypes<typeof adminLayoutProps>

export interface AdminLayoutHeaderProps {
  state: ShallowUnwrapRef<AdminLayoutState>
  inverted: boolean
  height: number
  _height: number
  fixed: boolean
  theme: string
  show: boolean
}

export interface AdminLayoutSiderProps {
  state: ShallowUnwrapRef<AdminLayoutState>
  show: boolean
  fixed: boolean
  theme: string
  width: number
  _width: number
  collapsedWidth: number
  _collapsedWidth: number
  inverted: boolean
  headerHeight: number
  collapsed: boolean
  toggleCollapsed: (collapsed: boolean) => void
  toggleFixed: (fixed: boolean) => void
}

export interface AdminLayoutContentProps {
  state: ShallowUnwrapRef<AdminLayoutState>
  height: number
  width: number
  scrollHeight: string
  contentWidth: string
}

export interface AdminLayoutLogoProps {
  state: ShallowUnwrapRef<AdminLayoutState>
  width: number
  height: number
  inverted: boolean
  collapsed: boolean
}

export interface AdminLayoutMenuProps extends MenuProps {
  state: ShallowUnwrapRef<AdminLayoutState>
}

export interface AdminLayoutInstance {
  state: ShallowUnwrapRef<AdminLayoutState>
}
