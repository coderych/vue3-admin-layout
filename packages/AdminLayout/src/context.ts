import type { _AdminLayoutProps, MenuOption } from './typing'
import { createInjectionState, useDark, useElementSize } from '@vueuse/core'
import { omit } from 'lodash-es'
import { computed, ref, watch, watchEffect } from 'vue'
import { getParentsKeys } from './helper'

export interface AdminLayoutProviderMethods {
  onUpdateCollapsed?: (value: boolean) => void
  onUpdateSiderFixed?: (value: boolean) => void
}

export function adminLayoutState(props: _AdminLayoutProps, slots: any, methods: AdminLayoutProviderMethods = {}) {
  const mode = computed(() => props.mode)
  const splitMenu = computed(() => props.splitMenu)
  const isMobile = computed(() => props.isMobile)
  const menuOptions = computed(() => props.menuOptions)
  const collapsed = ref(props.collapsed)

  const logo = computed(() => props.logo)
  const logoUrl = computed(() => props.logoUrl)
  const title = computed(() => props.title)
  const isFull = computed(() => props.isFull)
  const isDark = useDark()
  const renderMenu = computed(() => props.renderMenu)
  const renderParentMenu = computed(() => props.renderParentMenu)
  const cssVars = computed(() => props.cssVars)
  const header = computed(() => props.header)
  const headerHeight = computed(() => props.headerHeight)
  const headerTheme = computed(() => props.headerTheme)
  const headerFixed = computed(() => props.headerFixed)
  const _headerHeight = computed(() => header.value ? headerHeight.value : 0)

  const sider = computed(() => props.sider)
  const siderWidth = computed(() => props.siderWidth)
  const siderTheme = computed(() => props.siderTheme)
  const siderCollapsedWidth = computed(() => props.siderCollapsedWidth)
  const _siderCollapsedWidth = computed(() => siderCollapsedWidth.value >= 80 || collapsed.value ? siderCollapsedWidth.value : siderCollapsedWidth.value / 0.6)
  const accordion = computed(() => props.accordion)
  const siderFixed = ref(props.siderFixed)
  const _siderWidth = computed(() => {
    if (!sider.value) {
      return 0
    }
    if (mode.value === 'top' || isMobile.value) {
      return 0
    }
    else if (mode.value === 'side' && splitMenu.value) {
      return siderFixed.value ? siderWidth.value + _siderCollapsedWidth.value : _siderCollapsedWidth.value
    }
    else {
      return collapsed.value ? siderCollapsedWidth.value : siderWidth.value
    }
  })

  const prefix = computed(() => props.prefix && Boolean(slots.prefix))
  const prefixHeight = computed(() => props.prefixHeight)
  const prefixFixed = computed(() => props.prefixFixed)
  const _prefixHeight = computed(() => prefix.value ? prefixHeight.value : 0)

  const suffix = computed(() => props.suffix && Boolean(slots.suffix))
  const suffixHeight = computed(() => props.suffixHeight)
  const suffixFixed = computed(() => props.suffixFixed)
  const _suffixHeight = computed(() => suffix.value ? suffixHeight.value : 0)

  const activeKey = computed(() => props.activeKey)
  const parentKey = ref<string | null>()

  const overlayRef = ref<HTMLDivElement>()
  const { height: contentHeight, width: contentWidth } = useElementSize(overlayRef)
  const contentTop = computed(() => {
    return _prefixHeight.value + (isFull.value ? 0 : _headerHeight.value)
  })
  const contentLeft = computed(() => _siderWidth.value)
  const contentBottom = computed(() => _suffixHeight.value)

  let parentsKeys = new Map<string, string[]>()

  const parentMenuOptions = computed<MenuOption[]>(() => {
    return menuOptions.value?.map(item => omit(item, 'children'))
  })

  const childMenuOptions = computed<MenuOption[]>(() => {
    const parentMenu = menuOptions.value?.find(item => item.key === parentKey.value)
    if (!parentMenu) {
      return []
    }
    const children = parentMenu?.children || []
    if (children.length === 0) {
      return [parentMenu]
    }
    return children
  })

  watchEffect(() => {
    if (parentsKeys.size === 0) {
      parentsKeys = getParentsKeys(menuOptions.value, { id: 'key', children: 'children' })
    }

    if (splitMenu.value && ['mix', 'side'].includes(mode.value)) {
      parentKey.value = parentsKeys.get(activeKey.value || '')?.[0] || ''
    }
  })

  function toggleCollapsed(value: boolean) {
    collapsed.value = value
    methods?.onUpdateCollapsed?.(value)
  }

  function toggleSiderFixed(value: boolean) {
    siderFixed.value = value
    methods?.onUpdateSiderFixed?.(value)
  }

  watch(() => props.collapsed, (value) => {
    collapsed.value = value
  })
  watch(() => props.siderFixed, (value) => {
    siderFixed.value = value
  })

  return {
    mode,
    isMobile,
    splitMenu,
    menuOptions,
    collapsed,
    logo,
    logoUrl,
    title,
    isFull,
    isDark,
    renderMenu,
    renderParentMenu,
    cssVars,

    header,
    headerHeight,
    headerTheme,
    headerFixed,
    _headerHeight,

    sider,
    siderWidth,
    siderTheme,
    siderCollapsedWidth,
    siderFixed,
    accordion,
    _siderWidth,
    _siderCollapsedWidth,

    prefix,
    prefixHeight,
    prefixFixed,
    _prefixHeight,

    suffix,
    suffixHeight,
    suffixFixed,
    _suffixHeight,

    activeKey,
    parentKey,
    parentMenuOptions,
    childMenuOptions,

    overlayRef,
    contentWidth,
    contentHeight,
    contentTop,
    contentLeft,
    contentBottom,

    toggleCollapsed,
    toggleSiderFixed,
  }
}

const [useAdminLayoutProvider, useAdminLayoutInject] = createInjectionState(adminLayoutState)

export { useAdminLayoutProvider }

export const useAdminLayoutState = (): ReturnType<typeof adminLayoutState> => useAdminLayoutInject()!
