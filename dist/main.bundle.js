/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/articles.js":
/*!****************************!*\
  !*** ./src/js/articles.js ***!
  \****************************/
/*! exports provided: all, one, add, remove, edit */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"all\", function() { return all; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"one\", function() { return one; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"add\", function() { return add; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"remove\", function() { return remove; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"edit\", function() { return edit; });\n\r\n\r\nconst hash = \"cb1d4f58587a8cb47633a69261507a8e\",\r\n\tbaseUrl = \"/js-hw-api/articles.php\",\r\n\t_ = undefined;\r\n\r\nasync function request(method = \"GET\", body, url = baseUrl, id = \"default\") {\r\n\tif (id !== \"default\") url += `?id=${id}`;\r\n\tconst response = await fetch(url, {\r\n\t\tmethod,\r\n\t\theaders: { Autorization: hash },\r\n\t\tbody,\r\n\t});\r\n\tif (response.status !== 200) {\r\n\t\tconst err = await response.text();\r\n\t\tthrow new Error(err);\r\n\t}\r\n\tconst data = await response.json();\r\n\treturn data;\r\n}\r\n\r\nconst all = async () => await request(),\r\n\tone = async (id) => await request(_, _, _, id),\r\n\tadd = async (title, content) => await request(\"POST\", getForm(title, content)),\r\n\tremove = async (id) => await request(\"DELETE\", _, _, id),\r\n\tedit = async (id, item) => await request(\"PUT\", getJSON(id, item), _, id);\r\n\r\nfunction getForm(title, content) {\r\n\tlet form = new FormData();\r\n\tform.append(\"title\", title);\r\n\tform.append(\"content\", content);\r\n\treturn form;\r\n}\r\n\r\nfunction getJSON(id, item) {\r\n\titem.id = id;\r\n\treturn JSON.stringify(item);\r\n}\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvanMvYXJ0aWNsZXMuanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXJ0aWNsZXMuanM/YzMwOCJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgeyBhbGwsIG9uZSwgYWRkLCByZW1vdmUsIGVkaXQgfTtcclxuXHJcbmNvbnN0IGhhc2ggPSBcImNiMWQ0ZjU4NTg3YThjYjQ3NjMzYTY5MjYxNTA3YThlXCIsXHJcblx0YmFzZVVybCA9IFwiL2pzLWh3LWFwaS9hcnRpY2xlcy5waHBcIixcclxuXHRfID0gdW5kZWZpbmVkO1xyXG5cclxuYXN5bmMgZnVuY3Rpb24gcmVxdWVzdChtZXRob2QgPSBcIkdFVFwiLCBib2R5LCB1cmwgPSBiYXNlVXJsLCBpZCA9IFwiZGVmYXVsdFwiKSB7XHJcblx0aWYgKGlkICE9PSBcImRlZmF1bHRcIikgdXJsICs9IGA/aWQ9JHtpZH1gO1xyXG5cdGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsLCB7XHJcblx0XHRtZXRob2QsXHJcblx0XHRoZWFkZXJzOiB7IEF1dG9yaXphdGlvbjogaGFzaCB9LFxyXG5cdFx0Ym9keSxcclxuXHR9KTtcclxuXHRpZiAocmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcclxuXHRcdGNvbnN0IGVyciA9IGF3YWl0IHJlc3BvbnNlLnRleHQoKTtcclxuXHRcdHRocm93IG5ldyBFcnJvcihlcnIpO1xyXG5cdH1cclxuXHRjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG5cdHJldHVybiBkYXRhO1xyXG59XHJcblxyXG5jb25zdCBhbGwgPSBhc3luYyAoKSA9PiBhd2FpdCByZXF1ZXN0KCksXHJcblx0b25lID0gYXN5bmMgKGlkKSA9PiBhd2FpdCByZXF1ZXN0KF8sIF8sIF8sIGlkKSxcclxuXHRhZGQgPSBhc3luYyAodGl0bGUsIGNvbnRlbnQpID0+IGF3YWl0IHJlcXVlc3QoXCJQT1NUXCIsIGdldEZvcm0odGl0bGUsIGNvbnRlbnQpKSxcclxuXHRyZW1vdmUgPSBhc3luYyAoaWQpID0+IGF3YWl0IHJlcXVlc3QoXCJERUxFVEVcIiwgXywgXywgaWQpLFxyXG5cdGVkaXQgPSBhc3luYyAoaWQsIGl0ZW0pID0+IGF3YWl0IHJlcXVlc3QoXCJQVVRcIiwgZ2V0SlNPTihpZCwgaXRlbSksIF8sIGlkKTtcclxuXHJcbmZ1bmN0aW9uIGdldEZvcm0odGl0bGUsIGNvbnRlbnQpIHtcclxuXHRsZXQgZm9ybSA9IG5ldyBGb3JtRGF0YSgpO1xyXG5cdGZvcm0uYXBwZW5kKFwidGl0bGVcIiwgdGl0bGUpO1xyXG5cdGZvcm0uYXBwZW5kKFwiY29udGVudFwiLCBjb250ZW50KTtcclxuXHRyZXR1cm4gZm9ybTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0SlNPTihpZCwgaXRlbSkge1xyXG5cdGl0ZW0uaWQgPSBpZDtcclxuXHRyZXR1cm4gSlNPTi5zdHJpbmdpZnkoaXRlbSk7XHJcbn1cclxuIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/js/articles.js\n");

/***/ }),

/***/ "./src/js/lib.js":
/*!***********************!*\
  !*** ./src/js/lib.js ***!
  \***********************/
/*! exports provided: log, sum */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"log\", function() { return log; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"sum\", function() { return sum; });\n\r\nconst log = console.log.bind(console);\r\n\r\nconst sum = (...args) => args.reduce((acc, cur) => acc + cur, 0);\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvanMvbGliLmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2xpYi5qcz80MmM0Il0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCB7IGxvZywgc3VtIH07XHJcbmNvbnN0IGxvZyA9IGNvbnNvbGUubG9nLmJpbmQoY29uc29sZSk7XHJcblxyXG5jb25zdCBzdW0gPSAoLi4uYXJncykgPT4gYXJncy5yZWR1Y2UoKGFjYywgY3VyKSA9PiBhY2MgKyBjdXIsIDApO1xyXG4iXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBOyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/js/lib.js\n");

/***/ }),

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib */ \"./src/js/lib.js\");\n/* harmony import */ var _articles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./articles */ \"./src/js/articles.js\");\n\r\n\r\n\r\nObject(_lib__WEBPACK_IMPORTED_MODULE_0__[\"log\"])(Object(_lib__WEBPACK_IMPORTED_MODULE_0__[\"sum\"])(5, 7));\r\n\r\nfetch(\"http://msementsov.ru/xhr/test.json\")\r\n\t.then((res) => res.json())\r\n\t.then(_lib__WEBPACK_IMPORTED_MODULE_0__[\"log\"]);\r\n\r\n//req.all().then(log);\r\n\r\n// fetch(\"http://localhost:3000/\")\r\n// \t.then((d) => d.json())\r\n// \t.then(log);\r\n\r\n// fetch(\"http://localhost:3000/\", { method: \"POST\", body: JSON.stringify({ m: 88 }) })\r\n// \t.then((d) => d.json())\r\n// \t.then(log);\r\n\r\n//fetch(\"/js-hw-api/articles.php\").then(log);\r\n\r\nconst url = \"http://faceprog.ru/js-hw-api/articles.php\",\r\n\turl2 = \"js-hw-api/articles.php\",\r\n\turl3 = \"http://faceprog.ru/js-hw-api/articles.php\",\r\n\tconf = {\r\n\t\theaders: { Autorization: \"cb1d4f58587a8cb47633a69261507a8e\" },\r\n\t};\r\n\r\nfetch(url, conf).then(console.log);\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvanMvbWFpbi5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9qcy9tYWluLmpzPzkyOTEiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgbG9nLCBzdW0gfSBmcm9tIFwiLi9saWJcIjtcclxuaW1wb3J0ICogYXMgcmVxIGZyb20gXCIuL2FydGljbGVzXCI7XHJcblxyXG5sb2coc3VtKDUsIDcpKTtcclxuXHJcbmZldGNoKFwiaHR0cDovL21zZW1lbnRzb3YucnUveGhyL3Rlc3QuanNvblwiKVxyXG5cdC50aGVuKChyZXMpID0+IHJlcy5qc29uKCkpXHJcblx0LnRoZW4obG9nKTtcclxuXHJcbi8vcmVxLmFsbCgpLnRoZW4obG9nKTtcclxuXHJcbi8vIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDozMDAwL1wiKVxyXG4vLyBcdC50aGVuKChkKSA9PiBkLmpzb24oKSlcclxuLy8gXHQudGhlbihsb2cpO1xyXG5cclxuLy8gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjMwMDAvXCIsIHsgbWV0aG9kOiBcIlBPU1RcIiwgYm9keTogSlNPTi5zdHJpbmdpZnkoeyBtOiA4OCB9KSB9KVxyXG4vLyBcdC50aGVuKChkKSA9PiBkLmpzb24oKSlcclxuLy8gXHQudGhlbihsb2cpO1xyXG5cclxuLy9mZXRjaChcIi9qcy1ody1hcGkvYXJ0aWNsZXMucGhwXCIpLnRoZW4obG9nKTtcclxuXHJcbmNvbnN0IHVybCA9IFwiaHR0cDovL2ZhY2Vwcm9nLnJ1L2pzLWh3LWFwaS9hcnRpY2xlcy5waHBcIixcclxuXHR1cmwyID0gXCJqcy1ody1hcGkvYXJ0aWNsZXMucGhwXCIsXHJcblx0dXJsMyA9IFwiaHR0cDovL2ZhY2Vwcm9nLnJ1L2pzLWh3LWFwaS9hcnRpY2xlcy5waHBcIixcclxuXHRjb25mID0ge1xyXG5cdFx0aGVhZGVyczogeyBBdXRvcml6YXRpb246IFwiY2IxZDRmNTg1ODdhOGNiNDc2MzNhNjkyNjE1MDdhOGVcIiB9LFxyXG5cdH07XHJcblxyXG5mZXRjaCh1cmwsIGNvbmYpLnRoZW4oY29uc29sZS5sb2cpO1xyXG4iXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/js/main.js\n");

/***/ }),

/***/ "./src/sass/style.sass":
/*!*****************************!*\
  !*** ./src/sass/style.sass ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvc2Fzcy9zdHlsZS5zYXNzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL3Nhc3Mvc3R5bGUuc2Fzcz9mZjU1Il0sInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpbiJdLCJtYXBwaW5ncyI6IkFBQUEiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/sass/style.sass\n");

/***/ }),

/***/ 0:
/*!****************************************************!*\
  !*** multi ./src/js/main.js ./src/sass/style.sass ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./src/js/main.js */"./src/js/main.js");
module.exports = __webpack_require__(/*! ./src/sass/style.sass */"./src/sass/style.sass");


/***/ })

/******/ });