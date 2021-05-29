/*
Author: Geraint Luff and others
Year: 2013

This code is released into the "public domain" by its author(s).  Anybody may use, alter and distribute the code without restriction.  The author makes no guarantees, and takes no liability of any kind for use of this code.

If you find a bug or make an improvement, it would be courteous to let the author know, but it is not compulsory.
*/
!function(e,r){"function"==typeof define&&define.amd?define([],r):"undefined"!=typeof module&&module.exports?module.exports=r():e.tv4=r()}(this,function(){function e(e){return encodeURI(e).replace(/%25[0-9][0-9]/g,function(e){return"%"+e.substring(3)})}function r(r){var t="";p[r.charAt(0)]&&(t=r.charAt(0),r=r.substring(1));var i="",n="",a=!0,o=!1,s=!1;"+"===t?a=!1:"."===t?(n=".",i="."):"/"===t?(n="/",i="/"):"#"===t?(n="#",a=!1):";"===t?(n=";",i=";",o=!0,s=!0):"?"===t?(n="?",i="&",o=!0):"&"===t&&(n="&",i="&",o=!0);for(var l=[],h=r.split(","),u=[],f={},d=0;d<h.length;d++){var m=h[d],v=null;if(m.indexOf(":")!==-1){var y=m.split(":");m=y[0],v=parseInt(y[1],10)}for(var E={};c[m.charAt(m.length-1)];)E[m.charAt(m.length-1)]=!0,m=m.substring(0,m.length-1);var g={truncate:v,name:m,suffices:E};u.push(g),f[m]=g,l.push(m)}var O=function(r){for(var t="",l=0,h=0;h<u.length;h++){var f=u[h],p=r(f.name);if(null===p||void 0===p||Array.isArray(p)&&0===p.length||"object"==typeof p&&0===Object.keys(p).length)l++;else if(t+=h===l?n:i||",",Array.isArray(p)){o&&(t+=f.name+"=");for(var c=0;c<p.length;c++)c>0&&(t+=f.suffices["*"]?i||",":",",f.suffices["*"]&&o&&(t+=f.name+"=")),t+=a?encodeURIComponent(p[c]).replace(/!/g,"%21"):e(p[c])}else if("object"==typeof p){o&&!f.suffices["*"]&&(t+=f.name+"=");var d=!0;for(var m in p)d||(t+=f.suffices["*"]?i||",":","),d=!1,t+=a?encodeURIComponent(m).replace(/!/g,"%21"):e(m),t+=f.suffices["*"]?"=":",",t+=a?encodeURIComponent(p[m]).replace(/!/g,"%21"):e(p[m])}else o&&(t+=f.name,s&&""===p||(t+="=")),null!=f.truncate&&(p=p.substring(0,f.truncate)),t+=a?encodeURIComponent(p).replace(/!/g,"%21"):e(p)}return t};return O.varNames=l,{prefix:n,substitution:O}}function t(e){if(!(this instanceof t))return new t(e);for(var i=e.split("{"),n=[i.shift()],a=[],o=[],s=[];i.length>0;){var l=i.shift(),h=l.split("}")[0],u=l.substring(h.length+1),f=r(h);o.push(f.substitution),a.push(f.prefix),n.push(u),s=s.concat(f.substitution.varNames)}this.fill=function(e){for(var r=n[0],t=0;t<o.length;t++){var i=o[t];r+=i(e),r+=n[t+1]}return r},this.varNames=s,this.template=e}function i(e,r){if(e===r)return!0;if(e&&r&&"object"==typeof e&&"object"==typeof r){if(Array.isArray(e)!==Array.isArray(r))return!1;if(Array.isArray(e)){if(e.length!==r.length)return!1;for(var t=0;t<e.length;t++)if(!i(e[t],r[t]))return!1}else{var n;for(n in e)if(void 0===r[n]&&void 0!==e[n])return!1;for(n in r)if(void 0===e[n]&&void 0!==r[n])return!1;for(n in e)if(!i(e[n],r[n]))return!1}return!0}return!1}function n(e){var r=String(e).replace(/^\s+|\s+$/g,"").match(/^([^:\/?#]+:)?(\/\/(?:[^:@]*(?::[^:@]*)?@)?(([^:\/?#]*)(?::(\d*))?))?([^?#]*)(\?[^#]*)?(#[\s\S]*)?/);return r?{href:r[0]||"",protocol:r[1]||"",authority:r[2]||"",host:r[3]||"",hostname:r[4]||"",port:r[5]||"",pathname:r[6]||"",search:r[7]||"",hash:r[8]||""}:null}function a(e,r){function t(e){var r=[];return e.replace(/^(\.\.?(\/|$))+/,"").replace(/\/(\.(\/|$))+/g,"/").replace(/\/\.\.$/,"/../").replace(/\/?[^\/]*/g,function(e){"/.."===e?r.pop():r.push(e)}),r.join("").replace(/^\//,"/"===e.charAt(0)?"/":"")}return r=n(r||""),e=n(e||""),r&&e?(r.protocol||e.protocol)+(r.protocol||r.authority?r.authority:e.authority)+t(r.protocol||r.authority||"/"===r.pathname.charAt(0)?r.pathname:r.pathname?(e.authority&&!e.pathname?"/":"")+e.pathname.slice(0,e.pathname.lastIndexOf("/")+1)+r.pathname:e.pathname)+(r.protocol||r.authority||r.pathname?r.search:r.search||e.search)+r.hash:null}function o(e){return e.split("#")[0]}function s(e,r){if(e&&"object"==typeof e)if(void 0===r?r=e.id:"string"==typeof e.id&&(r=a(r,e.id),e.id=r),Array.isArray(e))for(var t=0;t<e.length;t++)s(e[t],r);else{"string"==typeof e.$ref&&(e.$ref=a(r,e.$ref));for(var i in e)"enum"!==i&&s(e[i],r)}}function l(e){e=e||"en";var r=P[e];return function(e){var t=r[e.code]||O[e.code];if("string"!=typeof t)return"Unknown error code "+e.code+": "+JSON.stringify(e.messageParams);var i=e.params;return t.replace(/\{([^{}]*)\}/g,function(e,r){var t=i[r];return"string"==typeof t||"number"==typeof t?t:e})}}function h(e,r,t,i,n){if(Error.call(this),void 0===e)throw new Error("No error code supplied: "+i);this.message="",this.params=r,this.code=e,this.dataPath=t||"",this.schemaPath=i||"",this.subErrors=n||null;var a=new Error(this.message);if(this.stack=a.stack||a.stacktrace,!this.stack)try{throw a}catch(a){this.stack=a.stack||a.stacktrace}}function u(e,r){if(r.substring(0,e.length)===e){var t=r.substring(e.length);if(r.length>0&&"/"===r.charAt(e.length-1)||"#"===t.charAt(0)||"?"===t.charAt(0))return!0}return!1}function f(e){var r,t,i=new d,n={setErrorReporter:function(e){return"string"==typeof e?this.language(e):(t=e,!0)},addFormat:function(){i.addFormat.apply(i,arguments)},language:function(e){return e?(P[e]||(e=e.split("-")[0]),!!P[e]&&(r=e,e)):r},addLanguage:function(e,r){var t;for(t in y)r[t]&&!r[y[t]]&&(r[y[t]]=r[t]);var i=e.split("-")[0];if(P[i]){P[e]=Object.create(P[i]);for(t in r)"undefined"==typeof P[i][t]&&(P[i][t]=r[t]),P[e][t]=r[t]}else P[e]=r,P[i]=r;return this},freshApi:function(e){var r=f();return e&&r.language(e),r},validate:function(e,n,a,o){var s=l(r),h=t?function(e,r,i){return t(e,r,i)||s(e,r,i)}:s,u=new d(i,(!1),h,a,o);"string"==typeof n&&(n={$ref:n}),u.addSchema("",n);var f=u.validateAll(e,n,null,null,"");return!f&&o&&(f=u.banUnknownProperties(e,n)),this.error=f,this.missing=u.missing,this.valid=null===f,this.valid},validateResult:function(){var e={};return this.validate.apply(e,arguments),e},validateMultiple:function(e,n,a,o){var s=l(r),h=t?function(e,r,i){return t(e,r,i)||s(e,r,i)}:s,u=new d(i,(!0),h,a,o);"string"==typeof n&&(n={$ref:n}),u.addSchema("",n),u.validateAll(e,n,null,null,""),o&&u.banUnknownProperties(e,n);var f={};return f.errors=u.errors,f.missing=u.missing,f.valid=0===f.errors.length,f},addSchema:function(){return i.addSchema.apply(i,arguments)},getSchema:function(){return i.getSchema.apply(i,arguments)},getSchemaMap:function(){return i.getSchemaMap.apply(i,arguments)},getSchemaUris:function(){return i.getSchemaUris.apply(i,arguments)},getMissingUris:function(){return i.getMissingUris.apply(i,arguments)},dropSchemas:function(){i.dropSchemas.apply(i,arguments)},defineKeyword:function(){i.defineKeyword.apply(i,arguments)},defineError:function(e,r,t){if("string"!=typeof e||!/^[A-Z]+(_[A-Z]+)*$/.test(e))throw new Error("Code name must be a string in UPPER_CASE_WITH_UNDERSCORES");if("number"!=typeof r||r%1!==0||r<1e4)throw new Error("Code number must be an integer > 10000");if("undefined"!=typeof y[e])throw new Error("Error already defined: "+e+" as "+y[e]);if("undefined"!=typeof E[r])throw new Error("Error code already used: "+E[r]+" as "+r);y[e]=r,E[r]=e,O[e]=O[r]=t;for(var i in P){var n=P[i];n[e]&&(n[r]=n[r]||n[e])}},reset:function(){i.reset(),this.error=null,this.missing=[],this.valid=!0},missing:[],error:null,valid:!0,normSchema:s,resolveUrl:a,getDocumentUri:o,errorCodes:y};return n.language(e||"en"),n}Object.keys||(Object.keys=function(){var e=Object.prototype.hasOwnProperty,r=!{toString:null}.propertyIsEnumerable("toString"),t=["toString","toLocaleString","valueOf","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","constructor"],i=t.length;return function(n){if("object"!=typeof n&&"function"!=typeof n||null===n)throw new TypeError("Object.keys called on non-object");var a=[];for(var o in n)e.call(n,o)&&a.push(o);if(r)for(var s=0;s<i;s++)e.call(n,t[s])&&a.push(t[s]);return a}}()),Object.create||(Object.create=function(){function e(){}return function(r){if(1!==arguments.length)throw new Error("Object.create implementation only accepts one parameter.");return e.prototype=r,new e}}()),Array.isArray||(Array.isArray=function(e){return"[object Array]"===Object.prototype.toString.call(e)}),Array.prototype.indexOf||(Array.prototype.indexOf=function(e){if(null===this)throw new TypeError;var r=Object(this),t=r.length>>>0;if(0===t)return-1;var i=0;if(arguments.length>1&&(i=Number(arguments[1]),i!==i?i=0:0!==i&&i!==1/0&&i!==-(1/0)&&(i=(i>0||-1)*Math.floor(Math.abs(i)))),i>=t)return-1;for(var n=i>=0?i:Math.max(t-Math.abs(i),0);n<t;n++)if(n in r&&r[n]===e)return n;return-1}),Object.isFrozen||(Object.isFrozen=function(e){for(var r="tv4_test_frozen_key";e.hasOwnProperty(r);)r+=Math.random();try{return e[r]=!0,delete e[r],!1}catch(t){return!0}});var p={"+":!0,"#":!0,".":!0,"/":!0,";":!0,"?":!0,"&":!0},c={"*":!0};t.prototype={toString:function(){return this.template},fillFromObject:function(e){return this.fill(function(r){return e[r]})}};var d=function(e,r,t,i,n){if(this.missing=[],this.missingMap={},this.formatValidators=e?Object.create(e.formatValidators):{},this.schemas=e?Object.create(e.schemas):{},this.collectMultiple=r,this.errors=[],this.handleError=r?this.collectError:this.returnError,i&&(this.checkRecursive=!0,this.scanned=[],this.scannedFrozen=[],this.scannedFrozenSchemas=[],this.scannedFrozenValidationErrors=[],this.validatedSchemasKey="tv4_validation_id",this.validationErrorsKey="tv4_validation_errors_id"),n&&(this.trackUnknownProperties=!0,this.knownPropertyPaths={},this.unknownPropertyPaths={}),this.errorReporter=t||l("en"),"string"==typeof this.errorReporter)throw new Error("debug");if(this.definedKeywords={},e)for(var a in e.definedKeywords)this.definedKeywords[a]=e.definedKeywords[a].slice(0)};d.prototype.defineKeyword=function(e,r){this.definedKeywords[e]=this.definedKeywords[e]||[],this.definedKeywords[e].push(r)},d.prototype.createError=function(e,r,t,i,n,a,o){var s=new h(e,r,t,i,n);return s.message=this.errorReporter(s,a,o),s},d.prototype.returnError=function(e){return e},d.prototype.collectError=function(e){return e&&this.errors.push(e),null},d.prototype.prefixErrors=function(e,r,t){for(var i=e;i<this.errors.length;i++)this.errors[i]=this.errors[i].prefixWith(r,t);return this},d.prototype.banUnknownProperties=function(e,r){for(var t in this.unknownPropertyPaths){var i=this.createError(y.UNKNOWN_PROPERTY,{path:t},t,"",null,e,r),n=this.handleError(i);if(n)return n}return null},d.prototype.addFormat=function(e,r){if("object"==typeof e){for(var t in e)this.addFormat(t,e[t]);return this}this.formatValidators[e]=r},d.prototype.resolveRefs=function(e,r){if(void 0!==e.$ref){if(r=r||{},r[e.$ref])return this.createError(y.CIRCULAR_REFERENCE,{urls:Object.keys(r).join(", ")},"","",null,void 0,e);r[e.$ref]=!0,e=this.getSchema(e.$ref,r)}return e},d.prototype.getSchema=function(e,r){var t;if(void 0!==this.schemas[e])return t=this.schemas[e],this.resolveRefs(t,r);var i=e,n="";if(e.indexOf("#")!==-1&&(n=e.substring(e.indexOf("#")+1),i=e.substring(0,e.indexOf("#"))),"object"==typeof this.schemas[i]){t=this.schemas[i];var a=decodeURIComponent(n);if(""===a)return this.resolveRefs(t,r);if("/"!==a.charAt(0))return;for(var o=a.split("/").slice(1),s=0;s<o.length;s++){var l=o[s].replace(/~1/g,"/").replace(/~0/g,"~");if(void 0===t[l]){t=void 0;break}t=t[l]}if(void 0!==t)return this.resolveRefs(t,r)}void 0===this.missing[i]&&(this.missing.push(i),this.missing[i]=i,this.missingMap[i]=i)},d.prototype.searchSchemas=function(e,r){if(Array.isArray(e))for(var t=0;t<e.length;t++)this.searchSchemas(e[t],r);else if(e&&"object"==typeof e){"string"==typeof e.id&&u(r,e.id)&&void 0===this.schemas[e.id]&&(this.schemas[e.id]=e);for(var i in e)if("enum"!==i)if("object"==typeof e[i])this.searchSchemas(e[i],r);else if("$ref"===i){var n=o(e[i]);n&&void 0===this.schemas[n]&&void 0===this.missingMap[n]&&(this.missingMap[n]=n)}}},d.prototype.addSchema=function(e,r){if("string"!=typeof e||"undefined"==typeof r){if("object"!=typeof e||"string"!=typeof e.id)return;r=e,e=r.id}e===o(e)+"#"&&(e=o(e)),this.schemas[e]=r,delete this.missingMap[e],s(r,e),this.searchSchemas(r,e)},d.prototype.getSchemaMap=function(){var e={};for(var r in this.schemas)e[r]=this.schemas[r];return e},d.prototype.getSchemaUris=function(e){var r=[];for(var t in this.schemas)e&&!e.test(t)||r.push(t);return r},d.prototype.getMissingUris=function(e){var r=[];for(var t in this.missingMap)e&&!e.test(t)||r.push(t);return r},d.prototype.dropSchemas=function(){this.schemas={},this.reset()},d.prototype.reset=function(){this.missing=[],this.missingMap={},this.errors=[]},d.prototype.validateAll=function(e,r,t,i,n){var a;if(r=this.resolveRefs(r),!r)return null;if(r instanceof h)return this.errors.push(r),r;var o,s=this.errors.length,l=null,u=null;if(this.checkRecursive&&e&&"object"==typeof e){if(a=!this.scanned.length,e[this.validatedSchemasKey]){var f=e[this.validatedSchemasKey].indexOf(r);if(f!==-1)return this.errors=this.errors.concat(e[this.validationErrorsKey][f]),null}if(Object.isFrozen(e)&&(o=this.scannedFrozen.indexOf(e),o!==-1)){var p=this.scannedFrozenSchemas[o].indexOf(r);if(p!==-1)return this.errors=this.errors.concat(this.scannedFrozenValidationErrors[o][p]),null}if(this.scanned.push(e),Object.isFrozen(e))o===-1&&(o=this.scannedFrozen.length,this.scannedFrozen.push(e),this.scannedFrozenSchemas.push([])),l=this.scannedFrozenSchemas[o].length,this.scannedFrozenSchemas[o][l]=r,this.scannedFrozenValidationErrors[o][l]=[];else{if(!e[this.validatedSchemasKey])try{Object.defineProperty(e,this.validatedSchemasKey,{value:[],configurable:!0}),Object.defineProperty(e,this.validationErrorsKey,{value:[],configurable:!0})}catch(c){e[this.validatedSchemasKey]=[],e[this.validationErrorsKey]=[]}u=e[this.validatedSchemasKey].length,e[this.validatedSchemasKey][u]=r,e[this.validationErrorsKey][u]=[]}}var d=this.errors.length,m=this.validateBasic(e,r,n)||this.validateNumeric(e,r,n)||this.validateString(e,r,n)||this.validateArray(e,r,n)||this.validateObject(e,r,n)||this.validateCombinations(e,r,n)||this.validateHypermedia(e,r,n)||this.validateFormat(e,r,n)||this.validateDefinedKeywords(e,r,n)||null;if(a){for(;this.scanned.length;){var v=this.scanned.pop();delete v[this.validatedSchemasKey]}this.scannedFrozen=[],this.scannedFrozenSchemas=[]}if(m||d!==this.errors.length)for(;t&&t.length||i&&i.length;){var y=t&&t.length?""+t.pop():null,E=i&&i.length?""+i.pop():null;m&&(m=m.prefixWith(y,E)),this.prefixErrors(d,y,E)}return null!==l?this.scannedFrozenValidationErrors[o][l]=this.errors.slice(s):null!==u&&(e[this.validationErrorsKey][u]=this.errors.slice(s)),this.handleError(m)},d.prototype.validateFormat=function(e,r){if("string"!=typeof r.format||!this.formatValidators[r.format])return null;var t=this.formatValidators[r.format].call(null,e,r);return"string"==typeof t||"number"==typeof t?this.createError(y.FORMAT_CUSTOM,{message:t},"","/format",null,e,r):t&&"object"==typeof t?this.createError(y.FORMAT_CUSTOM,{message:t.message||"?"},t.dataPath||"",t.schemaPath||"/format",null,e,r):null},d.prototype.validateDefinedKeywords=function(e,r,t){for(var i in this.definedKeywords)if("undefined"!=typeof r[i])for(var n=this.definedKeywords[i],a=0;a<n.length;a++){var o=n[a],s=o(e,r[i],r,t);if("string"==typeof s||"number"==typeof s)return this.createError(y.KEYWORD_CUSTOM,{key:i,message:s},"","",null,e,r).prefixWith(null,i);if(s&&"object"==typeof s){var l=s.code;if("string"==typeof l){if(!y[l])throw new Error("Undefined error code (use defineError): "+l);l=y[l]}else"number"!=typeof l&&(l=y.KEYWORD_CUSTOM);var h="object"==typeof s.message?s.message:{key:i,message:s.message||"?"},u=s.schemaPath||"/"+i.replace(/~/g,"~0").replace(/\//g,"~1");return this.createError(l,h,s.dataPath||null,u,null,e,r)}}return null},d.prototype.validateBasic=function(e,r,t){var i;return(i=this.validateType(e,r,t))?i.prefixWith(null,"type"):(i=this.validateEnum(e,r,t))?i.prefixWith(null,"type"):null},d.prototype.validateType=function(e,r){if(void 0===r.type)return null;var t=typeof e;null===e?t="null":Array.isArray(e)&&(t="array");var i=r.type;Array.isArray(i)||(i=[i]);for(var n=0;n<i.length;n++){var a=i[n];if(a===t||"integer"===a&&"number"===t&&e%1===0)return null}return this.createError(y.INVALID_TYPE,{type:t,expected:i.join("/")},"","",null,e,r)},d.prototype.validateEnum=function(e,r){if(void 0===r["enum"])return null;for(var t=0;t<r["enum"].length;t++){var n=r["enum"][t];if(i(e,n))return null}return this.createError(y.ENUM_MISMATCH,{value:"undefined"!=typeof JSON?JSON.stringify(e):e},"","",null,e,r)},d.prototype.validateNumeric=function(e,r,t){return this.validateMultipleOf(e,r,t)||this.validateMinMax(e,r,t)||this.validateNaN(e,r,t)||null};var m=Math.pow(2,-51),v=1-m;d.prototype.validateMultipleOf=function(e,r){var t=r.multipleOf||r.divisibleBy;if(void 0===t)return null;if("number"==typeof e){var i=e/t%1;if(i>=m&&i<v)return this.createError(y.NUMBER_MULTIPLE_OF,{value:e,multipleOf:t},"","",null,e,r)}return null},d.prototype.validateMinMax=function(e,r){if("number"!=typeof e)return null;if(void 0!==r.minimum){if(e<r.minimum)return this.createError(y.NUMBER_MINIMUM,{value:e,minimum:r.minimum},"","/minimum",null,e,r);if(r.exclusiveMinimum&&e===r.minimum)return this.createError(y.NUMBER_MINIMUM_EXCLUSIVE,{value:e,minimum:r.minimum},"","/exclusiveMinimum",null,e,r)}if(void 0!==r.maximum){if(e>r.maximum)return this.createError(y.NUMBER_MAXIMUM,{value:e,maximum:r.maximum},"","/maximum",null,e,r);if(r.exclusiveMaximum&&e===r.maximum)return this.createError(y.NUMBER_MAXIMUM_EXCLUSIVE,{value:e,maximum:r.maximum},"","/exclusiveMaximum",null,e,r)}return null},d.prototype.validateNaN=function(e,r){return"number"!=typeof e?null:isNaN(e)===!0||e===1/0||e===-(1/0)?this.createError(y.NUMBER_NOT_A_NUMBER,{value:e},"","/type",null,e,r):null},d.prototype.validateString=function(e,r,t){return this.validateStringLength(e,r,t)||this.validateStringPattern(e,r,t)||null},d.prototype.validateStringLength=function(e,r){return"string"!=typeof e?null:void 0!==r.minLength&&e.length<r.minLength?this.createError(y.STRING_LENGTH_SHORT,{length:e.length,minimum:r.minLength},"","/minLength",null,e,r):void 0!==r.maxLength&&e.length>r.maxLength?this.createError(y.STRING_LENGTH_LONG,{length:e.length,maximum:r.maxLength},"","/maxLength",null,e,r):null},d.prototype.validateStringPattern=function(e,r){if("string"!=typeof e||"string"!=typeof r.pattern&&!(r.pattern instanceof RegExp))return null;var t;if(r.pattern instanceof RegExp)t=r.pattern;else{var i,n="",a=r.pattern.match(/^\/(.+)\/([img]*)$/);a?(i=a[1],n=a[2]):i=r.pattern,t=new RegExp(i,n)}return t.test(e)?null:this.createError(y.STRING_PATTERN,{pattern:r.pattern},"","/pattern",null,e,r)},d.prototype.validateArray=function(e,r,t){return Array.isArray(e)?this.validateArrayLength(e,r,t)||this.validateArrayUniqueItems(e,r,t)||this.validateArrayItems(e,r,t)||null:null},d.prototype.validateArrayLength=function(e,r){var t;return void 0!==r.minItems&&e.length<r.minItems&&(t=this.createError(y.ARRAY_LENGTH_SHORT,{length:e.length,minimum:r.minItems},"","/minItems",null,e,r),this.handleError(t))?t:void 0!==r.maxItems&&e.length>r.maxItems&&(t=this.createError(y.ARRAY_LENGTH_LONG,{length:e.length,maximum:r.maxItems},"","/maxItems",null,e,r),this.handleError(t))?t:null},d.prototype.validateArrayUniqueItems=function(e,r){if(r.uniqueItems)for(var t=0;t<e.length;t++)for(var n=t+1;n<e.length;n++)if(i(e[t],e[n])){var a=this.createError(y.ARRAY_UNIQUE,{match1:t,match2:n},"","/uniqueItems",null,e,r);if(this.handleError(a))return a}return null},d.prototype.validateArrayItems=function(e,r,t){if(void 0===r.items)return null;var i,n;if(Array.isArray(r.items)){for(n=0;n<e.length;n++)if(n<r.items.length){if(i=this.validateAll(e[n],r.items[n],[n],["items",n],t+"/"+n))return i}else if(void 0!==r.additionalItems)if("boolean"==typeof r.additionalItems){if(!r.additionalItems&&(i=this.createError(y.ARRAY_ADDITIONAL_ITEMS,{},"/"+n,"/additionalItems",null,e,r),this.handleError(i)))return i}else if(i=this.validateAll(e[n],r.additionalItems,[n],["additionalItems"],t+"/"+n))return i}else for(n=0;n<e.length;n++)if(i=this.validateAll(e[n],r.items,[n],["items"],t+"/"+n))return i;return null},d.prototype.validateObject=function(e,r,t){return"object"!=typeof e||null===e||Array.isArray(e)?null:this.validateObjectMinMaxProperties(e,r,t)||this.validateObjectRequiredProperties(e,r,t)||this.validateObjectProperties(e,r,t)||this.validateObjectDependencies(e,r,t)||null},d.prototype.validateObjectMinMaxProperties=function(e,r){var t,i=Object.keys(e);return void 0!==r.minProperties&&i.length<r.minProperties&&(t=this.createError(y.OBJECT_PROPERTIES_MINIMUM,{propertyCount:i.length,minimum:r.minProperties},"","/minProperties",null,e,r),this.handleError(t))?t:void 0!==r.maxProperties&&i.length>r.maxProperties&&(t=this.createError(y.OBJECT_PROPERTIES_MAXIMUM,{propertyCount:i.length,maximum:r.maxProperties},"","/maxProperties",null,e,r),this.handleError(t))?t:null},d.prototype.validateObjectRequiredProperties=function(e,r){if(void 0!==r.required)for(var t=0;t<r.required.length;t++){var i=r.required[t];if(void 0===e[i]){var n=this.createError(y.OBJECT_REQUIRED,{key:i},"","/required/"+t,null,e,r);if(this.handleError(n))return n}}return null},d.prototype.validateObjectProperties=function(e,r,t){var i;for(var n in e){var a=t+"/"+n.replace(/~/g,"~0").replace(/\//g,"~1"),o=!1;if(void 0!==r.properties&&void 0!==r.properties[n]&&(o=!0,i=this.validateAll(e[n],r.properties[n],[n],["properties",n],a)))return i;if(void 0!==r.patternProperties)for(var s in r.patternProperties){var l=new RegExp(s);if(l.test(n)&&(o=!0,i=this.validateAll(e[n],r.patternProperties[s],[n],["patternProperties",s],a)))return i}if(o)this.trackUnknownProperties&&(this.knownPropertyPaths[a]=!0,delete this.unknownPropertyPaths[a]);else if(void 0!==r.additionalProperties){if(this.trackUnknownProperties&&(this.knownPropertyPaths[a]=!0,delete this.unknownPropertyPaths[a]),"boolean"==typeof r.additionalProperties){if(!r.additionalProperties&&(i=this.createError(y.OBJECT_ADDITIONAL_PROPERTIES,{key:n},"","/additionalProperties",null,e,r).prefixWith(n,null),this.handleError(i)))return i}else if(i=this.validateAll(e[n],r.additionalProperties,[n],["additionalProperties"],a))return i}else this.trackUnknownProperties&&!this.knownPropertyPaths[a]&&(this.unknownPropertyPaths[a]=!0)}return null},d.prototype.validateObjectDependencies=function(e,r,t){var i;if(void 0!==r.dependencies)for(var n in r.dependencies)if(void 0!==e[n]){var a=r.dependencies[n];if("string"==typeof a){if(void 0===e[a]&&(i=this.createError(y.OBJECT_DEPENDENCY_KEY,{key:n,missing:a},"","",null,e,r).prefixWith(null,n).prefixWith(null,"dependencies"),this.handleError(i)))return i}else if(Array.isArray(a))for(var o=0;o<a.length;o++){var s=a[o];if(void 0===e[s]&&(i=this.createError(y.OBJECT_DEPENDENCY_KEY,{key:n,missing:s},"","/"+o,null,e,r).prefixWith(null,n).prefixWith(null,"dependencies"),this.handleError(i)))return i}else if(i=this.validateAll(e,a,[],["dependencies",n],t))return i}return null},d.prototype.validateCombinations=function(e,r,t){return this.validateAllOf(e,r,t)||this.validateAnyOf(e,r,t)||this.validateOneOf(e,r,t)||this.validateNot(e,r,t)||null},d.prototype.validateAllOf=function(e,r,t){if(void 0===r.allOf)return null;for(var i,n=0;n<r.allOf.length;n++){var a=r.allOf[n];if(i=this.validateAll(e,a,[],["allOf",n],t))return i}return null},d.prototype.validateAnyOf=function(e,r,t){if(void 0===r.anyOf)return null;var i,n,a=[],o=this.errors.length;this.trackUnknownProperties&&(i=this.unknownPropertyPaths,n=this.knownPropertyPaths);for(var s=!0,l=0;l<r.anyOf.length;l++){this.trackUnknownProperties&&(this.unknownPropertyPaths={},this.knownPropertyPaths={});var h=r.anyOf[l],u=this.errors.length,f=this.validateAll(e,h,[],["anyOf",l],t);if(null===f&&u===this.errors.length){if(this.errors=this.errors.slice(0,o),this.trackUnknownProperties){for(var p in this.knownPropertyPaths)n[p]=!0,delete i[p];for(var c in this.unknownPropertyPaths)n[c]||(i[c]=!0);s=!1;continue}return null}f&&a.push(f.prefixWith(null,""+l).prefixWith(null,"anyOf"))}return this.trackUnknownProperties&&(this.unknownPropertyPaths=i,this.knownPropertyPaths=n),s?(a=a.concat(this.errors.slice(o)),this.errors=this.errors.slice(0,o),this.createError(y.ANY_OF_MISSING,{},"","/anyOf",a,e,r)):void 0},d.prototype.validateOneOf=function(e,r,t){if(void 0===r.oneOf)return null;var i,n,a=null,o=[],s=this.errors.length;this.trackUnknownProperties&&(i=this.unknownPropertyPaths,n=this.knownPropertyPaths);for(var l=0;l<r.oneOf.length;l++){this.trackUnknownProperties&&(this.unknownPropertyPaths={},this.knownPropertyPaths={});var h=r.oneOf[l],u=this.errors.length,f=this.validateAll(e,h,[],["oneOf",l],t);if(null===f&&u===this.errors.length){if(null!==a)return this.errors=this.errors.slice(0,s),this.createError(y.ONE_OF_MULTIPLE,{index1:a,index2:l},"","/oneOf",null,e,r);if(a=l,this.trackUnknownProperties){for(var p in this.knownPropertyPaths)n[p]=!0,delete i[p];for(var c in this.unknownPropertyPaths)n[c]||(i[c]=!0)}}else f&&o.push(f)}return this.trackUnknownProperties&&(this.unknownPropertyPaths=i,this.knownPropertyPaths=n),null===a?(o=o.concat(this.errors.slice(s)),this.errors=this.errors.slice(0,s),this.createError(y.ONE_OF_MISSING,{},"","/oneOf",o,e,r)):(this.errors=this.errors.slice(0,s),null)},d.prototype.validateNot=function(e,r,t){if(void 0===r.not)return null;var i,n,a=this.errors.length;this.trackUnknownProperties&&(i=this.unknownPropertyPaths,n=this.knownPropertyPaths,this.unknownPropertyPaths={},this.knownPropertyPaths={});var o=this.validateAll(e,r.not,null,null,t),s=this.errors.slice(a);return this.errors=this.errors.slice(0,a),this.trackUnknownProperties&&(this.unknownPropertyPaths=i,this.knownPropertyPaths=n),null===o&&0===s.length?this.createError(y.NOT_PASSED,{},"","/not",null,e,r):null},d.prototype.validateHypermedia=function(e,r,i){if(!r.links)return null;for(var n,a=0;a<r.links.length;a++){var o=r.links[a];if("describedby"===o.rel){for(var s=new t(o.href),l=!0,h=0;h<s.varNames.length;h++)if(!(s.varNames[h]in e)){l=!1;break}if(l){var u=s.fillFromObject(e),f={$ref:u};if(n=this.validateAll(e,f,[],["links",a],i))return n}}}};var y={INVALID_TYPE:0,ENUM_MISMATCH:1,ANY_OF_MISSING:10,ONE_OF_MISSING:11,ONE_OF_MULTIPLE:12,NOT_PASSED:13,NUMBER_MULTIPLE_OF:100,NUMBER_MINIMUM:101,NUMBER_MINIMUM_EXCLUSIVE:102,NUMBER_MAXIMUM:103,NUMBER_MAXIMUM_EXCLUSIVE:104,NUMBER_NOT_A_NUMBER:105,STRING_LENGTH_SHORT:200,STRING_LENGTH_LONG:201,STRING_PATTERN:202,OBJECT_PROPERTIES_MINIMUM:300,OBJECT_PROPERTIES_MAXIMUM:301,OBJECT_REQUIRED:302,OBJECT_ADDITIONAL_PROPERTIES:303,OBJECT_DEPENDENCY_KEY:304,ARRAY_LENGTH_SHORT:400,ARRAY_LENGTH_LONG:401,ARRAY_UNIQUE:402,ARRAY_ADDITIONAL_ITEMS:403,FORMAT_CUSTOM:500,KEYWORD_CUSTOM:501,CIRCULAR_REFERENCE:600,UNKNOWN_PROPERTY:1e3},E={};for(var g in y)E[y[g]]=g;var O={INVALID_TYPE:"Invalid type: {type} (expected {expected})",ENUM_MISMATCH:"No enum match for: {value}",ANY_OF_MISSING:'Data does not match any schemas from "anyOf"',ONE_OF_MISSING:'Data does not match any schemas from "oneOf"',ONE_OF_MULTIPLE:'Data is valid against more than one schema from "oneOf": indices {index1} and {index2}',NOT_PASSED:'Data matches schema from "not"',NUMBER_MULTIPLE_OF:"Value {value} is not a multiple of {multipleOf}",NUMBER_MINIMUM:"Value {value} is less than minimum {minimum}",NUMBER_MINIMUM_EXCLUSIVE:"Value {value} is equal to exclusive minimum {minimum}",NUMBER_MAXIMUM:"Value {value} is greater than maximum {maximum}",NUMBER_MAXIMUM_EXCLUSIVE:"Value {value} is equal to exclusive maximum {maximum}",NUMBER_NOT_A_NUMBER:"Value {value} is not a valid number",STRING_LENGTH_SHORT:"String is too short ({length} chars), minimum {minimum}",STRING_LENGTH_LONG:"String is too long ({length} chars), maximum {maximum}",STRING_PATTERN:"String does not match pattern: {pattern}",OBJECT_PROPERTIES_MINIMUM:"Too few properties defined ({propertyCount}), minimum {minimum}",OBJECT_PROPERTIES_MAXIMUM:"Too many properties defined ({propertyCount}), maximum {maximum}",OBJECT_REQUIRED:"Missing required property: {key}",OBJECT_ADDITIONAL_PROPERTIES:"Additional properties not allowed",OBJECT_DEPENDENCY_KEY:"Dependency failed - key must exist: {missing} (due to key: {key})",ARRAY_LENGTH_SHORT:"Array is too short ({length}), minimum {minimum}",ARRAY_LENGTH_LONG:"Array is too long ({length}), maximum {maximum}",ARRAY_UNIQUE:"Array items are not unique (indices {match1} and {match2})",ARRAY_ADDITIONAL_ITEMS:"Additional items not allowed",FORMAT_CUSTOM:"Format validation failed ({message})",KEYWORD_CUSTOM:"Keyword failed: {key} ({message})",CIRCULAR_REFERENCE:"Circular $refs: {urls}",UNKNOWN_PROPERTY:"Unknown property (not in schema)"};h.prototype=Object.create(Error.prototype),h.prototype.constructor=h,h.prototype.name="ValidationError",h.prototype.prefixWith=function(e,r){if(null!==e&&(e=e.replace(/~/g,"~0").replace(/\//g,"~1"),this.dataPath="/"+e+this.dataPath),null!==r&&(r=r.replace(/~/g,"~0").replace(/\//g,"~1"),this.schemaPath="/"+r+this.schemaPath),null!==this.subErrors)for(var t=0;t<this.subErrors.length;t++)this.subErrors[t].prefixWith(e,r);return this};var P={},_=f();return _.addLanguage("en-gb",O),_.tv4=_,_});