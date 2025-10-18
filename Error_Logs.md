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

## 3. [Your next error here]

**Date:**  
<br>
**Environment:**  
<br>
**Error Message:**  

**Cause:**  

**Solution:** 

---
