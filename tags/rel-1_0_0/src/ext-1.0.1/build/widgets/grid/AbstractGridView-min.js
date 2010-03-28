/*
 * Ext JS Library 1.0.1
 * Copyright(c) 2006-2007, Ext JS, LLC.
 * licensing@extjs.com
 * 
 * http://www.extjs.com/license
 */

Ext.grid.AbstractGridView=function(){this.grid=null;this.events={"beforerowremoved":true,"beforerowsinserted":true,"beforerefresh":true,"rowremoved":true,"rowsinserted":true,"rowupdated":true,"refresh":true};Ext.grid.AbstractGridView.superclass.constructor.call(this);};Ext.extend(Ext.grid.AbstractGridView,Ext.util.Observable,{rowClass:"x-grid-row",cellClass:"x-grid-cell",tdClass:"x-grid-td",hdClass:"x-grid-hd",splitClass:"x-grid-hd-split",init:function(_1){this.grid=_1;var _2=this.grid.container.id;this.colSelector="#"+_2+" ."+this.cellClass+"-";this.tdSelector="#"+_2+" ."+this.tdClass+"-";this.hdSelector="#"+_2+" ."+this.hdClass+"-";this.splitSelector="#"+_2+" ."+this.splitClass+"-";},getColumnRenderers:function(){var _3=[];var cm=this.grid.colModel;var _5=cm.getColumnCount();for(var i=0;i<_5;i++){_3[i]=cm.getRenderer(i);}return _3;},getColumnIds:function(){var _7=[];var cm=this.grid.colModel;var _9=cm.getColumnCount();for(var i=0;i<_9;i++){_7[i]=cm.getColumnId(i);}return _7;},getDataIndexes:function(){if(!this.indexMap){this.indexMap=this.buildIndexMap();}return this.indexMap.colToData;},getColumnIndexByDataIndex:function(_b){if(!this.indexMap){this.indexMap=this.buildIndexMap();}return this.indexMap.dataToCol[_b];},setCSSStyle:function(_c,_d,_e){var _f="#"+this.grid.id+" .x-grid-col-"+_c;Ext.util.CSS.updateRule(_f,_d,_e);},generateRules:function(cm){var _11=[];for(var i=0,len=cm.getColumnCount();i<len;i++){var cid=cm.getColumnId(i);_11.push(this.colSelector,cid," {\n",cm.config[i].css,"}\n",this.tdSelector,cid," {\n}\n",this.hdSelector,cid," {\n}\n",this.splitSelector,cid," {\n}\n");}return Ext.util.CSS.createStyleSheet(_11.join(""));}});
