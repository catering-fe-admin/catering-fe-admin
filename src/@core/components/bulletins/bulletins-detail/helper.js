export const getFormattedFile = (key, value, docs) => {
  const position = {
    file1: 1,
    file2: 2,
    file3: 3
  }

  const doc = docs?.find(e => e?.position == position?.[key])

  const isNotEdited = !!doc && !!value?.id
  const isEdited = !!doc && !value?.id
  const isRemoved = !!doc && !value
  const isNew = !doc

  if (isNotEdited) {
    return { id: doc?.id, position: doc?.position }
  }

  if (isEdited && value) {
    return {
      id: doc?.id,
      file: value,
      position: position?.[key]
    }
  }

  if (isRemoved) {
    return null
  }

  if (isNew && value) {
    return {
      file: value,
      position: position?.[key]
    }
  }
}
