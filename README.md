yandex-metrika-react
======================

Adds a wrapper component that allows you to use Yandex Metrika and exposes `ym` tracking function as hook

Features:
- Uses context API to store `ym` call stack
- Requests via hook calls only after metrika initialization, until that moment they are stored in the call stack

Usage:

Use the component to wrap your application at the top level (for example in `index.js` for create-react-app)
```javascript
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {YandexMetrika} from "yandex-metrika-react"

ReactDOM.render(
    <YandexMetrika
        counterId={XXXX}
        options={{
          clickmap: true,
          trackLinks: true,
          accurateTrackBounce: true,
          webvisor: true,
          triggerEvent: true,
        }}
    >
      <App />
    </YandexMetrika>, document.getElementById("root")
)
```

To call tracker function in your component:
```javascript
...
const ym = useMetrika()
ym("reachGoal","MyAwesomeGoal", {param: 1})
...
```
The hook syntax is equivalent to the `ym` tracking function syntax, except for passing the counter ID

The property of `YandexMetrika` component is equal to metrika initialize params (as described in [Yandex.Metrika documentation](https://yandex.ru/support/metrica/code/counter-initialize.html))