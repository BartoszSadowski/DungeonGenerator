parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"d4El":[function(require,module,exports) {
"use strict";function t(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(exports,"__esModule",{value:!0});var e=function e(i,n){t(this,e),this.width=i,this.height=n};exports.default=e;
},{}],"EQ3V":[function(require,module,exports) {
"use strict";var e,t,o,E,n,r;Object.defineProperty(exports,"__esModule",{value:!0}),exports.EventTypes=exports.StorageItems=exports.RoomType=exports.Modifiers=exports.Items=exports.SPRITE_TYPES=exports.Directions=exports.AXIS=void 0,exports.AXIS={VERTICAL:"VERTICAL",HORIZONTAL:"HORIZONTAL",UNDEFINED:"UNDEFINED"},function(e){e.Up="UP",e.Down="DOWN",e.Left="LEFT",e.Right="RIGHT",e.Default="UP",e.Center="CENTER",e.Floor="FLOOR"}(e=exports.Directions||(exports.Directions={})),exports.SPRITE_TYPES={BASE:"BASE",WALL:"WALL",DOOR:"DOOR",ENTERANCE:"ENTERANCE",EXIT:"EXIT",EVENT_A:"EVENT_A",EVENT_B:"EVENT_B",EVENT_C:"EVENT_C",EVENT_D:"EVENT_D",EVENT_E:"EVENT_E"},function(e){e.Empty="",e.Door="D",e.Wall="W",e.Floor="F",e.Enterance="E",e.Exit="X",e.Event="e"}(t=exports.Items||(exports.Items={})),function(e){e.None="",e.Variant="V"}(o=exports.Modifiers||(exports.Modifiers={})),function(e){e.Default="Default",e.Dungeon="Dungeon",e.Entrance="Entrance",e.Exit="Exit",e.Event="Event"}(E=exports.RoomType||(exports.RoomType={})),function(e){e.Dungeon="Dungeon",e.Config="Config"}(n=exports.StorageItems||(exports.StorageItems={})),function(e){e.Default="Default",e.Enemy="Enemy",e.Item="Item"}(r=exports.EventTypes||(exports.EventTypes={}));
},{}],"Fm76":[function(require,module,exports) {
"use strict";function e(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function t(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function i(e,i,n){return i&&t(e.prototype,i),n&&t(e,n),e}var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0});var s=n(require("../utils/dimensions")),a=require("../utils/dictionary"),o=function(){function t(i,n,s,a,o,r,h,u){e(this,t),this.SAVED="Config saved",this.LOADED="Config loaded",this.divisable=i,this.minDimension=n,this.scale=s,this.ctx=a,this.spriteMap=o,this.denseness=r,this.lootChance=h,this.dangerChance=u}return i(t,[{key:"save",value:function(){return sessionStorage.setItem(a.StorageItems.Config,JSON.stringify(this)),this.SAVED}},{key:"load",value:function(){var e=sessionStorage.getItem(a.StorageItems.Config),t=JSON.parse(e);return this.scale=t.scale,this.denseness=t.denseness,this.divisable=new s.default(t.divisable.width,t.divisable.height),this.minDimension=new s.default(t.minDimension.width,t.minDimension.height),this.lootChance=t.lootChance,this.dangerChance=t.dangerChance,this.LOADED}},{key:"init",value:function(){return sessionStorage.getItem(a.StorageItems.Config)?this.load():this.save()}}]),t}();exports.default=o;
},{"../utils/dimensions":"d4El","../utils/dictionary":"EQ3V"}],"MzkS":[function(require,module,exports) {
"use strict";function e(e){var o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:10;return Math.floor(e/o)*o}function o(e){return e*Math.PI/180}Object.defineProperty(exports,"__esModule",{value:!0}),exports.degreeToRadians=exports.roundDown=void 0,exports.roundDown=e,exports.degreeToRadians=o;
},{}],"fuRH":[function(require,module,exports) {
"use strict";function e(e,i){if(!(e instanceof i))throw new TypeError("Cannot call a class as a function")}function i(e,i){for(var t=0;t<i.length;t++){var a=i[t];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function t(e,t,a){return t&&i(e.prototype,t),a&&i(e,a),e}Object.defineProperty(exports,"__esModule",{value:!0});var a=require("../utils/dictionary"),r=require("../utils/calculate"),n=function(){function i(t,a){e(this,i),this.anchor=t,this.size=a}return t(i,[{key:"draw",value:function(e,t,n,s){var h;switch(s){case a.Directions.Down:h=r.degreeToRadians(180);break;case a.Directions.Left:h=r.degreeToRadians(270);break;case a.Directions.Right:h=r.degreeToRadians(90);break;case a.Directions.Up:default:h=r.degreeToRadians(0)}return 0===h?e.drawImage(i.image,this.anchor.x,this.anchor.y,this.size.width,this.size.height,t.x,t.y,n.width,n.height):(e.translate(t.x+n.width/2,t.y+n.height/2),e.rotate(h),e.drawImage(i.image,this.anchor.x,this.anchor.y,this.size.width,this.size.height,-n.width/2,-n.height/2,n.width,n.height),e.rotate(-h),e.translate(-(t.x+n.width/2),-(t.y+n.height/2))),this}}],[{key:"initialize",value:function(e,i){this.image.addEventListener("load",i),this.image.src=e}}]),i}();exports.default=n,n.image=new Image;
},{"../utils/dictionary":"EQ3V","../utils/calculate":"MzkS"}],"M5ms":[function(require,module,exports) {
"use strict";function e(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function t(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function i(e,i,n){return i&&t(e.prototype,i),n&&t(e,n),e}Object.defineProperty(exports,"__esModule",{value:!0});var n=require("./dictionary"),r=function(){function t(i,n){e(this,t),this.x=i,this.y=n}return i(t,[{key:"rescale",value:function(e){return new t(this.x*e,this.y*e)}},{key:"move",value:function(e,i){return new t(this.x+e,this.y+i)}},{key:"isBetween",value:function(e,t){var i=Math.max(e.x,t.x),n=Math.min(e.x,t.x),r=Math.max(e.y,t.y),s=Math.min(e.y,t.y);return this.x<=i&&this.x>=n&&this.y<=r&&this.y>=s}},{key:"isSame",value:function(e){return this.x===e.x&&this.y===e.y}},{key:"getDirection",value:function(e){return[[this.isSame(e),n.Directions.Center],[this.x>e.x,n.Directions.Left],[this.x<e.x,n.Directions.Right],[this.y>e.y,n.Directions.Up],[this.y<e.y,n.Directions.Down],[!0,n.Directions.Default]].find(function(e){return e[0]})[1]}}]),t}();exports.default=r;
},{"./dictionary":"EQ3V"}],"rmPI":[function(require,module,exports) {
"use strict";var e;function E(e,E,t){return E in e?Object.defineProperty(e,E,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[E]=t,e}var t=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0});var T=t(require("./point")),u=require("./dictionary"),n=(E(e={},u.SPRITE_TYPES.BASE,new T.default(0,0)),E(e,u.SPRITE_TYPES.WALL,new T.default(16,0)),E(e,u.SPRITE_TYPES.DOOR,new T.default(32,0)),E(e,u.SPRITE_TYPES.ENTERANCE,new T.default(0,16)),E(e,u.SPRITE_TYPES.EXIT,new T.default(16,16)),E(e,u.SPRITE_TYPES.EVENT_A,new T.default(32,16)),E(e,u.SPRITE_TYPES.EVENT_B,new T.default(0,32)),E(e,u.SPRITE_TYPES.EVENT_C,new T.default(16,32)),E(e,u.SPRITE_TYPES.EVENT_D,new T.default(32,32)),E(e,u.SPRITE_TYPES.EVENT_E,new T.default(0,48)),e);exports.default=n;
},{"./point":"M5ms","./dictionary":"EQ3V"}],"nNDm":[function(require,module,exports) {
"use strict";var e=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0});var t=e(require("../utils/dimensions")),r=e(require("./sprite")),i=require("../utils/dictionary"),u=e(require("../utils/spriteLocations")),n=new t.default(16,16);function s(e,t){e.set(t,new r.default(u.default[t],n))}function o(){var e=new Map;return Object.keys(i.SPRITE_TYPES).forEach(function(t){s(e,i.SPRITE_TYPES[t])}),e}exports.default=o;
},{"../utils/dimensions":"d4El","./sprite":"fuRH","../utils/dictionary":"EQ3V","../utils/spriteLocations":"rmPI"}],"FiQS":[function(require,module,exports) {
"use strict";var e=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.eventChance=exports.dangerChance=exports.lootChance=exports.minDimension=exports.divisable=exports.spriteMap=exports.DENSENESS=exports.SCALE=exports.eventEl=exports.bodyEl=exports.regenerateEl=exports.nameEl=exports.ctx=exports.canvas=void 0;var t=e(require("../utils/dimensions")),o=e(require("../app/spriteMap"));exports.canvas=document.getElementById("demoCanvas"),exports.ctx=exports.canvas?exports.canvas.getContext("2d"):null,exports.nameEl=document.getElementById("dungeon-name"),exports.regenerateEl=document.getElementById("dungeon-regenerate"),exports.bodyEl=document.querySelector("body"),exports.eventEl=document.getElementById("event-list"),exports.SCALE=35,exports.DENSENESS=1,exports.spriteMap=o.default(),exports.divisable=new t.default(16,12),exports.minDimension=new t.default(6,6),exports.lootChance=50,exports.dangerChance=50,exports.eventChance=exports.lootChance+exports.dangerChance/2;
},{"../utils/dimensions":"d4El","../app/spriteMap":"nNDm"}],"mOfM":[function(require,module,exports) {
"use strict";var e=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0});var n=e(require("./app/config")),t=require("./data/configData"),a=e(require("./utils/dimensions")),i=document.getElementById("scale"),d=document.getElementById("room-height"),o=document.getElementById("room-width"),l=document.getElementById("denseness"),s=document.getElementById("danger"),u=document.getElementById("loot"),c=new n.default(t.divisable,t.minDimension,t.SCALE,t.ctx,t.spriteMap,t.DENSENESS,t.lootChance,t.dangerChance);c.init(),i.value=c.scale.toString(),i.addEventListener("change",function(){c.scale=+i.value,c.save()}),d.value=c.divisable.height.toString(),d.addEventListener("change",function(){c.divisable=new a.default(+o.value,+d.value),c.save()}),o.value=c.divisable.width.toString(),o.addEventListener("change",function(){c.divisable=new a.default(+o.value,+d.value),c.save()}),l.value=c.denseness.toString(),l.addEventListener("change",function(){c.denseness=+l.value,c.save()}),s.value=c.dangerChance.toString(),s.addEventListener("change",function(){c.dangerChance=+s.value,console.log(c),c.save()}),u.value=c.lootChance.toString(),u.addEventListener("change",function(){c.lootChance=+u.value,console.log(c),c.save()});
},{"./app/config":"Fm76","./data/configData":"FiQS","./utils/dimensions":"d4El"}]},{},["mOfM"], null)
//# sourceMappingURL=config_page.c23f904f.js.map