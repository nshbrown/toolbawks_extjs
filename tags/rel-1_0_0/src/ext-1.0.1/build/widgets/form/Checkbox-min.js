/*
 * Ext JS Library 1.0.1
 * Copyright(c) 2006-2007, Ext JS, LLC.
 * licensing@extjs.com
 * 
 * http://www.extjs.com/license
 */

Ext.form.Checkbox=function(_1){Ext.form.Checkbox.superclass.constructor.call(this,_1);this.addEvents({check:true});};Ext.extend(Ext.form.Checkbox,Ext.form.Field,{focusClass:"x-form-check-focus",fieldClass:"x-form-field",checked:false,defaultAutoCreate:{tag:"input",type:"checkbox",autocomplete:"off"},boxLabel:undefined,setSize:function(w,h){if(!this.wrap){this.width=w;this.height=h;return;}this.wrap.setSize(w,h);if(!this.boxLabel){this.el.alignTo(this.wrap,"c-c");}},initEvents:function(){Ext.form.Checkbox.superclass.initEvents.call(this);this.el.on("click",this.onClick,this);this.el.on("change",this.onClick,this);},onRender:function(ct,_5){Ext.form.Checkbox.superclass.onRender.call(this,ct,_5);if(this.inputValue!==undefined){this.el.dom.value=this.inputValue;}this.wrap=this.el.wrap({cls:"x-form-check-wrap"});if(this.boxLabel){this.wrap.createChild({tag:"label",htmlFor:this.el.id,cls:"x-form-cb-label",html:this.boxLabel});}if(this.checked){this.setValue(true);}},initValue:Ext.emptyFn,getValue:function(){if(this.rendered){return this.el.dom.checked;}return false;},onClick:function(){if(this.el.dom.checked!=this.checked){this.setValue(this.el.dom.checked);}},setValue:function(v){this.checked=(v===true||v==="true"||v=="1");if(this.el&&this.el.dom){this.el.dom.checked=this.checked;}this.fireEvent("check",this,this.checked);}});
