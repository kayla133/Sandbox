<script lang="ts">
    import { tick } from "svelte";

    let {
        label,
        value = $bindable(),
        type = "text"
    }: {
        label: string;
        value: string;
        type?: "text" | "email" | "textarea";
    } = $props();

    let isEditing = $state(false);
    let originalValue: string = value;
    let buttonRef: HTMLButtonElement | undefined;

    function startEdit() {
        originalValue = value;
        isEditing = true;
    }

    async function commitEdit() {
        isEditing = false;
        await tick();
        buttonRef?.focus();
    }

    async function cancelEdit() {
        value = originalValue;
        isEditing = false;
        await tick();
        buttonRef?.focus();
    }

    function handleKeydown(event: KeyboardEvent) {
        if (event.key === "Enter" && type !== "textarea") {
            event.preventDefault();
            commitEdit();
        }
        if (event.key === "Escape") {
            event.preventDefault();
            cancelEdit();
        }
    }
</script>

<div class="field">
  <div class="label">{label}</div>

  {#if isEditing}
    {#if type === "textarea"}
      <textarea
        bind:value
        aria-label={label}
        autofocus
        onblur={commitEdit}
        onkeydown={handleKeydown}
      ></textarea>
    {:else}
      <input
        {type}
        bind:value
        aria-label={label}
        autofocus
        onblur={commitEdit}
        onkeydown={handleKeydown}
      />
    {/if}
  {:else}
    <button
      type="button"
      class="value"
      aria-label={`Edit ${label}`}
      bind:this={buttonRef}
      onclick={startEdit}
    >
      {value}
    </button>
  {/if}
</div>

<style>
    .field {
        margin-bottom: 1rem;
    }
    .label {
        font-size: 0.75rem;
        color: #666;
    }
    .value {
        background: #fff;
        border: 1px solid #ccc;
        cursor: pointer;
        padding: 0.25rem 0.5rem;
    }
    .value:hover {
        background: #f5f5f5;
    }
</style>