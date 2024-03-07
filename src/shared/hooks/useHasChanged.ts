import { usePrevious } from './usePrevious'

export function useHasChanged<V>(value: V) {
  const prevValue = usePrevious(value)
  return prevValue !== value
}
