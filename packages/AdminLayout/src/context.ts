import type { _AdminLayoutProps, MenuOption } from './typing'
import { createInjectionState, useDark, useElementSize } from '@vueuse/core'
import { omit } from 'lodash-es'
import { computed, ref, watch, watchEffect } from 'vue'
import { getParentsKeys } from './helper'

export interface AdminLayoutProviderMethods {
  onUpdateSiderCollapsed?: (value: boolean) => void
  onUpdateSiderRightFixed?: (value: boolean) => void
}

export function adminLayoutState(props: _AdminLayoutProps, slots: any, methods: AdminLayoutProviderMethods = {}) {
  const mode = computed(() => props.mode)
  const splitMenu = computed(() => props.splitMenu)
  const isMobile = computed(() => props.isMobile)
  const menuOptions = computed(() => props.menuOptions)
  const siderCollapsed = ref(props.siderCollapsed)
  const scrollbarProps = computed(() => props.scrollbarProps)

  const logo = computed(() => props.logo)
  const logoUrl = computed(() => props.logoUrl)
  const title = computed(() => props.title)
  const contentFull = ref(false)
  const isDark = useDark()

  const header = computed(() => props.header)
  const headerHeight = computed(() => props.headerHeight)
  const headerTheme = computed(() => props.headerTheme)
  const headerFixed = computed(() => props.headerFixed)
  const _headerHeight = computed(() => header.value ? headerHeight.value : 0)

  const sider = computed(() => props.sider)
  const siderWidth = computed(() => props.siderWidth)
  const siderTheme = computed(() => props.siderTheme)
  const siderCollapsedWidth = computed(() => props.siderCollapsedWidth)
  const _siderCollapsedWidth = computed(() => siderCollapsedWidth.value >= 80 || siderCollapsed.value ? siderCollapsedWidth.value : siderCollapsedWidth.value / 0.6)
  const accordion = computed(() => props.accordion)
  const siderRightFixed = ref(props.siderRightFixed)
  const _siderWidth = computed(() => {
    if (!sider.value || mode.value === 'top' || isMobile.value) {
      return 0
    }
    if (mode.value === 'side' && splitMenu.value) {
      return siderRightFixed.value ? siderWidth.value + _siderCollapsedWidth.value : _siderCollapsedWidth.value
    }
    return siderCollapsed.value ? siderCollapsedWidth.value : siderWidth.value
  })

  const contentHeader = computed(() => props.contentHeader && Boolean(slots['content-header']))
  const contentHeaderHeight = computed(() => props.contentHeaderHeight)
  const contentHeaderFixed = computed(() => props.contentHeaderFixed)
  const _contentHeaderHeight = computed(() => contentHeader.value ? contentHeaderHeight.value : 0)

  const contentFooter = computed(() => props.contentFooter && Boolean(slots['content-footer']))
  const contentFooterHeight = computed(() => props.contentFooterHeight)
  const contentFooterFixed = computed(() => props.contentFooterFixed)
  const _contentFooterHeight = computed(() => contentFooter.value ? contentFooterHeight.value : 0)

  const activeKey = computed(() => props.activeKey)
  const parentKey = ref<string | null>()

  const skin = computed(() => props.skin)
  const hasSkin = computed(() => !!skin.value)
  const contentWidth = computed(() => {
    const val = props.contentWidth
    if (typeof val === 'number' || /^\d+$/.test(val)) {
      return `${val}px`
    }
    return val
  })

  const overlayRef = ref<HTMLDivElement>()
  const { height: overlayHeight, width: overlayWidth } = useElementSize(overlayRef)
  const contentTop = computed(() => {
    return _contentHeaderHeight.value + (contentFull.value ? 0 : _headerHeight.value)
  })
  const contentLeft = computed(() => _siderWidth.value)
  const contentBottom = computed(() => _contentFooterHeight.value)

  let parentsKeys = new Map<string, string[]>()

  const parentMenuOptions = computed<MenuOption[]>(() => {
    return menuOptions.value?.map(item => omit(item, 'children'))
  })

  const childMenuOptions = computed<MenuOption[]>(() => {
    const parentMenu = menuOptions.value?.find(item => item.key === parentKey.value)
    if (!parentMenu) {
      return []
    }
    const children = parentMenu.children || []
    return children.length === 0 ? [parentMenu] : children
  })

  watchEffect(() => {
    if (parentsKeys.size === 0) {
      parentsKeys = getParentsKeys(menuOptions.value, { id: 'key', children: 'children' })
    }

    if (splitMenu.value && ['mix', 'side'].includes(mode.value)) {
      parentKey.value = parentsKeys.get(activeKey.value || '')?.[0] || ''
    }
  })

  function toggleSiderCollapsed(value: boolean) {
    siderCollapsed.value = value
    methods?.onUpdateSiderCollapsed?.(value)
  }

  function toggleSiderRightFixed(value: boolean) {
    siderRightFixed.value = value
    methods?.onUpdateSiderRightFixed?.(value)
  }

  function toggleContentFull(value: boolean) {
    contentFull.value = value
  }

  watch(() => props.siderCollapsed, (value) => {
    siderCollapsed.value = value
  })
  watch(() => props.siderRightFixed, (value) => {
    siderRightFixed.value = value
  })

  return {
    mode,
    isMobile,
    splitMenu,
    menuOptions,
    siderCollapsed,
    logo,
    logoUrl,
    title,
    contentFull,
    isDark,
    scrollbarProps,

    header,
    headerHeight,
    headerTheme,
    headerFixed,
    _headerHeight,

    sider,
    siderWidth,
    siderTheme,
    siderCollapsedWidth,
    siderRightFixed,
    accordion,
    _siderWidth,
    _siderCollapsedWidth,

    contentHeader,
    contentHeaderHeight,
    contentHeaderFixed,
    _contentHeaderHeight,

    contentFooter,
    contentFooterHeight,
    contentFooterFixed,
    _contentFooterHeight,

    activeKey,
    parentKey,
    parentMenuOptions,
    childMenuOptions,

    skin,
    hasSkin,
    contentWidth,

    overlayRef,
    overlayWidth,
    overlayHeight,
    contentTop,
    contentLeft,
    contentBottom,

    toggleSiderCollapsed,
    toggleSiderRightFixed,
    toggleContentFull,
  }
}

const [useAdminLayoutProvider, useAdminLayoutInject] = createInjectionState(adminLayoutState)

export { useAdminLayoutProvider }

export type AdminLayoutState = ReturnType<typeof useAdminLayoutProvider>
export const useAdminLayoutState = (): AdminLayoutState => useAdminLayoutInject()!
