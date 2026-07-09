import type { CSSProperties } from 'vue'
import type { MenuOption, MenuOptionLabel } from './typing'
import { rgba } from 'seemly'
import { AdminLayoutCssVars } from './typing'

export function calculateInverted(color: string): boolean {
  if (!color) {
    return false
  }
  if (color === 'transparent') {
    return false
  }
  try {
    const [r, g, b] = rgba(color)
    const luminance = 0.299 * r + 0.587 * g + 0.114 * b
    return luminance < 186
  }
  catch (error) {
    console.error(error)
    return false
  }
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

export function applyThemeStyles(style: CSSProperties, color: string, inverted: boolean) {
  style[AdminLayoutCssVars.BaseColor] = color
  style[AdminLayoutCssVars.TextColor] = inverted ? 'var(--text-color-dark)' : 'var(--text-color-light)'
  style[AdminLayoutCssVars.BorderColor] = inverted ? 'var(--border-color-dark)' : 'var(--border-color-light)'
  style[AdminLayoutCssVars.ScrollbarColor] = inverted ? 'var(--scrollbar-color-dark)' : 'var(--scrollbar-color-light)'
  style[AdminLayoutCssVars.ScrollbarColorHover] = inverted ? 'var(--scrollbar-color-hover-dark)' : 'var(--scrollbar-color-hover-light)'
}

export function applySkinStyles(style: CSSProperties): void {
  style.backgroundColor = '#fff9'
  style.backdropFilter = 'blur(8px)'
  style.WebkitBackdropFilter = 'blur(8px)'
}
