import type { CSSProperties } from 'vue'
import { toHexString } from 'seemly'
import { CssVars } from './typing'

export function calculateInverted(color: string): boolean {
  if (color === 'transparent') {
    return false
  }
  try {
    color = toHexString(color)

    const r = Number.parseInt(color.slice(1, 3), 16)
    const g = Number.parseInt(color.slice(3, 5), 16)
    const b = Number.parseInt(color.slice(5, 7), 16)
    const luminance = 0.299 * r + 0.587 * g + 0.114 * b

    return luminance < 186
  }
  catch (error) {
    console.error(error)
    return false
  }
}

export function borderStyle(position: string, inverted: boolean = false, bordered: boolean = true): CSSProperties {
  const style: CSSProperties = {}
  if (bordered) {
    const color = inverted ? `var(${CssVars.BorderColorInverted})` : `var(${CssVars.BorderColor})`
    style[`border-${position}` as any] = `1px solid ${color}`
    style.boxSizing = 'border-box'
  }
  return style
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

export function getFontColor(inverted: boolean): string {
  return inverted ? `var(${CssVars.TextColorInverted})` : `var(${CssVars.TextColor})`
}
