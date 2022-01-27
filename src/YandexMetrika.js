import { initialState, Context } from "./Context";
import React, { useEffect, useReducer } from "react";
import { Helmet } from "react-helmet";
import PropTypes from "prop-types";

const YandexMetrika = ({ counterId, options, children }) => {
  const [store, reduce] = useReducer((state, action) => {
    const { type, payload } = action;
    switch (type) {
      case "INITIALIZED":
        return {
          ...state,
          initialized: true,
        };
      case "STACK_ADD":
        return {
          ...state,
          stack: [...state.stack, { ...payload, taskId: state.stack.length }],
        };
      case "STACK_REMOVE":
        return {
          ...state,
          stack: state.stack.filter(({ taskId }) => taskId !== payload),
        };
      default:
        return state;
    }
  }, initialState);

  useEffect(() => {
    if (window.ym) {
      window.ym(counterId, "init", options);
      document.addEventListener(`yacounter${counterId}inited`, () =>
        reduce({ type: "INITIALIZED" })
      );
    }
  });

  useEffect(() => {
    const { initialized, stack } = store;
    if (initialized) {
      if (stack[0]) {
        const { method, values, taskId } = stack[0];
        window.ym(counterId, method, ...values);
        reduce({
          type: "STACK_REMOVE",
          payload: taskId,
        });
      }
    }
  }, [store]);

  return (
    <Context.Provider value={{ store, reduce }}>
      <Helmet>
        <script type="text/javascript">
          {`(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");`}
        </script>
        <noscript>
          {`
           <div>
            <img
              src="https://mc.yandex.ru/watch/${counterId}"
              style="position:absolute; left:-9999px;"
              alt=""
            />
          </div>
          `}
        </noscript>
      </Helmet>
      {children}
    </Context.Provider>
  );
};

YandexMetrika.displayName = "YandexMetrika"

YandexMetrika.propTypes = {
  counterId: PropTypes.number.isRequired,
  options: PropTypes.object
}

YandexMetrika.defaultProps = {
  options: {}
}

export default YandexMetrika;
