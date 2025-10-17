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

## 2. [Your next error here]

**Date:**  
**Environment:**  
**Error Message:**  

**Cause:**  

**Solution:**  

```