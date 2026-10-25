export function useInlineEdit<T extends Record<string, any>>(
  initial: T,
  onSave: (value: T) => Promise<void> | void
) {
  const draft = $state<T>({ ...initial });
  let original = $state<T>({ ...initial });

  const isDirty = () => JSON.stringify(draft) !== JSON.stringify(original);

  async function save() {
    await onSave($state.snapshot(draft) as T);
    Object.assign(original, draft);
  }

  function cancel() {
    Object.assign(draft, original);
  }

  function reset(newValue: T) {
    Object.assign(draft, newValue);
    Object.assign(original, newValue);
  }

  return { draft, isDirty, save, cancel, reset };
}