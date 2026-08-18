# Kenshi Webspace - Error Logs

This document contains a history of errors encountered while building Kenshi Webspace, along with their causes and solutions.


## 1. Auth Error in Development Environment (Clerk)

**Date:** 2025-10-17  
**Environment:** Local Dev  
**Error Message:**  

```bash
Clock skew detected. This usually means that your system clock is inaccurate. Clerk will attempt to account for the clock skew in development.
JWT cannot be used prior to not before date claim (nbf). Not before date: Fri, ...
```

**Cause:**  
System clock was inaccurate, causing JWT validation errors in Clerk.

**Solution:**  
- Turned on automatic time synchronization.
- Ensured system clock matches actual time.
- Restarted development server.

---

## 2. `<a>` Nested Inside `<a>` Hydration Error

**Date:**  2025-10-18 
<br>
**Environment:**  Prouction - React, likely during client hydration after SSR
<br>
**Error Message:** 

```bash
In HTML, <a> cannot be a descendant of <a>.
This will cause a hydration error.

<a> cannot contain a nested <a>.
See this log for the ancestor stack trace.

```

**Cause:**  

The rendered component structure contains nested anchor (`<a>`) tags — an outer <LinkWithRef> wrapping the entire card and an inner <LinkWithRef> (or `<a>`) inside it.
This creates invalid HTML (`<a><a>...</a></a>`), which browsers auto-correct differently during server-side rendering, leading to a hydration mismatch in React.

Example pattern causing the issue:

```jsx
<LinkWithRef to="/articles/0">
  <a href="/articles/0">
    ...
    <LinkWithRef to="/articles/0">
      <a href="/articles/0">Read more</a>
    </LinkWithRef>
  </a>
</LinkWithRef>

```

**Solution:**  
Ensure that no `<a> or <Link>` component is nested within another.
You can fix this by replacing the inner link with a non-anchor element (`<span> or <div>`) or by keeping only one LinkWithRef wrapper per card.

Corrected example:

```jsx
<LinkWithRef to="/articles/0">
  <Card>
    <CardContent>
      <motion.h3>{title}</motion.h3>
      <span className="text-indigo-600 hover:underline text-sm">
        Read more
      </span>
    </CardContent>
  </Card>
</LinkWithRef>

```

## 3. Assets limits error(injectMainfest)

**Date:**  2025-11-29 
<br>
**Environment:**  
[Production]
- Vite 5.x  
- React 19  
- vite-plugin-pwa  
- Production build  
<br>
**Error Message:**  

```
Configure "injectManifest.maximumFileSizeToCacheInBytes" to change the limit: the default value is 2 MiB.
Assets exceeding the limit:
- assets/index-CYTotMFO.js is 2.2 MB, and won't be precached.
```

**Cause:**  
- The error occurs because the `injectManifest` strategy of `vite-plugin-pwa` tries to precache all assets matching `globPatterns`.  
- By default, **files larger than 2 MiB are ignored**.  
- The main bundle (`index-CYTotMFO.js`) is 2.2 MB, which exceeds this default limit.

**Solution:** 
1. **Increase the maximum file size for precaching:**  

```js
injectManifest: {
  globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
  maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // Increase precache limit to 5 MB
},
```

2. **Alternative / Recommended:**  
- Split your JS bundle using dynamic imports to reduce the size of main chunks.  
- Optimize dependencies and remove unused libraries.  
- Keep heavy assets like large vendor scripts or images as network-loaded resources instead of precaching them.

## 4. [Your next error here]

**Date:**  
<br>
**Environment:**  
<br>
**Error Message:**  

**Cause:**  

**Solution:** 

---
