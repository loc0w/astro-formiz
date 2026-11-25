# astro-formiz

A working contact form for static Astro sites. Your form posts straight to [Formiz](https://formiz.app) — no API route, no SSR adapter, no server.

```sh
npm install astro-formiz
```

## Use it

Put your access key in `.env`:

```
PUBLIC_FORMIZ_KEY=your_access_key
```

Then drop the component into any page. You write the fields; the component handles the endpoint and the key.

```astro
---
import FormizForm from 'astro-formiz/FormizForm.astro';
---

<FormizForm>
  <label for="name">Name</label>
  <input id="name" name="name" required />

  <label for="email">Email</label>
  <input id="email" name="email" type="email" required />

  <label for="message">Message</label>
  <textarea id="message" name="message" required></textarea>

  <button type="submit">Send</button>
</FormizForm>
```

That's the whole integration. The browser posts the form and the visitor lands on your thank-you page. Your site stays fully static.

## Without leaving the page

Pass `ajax` and the form submits with `fetch` instead:

```astro
<FormizForm ajax>
  <!-- your fields -->
</FormizForm>
```

The form then carries a `data-formiz-state` attribute (`sending`, `sent`, `error`) you can style against, and fires `formiz:sending`, `formiz:sent` and `formiz:error` events:

```astro
<script>
  document.addEventListener('formiz:sent', (event) => {
    console.log('delivered to', event.detail.delivered);
  });
</script>
```

```css
form[data-formiz-state='sending'] button {
  opacity: 0.5;
  pointer-events: none;
}
```

## Doing it by hand

If you'd rather build the form yourself, the package also exports a helper:

```ts
import { submitToFormiz } from 'astro-formiz';

const result = await submitToFormiz(form, import.meta.env.PUBLIC_FORMIZ_KEY);
// { success: true, id: '...', delivered: ['email', 'telegram'] }
```

## Props

| Prop | Type | Default | What it does |
| --- | --- | --- | --- |
| `accessKey` | `string` | `PUBLIC_FORMIZ_KEY` | Your Formiz access key |
| `ajax` | `boolean` | `false` | Submit with `fetch` instead of a page navigation |
| `class` | `string` | — | Classes for the `<form>` element |

## About the access key

The key sits in your HTML, where anyone can read it. It only accepts submissions and only delivers to your own channels, so this is by design — but restrict it to your domain in your Formiz settings so a copy of your page can't send through it.

## What happens after submit

Submissions are stored before they're delivered, so a mail provider having a bad morning doesn't cost you the message. Notifications go to email, Telegram or a webhook, and every submission lands in a pipeline you can work through with notes and tags.

## License

MIT
