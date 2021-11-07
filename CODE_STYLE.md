# Coding Style

All teams work differently, a _team's style_ should represent the deliberation
and negotiation of each coding aspect by the members of that team.

- These are not immutable rules, things change, evolve and serve different
  purposes in different stages of development and experience.
- All conventions are right as long as people using them agree on their meaning
  and form.

The following is inspired from:

- [Elements of JavaScript
  Style](https://medium.com/javascript-scene/elements-of-javascript-style-caa8821cb99f)
- [Thinking on
  Paper](https://www.amazon.com/Thinking-Paper-V-Howard/dp/0688048730)

---

## Table of contents

<!-- vim-markdown-toc GFM -->

- [Thoughts on coding](#thoughts-on-coding)
- [Line length](#line-length)
- [Folder structure and imports](#folder-structure-and-imports)
- [Naming](#naming)
  - [Branches](#branches)
  - [Commit messages](#commit-messages)
  - [Functions](#functions)
  - [Booleans](#booleans)
  - [Constants](#constants)
  - [Handlers and Props](#handlers-and-props)
  - [Types](#types)
  - [Generic names](#generic-names)
- [Testing](#testing)
  - [React components](#react-components)

<!-- vim-markdown-toc -->

## Thoughts on coding

1. _Continuous refactoring_: Developers _read_ much more code than they
   _write_. Don't stop at your fist draft while also not obsessing on getting
   it 100% right.

1. _Read the room_: Functional programming, or any one paradigm, are not magic
   bullets. Figure out when to use what. When building primitives for example,
   it makes sense to be more conscious about performance and adopt a more
   imperative style - still being aware of immutability but not [spreading all
   the object all the
   time](https://www.richsnapp.com/article/2019/06-09-reduce-spread-anti-pattern).

1. _One way execution flow_: Make code execution flow _top -> down_ and _left
   -> right_. The more you go back, inside or outside the more you switch
   context and zoom level. These switches reset the readers mental parsing
   "state" making the code's meaning harder to transmit and more prone to
   mistakes.

1. _Let machines do their job_: If there's a linting rule that can
   verify or enforce a conventions, use it.

## Line length

80 characters, yes, just like our grand parents with [punch
cards](https://www.ibm.com/ibm/history/history/year_1928.html).

It turns out that there is an optimal [line size for
legibility](https://en.wikipedia.org/wiki/Line_length), between 40 and 80 -
taking into account eye/head movement, focus etc. This is true for printed
books and also code.

> At the beginning of every new line the reader is focused, but this focus
> gradually **wears off** over the duration of the line.
>
> "Typographie", E. Ruder

[80-characters line length limit in 2017 (and
later)](https://www.katafrakt.me/2017/09/16/80-characters-line-length-limit/)
and [Readability: the Optimal Line
Length](https://baymard.com/blog/line-length-readability) are good intros on
the topic.

## Folder structure and imports

The principle of ["One Way Data
Flow"](https://tkssharma.gitbook.io/react-training/day-01/react-js-3-principles/one-way-data-flow)
can also be applied to component imports/dependencies.

- The project folder structure should resemble more a
  [Polytree](https://en.wikipedia.org/wiki/Polytree), not the required
  [Directed acyclic
  graph](https://en.wikipedia.org/wiki/Directed_acyclic_graph)

- Use [Hierarchical
  model–view–controller](https://en.wikipedia.org/wiki/Hierarchical_model%E2%80%93view%E2%80%93controller)
  when creating pages, containers or multi part entities

  ```text
  ▾ HMVC/
    ▾ todos/
        controller
        model
        view
    ▾ comments/
        controller
        model
        view
  ▾ MVC/
    ▾ controllers/
        todos
        comments
    ▾ models/
        todos
        comments
    ▾ views/
        todos
        comments
  ```

- A child should never import something from it's parents or it's siblings, _it
  can only have access to it's children_

- If a child needs something from it's parent, that piece of data should be
  _handed down through props_ (data, functions or other Components)

## Naming

### Branches

- Main: `main`
- PR: `feat|fix|docs/{task-id}/few-word-summary`

### Commit messages

Use [Conventional Commits](https://www.conventionalcommits.org).

```text
feat(ui): allow provided config object to extend other configs

BREAKING CHANGE: `extends` key in config file is now used for extending other config files
```

### Functions

A functions is a thing that does something, performs an action, if it does
something, it's a **verb**. The stronger and less noise around the verb, the
better. `renameFile` better than `fileRename` or `doRenameFile`.

Functions start with a **verb**, optionally followed by the **noun** and/or an
**adjective**:

```ts
const rename = () => { ... }
const renameFile = () => { ... }
const renameMarkdownFiles = () => { ... }
```

All functions ever written are a specialized form of one of the following
verbs:

- `Create`: "build", "initialize", "construct"
- `Read`: "find", "get", "check"
- `Update`: "change", "rename", "map", "filter"
- `Delete`: "remove"

Use the verb in it's basic form
([infinitive](https://en.wikipedia.org/wiki/Infinitive)). `rename`, not
`renaming` or `doRename` or `renames`.

Use a name intentionally and strengthen it's meaning by constantly implementing
it with the same behavior, for ex:

- `getTodo` throws if not found, `findTodo` returns null
- `updateComment` implies persistence (API or DB interaction),
  `changeCommentText` refers to local state changes
- `sum` adds items of an array, `sumBy` adds the field of an object array by
  providing an "extract" function

Prefix **predicate** functions, functions that return a boolean, with a verbs
that imply truth seeking - `check`, `verify`, `decide`, `determine` - followed
by a question:

```js
const isToday = checkIsToday(new Date())
```

### Booleans

Boolean variables, including React props, are prefixed with one of the
following: `can`, `should`, `is`, `has`, `was`

```js
const isAllowed = false
const shouldRender = true
```

### Constants

Always `UPPER_CASE`.

```js
const LANGUAGES = ["EN-us", "NL-nl", "NL-be"]
```

### Handlers and Props

Function `props` are prefixed with **`on`** and phrased as an event:

> `onInputChange`, `onFormSubmit` etc.

Functions passed as props for reacting to an event are prefixed with
**`handle`**, followed by the main **verb**, optionally can use a **noun**
and/or a **adjective**:

> `handleUpdateUser`, `handleSwitchTab`, `handleDisableWorkshopUser` etc.

Example: Persist Users' language preference

```jsx
const handleUpdateUserLocale = useCallback(
  input => update({ locale: input }),
  [update]
)

...

<Sidebar onLocaleChange={handleUpdateUserLocale} />
```

### Types

- Append `Type` to the name of the thing it's typing and CamelCase it.

```jsx
type InputUIPropsType = {
  type: "password";
  value: string;
  hasShowUnmasked: boolean;
} | {
  type: "text";
  value: string;
}
```

- Separate types from the "actual" code. Writing them inline makes it harder to
  distinguish actionable code from what fundamentally is compiler oriented code

```tsx
// separate
const InputUI: FC<InputUIPropsType> = ({ value, type, hasShowUnmasked }) => {
...
}

// inlined
const InputUI = (
  props:
    | {
        type: 'password';
        value: string;
        hasShowUnmasked: boolean;
      }
    | {
        type: 'text';
        value: string;
      }
) => {
...
};
```

### Generic names

1. `input` and `output`

    ```js
    const sum = (input = []) => {
      let output = 0

      for (let index = 0, length = input.length; index < length; index++) {
        output = output + input[index]
      }

      return output
    }
    ```

1. `input`, `item` and `accumulator`

    ```js
    const sum = (input = []) => input.reduce(
      (accumulator, item) => accumulator + item,
      0
    )
    ```

1. `needle`, `heystack` and `index`

    ```js
    const checkExistsWithValue = needle => (heystack = []) => {
      for (let index = 0; index < heystack.length; index++) {
        if (item === heystack[index]) {
          return true
        } 
      }

      return false
    }
    ```

1. When using "functional primitives" like `map` or `reduce`, use `item`,
   `array` and `accumulator`

    ```js
    ```

1. When writing CRUD like functions, use `id` and `data`

    ```js
    const handleCreateTodo = useCallback(
      data => POST("/todos", { body: data }), 
      []
    )

    const handleUpdateTodo = useCallback(
      (id, data) => PATCH(`/todos/${id}`, { body: data }), 
      []
    )
    ```

1. `properties` and `options`, not `args` or `opts` or `props`. Aligns with
   React ecosystem, use it also when writing other functions that require
   _configuring_

    ```js
    ```

## Testing

### React components

- Tag all the essential parts of the component with a `data-testid`. It is the
  state and composition of these parts that determine the behavior of the
  component.
- Check the component's configuration without coupling the test to HTML or
  CSS, making it less brittle. If I need to enforce a certain HTML tag, you can
  check the attributes of the element in question.
- Using multiple selector functions (`queryByRole`, `findByText`,
  `getAllByRole` etc) creates noise and adds complexity in a space where
  everything should be as dumb/simple as possible - the subject matter is the
  component you're currently testing, not how fancy the API of the test library
  or the test runner are - hence I would use fewer different query functions
  and test what the state of the a part is.
