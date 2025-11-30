## Font Styles in Markdown-

Write **#** before text to change the visual size.

Example:

```
# Heading 1 (largest)
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6 (smallest)
```

This will display as:

# Heading 1  
## Heading 2  
### Heading 3  
#### Heading 4  
##### Heading 5  
###### Heading 6

<br />

### Using HTML for Custom Font Sizes


If you know HTML as a developer, you can manually set font size.
<br />
**IF YOU ARE A NORMAL USER, SKIP THIS PART.**

Example:

```html
<span style="font-size: 28px;">Large text</span>
<span style="font-size: 18px;">Medium text</span>
<span style="font-size: 10px;">Small text</span>
```

This will display as:

<span style="font-size: 28px;">Large text</span>  
<span style="font-size: 18px;">Medium text</span>  
<span style="font-size: 10px;">Small text</span>


### Using HTML Headings


```html
<h1>Heading 1</h1>
<h2>Heading 2</h2>
<h3>Heading 3</h3>
```
This will display as:

<h1>Heading 1</h1>
<h2>Heading 2</h2>
<h3>Heading 3</h3>

---

## Auto generate table of contents-
Simply write 'Contents'(case-sensitive) as any haeding and automatically your article structure will be generated.

Example-
```
## Contents
```


## Introduction
Write your introduction here.
You can also **emphasize important words** using the following syntax:
- `**bold**` => **bold**
- `*italic*` => *italic*
- `~~strikethrough~~` => ~~strikethrough~~.

---

## Main Content
Here’s how to structure your main content:

### Text Styling
- **Bold**
- *Italic* 
- ~~Strikethrough~~

### Task List
You can create task lists using dashes and brackets:

```markdown
Synatx :

- [x] Completed Task
- [ ] Pending Task
```
Result:
- [x] Completed Task
- [ ] Pending Task

### Adding Images
You can add images to make your blog more engaging. Use the following syntax:  

```markdown
![Alt Text](image_url "Optional Title")
```

Example:

```markdown
![Cute Cat](/placeholder.png "A cute cat")

OR YOU CAN ONLY PUT LINK:

![Cute Cat](/placeholder.png)
```

This will display:

![Cute Cat](/placeholder.png "A cute cat")

### Adding Links

You can add a link by simply typing it and it will automatically convert into a clickable link.

### Code Example

To show code snippets in Markdown with proper formatting and preview, wrap your code using triple backticks. You can also specify the language for syntax highlighting.

Example structure:

````markdown
```language
// your code here
```

Example:

```js
console.log('Hello, world!');
```
````

This will display a formatted code block like:

```js
console.log('Hello, world!');
```


### Blockquotes

For quoting someone or something important:

```markdown
> This is a blockquote.
```

It will show like this:

> This is a blockquote.


### Table

Here’s how you can create tables:

```markdown
Syntax:

| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Row 1 A  | Row 1 B  | Row 1 C  |
| Row 2 A  | Row 2 B  | Row 2 C  |

```

This will render as:

| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Row 1 A  | Row 1 B  | Row 1 C  |
| Row 2 A  | Row 2 B  | Row 2 C  |

---

### Math Equations

You can write mathematical formulas using LaTeX syntax in Markdown.

**Example**

```markdown
Euler's formula is $e^{i\pi} + 1 = 0$.
```

**This will display as:**
Euler's formula is $e^{i\pi} + 1 = 0$.

**Block Math**
```markdown
$$
\frac{a}{b} = \frac{c}{d}
$$
```

**This will display as:**
$$
\frac{a}{b} = \frac{c}{d}
$$

Tips:

- Use `$...$` for inline formulas.
- Use `$$...$$` for centered block formulas.
- Works great for algebra, calculus, matrices, etc.

---

### Emoji

Emojis make your content fun and expressive.

**Syntax:**
```
I love coding! :smile: :rocket:
```

**Displays as:**
I love coding! :smile: :rocket:

| Code       | Emoji |
| ---------- | ----- |
| `:smile:`  | 😄    |
| `:heart:`  | ❤️    |
| `:rocket:` | 🚀    |
| `:fire:`   | 🔥    |
| `:tada:`   | 🎉    |

---
### Footnotes in Markdown

Footnotes let you add extra information without cluttering the main text.

**Syntax:**

```markdown
This is some text with a footnote.[^1]

[^1]: This is the footnote content.
```

**This will display as:**
This is some text with a footnote.[^1]

[^1]: This is the footnote content.

