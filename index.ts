export const FORMIZ_ENDPOINT = 'https://api.formiz.app/submit';

export interface FormizResult {
  success: boolean;
  id?: string;
  delivered?: string[];
  [key: string]: unknown;
}

/**
 * Submit a form element to Formiz without leaving the page.
 *
 * ```ts
 * import { submitToFormiz } from 'astro-formiz';
 *
 * const result = await submitToFormiz(formElement, import.meta.env.PUBLIC_FORMIZ_KEY);
 * if (result.success) form.reset();
 * ```
 */
export async function submitToFormiz(
  form: HTMLFormElement,
  accessKey: string
): Promise<FormizResult> {
  const data = new FormData(form);

  if (!data.has('access_key')) {
    data.append('access_key', accessKey);
  }

  const response = await fetch(FORMIZ_ENDPOINT, {
    method: 'POST',
    body: data,
  });

  return (await response.json()) as FormizResult;
}
