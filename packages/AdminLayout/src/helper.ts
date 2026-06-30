import type { CSSProperties } from 'vue'
import { rgba } from 'seemly'
import { CssVars } from './typing'

export function calculateInverted(color: string): boolean {
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

export function applySkinStyles(style: CSSProperties, isDark: boolean, options?: { blur?: boolean, border?: 'right' | 'bottom' }): void {
  style.backgroundColor = `var(${CssVars.SkinBgLight})`
  if (options?.blur !== false) {
    style.backdropFilter = `var(${CssVars.SkinBlur})`
    style.WebkitBackdropFilter = `var(${CssVars.SkinBlur})`
  }
  const borderColor = `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.2)'}`
  if (options?.border === 'right') {
    style.borderRight = borderColor
  }
  else if (options?.border === 'bottom') {
    style.borderBottom = borderColor
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
