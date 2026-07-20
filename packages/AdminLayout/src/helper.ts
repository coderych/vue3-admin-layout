import type { CSSProperties } from 'vue'
import type { MenuOption, MenuOptionLabel } from './typing'
import { AdminLayoutCssVars } from './typing'

/**
 * Parse a CSS color string into [r, g, b] values (0-255).
 * Supports hex (#RGB, #RGBA, #RRGGBB, #RRGGBBAA) and rgb()/rgba() formats.
 */
export function parseColor(color: string): [number, number, number] {
  // hex patterns
  const hexMatch = color.match(/^#([0-9a-f]{3,8})$/i)
  if (hexMatch) {
    let hex = hexMatch[1]
    // expand shorthand #RGB → #RRGGBB, #RGBA → #RRGGBBAA
    if (hex.length <= 4) {
      hex = hex.split('').map(c => c + c).join('')
    }
    const r = Number.parseInt(hex.slice(0, 2), 16)
    const g = Number.parseInt(hex.slice(2, 4), 16)
    const b = Number.parseInt(hex.slice(4, 6), 16)
    return [r, g, b]
  }

  // rgb/rgba patterns
  const rgbMatch = color.match(/^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/)
  if (rgbMatch) {
    return [Number(rgbMatch[1]), Number(rgbMatch[2]), Number(rgbMatch[3])]
  }

  throw new Error(`Unsupported color format: ${color}`)
}

export function calculateInverted(color?: string): boolean {
  if (!color) {
    return false
  }
  if (color === 'transparent') {
    return false
  }
  try {
    const [r, g, b] = parseColor(color)
    const luminance = 0.299 * r + 0.587 * g + 0.114 * b
    return luminance < 186
  }
  catch (error) {
    console.error(error)
    return false
  }
}

export function isInverted(isDark: boolean, hasSkin: boolean, color?: string): boolean {
  if (isDark) {
    return true
  }
  if (hasSkin) {
    return false
  }
  return calculateInverted(color)
}

export interface TreeOption {
  id?: string
  parentId?: string
  children?: string
}

export function getParentsKeys(tree: any[], option: TreeOption = {}): Map<string, string[]> {
  const parentsKeys = new Map<string, string[]>()
  const { id = 'id', children = 'children' } = option

  function loop(node: any, parentKeys?: string[]) {
    if (!node)
      return
    // 如果是一级菜单，直接使用自己的key
    if (!parentKeys) {
      parentsKeys.set(node[id], [node[id]])
    }
    else {
      // 否则，使用父节点的key
      parentsKeys.set(node[id], parentKeys)
    }
    // 递归处理子节点
    if (node[children]) {
      const _parentKeys = parentKeys ? [...parentKeys, node[id]] : [node[id]]
      node[children].forEach((child: any) => loop(child, _parentKeys))
    }
  }

  tree.forEach((node: any) => loop(node))
  return parentsKeys
}

export function getLabel(label: MenuOptionLabel | undefined, option: MenuOption): string {
  if (typeof label === 'function') {
    return label(option)
  }
  return label ?? ''
}

export function applyThemeStyles(style: CSSProperties, color?: string, inverted?: boolean) {
  if (!color) {
    return
  }

  style[AdminLayoutCssVars.BaseColor] = color
  style[AdminLayoutCssVars.TextColor] = inverted ? 'var(--text-color-dark)' : 'var(--text-color-light)'
  style[AdminLayoutCssVars.BorderColor] = inverted ? 'var(--border-color-dark)' : 'var(--border-color-light)'
  style[AdminLayoutCssVars.ScrollbarColor] = inverted ? 'var(--scrollbar-color-dark)' : 'var(--scrollbar-color-light)'
  style[AdminLayoutCssVars.ScrollbarColorHover] = inverted ? 'var(--scrollbar-color-hover-dark)' : 'var(--scrollbar-color-hover-light)'
}

export function applySkinBaseStyles(style: CSSProperties): void {
  style.backgroundColor = '#fff9'
  style[AdminLayoutCssVars.BaseColor] = 'transparent'
}

export function applySkinStyles(style: CSSProperties): void {
  applySkinBaseStyles(style)
  style.backdropFilter = 'blur(8px)'
  style.WebkitBackdropFilter = 'blur(8px)'
}
