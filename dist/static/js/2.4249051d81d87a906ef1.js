webpackJsonp([2],{"8qN+":function(e,t){},EKFn:function(e,t){},"Gw/i":function(e,t){},ImEA:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=r("aA9S"),n=r.n(s),a=r("BtRb"),i={name:"userAdd",props:{tree:{type:Array},userPList:{type:Array},isVisible:!1},data:function(){return{roles:[],isShow:!1,treeCheck:{checkedKeys:"",checkedId:"",data:{}},user:{},defaultProps:{children:"children",label:"name"},rules:{deviceNo:[{required:!1,validator:function(e,t,r){t&&""!=t&&((t+"").length<4||(t+"").length>8)?r(new Error("分机号长度只能在4-8之间")):r()},trigger:"blur"}],phone:[{type:"string",message:"请填写正确的手机号",required:!1,pattern:/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/}],realName:[{required:!0,message:"姓名必填",trigger:"blur"}],email:[{type:"email",message:"请输入正确的邮箱地址",trigger:"blur,change"}],organId:[{required:!0,message:"部门必选",trigger:"blur"}],username:[{required:!0,validator:function(e,t,r){if(""==t)r(new Error("用户名必填"));else{var s={username:t};Object(a.e)(s).then(function(e){0==e.code&&e.data?r():r(new Error("用户名重复"))})}},trigger:"blur"}],staffNo:[{required:!0,validator:function(e,t,r){var s={staffNo:t};t&&""!=t?Object(a.d)(s).then(function(e){0==e.code&&e.data?r():r(new Error("工号重复"))}):r()},trigger:"blur"}],password:[{required:!0,message:"密码必填",trigger:"blur"}],roleIds:[{required:!0,message:"角色必选",trigger:"blur"}]}}},watch:{isVisible:function(e){this.isShow=e}},methods:{open:function(){var e=this;Object(a.n)({pageNo:1,pageSize:999}).then(function(t){e.roles=t.data.data})},close:function(){this.roles=[],this.user={},this.treeCheck={checkedKeys:"",checkedId:"",data:{}},this.$emit("event",{cmd:"closeAdd"})},changeChecked:function(e,t,r){this.treeCheck.checkedKeys=e.id,1==t?(this.treeCheck.checkedId=e.id,this.$refs.organTree.setCheckedKeys([e.id]),this.treeCheck.data=e):this.treeCheck.checkedId==e.id&&this.$refs.organTree.setCheckedKeys([e.id]),this.treeCheck.checkedId&&(this.user.organId=this.treeCheck.checkedId)},clickChecked:function(e,t,r){this.treeCheck.checkedId=e.id,this.$refs.organTree.setCheckedKeys([e.id]),this.treeCheck.checkedId&&(this.user.organId=this.treeCheck.checkedId)},submitForm:function(e){var t=this;t.$refs[e].validate(function(r){if(!r)return!1;Object(a.c)(t.user).then(function(r){0==r.code?(t.$message.success("添加成功"),t.resetForm(e),t.$emit("event",{cmd:"addSuccess"})):t.$message.error(r.message)})})},resetForm:function(e){this.$refs[e].resetFields()},selectionTree:function(){this.$refs.organTree.getCheckedNodes(!1,!0)}}},o={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("el-drawer",{attrs:{title:"添加用户",visible:e.isShow,size:"60%",wrapperClosable:!1,"destroy-on-close":""},on:{"update:visible":function(t){e.isShow=t},close:e.close,opened:e.open}},[r("div",[r("el-form",{ref:"users",attrs:{rules:e.rules,model:e.user,"label-width":"80px"}},[r("el-form-item",{attrs:{label:"用户名",prop:"username"}},[r("el-input",{attrs:{maxlength:"16",placeholder:"用户登录名"},model:{value:e.user.username,callback:function(t){e.$set(e.user,"username",t)},expression:"user.username"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"密码",prop:"password"}},[r("el-input",{attrs:{"show-password":"",placeholder:"密码"},model:{value:e.user.password,callback:function(t){e.$set(e.user,"password",t)},expression:"user.password"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"姓名",prop:"realName"}},[r("el-input",{attrs:{maxlength:"16",placeholder:"用户姓名"},model:{value:e.user.realName,callback:function(t){e.$set(e.user,"realName",t)},expression:"user.realName"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"手机号",prop:"phone"}},[r("el-input",{attrs:{maxlength:"11",onkeyup:"value=value.replace(/[^\\d]/g,'')",placeholder:"手机号"},model:{value:e.user.phone,callback:function(t){e.$set(e.user,"phone",t)},expression:"user.phone"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"角色",prop:"roleIds"}},[r("el-select",{staticStyle:{width:"100%"},attrs:{multiple:""},model:{value:e.user.roleIds,callback:function(t){e.$set(e.user,"roleIds",t)},expression:"user.roleIds"}},e._l(e.roles,function(e){return r("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})}),1)],1)],1),e._v(" "),r("span",{staticClass:"drawer-footer"},[r("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(t){return e.submitForm("users")}}},[e._v("提交")])],1)],1)])},staticRenderFns:[]};var l=r("C7Lr")(i,o,!1,function(e){r("NcVn")},null,null).exports,c={name:"userEdit",props:{tree:{type:Array},userPList:{type:Array},user:{type:Object},isVisible:!1},data:function(){var e=this;return{roles:[],isShow:!1,treeCheck:{checkedKeys:"",checkedId:"",data:{}},defaultProps:{children:"children",label:"name"},rules:{deviceNo:[{required:!1,validator:function(e,t,r){t&&""!=t&&((t+"").length<4||(t+"").length>8)?r(new Error("分机号长度只能在4-8之间")):r()},trigger:"blur"}],phone:[{type:"string",message:"请填写正确的手机号",required:!1,pattern:/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/}],username:[{required:!0,validator:function(t,r,s){""==r&&s(new Error("用户名必填"));var n={username:r,id:e.user.id};Object(a.e)(n).then(function(e){0==e.code&&e.data?s():s(new Error("用户名重复"))})},trigger:"blur"}],password:[{required:!0,message:"密码必填",trigger:"blur"}],roleIds:[{required:!0,message:"角色必选",trigger:"blur"}]}}},watch:{isVisible:function(e){this.isShow=e}},methods:{open:function(){var e=this;Object(a.n)({pageNo:1,pageSize:999}).then(function(t){e.roles=t.data.data})},close:function(){this.$emit("event",{cmd:"closeEdit"})},changeChecked:function(e,t,r){this.treeCheck.checkedKeys=e.id,1==t?(this.treeCheck.checkedId=e.id,this.$refs.organTree.setCheckedKeys([e.id]),this.treeCheck.data=e):this.treeCheck.checkedId==e.id&&this.$refs.organTree.setCheckedKeys([e.id]),this.treeCheck.checkedId&&(this.user.organId=this.treeCheck.checkedId)},clickChecked:function(e,t,r){this.treeCheck.checkedId=e.id,this.$refs.organTree.setCheckedKeys([e.id]),this.treeCheck.checkedId&&(this.user.organId=this.treeCheck.checkedId)},submitForm:function(e){var t=this;t.$refs[e].validate(function(e){if(!e)return!1;Object(a.k)(t.user).then(function(e){0==e.code?(t.$message.success("更新成功"),t.$emit("event",{cmd:"editSuccess"})):t.$message.error(e.message)})})},selectionTree:function(){this.$refs.organTree.setChecked(this.user.organId,!0)}}},d={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("el-drawer",{attrs:{title:"编辑用户",visible:e.isShow,size:"60%",wrapperClosable:!1,"destroy-on-close":""},on:{"update:visible":function(t){e.isShow=t},close:e.close,opened:e.open}},[r("div",[r("el-form",{ref:"usersEdit",attrs:{rules:e.rules,model:e.user,"label-width":"80px"}},[r("el-form-item",{attrs:{label:"用户名",prop:"username"}},[r("el-input",{attrs:{maxlength:"16",placeholder:"用户登录名"},model:{value:e.user.username,callback:function(t){e.$set(e.user,"username",t)},expression:"user.username"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"密码",prop:"password"}},[r("el-input",{attrs:{"show-password":"",placeholder:"密码"},model:{value:e.user.password,callback:function(t){e.$set(e.user,"password",t)},expression:"user.password"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"姓名",prop:"realName"}},[r("el-input",{attrs:{maxlength:"16",placeholder:"用户姓名"},model:{value:e.user.realName,callback:function(t){e.$set(e.user,"realName",t)},expression:"user.realName"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"手机号",prop:"phone"}},[r("el-input",{attrs:{onkeyup:"value=value.replace(/[^\\d]/g,'')",maxlength:"11",placeholder:"手机号"},model:{value:e.user.phone,callback:function(t){e.$set(e.user,"phone",t)},expression:"user.phone"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"角色",prop:"roleIds"}},[r("el-select",{staticStyle:{width:"100%"},attrs:{multiple:""},model:{value:e.user.roleIds,callback:function(t){e.$set(e.user,"roleIds",t)},expression:"user.roleIds"}},e._l(e.roles,function(e){return r("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})}),1)],1)],1)],1),e._v(" "),r("span",{staticClass:"drawer-footer"},[r("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(t){return e.submitForm("usersEdit")}}},[e._v("提交")])],1)])},staticRenderFns:[]};var u=r("C7Lr")(c,d,!1,function(e){r("Gw/i")},null,null).exports,h={name:"userShow",props:{user:{type:Object},isVisible:!1},computed:{status:function(){var e=this.user.status;return 1==e?"可用":0==e?"删除":2==e?"禁用":3==e?"离职":void 0}},data:function(){return{isShow:!1,treeCheck:{checkedKeys:"",checkedId:"",data:{}},defaultProps:{children:"children",label:"name"}}},watch:{isVisible:function(e){this.isShow=e}},methods:{close:function(){this.$emit("event",{cmd:"closeShow"})},deleteUser:function(e){var t=this;t.$confirm("是否确认删除用户?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){Object(a.h)(t.user.id).then(function(e){0==e.code?(t.$message.success("删除成功"),t.$emit("event",{cmd:"delete"})):t.$message.error(e.message)})})},toEdit:function(){this.$emit("event",{cmd:"edit"})}}},p={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("el-drawer",{attrs:{title:"查看用户",visible:e.isShow,size:"60%",wrapperClosable:!1,"destroy-on-close":""},on:{"update:visible":function(t){e.isShow=t},close:e.close}},[r("div",[r("el-form",{attrs:{"label-width":"120px"}},[r("el-form-item",{attrs:{label:"用户名",prop:"username"}},[e._v("\n        "+e._s(e.user.username)+"\n      ")]),e._v(" "),r("el-form-item",{attrs:{label:"姓名",prop:"realName"}},[e._v("\n        "+e._s(e.user.realName)+"\n      ")]),e._v(" "),r("el-form-item",{attrs:{label:"手机号",prop:"phone"}},[e._v("\n        "+e._s(e.user.phone)+"\n      ")]),r("el-form-item",{attrs:{label:"状态",prop:"phone"}},[e._v("\n        "+e._s(e.status)+"\n      ")]),e._v(" "),r("el-form-item",{attrs:{label:"角色",prop:"roleIds"}},[e._v("\n        "+e._s(e.user.roleNames)+"\n      ")])],1)],1),e._v(" "),r("span",{staticClass:"drawer-footer"},[r("el-button",{attrs:{size:"small",type:"primary"},on:{click:e.toEdit}},[e._v("编辑")]),e._v(" "),r("el-button",{attrs:{size:"small",type:"danger"},on:{click:function(t){return e.deleteUser()}}},[e._v("删除")])],1)])},staticRenderFns:[]};var f=r("C7Lr")(h,p,!1,function(e){r("8qN+")},"data-v-25571a06",null).exports,m={name:"tree-select",model:{prop:"selecteds",event:"change"},props:{selecteds:{default:function(){}},data:{type:Array,default:function(){return[]}},defaultProps:{type:Object,default:function(){return{}}},multiple:{type:Boolean,default:function(){return!1}},clearable:{type:Boolean,default:function(){return!1}},collapseTags:{type:Boolean,default:function(){return!1}},nodeKey:{type:String,default:function(){return"id"}},checkStrictly:{type:Boolean,default:function(){return!1}},checkedKeys:{type:Array,default:function(){return[]}},size:{type:String,default:function(){return"small"}},width:{type:Number,default:function(){return 250}},height:{type:Number,default:function(){return 300}}},data:function(){return{isShowSelect:!1,options:[],selectedData:[],style:"width:"+this.width-20+"px;height:"+this.height+"px;",selectStyle:"width:100%;",checkedIds:[],checkedData:[]}},mounted:function(){this.initCheckedData()},methods:{setSelectOption:function(e){var t={};t.value=e.key,t.label=e.label,this.options=[],this.options.push(t),this.selectedData=e.key},checkSelectedNode:function(e){var t=e[0];this.$refs.tree.setCurrentKey(t);var r=this.$refs.tree.getNode(t);this.setSelectOption(r)},checkSelectedNodes:function(e){this.$refs.tree.setCheckedKeys(e)},clearSelectedNode:function(){this.selectedData="",this.$refs.tree.setCurrentKey(null)},clearSelectedNodes:function(){for(var e=this.$refs.tree.getCheckedKeys(),t=0;t<e.length;t++)this.$refs.tree.setChecked(e[t],!1)},initCheckedData:function(){this.multiple?this.checkedKeys.length>0?this.checkSelectedNodes(this.checkedKeys):this.clearSelectedNodes():this.checkedKeys.length>0?this.checkSelectedNode(this.checkedKeys):this.clearSelectedNode()},popoverHide:function(){this.multiple?(this.checkedIds=this.$refs.tree.getCheckedKeys(),this.checkedData=this.$refs.tree.getCheckedNodes()):(this.checkedIds=this.$refs.tree.getCurrentKey(),this.checkedData=this.$refs.tree.getCurrentNode()),this.$emit("popoverHide",this.checkedIds,this.checkedData)},handleNodeClick:function(e,t){this.multiple||(this.setSelectOption(t),this.isShowSelect=!this.isShowSelect,this.$emit("change",this.selectedData))},handleCheckChange:function(){var e=this,t=this.$refs.tree.getCheckedKeys();this.options=t.map(function(t){var r=e.$refs.tree.getNode(t),s={};return s.value=r.key,s.label=r.label,s}),this.selectedData=this.options.map(function(e){return e.value}),this.$emit("change",this.selectedData)},removeSelectedNodes:function(e){var t=this;this.$refs.tree.setChecked(e,!1);var r=this.$refs.tree.getNode(e);!this.checkStrictly&&r.childNodes.length>0&&(this.treeToList(r).map(function(e){e.childNodes.length<=0&&t.$refs.tree.setChecked(e,!1)}),this.handleCheckChange()),this.$emit("change",this.selectedData)},treeToList:function(e){var t=[],r=[];for(t=t.concat(e);t.length;){var s=t.shift();s.childNodes&&(t=t.concat(s.childNodes)),r.push(s)}return r},removeSelectedNode:function(){this.clearSelectedNode(),this.$emit("change",this.selectedData)},changeSelectedNodes:function(e){this.multiple&&e.length<=0&&this.clearSelectedNodes(),this.selecteds=this.selectedData,this.$emit("change",this.selectedData)}},watch:{isShowSelect:function(e){this.$refs.select.blur()},checkedKeys:function(e){var t=this;e&&(this.checkedKeys=e,this.initCheckedData(),e.length>1&&setTimeout(function(){t.options=e.map(function(e){var r=t.$refs.tree.getNode(e),s={};return s.value=r.key,s.label=r.label,s}),t.selectedData=t.options.map(function(e){return e.value})},500))}}},v={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("div",{directives:[{name:"show",rawName:"v-show",value:e.isShowSelect,expression:"isShowSelect"}],staticClass:"mask",on:{click:function(t){e.isShowSelect=!e.isShowSelect}}}),e._v(" "),r("el-popover",{attrs:{placement:"bottom-start",width:e.width,trigger:"manual"},on:{hide:e.popoverHide},model:{value:e.isShowSelect,callback:function(t){e.isShowSelect=t},expression:"isShowSelect"}},[r("el-tree",{ref:"tree",staticClass:"common-tree",style:e.style,attrs:{data:e.data,props:e.defaultProps,"show-checkbox":e.multiple,"node-key":e.nodeKey,"check-strictly":e.checkStrictly,"default-expand-all":"","expand-on-click-node":!1,"check-on-click-node":e.multiple,"highlight-current":!0},on:{"node-click":e.handleNodeClick,"check-change":e.handleCheckChange}}),e._v(" "),r("el-select",{ref:"select",staticClass:"tree-select",style:e.selectStyle,attrs:{slot:"reference",size:e.size,multiple:e.multiple,clearable:e.clearable,"collapse-tags":e.collapseTags},on:{"remove-tag":e.removeSelectedNodes,clear:e.removeSelectedNode,change:e.changeSelectedNodes},nativeOn:{click:function(t){e.isShowSelect=!e.isShowSelect}},slot:"reference",model:{value:e.selectedData,callback:function(t){e.selectedData=t},expression:"selectedData"}},e._l(e.options,function(e){return r("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1)],1)],1)},staticRenderFns:[]};var g={name:"users",components:{add:l,edit:u,show:f,"input-tree":r("C7Lr")(m,v,!1,function(e){r("EKFn")},"data-v-c2263460",null).exports},data:function(){return{query:{type:"1"},columns:[{prop:"realName",label:"姓名",width:"80",align:"center"},{prop:"username",label:"用户名",align:"center"},{prop:"phone",label:"手机号",align:"center"},{prop:"status",label:"状态",align:"center",formatter:function(e,t,r){return 0==r?"已删除":1==r?"可用":2==r?"禁用":3==r?"已离职":void 0}},{prop:"createdAt",label:"创建时间",align:"center",formatter:function(e,t,r){return new $day(r).format("YYYY-MM-DD HH:mm:ss")}}],defaultProps:{children:"children",label:"name"},roles:[],addShow:!1,openShow:!1,editShow:!1,itemShow:!1,tableData:[],userPList:[],page:{pageNo:1,pageSize:10,total:0},tree:[],currentRow:{}}},mounted:function(){this.queryData()},methods:{toAdd:function(){this.addShow=!0},toEdit:function(e){var t=this;Object(a.o)(e.id).then(function(e){t.currentRow=e.data,t.editShow=!0})},deleteUser:function(e){var t=this;t.$confirm("是否确认删除用户?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){Object(a.h)(e.id).then(function(e){0==e.code?(t.$message.success("删除成功"),t.queryData()):t.$message.error(e.message)})})},toShow:function(e){var t=this;Object(a.o)(e.id).then(function(e){t.currentRow=e.data,t.openShow=!0})},queryData:function(){var e=this;Object(a.p)(e.$nullParam(n()(e.query,e.page))).then(function(t){0==t.code?(e.tableData=t.data.data,e.page.total=t.data.totalRows):e.$message.error("获取数据失败")})},selectOrgan:function(e){this.query.organId=e},toPartTime:function(e){this.currentRow=e,this.itemShow=!0},onEvent:function(e){"edit"==e.cmd?(this.editShow=!0,this.openShow=!1):"delete"==e.cmd?(this.openShow=!1,this.queryData()):"closeAdd"==e.cmd?this.addShow=!1:"closeShow"==e.cmd?this.openShow=!1:"closeEdit"==e.cmd?this.editShow=!1:"addSuccess"==e.cmd?(this.addShow=!1,this.queryData()):"editSuccess"==e.cmd?(this.editShow=!1,this.queryData()):"closeItem"==e.cmd&&(this.itemShow=!1)},handleSizeChange:function(e){this.page.pageSize=e,this.queryData()},handleCurrentChange:function(e){this.page.pageNo=e,this.queryData()},editTableData:function(e){this.openOperation(e)}}},k={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("el-form",{ref:"queryForm",staticClass:"query-form",attrs:{inline:!0,model:e.query}},[r("el-form-item",{attrs:{label:"用户名"}},[r("el-input",{attrs:{clearable:"",placeholder:"用户名"},model:{value:e.query.username,callback:function(t){e.$set(e.query,"username",t)},expression:"query.username"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"工号"}},[r("el-input",{attrs:{clearable:"",placeholder:"工号"},model:{value:e.query.staffNo,callback:function(t){e.$set(e.query,"staffNo",t)},expression:"query.staffNo"}})],1),e._v(" "),r("el-form-item",{staticStyle:{float:"right"}},[r("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(t){return e.queryData()}}},[e._v("查询")]),e._v(" "),r("el-button",{attrs:{type:"success",size:"small"},on:{click:function(t){return e.toAdd()}}},[e._v("新增")])],1)],1),e._v(" "),r("common-table",{attrs:{columns:e.columns,data:e.tableData,pager:e.page},on:{handleSizeChange:e.handleSizeChange,handleCurrentChange:e.handleCurrentChange}},[r("el-table-column",{attrs:{slot:"table_operation",align:"center",label:"操作",width:"200",resizable:!1},slot:"table_operation",scopedSlots:e._u([{key:"default",fn:function(t){return[r("el-button",{attrs:{size:"small",type:"text"},on:{click:function(r){return e.toShow(t.row)}}},[e._v("查看")]),e._v(" "),r("el-button",{attrs:{size:"small",type:"text"},on:{click:function(r){return e.toEdit(t.row)}}},[e._v("编辑")]),e._v(" "),r("el-button",{attrs:{size:"small",type:"text"},on:{click:function(r){return e.deleteUser(t.row)}}},[e._v("删除")])]}}])})],1),e._v(" "),r("add",{attrs:{tree:e.tree,userPList:e.userPList,"is-visible":e.addShow},on:{event:e.onEvent}}),e._v(" "),r("edit",{attrs:{"is-visible":e.editShow,userPList:e.userPList,tree:e.tree,user:e.currentRow},on:{event:e.onEvent}}),e._v(" "),r("show",{attrs:{user:e.currentRow,"is-visible":e.openShow},on:{event:e.onEvent}})],1)},staticRenderFns:[]},b=r("C7Lr")(g,k,!1,null,null,null);t.default=b.exports},NcVn:function(e,t){}});
//# sourceMappingURL=2.4249051d81d87a906ef1.js.map