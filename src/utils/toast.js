export function showToast(message, type) {
  const text = String(message || "Done");
  const resolvedType =
    type ||
    (/error|unable|failed|missing|invalid|please/i.test(text) ? "error" : "success");

  window.dispatchEvent(
    new CustomEvent("shopix-toast", {
      detail: {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        message: text,
        type: resolvedType,
      },
    })
  );
}

