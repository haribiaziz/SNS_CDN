﻿if (typeof Object.create !== "function") { Object.create = function (b) { function a() { } a.prototype = b; return new a() } } (function (c, b, a) { var d = { init: function (e, f) { var g = this; g.$elem = c(f); g.options = c.extend({}, c.fn.owlCarousel.options, g.$elem.data(), e); g.userOptions = e; g.loadContent() }, loadContent: function () { var g = this, f; function e(k) { var h, j = ""; if (typeof g.options.jsonSuccess === "function") { g.options.jsonSuccess.apply(this, [k]) } else { for (h in k.owl) { if (k.owl.hasOwnProperty(h)) { j += k.owl[h].item } } g.$elem.html(j) } g.logIn() } if (typeof g.options.beforeInit === "function") { g.options.beforeInit.apply(this, [g.$elem]) } if (typeof g.options.jsonPath === "string") { f = g.options.jsonPath; c.getJSON(f, e) } else { g.logIn() } }, logIn: function () { var e = this; e.$elem.data("owl-originalStyles", e.$elem.attr("style")).data("owl-originalClasses", e.$elem.attr("class")); e.$elem.css({ opacity: 0 }); e.orignalItems = e.options.items; e.checkBrowser(); e.wrapperWidth = 0; e.checkVisible = null; e.setVars() }, setVars: function () { var e = this; if (e.$elem.children().length === 0) { return false } e.baseClass(); e.eventTypes(); e.$userItems = e.$elem.children(); e.itemsAmount = e.$userItems.length; e.wrapItems(); e.$owlItems = e.$elem.find(".owl-item"); e.$owlWrapper = e.$elem.find(".owl-wrapper"); e.playDirection = "next"; e.prevItem = 0; e.prevArr = [0]; e.currentItem = 0; e.customEvents(); e.onStartup() }, onStartup: function () { var e = this; e.updateItems(); e.calculateAll(); e.buildControls(); e.updateControls(); e.response(); e.moveEvents(); e.stopOnHover(); e.owlStatus(); if (e.options.transitionStyle !== false) { e.transitionTypes(e.options.transitionStyle) } if (e.options.autoPlay === true) { e.options.autoPlay = 5000 } e.play(); e.$elem.find(".owl-wrapper").css("display", "block"); if (!e.$elem.is(":visible")) { e.watchVisibility() } else { e.$elem.css("opacity", 1) } e.onstartup = false; e.eachMoveUpdate(); if (typeof e.options.afterInit === "function") { e.options.afterInit.apply(this, [e.$elem]) } }, eachMoveUpdate: function () { var e = this; if (e.options.lazyLoad === true) { e.lazyLoad() } if (e.options.autoHeight === true) { e.autoHeight() } e.onVisibleItems(); if (typeof e.options.afterAction === "function") { e.options.afterAction.apply(this, [e.$elem]) } }, updateVars: function () { var e = this; if (typeof e.options.beforeUpdate === "function") { e.options.beforeUpdate.apply(this, [e.$elem]) } e.watchVisibility(); e.updateItems(); e.calculateAll(); e.updatePosition(); e.updateControls(); e.eachMoveUpdate(); if (typeof e.options.afterUpdate === "function") { e.options.afterUpdate.apply(this, [e.$elem]) } }, reload: function () { var e = this; b.setTimeout(function () { e.updateVars() }, 0) }, watchVisibility: function () { var e = this; if (e.$elem.is(":visible") === false) { e.$elem.css({ opacity: 0 }); b.clearInterval(e.autoPlayInterval); b.clearInterval(e.checkVisible) } else { return false } e.checkVisible = b.setInterval(function () { if (e.$elem.is(":visible")) { e.reload(); e.$elem.animate({ opacity: 1 }, 200); b.clearInterval(e.checkVisible) } }, 500) }, wrapItems: function () { var e = this; e.$userItems.wrapAll('<div class="owl-wrapper">').wrap('<div class="owl-item"></div>'); e.$elem.find(".owl-wrapper").wrap('<div class="owl-wrapper-outer">'); e.wrapperOuter = e.$elem.find(".owl-wrapper-outer"); e.$elem.css("display", "block") }, baseClass: function () { var g = this, e = g.$elem.hasClass(g.options.baseClass), f = g.$elem.hasClass(g.options.theme); if (!e) { g.$elem.addClass(g.options.baseClass) } if (!f) { g.$elem.addClass(g.options.theme) } }, updateItems: function () { var g = this, f, e; if (g.options.responsive === false) { return false } if (g.options.singleItem === true) { g.options.items = g.orignalItems = 1; g.options.itemsCustom = false; g.options.itemsDesktop = false; g.options.itemsDesktopSmall = false; g.options.itemsTablet = false; g.options.itemsTabletSmall = false; g.options.itemsMobile = false; return false } f = c(g.options.responsiveBaseWidth).width(); if (f > (g.options.itemsDesktop[0] || g.orignalItems)) { g.options.items = g.orignalItems } if (g.options.itemsCustom !== false) { g.options.itemsCustom.sort(function (i, h) { return i[0] - h[0] }); for (e = 0; e < g.options.itemsCustom.length; e += 1) { if (g.options.itemsCustom[e][0] <= f) { g.options.items = g.options.itemsCustom[e][1] } } } else { if (f <= g.options.itemsDesktop[0] && g.options.itemsDesktop !== false) { g.options.items = g.options.itemsDesktop[1] } if (f <= g.options.itemsDesktopSmall[0] && g.options.itemsDesktopSmall !== false) { g.options.items = g.options.itemsDesktopSmall[1] } if (f <= g.options.itemsTablet[0] && g.options.itemsTablet !== false) { g.options.items = g.options.itemsTablet[1] } if (f <= g.options.itemsTabletSmall[0] && g.options.itemsTabletSmall !== false) { g.options.items = g.options.itemsTabletSmall[1] } if (f <= g.options.itemsMobile[0] && g.options.itemsMobile !== false) { g.options.items = g.options.itemsMobile[1] } } if (g.options.items > g.itemsAmount && g.options.itemsScaleUp === true) { g.options.items = g.itemsAmount } }, response: function () { var g = this, f, e; if (g.options.responsive !== true) { return false } e = c(b).width(); g.resizer = function () { if (c(b).width() !== e) { if (g.options.autoPlay !== false) { b.clearInterval(g.autoPlayInterval) } b.clearTimeout(f); f = b.setTimeout(function () { e = c(b).width(); g.updateVars() }, g.options.responsiveRefreshRate) } }; c(b).resize(g.resizer) }, updatePosition: function () { var e = this; e.jumpTo(e.currentItem); if (e.options.autoPlay !== false) { e.checkAp() } }, appendItemsSizes: function () { var g = this, e = 0, f = g.itemsAmount - g.options.items; g.$owlItems.each(function (h) { var i = c(this); i.css({ width: g.itemWidth }).data("owl-item", Number(h)); if (h % g.options.items === 0 || h === f) { if (!(h > f)) { e += 1 } } i.data("owl-roundPages", e) }) }, appendWrapperSizes: function () { var f = this, e = f.$owlItems.length * f.itemWidth; f.$owlWrapper.css({ width: e * 2, left: 0 }); f.appendItemsSizes() }, calculateAll: function () { var e = this; e.calculateWidth(); e.appendWrapperSizes(); e.loops(); e.max() }, calculateWidth: function () { var e = this; e.itemWidth = Math.round(e.$elem.width() / e.options.items) }, max: function () { var e = this, f = ((e.itemsAmount * e.itemWidth) - e.options.items * e.itemWidth) * -1; if (e.options.items > e.itemsAmount) { e.maximumItem = 0; f = 0; e.maximumPixels = 0 } else { e.maximumItem = e.itemsAmount - e.options.items; e.maximumPixels = f } return f }, min: function () { return 0 }, loops: function () { var k = this, j = 0, g = 0, f, h, e; k.positionsInArray = [0]; k.pagesInArray = []; for (f = 0; f < k.itemsAmount; f += 1) { g += k.itemWidth; k.positionsInArray.push(-g); if (k.options.scrollPerPage === true) { h = c(k.$owlItems[f]); e = h.data("owl-roundPages"); if (e !== j) { k.pagesInArray[j] = k.positionsInArray[f]; j = e } } } }, buildControls: function () { var e = this; if (e.options.navigation === true || e.options.pagination === true) { e.owlControls = c('<div class="owl-controls"/>').toggleClass("clickable", !e.browser.isTouch).appendTo(e.$elem) } if (e.options.pagination === true) { e.buildPagination() } if (e.options.navigation === true) { e.buildButtons() } }, buildButtons: function () { var f = this, e = c('<div class="owl-buttons"/>'); f.owlControls.append(e); f.buttonPrev = c("<div/>", { "class": "owl-prev", html: f.options.navigationText[0] || "" }); f.buttonNext = c("<div/>", { "class": "owl-next", html: f.options.navigationText[1] || "" }); e.append(f.buttonPrev).append(f.buttonNext); e.on("touchstart.owlControls mousedown.owlControls", 'div[class^="owl"]', function (g) { g.preventDefault() }); e.on("touchend.owlControls mouseup.owlControls", 'div[class^="owl"]', function (g) { g.preventDefault(); if (c(this).hasClass("owl-next")) { f.next() } else { f.prev() } }) }, buildPagination: function () { var e = this; e.paginationWrapper = c('<div class="owl-pagination"/>'); e.owlControls.append(e.paginationWrapper); e.paginationWrapper.on("touchend.owlControls mouseup.owlControls", ".owl-page", function (f) { f.preventDefault(); if (Number(c(this).data("owl-page")) !== e.currentItem) { e.goTo(Number(c(this).data("owl-page")), true) } }) }, updatePagination: function () { var l = this, f, k, j, h, g, e; if (l.options.pagination === false) { return false } l.paginationWrapper.html(""); f = 0; k = l.itemsAmount - l.itemsAmount % l.options.items; for (h = 0; h < l.itemsAmount; h += 1) { if (h % l.options.items === 0) { f += 1; if (k === h) { j = l.itemsAmount - l.options.items } g = c("<div/>", { "class": "owl-page" }); e = c("<span></span>", { text: l.options.paginationNumbers === true ? f : "", "class": l.options.paginationNumbers === true ? "owl-numbers" : "" }); g.append(e); g.data("owl-page", k === h ? j : h); g.data("owl-roundPages", f); l.paginationWrapper.append(g) } } l.checkPagination() }, checkPagination: function () { var e = this; if (e.options.pagination === false) { return false } e.paginationWrapper.find(".owl-page").each(function () { if (c(this).data("owl-roundPages") === c(e.$owlItems[e.currentItem]).data("owl-roundPages")) { e.paginationWrapper.find(".owl-page").removeClass("active"); c(this).addClass("active") } }) }, checkNavigation: function () { var e = this; if (e.options.navigation === false) { return false } if (e.options.rewindNav === false) { if (e.currentItem === 0 && e.maximumItem === 0) { e.buttonPrev.addClass("disabled"); e.buttonNext.addClass("disabled") } else { if (e.currentItem === 0 && e.maximumItem !== 0) { e.buttonPrev.addClass("disabled"); e.buttonNext.removeClass("disabled") } else { if (e.currentItem === e.maximumItem) { e.buttonPrev.removeClass("disabled"); e.buttonNext.addClass("disabled") } else { if (e.currentItem !== 0 && e.currentItem !== e.maximumItem) { e.buttonPrev.removeClass("disabled"); e.buttonNext.removeClass("disabled") } } } } } }, updateControls: function () { var e = this; e.updatePagination(); e.checkNavigation(); if (e.owlControls) { if (e.options.items >= e.itemsAmount) { e.owlControls.hide() } else { e.owlControls.show() } } }, destroyControls: function () { var e = this; if (e.owlControls) { e.owlControls.remove() } }, next: function (f) { var e = this; if (e.isTransition) { return false } e.currentItem += e.options.scrollPerPage === true ? e.options.items : 1; if (e.currentItem > e.maximumItem + (e.options.scrollPerPage === true ? (e.options.items - 1) : 0)) { if (e.options.rewindNav === true) { e.currentItem = 0; f = "rewind" } else { e.currentItem = e.maximumItem; return false } } e.goTo(e.currentItem, f) }, prev: function (f) { var e = this; if (e.isTransition) { return false } if (e.options.scrollPerPage === true && e.currentItem > 0 && e.currentItem < e.options.items) { e.currentItem = 0 } else { e.currentItem -= e.options.scrollPerPage === true ? e.options.items : 1 } if (e.currentItem < 0) { if (e.options.rewindNav === true) { e.currentItem = e.maximumItem; f = "rewind" } else { e.currentItem = 0; return false } } e.goTo(e.currentItem, f) }, goTo: function (e, i, g) { var h = this, f; if (h.isTransition) { return false } if (typeof h.options.beforeMove === "function") { h.options.beforeMove.apply(this, [h.$elem]) } if (e >= h.maximumItem) { e = h.maximumItem } else { if (e <= 0) { e = 0 } } h.currentItem = h.owl.currentItem = e; if (h.options.transitionStyle !== false && g !== "drag" && h.options.items === 1 && h.browser.support3d === true) { h.swapSpeed(0); if (h.browser.support3d === true) { h.transition3d(h.positionsInArray[e]) } else { h.css2slide(h.positionsInArray[e], 1) } h.afterGo(); h.singleItemTransition(); return false } f = h.positionsInArray[e]; if (h.browser.support3d === true) { h.isCss3Finish = false; if (i === true) { h.swapSpeed("paginationSpeed"); b.setTimeout(function () { h.isCss3Finish = true }, h.options.paginationSpeed) } else { if (i === "rewind") { h.swapSpeed(h.options.rewindSpeed); b.setTimeout(function () { h.isCss3Finish = true }, h.options.rewindSpeed) } else { h.swapSpeed("slideSpeed"); b.setTimeout(function () { h.isCss3Finish = true }, h.options.slideSpeed) } } h.transition3d(f) } else { if (i === true) { h.css2slide(f, h.options.paginationSpeed) } else { if (i === "rewind") { h.css2slide(f, h.options.rewindSpeed) } else { h.css2slide(f, h.options.slideSpeed) } } } h.afterGo() }, jumpTo: function (e) { var f = this; if (typeof f.options.beforeMove === "function") { f.options.beforeMove.apply(this, [f.$elem]) } if (e >= f.maximumItem || e === -1) { e = f.maximumItem } else { if (e <= 0) { e = 0 } } f.swapSpeed(0); if (f.browser.support3d === true) { f.transition3d(f.positionsInArray[e]) } else { f.css2slide(f.positionsInArray[e], 1) } f.currentItem = f.owl.currentItem = e; f.afterGo() }, afterGo: function () { var e = this; e.prevArr.push(e.currentItem); e.prevItem = e.owl.prevItem = e.prevArr[e.prevArr.length - 2]; e.prevArr.shift(0); if (e.prevItem !== e.currentItem) { e.checkPagination(); e.checkNavigation(); e.eachMoveUpdate(); if (e.options.autoPlay !== false) { e.checkAp() } } if (typeof e.options.afterMove === "function" && e.prevItem !== e.currentItem) { e.options.afterMove.apply(this, [e.$elem]) } }, stop: function () { var e = this; e.apStatus = "stop"; b.clearInterval(e.autoPlayInterval) }, checkAp: function () { var e = this; if (e.apStatus !== "stop") { e.play() } }, play: function () { var e = this; e.apStatus = "play"; if (e.options.autoPlay === false) { return false } b.clearInterval(e.autoPlayInterval); e.autoPlayInterval = b.setInterval(function () { e.next(true) }, e.options.autoPlay) }, swapSpeed: function (f) { var e = this; if (f === "slideSpeed") { e.$owlWrapper.css(e.addCssSpeed(e.options.slideSpeed)) } else { if (f === "paginationSpeed") { e.$owlWrapper.css(e.addCssSpeed(e.options.paginationSpeed)) } else { if (typeof f !== "string") { e.$owlWrapper.css(e.addCssSpeed(f)) } } } }, addCssSpeed: function (e) { return { "-webkit-transition": "all " + e + "ms ease", "-moz-transition": "all " + e + "ms ease", "-o-transition": "all " + e + "ms ease", transition: "all " + e + "ms ease" } }, removeTransition: function () { return { "-webkit-transition": "", "-moz-transition": "", "-o-transition": "", transition: "" } }, doTranslate: function (e) { return { "-webkit-transform": "translate3d(" + e + "px, 0px, 0px)", "-moz-transform": "translate3d(" + e + "px, 0px, 0px)", "-o-transform": "translate3d(" + e + "px, 0px, 0px)", "-ms-transform": "translate3d(" + e + "px, 0px, 0px)", transform: "translate3d(" + e + "px, 0px,0px)" } }, transition3d: function (f) { var e = this; e.$owlWrapper.css(e.doTranslate(f)) }, css2move: function (f) { var e = this; e.$owlWrapper.css({ left: f }) }, css2slide: function (g, f) { var e = this; e.isCssFinish = false; e.$owlWrapper.stop(true, true).animate({ left: g }, { duration: f || e.options.slideSpeed, complete: function () { e.isCssFinish = true } }) }, checkBrowser: function () { var j = this, g = "translate3d(0px, 0px, 0px)", i = a.createElement("div"), h, f, k, e; i.style.cssText = "  -moz-transform:" + g + "; -ms-transform:" + g + "; -o-transform:" + g + "; -webkit-transform:" + g + "; transform:" + g; h = /translate3d\(0px, 0px, 0px\)/g; f = i.style.cssText.match(h); k = (f !== null && f.length === 1); e = "ontouchstart" in b || b.navigator.msMaxTouchPoints; j.browser = { support3d: k, isTouch: e } }, moveEvents: function () { var e = this; if (e.options.mouseDrag !== false || e.options.touchDrag !== false) { e.gestures(); e.disabledEvents() } }, eventTypes: function () { var f = this, e = ["s", "e", "x"]; f.ev_types = {}; if (f.options.mouseDrag === true && f.options.touchDrag === true) { e = ["touchstart.owl mousedown.owl", "touchmove.owl mousemove.owl", "touchend.owl touchcancel.owl mouseup.owl"] } else { if (f.options.mouseDrag === false && f.options.touchDrag === true) { e = ["touchstart.owl", "touchmove.owl", "touchend.owl touchcancel.owl"] } else { if (f.options.mouseDrag === true && f.options.touchDrag === false) { e = ["mousedown.owl", "mousemove.owl", "mouseup.owl"] } } } f.ev_types.start = e[0]; f.ev_types.move = e[1]; f.ev_types.end = e[2] }, disabledEvents: function () { var e = this; e.$elem.on("dragstart.owl", function (f) { f.preventDefault() }); e.$elem.on("mousedown.disableTextSelect", function (f) { return c(f.target).is("input, textarea, select, option") }) }, gestures: function () { var h = this, i = { offsetX: 0, offsetY: 0, baseElWidth: 0, relativePos: 0, position: null, minSwipe: null, maxSwipe: null, sliding: null, dargging: null, targetElement: null }; h.isCssFinish = true; function k(l) { if (l.touches !== undefined) { return { x: l.touches[0].pageX, y: l.touches[0].pageY } } if (l.touches === undefined) { if (l.pageX !== undefined) { return { x: l.pageX, y: l.pageY } } if (l.pageX === undefined) { return { x: l.clientX, y: l.clientY } } } } function j(l) { if (l === "on") { c(a).on(h.ev_types.move, g); c(a).on(h.ev_types.end, e) } else { if (l === "off") { c(a).off(h.ev_types.move); c(a).off(h.ev_types.end) } } } function f(n) { var m = n.originalEvent || n || b.event, l; if (m.which === 3) { return false } if (h.itemsAmount <= h.options.items) { return } if (h.isCssFinish === false && !h.options.dragBeforeAnimFinish) { return false } if (h.isCss3Finish === false && !h.options.dragBeforeAnimFinish) { return false } if (h.options.autoPlay !== false) { b.clearInterval(h.autoPlayInterval) } if (h.browser.isTouch !== true && !h.$owlWrapper.hasClass("grabbing")) { h.$owlWrapper.addClass("grabbing") } h.newPosX = 0; h.newRelativeX = 0; c(this).css(h.removeTransition()); l = c(this).position(); i.relativePos = l.left; i.offsetX = k(m).x - l.left; i.offsetY = k(m).y - l.top; j("on"); i.sliding = false; i.targetElement = m.target || m.srcElement } function g(o) { var n = o.originalEvent || o || b.event, l, m; h.newPosX = k(n).x - i.offsetX; h.newPosY = k(n).y - i.offsetY; h.newRelativeX = h.newPosX - i.relativePos; if (typeof h.options.startDragging === "function" && i.dragging !== true && h.newRelativeX !== 0) { i.dragging = true; h.options.startDragging.apply(h, [h.$elem]) } if ((h.newRelativeX > 8 || h.newRelativeX < -8) && (h.browser.isTouch === true)) { if (n.preventDefault !== undefined) { n.preventDefault() } else { n.returnValue = false } i.sliding = true } if ((h.newPosY > 10 || h.newPosY < -10) && i.sliding === false) { c(a).off("touchmove.owl") } l = function () { return h.newRelativeX / 5 }; m = function () { return h.maximumPixels + h.newRelativeX / 5 }; h.newPosX = Math.max(Math.min(h.newPosX, l()), m()); if (h.browser.support3d === true) { h.transition3d(h.newPosX) } else { h.css2move(h.newPosX) } } function e(p) { var o = p.originalEvent || p || b.event, n, m, l; o.target = o.target || o.srcElement; i.dragging = false; if (h.browser.isTouch !== true) { h.$owlWrapper.removeClass("grabbing") } if (h.newRelativeX < 0) { h.dragDirection = h.owl.dragDirection = "left" } else { h.dragDirection = h.owl.dragDirection = "right" } if (h.newRelativeX !== 0) { n = h.getNewPosition(); h.goTo(n, false, "drag"); if (i.targetElement === o.target && h.browser.isTouch !== true) { c(o.target).on("click.disable", function (q) { q.stopImmediatePropagation(); q.stopPropagation(); q.preventDefault(); c(q.target).off("click.disable") }); m = c._data(o.target, "events").click; l = m.pop(); m.splice(0, 0, l) } } j("off") } h.$elem.on(h.ev_types.start, ".owl-wrapper", f) }, getNewPosition: function () { var f = this, e = f.closestItem(); if (e > f.maximumItem) { f.currentItem = f.maximumItem; e = f.maximumItem } else { if (f.newPosX >= 0) { e = 0; f.currentItem = 0 } } return e }, closestItem: function () { var g = this, h = g.options.scrollPerPage === true ? g.pagesInArray : g.positionsInArray, e = g.newPosX, f = null; c.each(h, function (k, j) { if (e - (g.itemWidth / 20) > h[k + 1] && e - (g.itemWidth / 20) < j && g.moveDirection() === "left") { f = j; if (g.options.scrollPerPage === true) { g.currentItem = c.inArray(f, g.positionsInArray) } else { g.currentItem = k } } else { if (e + (g.itemWidth / 20) < j && e + (g.itemWidth / 20) > (h[k + 1] || h[k] - g.itemWidth) && g.moveDirection() === "right") { if (g.options.scrollPerPage === true) { f = h[k + 1] || h[h.length - 1]; g.currentItem = c.inArray(f, g.positionsInArray) } else { f = h[k + 1]; g.currentItem = k + 1 } } } }); return g.currentItem }, moveDirection: function () { var e = this, f; if (e.newRelativeX < 0) { f = "right"; e.playDirection = "next" } else { f = "left"; e.playDirection = "prev" } return f }, customEvents: function () { var e = this; e.$elem.on("owl.next", function () { e.next() }); e.$elem.on("owl.prev", function () { e.prev() }); e.$elem.on("owl.play", function (f, g) { e.options.autoPlay = g; e.play(); e.hoverStatus = "play" }); e.$elem.on("owl.stop", function () { e.stop(); e.hoverStatus = "stop" }); e.$elem.on("owl.goTo", function (g, f) { e.goTo(f) }); e.$elem.on("owl.jumpTo", function (g, f) { e.jumpTo(f) }) }, stopOnHover: function () { var e = this; if (e.options.stopOnHover === true && e.browser.isTouch !== true && e.options.autoPlay !== false) { e.$elem.on("mouseover", function () { e.stop() }); e.$elem.on("mouseout", function () { if (e.hoverStatus !== "stop") { e.play() } }) } }, lazyLoad: function () { var k = this, h, f, j, g, e; if (k.options.lazyLoad === false) { return false } for (h = 0; h < k.itemsAmount; h += 1) { f = c(k.$owlItems[h]); if (f.data("owl-loaded") === "loaded") { continue } j = f.data("owl-item"); g = f.find(".lazyOwl"); if (typeof g.data("src") !== "string") { f.data("owl-loaded", "loaded"); continue } if (f.data("owl-loaded") === undefined) { g.hide(); f.addClass("loading").data("owl-loaded", "checked") } if (k.options.lazyFollow === true) { e = j >= k.currentItem } else { e = true } if (e && j < k.currentItem + k.options.items && g.length) { k.lazyPreload(f, g) } } }, lazyPreload: function (e, f) { var i = this, h = 0, j; if (f.prop("tagName") === "DIV") { f.css("background-image", "url(" + f.data("src") + ")"); j = true } else { f[0].src = f.data("src") } function g() { e.data("owl-loaded", "loaded").removeClass("loading"); f.removeAttr("data-src"); if (i.options.lazyEffect === "fade") { f.fadeIn(400) } else { f.show() } if (typeof i.options.afterLazyLoad === "function") { i.options.afterLazyLoad.apply(this, [i.$elem]) } } function k() { h += 1; if (i.completeImg(f.get(0)) || j === true) { g() } else { if (h <= 100) { b.setTimeout(k, 100) } else { g() } } } k() }, autoHeight: function () { var h = this, i = c(h.$owlItems[h.currentItem]).find("img"), g; function e() { var j = c(h.$owlItems[h.currentItem]).height(); h.wrapperOuter.css("height", j + "px"); if (!h.wrapperOuter.hasClass("autoHeight")) { b.setTimeout(function () { h.wrapperOuter.addClass("autoHeight") }, 0) } } function f() { g += 1; if (h.completeImg(i.get(0))) { e() } else { if (g <= 100) { b.setTimeout(f, 100) } else { h.wrapperOuter.css("height", "") } } } if (i.get(0) !== undefined) { g = 0; f() } else { e() } }, completeImg: function (e) { var f; if (!e.complete) { return false } f = typeof e.naturalWidth; if (f !== "undefined" && e.naturalWidth === 0) { return false } return true }, onVisibleItems: function () { var f = this, e; if (f.options.addClassActive === true) { f.$owlItems.removeClass("active") } f.visibleItems = []; for (e = f.currentItem; e < f.currentItem + f.options.items; e += 1) { f.visibleItems.push(e); if (f.options.addClassActive === true) { c(f.$owlItems[e]).addClass("active") } } f.owl.visibleItems = f.visibleItems }, transitionTypes: function (e) { var f = this; f.outClass = "owl-" + e + "-out"; f.inClass = "owl-" + e + "-in" }, singleItemTransition: function () { var f = this, h = f.outClass, k = f.inClass, j = f.$owlItems.eq(f.currentItem), i = f.$owlItems.eq(f.prevItem), m = Math.abs(f.positionsInArray[f.currentItem]) + f.positionsInArray[f.prevItem], l = Math.abs(f.positionsInArray[f.currentItem]) + f.itemWidth / 2, g = "webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend"; f.isTransition = true; f.$owlWrapper.addClass("owl-origin").css({ "-webkit-transform-origin": l + "px", "-moz-perspective-origin": l + "px", "perspective-origin": l + "px" }); function e(n) { return { position: "relative", left: n + "px" } } i.css(e(m, 10)).addClass(h).on(g, function () { f.endPrev = true; i.off(g); f.clearTransStyle(i, h) }); j.addClass(k).on(g, function () { f.endCurrent = true; j.off(g); f.clearTransStyle(j, k) }) }, clearTransStyle: function (f, e) { var g = this; f.css({ position: "", left: "" }).removeClass(e); if (g.endPrev && g.endCurrent) { g.$owlWrapper.removeClass("owl-origin"); g.endPrev = false; g.endCurrent = false; g.isTransition = false } }, owlStatus: function () { var e = this; e.owl = { userOptions: e.userOptions, baseElement: e.$elem, userItems: e.$userItems, owlItems: e.$owlItems, currentItem: e.currentItem, prevItem: e.prevItem, visibleItems: e.visibleItems, isTouch: e.browser.isTouch, browser: e.browser, dragDirection: e.dragDirection } }, clearEvents: function () { var e = this; e.$elem.off(".owl owl mousedown.disableTextSelect"); c(a).off(".owl owl"); c(b).off("resize", e.resizer) }, unWrap: function () { var e = this; if (e.$elem.children().length !== 0) { e.$owlWrapper.unwrap(); e.$userItems.unwrap().unwrap(); if (e.owlControls) { e.owlControls.remove() } } e.clearEvents(); e.$elem.attr("style", e.$elem.data("owl-originalStyles") || "").attr("class", e.$elem.data("owl-originalClasses")) }, destroy: function () { var e = this; e.stop(); b.clearInterval(e.checkVisible); e.unWrap(); e.$elem.removeData() }, reinit: function (g) { var f = this, e = c.extend({}, f.userOptions, g); f.unWrap(); f.init(e, f.$elem) }, addItem: function (h, f) { var g = this, e; if (!h) { return false } if (g.$elem.children().length === 0) { g.$elem.append(h); g.setVars(); return false } g.unWrap(); if (f === undefined || f === -1) { e = -1 } else { e = f } if (e >= g.$userItems.length || e === -1) { g.$userItems.eq(-1).after(h) } else { g.$userItems.eq(e).before(h) } g.setVars() }, removeItem: function (f) { var g = this, e; if (g.$elem.children().length === 0) { return false } if (f === undefined || f === -1) { e = -1 } else { e = f } g.unWrap(); g.$userItems.eq(e).remove(); g.setVars() } }; c.fn.owlCarousel = function (e) { return this.each(function () { if (c(this).data("owl-init") === true) { return false } c(this).data("owl-init", true); var f = Object.create(d); f.init(e, this); c.data(this, "owlCarousel", f) }) }; c.fn.owlCarousel.options = { items: 5, itemsCustom: false, itemsDesktop: [1199, 4], itemsDesktopSmall: [979, 3], itemsTablet: [768, 2], itemsTabletSmall: false, itemsMobile: [479, 1], singleItem: false, itemsScaleUp: false, slideSpeed: 200, paginationSpeed: 800, rewindSpeed: 1000, autoPlay: false, stopOnHover: false, navigation: false, navigationText: ["prev", "next"], rewindNav: true, scrollPerPage: false, pagination: true, paginationNumbers: false, responsive: true, responsiveRefreshRate: 200, responsiveBaseWidth: b, baseClass: "owl-carousel", theme: "owl-theme", lazyLoad: false, lazyFollow: true, lazyEffect: "fade", autoHeight: false, jsonPath: false, jsonSuccess: false, dragBeforeAnimFinish: true, mouseDrag: true, touchDrag: true, addClassActive: false, transitionStyle: false, beforeUpdate: false, afterUpdate: false, beforeInit: false, afterInit: false, beforeMove: false, afterMove: false, afterAction: false, startDragging: false, afterLazyLoad: false } }(jQuery, window, document));