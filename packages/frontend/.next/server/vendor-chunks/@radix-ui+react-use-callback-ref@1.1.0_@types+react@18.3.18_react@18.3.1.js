"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/@radix-ui+react-use-callback-ref@1.1.0_@types+react@18.3.18_react@18.3.1";
exports.ids = ["vendor-chunks/@radix-ui+react-use-callback-ref@1.1.0_@types+react@18.3.18_react@18.3.1"];
exports.modules = {

/***/ "(ssr)/../../node_modules/.pnpm/@radix-ui+react-use-callback-ref@1.1.0_@types+react@18.3.18_react@18.3.1/node_modules/@radix-ui/react-use-callback-ref/dist/index.mjs":
/*!**********************************************************************************************************************************************************************!*\
  !*** ../../node_modules/.pnpm/@radix-ui+react-use-callback-ref@1.1.0_@types+react@18.3.18_react@18.3.1/node_modules/@radix-ui/react-use-callback-ref/dist/index.mjs ***!
  \**********************************************************************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   useCallbackRef: () => (/* binding */ useCallbackRef)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"(ssr)/../../node_modules/.pnpm/next@14.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react.js\");\n// packages/react/use-callback-ref/src/useCallbackRef.tsx\n\nfunction useCallbackRef(callback) {\n    const callbackRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(callback);\n    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(()=>{\n        callbackRef.current = callback;\n    });\n    return react__WEBPACK_IMPORTED_MODULE_0__.useMemo(()=>(...args)=>callbackRef.current?.(...args), []);\n}\n //# sourceMappingURL=index.mjs.map\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL0ByYWRpeC11aStyZWFjdC11c2UtY2FsbGJhY2stcmVmQDEuMS4wX0B0eXBlcytyZWFjdEAxOC4zLjE4X3JlYWN0QDE4LjMuMS9ub2RlX21vZHVsZXMvQHJhZGl4LXVpL3JlYWN0LXVzZS1jYWxsYmFjay1yZWYvZGlzdC9pbmRleC5tanMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSx5REFBeUQ7QUFDMUI7QUFDL0IsU0FBU0MsZUFBZUMsUUFBUTtJQUM5QixNQUFNQyxjQUFjSCx5Q0FBWSxDQUFDRTtJQUNqQ0YsNENBQWUsQ0FBQztRQUNkRyxZQUFZRyxPQUFPLEdBQUdKO0lBQ3hCO0lBQ0EsT0FBT0YsMENBQWEsQ0FBQyxJQUFNLENBQUMsR0FBR1EsT0FBU0wsWUFBWUcsT0FBTyxNQUFNRSxPQUFPLEVBQUU7QUFDNUU7QUFHRSxDQUNGLGtDQUFrQyIsInNvdXJjZXMiOlsid2VicGFjazovL0BxaW5neXUvZnJvbnRlbmQvLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL0ByYWRpeC11aStyZWFjdC11c2UtY2FsbGJhY2stcmVmQDEuMS4wX0B0eXBlcytyZWFjdEAxOC4zLjE4X3JlYWN0QDE4LjMuMS9ub2RlX21vZHVsZXMvQHJhZGl4LXVpL3JlYWN0LXVzZS1jYWxsYmFjay1yZWYvZGlzdC9pbmRleC5tanM/MDc0MiJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBwYWNrYWdlcy9yZWFjdC91c2UtY2FsbGJhY2stcmVmL3NyYy91c2VDYWxsYmFja1JlZi50c3hcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuZnVuY3Rpb24gdXNlQ2FsbGJhY2tSZWYoY2FsbGJhY2spIHtcbiAgY29uc3QgY2FsbGJhY2tSZWYgPSBSZWFjdC51c2VSZWYoY2FsbGJhY2spO1xuICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNhbGxiYWNrUmVmLmN1cnJlbnQgPSBjYWxsYmFjaztcbiAgfSk7XG4gIHJldHVybiBSZWFjdC51c2VNZW1vKCgpID0+ICguLi5hcmdzKSA9PiBjYWxsYmFja1JlZi5jdXJyZW50Py4oLi4uYXJncyksIFtdKTtcbn1cbmV4cG9ydCB7XG4gIHVzZUNhbGxiYWNrUmVmXG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXgubWpzLm1hcFxuIl0sIm5hbWVzIjpbIlJlYWN0IiwidXNlQ2FsbGJhY2tSZWYiLCJjYWxsYmFjayIsImNhbGxiYWNrUmVmIiwidXNlUmVmIiwidXNlRWZmZWN0IiwiY3VycmVudCIsInVzZU1lbW8iLCJhcmdzIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/../../node_modules/.pnpm/@radix-ui+react-use-callback-ref@1.1.0_@types+react@18.3.18_react@18.3.1/node_modules/@radix-ui/react-use-callback-ref/dist/index.mjs\n");

/***/ })

};
;