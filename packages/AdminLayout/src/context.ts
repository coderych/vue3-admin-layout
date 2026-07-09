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
  // refs
  const siderCollapsed = ref(props.siderCollapsed)
  const contentFull = ref(false)
  const siderRightFixed = ref(props.siderRightFixed)
  const parentKey = ref<string | null>()
  const overlayRef = ref<HTMLDivElement>()

  // composables
  const isDark = useDark()
  const { height: overlayHeight, width: overlayWidth } = useElementSize(overlayRef)

  // computed - props (no dependencies on refs/composables)
  const mode = computed(() => props.mode)
  const splitMenu = computed(() => props.splitMenu)
  const isMobile = computed(() => props.isMobile)
  const menuOptions = computed(() => props.menuOptions)
  const scrollbarProps = computed(() => props.scrollbarProps)

  const logo = computed(() => props.logo)
  const logoUrl = computed(() => props.logoUrl)
  const title = computed(() => props.title)

  const header = computed(() => props.header)
  const headerHeight = computed(() => props.headerHeight)
  const headerTheme = computed(() => props.headerTheme)
  const headerFixed = computed(() => props.headerFixed)
  const headerBordered = computed(() => props.headerBordered)

  const sider = computed(() => props.sider)
  const siderWidth = computed(() => props.siderWidth)
  const siderBordered = computed(() => props.siderBordered)
  const siderTheme = computed(() => props.siderTheme)
  const siderCollapsedWidth = computed(() => props.siderCollapsedWidth)
  const accordion = computed(() => props.accordion)

  const contentHeader = computed(() => props.contentHeader && Boolean(slots['content-header']))
  const contentHeaderBordered = computed(() => props.contentHeaderBordered)
  const contentHeaderHeight = computed(() => props.contentHeaderHeight)
  const contentHeaderFixed = computed(() => props.contentHeaderFixed)

  const contentFooter = computed(() => props.contentFooter && Boolean(slots['content-footer']))
  const contentFooterHeight = computed(() => props.contentFooterHeight)
  const contentFooterFixed = computed(() => props.contentFooterFixed)

  const activeKey = computed(() => props.activeKey)

  const skin = computed(() => props.skin)
  const contentWidth = computed(() => {
    const val = props.contentWidth
    if (typeof val === 'number' || /^\d+$/.test(val)) {
      return `${val}px`
    }
    return val
  })

  // computed - derived (depends on refs/composables)
  const _headerHeight = computed(() => header.value ? headerHeight.value : 0)
  const _siderCollapsedWidth = computed(() => {
    const width = siderCollapsedWidth.value
    const isLargeEnough = width >= 80
    return isLargeEnough || siderCollapsed.value ? width : width / 0.6
  })
  const _siderWidth = computed(() => {
    if (!sider.value || mode.value === 'top' || isMobile.value) {
      return 0
    }
    if (mode.value === 'side' && splitMenu.value) {
      return siderRightFixed.value ? siderWidth.value + _siderCollapsedWidth.value : _siderCollapsedWidth.value
    }
    return siderCollapsed.value ? siderCollapsedWidth.value : siderWidth.value
  })

  const hasSkin = computed(() => !!skin.value && !isDark.value)

  const _contentHeaderHeight = computed(() => contentHeader.value ? contentHeaderHeight.value : 0)
  const _contentFooterHeight = computed(() => contentFooter.value ? contentFooterHeight.value : 0)

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

  // watchEffect
  watchEffect(() => {
    if (parentsKeys.size === 0) {
      parentsKeys = getParentsKeys(menuOptions.value, { id: 'key', children: 'children' })
    }

    if (splitMenu.value && ['mix', 'side'].includes(mode.value)) {
      parentKey.value = parentsKeys.get(activeKey.value || '')?.[0] || ''
    }
  })

  // functions
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

  // watch
  watch(() => props.siderCollapsed, (value) => {
    siderCollapsed.value = value
  })
  watch(() => props.siderRightFixed, (value) => {
    siderRightFixed.value = value
  })

  return {
    // refs
    siderCollapsed,
    contentFull,
    siderRightFixed,
    parentKey,
    overlayRef,

    // composables
    isDark,
    overlayWidth,
    overlayHeight,

    // computed - props
    mode,
    splitMenu,
    isMobile,
    menuOptions,
    scrollbarProps,
    logo,
    logoUrl,
    title,
    header,
    headerHeight,
    headerTheme,
    headerFixed,
    headerBordered,
    sider,
    siderWidth,
    siderBordered,
    siderTheme,
    siderCollapsedWidth,
    accordion,
    contentHeader,
    contentHeaderBordered,
    contentHeaderHeight,
    contentHeaderFixed,
    contentFooter,
    contentFooterHeight,
    contentFooterFixed,
    activeKey,
    skin,
    contentWidth,

    // computed - derived
    _headerHeight,
    _siderCollapsedWidth,
    _siderWidth,
    hasSkin,
    _contentHeaderHeight,
    _contentFooterHeight,
    contentTop,
    contentLeft,
    contentBottom,
    parentMenuOptions,
    childMenuOptions,

    // functions
    toggleSiderCollapsed,
    toggleSiderRightFixed,
    toggleContentFull,
  }
}

const [useAdminLayoutProvider, useAdminLayoutInject] = createInjectionState(adminLayoutState)

export { useAdminLayoutProvider }

export type AdminLayoutState = ReturnType<typeof useAdminLayoutProvider>
export const useAdminLayoutState = (): AdminLayoutState => useAdminLayoutInject()!
