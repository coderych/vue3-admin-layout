import { rgba } from 'seemly'

export function calculateInverted(color: string): boolean {
  if (color === 'transparent') {
    return false
  }
  try {
    const rgbaColor = rgba(color)

    const r = rgbaColor[0]
    const g = rgbaColor[1]
    const b = rgbaColor[2]
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
