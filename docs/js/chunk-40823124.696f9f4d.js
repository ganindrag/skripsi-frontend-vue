(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-40823124"],{"0752":function(t,e,a){"use strict";a.r(e);var r=function(){var t,e=this,a=e.$createElement,r=e._self._c||a;return r("div",[e._m(0),r("a-form",{attrs:{layout:"inline",form:e.form,hideRequiredMark:!0},on:{submit:e.handleSubmit}},[r("a-form-item",{attrs:{label:"Laporan Aktifitas Programmer"}},[r("a-select",{directives:[{name:"decorator",rawName:"v-decorator",value:["programmer_id",{rules:[{required:!0,message:"Nama Programmer harus diisi"}]}],expression:"['programmer_id', {rules: [{ required: true, message: 'Nama Programmer harus diisi'}]}]"}],staticStyle:{width:"300px"}},e._l(e.tugas.dataProgrammer,(function(t){return r("a-select-option",{key:t.id+t.name,attrs:{value:t.id}},[e._v(e._s(t.name))])})),1)],1),r("a-form-item",{attrs:{label:"Bulan"}},[r("a-month-picker",{directives:[{name:"decorator",rawName:"v-decorator",value:["month",{initialValue:e.moment()}],expression:"['month', { initialValue: moment() }]"}],attrs:{format:"MMMM YYYY",allowClear:!1}})],1),r("a-form-item",[r("a-button",{attrs:{type:"primary","html-type":"submit"}},[e._v(" Cari ")])],1),r("div",{directives:[{name:"show",rawName:"v-show",value:e.report.length>0,expression:"report.length > 0"}],class:(t={},t[e.$style.grade]=!0,t[e.$style[e.grade.grade]]=!0,t[e.$style.uneval]=e.grade.hasUnEvaluated,t),on:{click:function(t){e.grade.hasUnEvaluated&&e.toEvaluation}}},[""!==e.grade.grade?r("span",{staticClass:"text-dark"},[e._v(e._s(e.grade.numberGrade&&e.grade.numberGrade.toFixed(0))+" / "),r("span",{staticClass:"font-weight-bold"},[e._v(e._s(e.grade.grade))])]):r("span",{staticClass:"text-light"},[e._v("nihil")])])],1),r("a-divider"),e.report.length>0?r("div",{class:e.$style.container},e._l(e.arrDate,(function(t,a){return r("div",{key:a,class:e.$style.col,style:{zIndex:t.zIndex}},[r("div",{class:e.$style.colhead},[e._v(e._s(e.formatDate(a)))]),e._l(t.data,(function(t,n){var i;return r("div",{key:a+n,class:(i={invisible:t.null},i[e.$style.tugas]=!0,i),style:{width:(t.null?100:100*t.workdate)-20+"px",overflow:"hidden"}},[r("a-tooltip",[r("template",{slot:"title"},[e._v(" "+e._s(t.null?"hidden":t.name)+" ")]),e._v(" "+e._s(t.null?"hidden":t.name)+" ")],2)],1)}))],2)})),0):r("a-empty")],1)},n=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"kit__utils__heading"},[a("h5",[t._v("Laporan Tugas Programmer")])])}],i=a("c9e9"),o=a("f3f3"),s=a("2f62"),d=a("71e8"),l=a("1e9a"),u=a("56cd"),c=a("7f45"),f=a.n(c),m=a("41cb"),v={month:f()().format("MMMM YYYY")},g={data:function(){return{form:this.$form.createForm(this,{initialValue:v}),dataFilter:v,arrDate:Object(d["a"])(v.start_at,v.end_at),startAt:v.start_at,endAt:v.end_at}},created:function(){console.log(this.report)},beforeCreate:function(){this.$store.dispatch("tugas/LOAD_DATA_PROGRAMMER",{payload:!1})},beforeDestroy:function(){this.$store.dispatch("tugas/RESET_DATA_REPORT",{payload:!1})},watch:{"$store.state.tugas.report":function(){console.log(this.arrDate);var t=new Date(f.a.utc(this.endAt).format("YYYY-MM-DD"));Object(l["a"])(this.report,this.arrDate,t)}},computed:Object(o["a"])(Object(o["a"])({},Object(s["b"])(["tugas"])),{},{report:function(){return this.$store.state.tugas.report.data},grade:function(){var t=this.$store.state.tugas.report,e=(t.data,Object(i["a"])(t,["data"]));return e}}),methods:{moment:function(){return f()()},formatDate:function(t){return f()(+t).format("DD MMM YYYY")},toEvaluation:function(){m["a"].push("/evaluasi")},handleSubmit:function(t){var e=this;t.preventDefault(),this.form.validateFields((function(t,a){if(t)u["a"].warning({message:t});else{console.log(a);var r=a.month.startOf("month").format("YYYY-MM-DD"),n=a.month.endOf("month").format("YYYY-MM-DD"),i=a.programmer_id;e.startAt=r,e.endAt=n,e.arrDate=Object(d["a"])(r,n),e.$store.dispatch("tugas/LOAD_DATA_REPORT",{payload:{start_at:r,end_at:n,prog_id:i}})}}))}}},h=g,_=a("2eb4"),p=a("2877");function D(t){this["$style"]=_["default"].locals||_["default"]}var b=Object(p["a"])(h,r,n,!1,D,null,null);e["default"]=b.exports},"1e9a":function(t,e,a){"use strict";a.d(e,"a",(function(){return d}));a("4de4"),a("c740");var r=a("f3f3"),n=(a("a4d3"),a("e01a"),a("d28b"),a("e260"),a("d3b7"),a("3ca3"),a("ddb0"),a("dde1"));function i(t,e){var a;if("undefined"===typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(a=Object(n["a"])(t))||e&&t&&"number"===typeof t.length){a&&(t=a);var r=0,i=function(){};return{s:i,n:function(){return r>=t.length?{done:!0}:{done:!1,value:t[r++]}},e:function(t){throw t},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,s=!0,d=!1;return{s:function(){a=t[Symbol.iterator]()},n:function(){var t=a.next();return s=t.done,t},e:function(t){d=!0,o=t},f:function(){try{s||null==a["return"]||a["return"]()}finally{if(d)throw o}}}}var o=a("7f45"),s=a.n(o),d=function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],n=arguments.length>2?arguments[2]:void 0,o=arguments.length>3?arguments[3]:void 0,d=e;o&&(d=e.filter((function(t){var e=new Date(s.a.utc(t.start_at).format("YYYY-MM-DD"));return e.getTime()>=o.getTime()&&!t.placed})));var l,u=new Date(s()().startOf("month").format("YYYY-MM-DD")),c=new Date(s()().endOf("month").format("YYYY-MM-DD")),f=i(d);try{for(f.s();!(l=f.n()).done;){var m=l.value;if(!m.placed){var v=new Date(s.a.utc(m.start_at).format("YYYY-MM-DD")),g=void 0;g=m.end_at?new Date(s.a.utc(m.end_at).format("YYYY-MM-DD")):v.getTime()<u.getTime()?n:v.getTime()>c.getTime()?v:new Date;for(var h=g.getDate()-v.getDate(),_=0;_<=h;_++)0!==_?(v.setDate(v.getDate()+1),a[v.getTime()].data.push({id:m.id,workdate:h+1,null:!0})):a[v.getTime()].data.push(Object(r["a"])(Object(r["a"])({},m),{},{workdate:h+1,null:!1}));m.placed=!0;for(var p=n.getDate()-g.getDate(),D=function(){var r=new Date(s.a.utc(m.start_at).format("YYYY-MM-DD"));if(r.setDate(g.getDate()+b),a[v.getTime()].data.length-a[r.getTime()].data.length===1){var i=e.findIndex((function(t){var e=new Date(s.a.utc(t.start_at).format("YYYY-MM-DD"));return e.getTime()===r.getTime()&&!t.placed}));if(-1!==i){var o=new Date(s.a.utc(e[i].start_at).format("YYYY-MM-DD"));return t(e,a,n,o),"break"}}},b=1;b<=p;b++){var Y=D();if("break"===Y)break}if(o)break}}}catch(y){f.e(y)}finally{f.f()}}},"2eb4":function(t,e,a){"use strict";var r=a("e09c"),n=a.n(r);e["default"]=n.a},c740:function(t,e,a){"use strict";var r=a("23e7"),n=a("b727").findIndex,i=a("44d2"),o=a("ae40"),s="findIndex",d=!0,l=o(s);s in[]&&Array(1)[s]((function(){d=!1})),r({target:"Array",proto:!0,forced:d||!l},{findIndex:function(t){return n(this,t,arguments.length>1?arguments[1]:void 0)}}),i(s)},c9e9:function(t,e,a){"use strict";a.d(e,"a",(function(){return n}));a("a4d3"),a("c975"),a("b64b");function r(t,e){if(null==t)return{};var a,r,n={},i=Object.keys(t);for(r=0;r<i.length;r++)a=i[r],e.indexOf(a)>=0||(n[a]=t[a]);return n}function n(t,e){if(null==t)return{};var a,n,i=r(t,e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);for(n=0;n<o.length;n++)a=o[n],e.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(t,a)&&(i[a]=t[a])}return i}},e09c:function(t,e,a){t.exports={container:"index_container_3zxI4",col:"index_col_24M9Q",colhead:"index_colhead_VVgKB",tugas:"index_tugas_36PwB",grade:"index_grade_aHZ7k",A:"index_A_3S_Ev",B:"index_B_fxZNI",C:"index_C_a18JH",D:"index_D_12T9m",E:"index_E_2SnN_",uneval:"index_uneval_1xSWq"}}}]);
//# sourceMappingURL=chunk-40823124.696f9f4d.js.map