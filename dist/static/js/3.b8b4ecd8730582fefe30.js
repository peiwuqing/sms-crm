webpackJsonp([3],{QIjf:function(t,e){},VSCa:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=a("aA9S"),s=a.n(r),n={name:"tenantShow",props:{currentRow:{type:Object},isVisible:!1},components:{},computed:{},data:function(){return{isShow:!1}},filters:{status:function(t){return 1==t?"正常":2==t?"待审核":3==t?"审核拒绝":void 0}},watch:{isVisible:function(t){this.isShow=t}},methods:{close:function(){this.$emit("event",{cmd:"closeShow"})},open:function(){}}},o={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-drawer",{attrs:{title:"模板详情",visible:t.isShow,size:"50%",wrapperClosable:!1,"destroy-on-close":""},on:{"update:visible":function(e){t.isShow=e},close:t.close,opened:t.open}},[a("div",[a("el-form",{attrs:{size:"small","label-width":"120px"}},[a("el-form-item",{attrs:{label:"客户名称:"}},[t._v("\n        "+t._s(t.currentRow.customerName)+"\n      ")]),t._v(" "),a("el-form-item",{attrs:{label:"模板ID:"}},[t._v("\n        "+t._s(t.currentRow.templateId)+"\n      ")]),t._v(" "),a("el-form-item",{attrs:{label:"模板标题:"}},[t._v("\n        "+t._s(t.currentRow.title)+"\n      ")]),t._v(" "),a("el-form-item",{attrs:{label:"模板类型:"}},[t._v("\n        "+t._s(1==t.currentRow.type?"通知类":"营销类")+"\n      ")]),t._v(" "),a("el-form-item",{attrs:{label:"模板内容:"}},[t._v("\n        "+t._s(t.currentRow.content)+"\n      ")]),t._v(" "),a("el-form-item",{attrs:{label:"模板签名:"}},[t._v("\n        【"+t._s(t.currentRow.signDesc)+"】\n      ")]),t._v(" "),a("el-form-item",{attrs:{label:"审核人:"}},[t._v("\n        "+t._s(t.currentRow.auditUserDesc)+"\n      ")]),t._v(" "),3==t.currentRow.status?a("el-form-item",{attrs:{label:"审核人:"}},[t._v("\n        "+t._s(t.currentRow.remark)+"\n      ")]):t._e(),t._v(" "),a("el-form-item",{attrs:{label:"状态:"}},[t._v("\n        "+t._s(t._f("status")(t.currentRow.status))+"\n      ")]),t._v(" "),a("el-form-item",{attrs:{label:"创建时间:"}},[t._v("\n        "+t._s(t._f("formatDate")(t.currentRow.createdAt))+"\n      ")]),t._v(" "),a("el-form-item",{attrs:{label:"最后更新时间:"}},[t._v("\n        "+t._s(t._f("formatDate")(t.currentRow.updatedAt))+"\n      ")])],1)],1)])},staticRenderFns:[]};var l=a("C7Lr")(n,o,!1,function(t){a("QIjf")},"data-v-c16f8d7a",null).exports,i=a("vLgD"),u=a("yf3K");a("IcnI");var c={name:"tenantShow",props:{currentRow:{type:Object},isVisible:!1},components:{},computed:{},data:function(){return{isShow:!1,model:{status:"1"},rules:{remark:[{required:!0,message:"拒绝原因必填",trigger:"blur"}],status:[{required:!0,message:"审核结果必选",trigger:"blur"}]}}},watch:{isVisible:function(t){this.isShow=t}},methods:{close:function(){this.$emit("event",{cmd:"closeAudit"})},submitForm:function(t){var e=this;e.model.id=e.currentRow.id,this.$refs[t].validate(function(t){if(!t)return!1;var a;(a=e.model,Object(i.a)({url:u.default.prototype.$baseUrl+"api/v1.0/template/audit",method:"post",data:a})).then(function(t){0==t.code?(e.$message.success("操作成功"),e.$emit("event",{cmd:"auditSuccess"})):e.$message.error(t.message)})})},open:function(){this.model={status:"1"}}}},m={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-drawer",{attrs:{title:"审核模板",visible:t.isShow,size:"50%",wrapperClosable:!1,"destroy-on-close":""},on:{"update:visible":function(e){t.isShow=e},close:t.close,opened:t.open}},[a("el-form",{attrs:{size:"small","label-width":"120px"}},[a("el-form-item",{attrs:{label:"客户名称:"}},[t._v("\n        "+t._s(t.currentRow.customerName)+"\n      ")]),t._v(" "),a("el-form-item",{attrs:{label:"模板ID:"}},[t._v("\n        "+t._s(t.currentRow.templateId)+"\n      ")]),t._v(" "),a("el-form-item",{attrs:{label:"模板类型:"}},[t._v("\n        "+t._s(1==t.currentRow.type?"通知类":"营销类")+"\n      ")]),t._v(" "),a("el-form-item",{attrs:{label:"短信预览:"}},[t._v("\n        "+t._s(t.currentRow.content)+"【"+t._s(t.currentRow.signDesc)+"】\n      ")])],1),t._v(" "),a("h3",{staticStyle:{margin:"20px"}},[t._v("审核")]),t._v(" "),a("el-form",{ref:"audit",attrs:{rules:t.rules,model:t.model,"label-width":"150px"}},[a("el-form-item",{attrs:{label:"审核结果",prop:"status"}},[a("el-radio-group",{model:{value:t.model.status,callback:function(e){t.$set(t.model,"status",e)},expression:"model.status"}},[a("el-radio-button",{attrs:{label:"1"}},[t._v("通过")]),t._v(" "),a("el-radio-button",{attrs:{label:"3"}},[t._v("不通过")])],1)],1),t._v(" "),3==t.model.status?a("el-form-item",{attrs:{label:"拒绝原因",prop:"remark"}},[a("el-input",{attrs:{type:"textarea",maxlength:"255",placeholder:"请输入拒绝原因，不能超过255个字符"},model:{value:t.model.remark,callback:function(e){t.$set(t.model,"remark",e)},expression:"model.remark"}})],1):t._e()],1),t._v(" "),a("div",{staticClass:"drawer-footer"},[a("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(e){return t.submitForm("audit")}}},[a("i",{staticClass:"fa fa-check"}),t._v("提交")])],1)],1)},staticRenderFns:[]};var d={name:"templates",components:{show:l,audit:a("C7Lr")(c,m,!1,function(t){a("yHtW")},"data-v-27c86850",null).exports},data:function(){return{query:{},columns:[{prop:"customerName",width:"160",label:"客户名称",fixed:"left",align:"center"},{prop:"title",width:"160",label:"模板标题",align:"center"},{prop:"status",label:"类型",width:"80",align:"center",formatter:function(t,e,a){return 1==a?"通知类":2==a?"营销类":void 0}},{prop:"content",label:"模板内容",width:"200",align:"center",showTooltip:!0},{prop:"status",label:"状态",width:"80",align:"center",formatter:function(t,e,a){return 1==a?"正常":2==a?"待审核":3==a?"审核失败":void 0}},{prop:"auditUserDesc",label:"审核人",align:"center"},{prop:"createdAt",label:"创建时间",width:"190",align:"center",formatter:function(t,e,a){return new $day(a).format("YYYY-MM-DD HH:mm:ss")}}],openShow:!1,auditShow:!1,tableData:[],page:{pageNo:1,pageSize:10,total:0},currentRow:{}}},mounted:function(){this.queryData()},methods:{toShow:function(t){this.currentRow=t,this.openShow=!0},toAudit:function(t){this.currentRow=t,this.auditShow=!0},deleteRow:function(t){var e=this;e.$confirm("是否确认删除模板，删除后此模板短信将不可发送?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){var a;(a=t,Object(i.a)({url:u.default.prototype.$baseUrl+"api/v1.0/template/"+a.id,method:"delete"})).then(function(t){0==t.code?(e.$message.success("删除成功"),e.queryData()):e.$message.error(t.message)})})},queryData:function(){var t,e=this;(t=this.$nullParam(s()(e.query,e.page)),Object(i.a)({url:u.default.prototype.$baseUrl+"api/v1.0/template/pager",method:"get",params:t})).then(function(t){0==t.code?(e.tableData=t.data.data,e.page.total=t.data.totalRows):e.$message.error("获取数据失败")})},onEvent:function(t){"closeShow"==t.cmd?this.openShow=!1:"closeAudit"==t.cmd?this.auditShow=!1:"auditSuccess"==t.cmd&&(this.auditShow=!1,this.queryData())},handleSizeChange:function(t){this.page.pageSize=t,this.queryData()},handleCurrentChange:function(t){this.page.pageNo=t,this.queryData()}}},p={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"query-item-form"},[a("div",{staticClass:"query-item"},[a("div",{staticClass:"label"},[t._v("模板标题:")]),t._v(" "),a("div",{staticClass:"items"},[a("el-input",{attrs:{clearable:"",placeholder:"模板标题"},model:{value:t.query.title,callback:function(e){t.$set(t.query,"title",e)},expression:"query.title"}})],1)]),t._v(" "),a("div",{staticClass:"query-item"},[a("div",{staticClass:"label"},[t._v("客户名称:")]),t._v(" "),a("div",{staticClass:"items"},[a("el-input",{attrs:{clearable:"",placeholder:"客户名称"},model:{value:t.query.customerName,callback:function(e){t.$set(t.query,"customerName",e)},expression:"query.customerName"}})],1)]),t._v(" "),a("div",{staticClass:"query-item"},[a("div",{staticClass:"label"},[t._v("状态:")]),t._v(" "),a("div",{staticClass:"items"},[a("el-select",{staticStyle:{width:"100%"},attrs:{clearable:"",filterable:"",placeholder:"状态"},model:{value:t.query.status,callback:function(e){t.$set(t.query,"status",e)},expression:"query.status"}},[a("el-option",{attrs:{value:"1",label:"正常"}}),t._v(" "),a("el-option",{attrs:{value:"2",label:"待审核"}}),t._v(" "),a("el-option",{attrs:{value:"3",label:"审核不通过"}})],1)],1)]),t._v(" "),a("div",{staticClass:"buttons"},[a("el-button",{attrs:{size:"small",type:"primary"},on:{click:function(e){t.page.pageNo=1,t.queryData()}}},[a("i",{staticClass:"fa fa-search"}),t._v("查询")]),t._v(" "),a("el-button",{attrs:{size:"small",type:"success"},on:{click:function(e){return t.toAdd()}}},[a("i",{staticClass:"fa fa-plus"}),t._v("新增")])],1)]),t._v(" "),a("common-table",{attrs:{columns:t.columns,data:t.tableData,pager:t.page},on:{handleSizeChange:t.handleSizeChange,handleCurrentChange:t.handleCurrentChange}},[a("el-table-column",{attrs:{slot:"table_operation",align:"center",fixed:"right",label:"操作",width:"180",resizable:!1},slot:"table_operation",scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{size:"small",type:"text"},on:{click:function(a){return t.toShow(e.row)}}},[t._v("详情")]),t._v(" "),2==e.row.status?a("el-button",{attrs:{size:"small",type:"text"},on:{click:function(a){return t.toAudit(e.row)}}},[t._v("审核")]):t._e(),t._v(" "),a("el-button",{attrs:{size:"small",type:"text"},on:{click:function(a){return t.deleteRow(e.row)}}},[t._v("删除")])]}}])})],1),t._v(" "),a("show",{attrs:{"current-row":t.currentRow,"is-visible":t.openShow},on:{event:t.onEvent}}),t._v(" "),a("audit",{attrs:{"current-row":t.currentRow,"is-visible":t.auditShow},on:{event:t.onEvent}})],1)},staticRenderFns:[]};var v=a("C7Lr")(d,p,!1,function(t){a("weUO")},"data-v-1ed454e6",null);e.default=v.exports},weUO:function(t,e){},yHtW:function(t,e){}});
//# sourceMappingURL=3.b8b4ecd8730582fefe30.js.map