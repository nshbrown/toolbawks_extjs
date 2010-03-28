/*
 * Ext JS Library 1.0.1
 * Copyright(c) 2006-2007, Ext JS, LLC.
 * licensing@extjs.com
 * 
 * http://www.extjs.com/license
 */

Ext.grid.GridView=function(_1){Ext.grid.GridView.superclass.constructor.call(this);this.el=null;Ext.apply(this,_1);};Ext.extend(Ext.grid.GridView,Ext.grid.AbstractGridView,{rowClass:"x-grid-row",cellClass:"x-grid-col",tdClass:"x-grid-td",hdClass:"x-grid-hd",splitClass:"x-grid-split",sortClasses:["sort-asc","sort-desc"],enableMoveAnim:false,hlColor:"C3DAF9",dh:Ext.DomHelper,fly:Ext.Element.fly,css:Ext.util.CSS,borderWidth:1,splitOffset:3,scrollIncrement:22,cellRE:/(?:.*?)x-grid-(?:hd|cell|csplit)-(?:[\d]+)-([\d]+)(?:.*?)/,findRE:/\s?(?:x-grid-hd|x-grid-col|x-grid-csplit)\s/,bind:function(ds,cm){if(this.ds){this.ds.un("load",this.onLoad,this);this.ds.un("datachanged",this.onDataChange);this.ds.un("add",this.onAdd);this.ds.un("remove",this.onRemove);this.ds.un("update",this.onUpdate);this.ds.un("clear",this.onClear);}if(ds){ds.on("load",this.onLoad,this);ds.on("datachanged",this.onDataChange,this);ds.on("add",this.onAdd,this);ds.on("remove",this.onRemove,this);ds.on("update",this.onUpdate,this);ds.on("clear",this.onClear,this);}this.ds=ds;if(this.cm){this.cm.un("widthchange",this.onColWidthChange,this);this.cm.un("headerchange",this.onHeaderChange,this);this.cm.un("hiddenchange",this.onHiddenChange,this);this.cm.un("columnmoved",this.onColumnMove,this);this.cm.un("columnlockchange",this.onColumnLock,this);}if(cm){this.generateRules(cm);cm.on("widthchange",this.onColWidthChange,this);cm.on("headerchange",this.onHeaderChange,this);cm.on("hiddenchange",this.onHiddenChange,this);cm.on("columnmoved",this.onColumnMove,this);cm.on("columnlockchange",this.onColumnLock,this);}this.cm=cm;},init:function(_4){Ext.grid.GridView.superclass.init.call(this,_4);this.bind(_4.dataSource,_4.colModel);_4.on("headerclick",this.handleHeaderClick,this);if(_4.trackMouseOver){_4.on("mouseover",this.onRowOver,this);_4.on("mouseout",this.onRowOut,this);}_4.cancelTextSelection=function(){};this.gridId=_4.id;var _5=this.templates||{};if(!_5.master){_5.master=new Ext.Template("<div class=\"x-grid\" hidefocus=\"true\">","<div class=\"x-grid-topbar\"></div>","<div class=\"x-grid-scroller\"><div></div></div>","<div class=\"x-grid-locked\">","<div class=\"x-grid-header\">{lockedHeader}</div>","<div class=\"x-grid-body\">{lockedBody}</div>","</div>","<div class=\"x-grid-viewport\">","<div class=\"x-grid-header\">{header}</div>","<div class=\"x-grid-body\">{body}</div>","</div>","<div class=\"x-grid-bottombar\"></div>","<a href=\"#\" class=\"x-grid-focus\" tabIndex=\"-1\"></a>","<div class=\"x-grid-resize-proxy\">&#160;</div>","</div>");_5.master.disableformats=true;}if(!_5.header){_5.header=new Ext.Template("<table border=\"0\" cellspacing=\"0\" cellpadding=\"0\">","<tbody><tr class=\"x-grid-hd-row\">{cells}</tr></tbody>","</table>{splits}");_5.header.disableformats=true;}_5.header.compile();if(!_5.hcell){_5.hcell=new Ext.Template("<td class=\"x-grid-hd x-grid-td-{id} {cellId}\"><div title=\"{title}\" class=\"x-grid-hd-inner x-grid-hd-{id}\">","<div class=\"x-grid-hd-text\" unselectable=\"on\">{value}<img class=\"x-grid-sort-icon\" src=\"",Ext.BLANK_IMAGE_URL,"\" /></div>","</div></td>");_5.hcell.disableFormats=true;}_5.hcell.compile();if(!_5.hsplit){_5.hsplit=new Ext.Template("<div class=\"x-grid-split {splitId} x-grid-split-{id}\" style=\"{style}\" unselectable=\"on\">&#160;</div>");_5.hsplit.disableFormats=true;}_5.hsplit.compile();if(!_5.body){_5.body=new Ext.Template("<table border=\"0\" cellspacing=\"0\" cellpadding=\"0\">","<tbody>{rows}</tbody>","</table>");_5.body.disableFormats=true;}_5.body.compile();if(!_5.row){_5.row=new Ext.Template("<tr class=\"x-grid-row {alt}\">{cells}</tr>");_5.row.disableFormats=true;}_5.row.compile();if(!_5.cell){_5.cell=new Ext.Template("<td class=\"x-grid-col x-grid-td-{id} {cellId} {css}\" tabIndex=\"0\">","<div class=\"x-grid-col-{id} x-grid-cell-inner\"><div class=\"x-grid-cell-text\" unselectable=\"on\" {attr}>{value}</div></div>","</td>");_5.cell.disableFormats=true;}_5.cell.compile();this.templates=_5;},onColWidthChange:function(){this.updateColumns.apply(this,arguments);},onHeaderChange:function(){this.updateHeaders.apply(this,arguments);},onHiddenChange:function(){this.handleHiddenChange.apply(this,arguments);},onColumnMove:function(){this.handleColumnMove.apply(this,arguments);},onColumnLock:function(){this.handleLockChange.apply(this,arguments);},onDataChange:function(){this.refresh();this.updateHeaderSortState();},onClear:function(){this.refresh();},onUpdate:function(ds,_7){this.refreshRow(_7);},refreshRow:function(_8){var ds=this.ds,_a;if(typeof _8=="number"){_a=_8;_8=ds.getAt(_a);}else{_a=ds.indexOf(_8);}var _b=this.getRowComposite(_a);var _c=[];this.insertRows(ds,_a,_a,true);this.onRemove(ds,_8,_a+1,true);this.syncRowHeights(_a,_a);this.layout();this.fireEvent("rowupdated",this,_a,_8);},onAdd:function(ds,_e,_f){this.insertRows(ds,_f,_f+(_e.length-1));},onRemove:function(ds,_11,_12,_13){if(_13!==true){this.fireEvent("beforerowremoved",this,_12,_11);}var bt=this.getBodyTable(),lt=this.getLockedTable();if(bt.rows[_12]){bt.firstChild.removeChild(bt.rows[_12]);}if(lt.rows[_12]){lt.firstChild.removeChild(lt.rows[_12]);}if(_13!==true){this.stripeRows(_12);this.syncRowHeights(_12,_12);this.layout();this.fireEvent("rowremoved",this,_12,_11);}},onLoad:function(){this.scrollToTop();},scrollToTop:function(){if(this.scroller){this.scroller.dom.scrollTop=0;this.syncScroll();}},getHeaderPanel:function(_16){if(_16){this.headerPanel.show();}return this.headerPanel;},getFooterPanel:function(_17){if(_17){this.footerPanel.show();}return this.footerPanel;},initElements:function(){var E=Ext.Element;var el=this.grid.container.dom.firstChild;var cs=el.childNodes;this.el=new E(el);this.headerPanel=new E(el.firstChild);this.headerPanel.enableDisplayMode("block");this.scroller=new E(cs[1]);this.scrollSizer=new E(this.scroller.dom.firstChild);this.lockedWrap=new E(cs[2]);this.lockedHd=new E(this.lockedWrap.dom.firstChild);this.lockedBody=new E(this.lockedWrap.dom.childNodes[1]);this.mainWrap=new E(cs[3]);this.mainHd=new E(this.mainWrap.dom.firstChild);this.mainBody=new E(this.mainWrap.dom.childNodes[1]);this.footerPanel=new E(cs[4]);this.footerPanel.enableDisplayMode("block");this.focusEl=new E(cs[5]);this.focusEl.swallowEvent("click",true);this.resizeProxy=new E(cs[6]);this.headerSelector=String.format("#{0} td.x-grid-hd, #{1} td.x-grid-hd",this.lockedHd.id,this.mainHd.id);this.splitterSelector=String.format("#{0} div.x-grid-split, #{1} div.x-grid-split",this.lockedHd.id,this.mainHd.id);},getHeaderCell:function(_1b){return Ext.DomQuery.select(this.headerSelector)[_1b];},getHeaderCellMeasure:function(_1c){return this.getHeaderCell(_1c).firstChild;},getHeaderCellText:function(_1d){return this.getHeaderCell(_1d).firstChild.firstChild;},getLockedTable:function(){return this.lockedBody.dom.firstChild;},getBodyTable:function(){return this.mainBody.dom.firstChild;},getLockedRow:function(_1e){return this.getLockedTable().rows[_1e];},getRow:function(_1f){return this.getBodyTable().rows[_1f];},getRowComposite:function(_20){if(!this.rowEl){this.rowEl=new Ext.CompositeElementLite();}var els=[],_22,_23;if(_22=this.getLockedRow(_20)){els.push(_22);}if(_23=this.getRow(_20)){els.push(_23);}this.rowEl.elements=els;return this.rowEl;},getCell:function(_24,_25){var _26=this.cm.getLockedCount();var _27;if(_25<_26){_27=this.lockedBody.dom.firstChild;}else{_27=this.mainBody.dom.firstChild;_25-=_26;}return _27.rows[_24].childNodes[_25];},getCellText:function(_28,_29){return this.getCell(_28,_29).firstChild.firstChild;},getCellBox:function(_2a){var b=this.fly(_2a).getBox();if(Ext.isOpera){b.y=_2a.offsetTop+this.mainBody.getY();}return b;},getCellIndex:function(_2c){var id=String(_2c.className).match(this.cellRE);if(id){return parseInt(id[1],10);}return 0;},findHeaderIndex:function(n){var r=Ext.fly(n).findParent("td."+this.hdClass,6);return r?this.getCellIndex(r):false;},findHeaderCell:function(n){var r=Ext.fly(n).findParent("td."+this.hdClass,6);return r?r:false;},findRowIndex:function(n){if(!n){return false;}var r=Ext.fly(n).findParent("tr."+this.rowClass,6);return r?r.rowIndex:false;},findCellIndex:function(_34){var _35=this.el.dom;while(_34&&_34!=_35){if(this.findRE.test(_34.className)){return this.getCellIndex(_34);}_34=_34.parentNode;}return false;},getColumnId:function(_36){return this.cm.getColumnId(_36);},getSplitters:function(){if(this.splitterSelector){return Ext.DomQuery.select(this.splitterSelector);}else{return null;}},getSplitter:function(_37){return this.getSplitters()[_37];},onRowOver:function(e,t){var row;if((row=this.findRowIndex(t))!==false){this.getRowComposite(row).addClass("x-grid-row-over");}},onRowOut:function(e,t){var row;if((row=this.findRowIndex(t))!==false&&row!==this.findRowIndex(e.getRelatedTarget())){this.getRowComposite(row).removeClass("x-grid-row-over");}},renderHeaders:function(){var cm=this.cm;var ct=this.templates.hcell,ht=this.templates.header,st=this.templates.hsplit;var cb=[],lb=[],sb=[],lsb=[],p={};for(var i=0,len=cm.getColumnCount();i<len;i++){p.cellId="x-grid-hd-0-"+i;p.splitId="x-grid-csplit-0-"+i;p.id=cm.getColumnId(i);p.title=cm.getColumnTooltip(i)||"";p.value=cm.getColumnHeader(i)||"";p.style=(this.grid.enableColumnResize===false||!cm.isResizable(i)||cm.isFixed(i))?"cursor:default":"";if(!cm.isLocked(i)){cb[cb.length]=ct.apply(p);sb[sb.length]=st.apply(p);}else{lb[lb.length]=ct.apply(p);lsb[lsb.length]=st.apply(p);}}return [ht.apply({cells:lb.join(""),splits:lsb.join("")}),ht.apply({cells:cb.join(""),splits:sb.join("")})];},updateHeaders:function(){var _49=this.renderHeaders();this.lockedHd.update(_49[0]);this.mainHd.update(_49[1]);},focusRow:function(row){var x=this.scroller.dom.scrollLeft;this.focusCell(row,0,false);this.scroller.dom.scrollLeft=x;},focusCell:function(row,col,_4e){var el=this.ensureVisible(row,col,_4e);this.focusEl.alignTo(el,"tl-tl");if(Ext.isGecko){this.focusEl.focus();}else{this.focusEl.focus.defer(1,this.focusEl);}},ensureVisible:function(row,col,_52){if(typeof row!="number"){row=row.rowIndex;}if(row<0&&row>=this.ds.getCount()){return;}col=(col!==undefined?col:0);var cm=this.grid.colModel;while(cm.isHidden(col)){col++;}var el=this.getCell(row,col);if(!el){return;}var c=this.scroller.dom;var _56=parseInt(el.offsetTop,10);var _57=parseInt(el.offsetLeft,10);var _58=_56+el.offsetHeight;var _59=_57+el.offsetWidth;var ch=c.clientHeight-this.mainHd.dom.offsetHeight;var _5b=parseInt(c.scrollTop,10);var _5c=parseInt(c.scrollLeft,10);var _5d=_5b+ch;var _5e=_5c+c.clientWidth;if(_56<_5b){c.scrollTop=_56;}else{if(_58>_5d){c.scrollTop=_58-ch;}}if(_52!==false){if(_57<_5c){c.scrollLeft=_57;}else{if(_59>_5e){c.scrollLeft=_59-c.clientWidth;}}}return el;},updateColumns:function(){this.grid.stopEditing();var cm=this.grid.colModel,_60=this.getColumnIds();var pos=0;for(var i=0,len=cm.getColumnCount();i<len;i++){var w=cm.getColumnWidth(i);this.css.updateRule(this.colSelector+_60[i],"width",(w-this.borderWidth)+"px");this.css.updateRule(this.hdSelector+_60[i],"width",(w-this.borderWidth)+"px");}this.updateSplitters();},updateSplitters:function(){var cm=this.cm,s=this.getSplitters();if(s){var pos=0,_68=true;for(var i=0,len=cm.getColumnCount();i<len;i++){if(cm.isHidden(i)){continue;}var w=cm.getColumnWidth(i);if(!cm.isLocked(i)&&_68){pos=0;_68=false;}pos+=w;s[i].style.left=(pos-this.splitOffset)+"px";}}},handleHiddenChange:function(_6c,_6d,_6e){if(_6e){this.hideColumn(_6d);}else{this.unhideColumn(_6d);}},hideColumn:function(_6f){var cid=this.getColumnId(_6f);this.css.updateRule(this.tdSelector+cid,"display","none");this.css.updateRule(this.splitSelector+cid,"display","none");if(Ext.isSafari){this.updateHeaders();}this.updateSplitters();this.layout();},unhideColumn:function(_71){var cid=this.getColumnId(_71);this.css.updateRule(this.tdSelector+cid,"display","");this.css.updateRule(this.splitSelector+cid,"display","");if(Ext.isSafari){this.updateHeaders();}this.updateSplitters();this.layout();},insertRows:function(dm,_74,_75,_76){if(_74==0&&_75==dm.getCount()-1){this.refresh();}else{if(!_76){this.fireEvent("beforerowsinserted",this,_74,_75);}var s=this.getScrollState();var _78=this.renderRows(_74,_75);this.bufferRows(_78[0],this.getLockedTable(),_74);this.bufferRows(_78[1],this.getBodyTable(),_74);this.restoreScroll(s);if(!_76){this.fireEvent("rowsinserted",this,_74,_75);this.syncRowHeights(_74,_75);this.stripeRows(_74);this.layout();}}},bufferRows:function(_79,_7a,_7b){var _7c=null,_7d=_7a.rows,_7e=_7a.tBodies[0];if(_7b<_7d.length){_7c=_7d[_7b];}var b=document.createElement("div");b.innerHTML="<table><tbody>"+_79+"</tbody></table>";var _80=b.firstChild.rows;for(var i=0,len=_80.length;i<len;i++){if(_7c){_7e.insertBefore(_80[0],_7c);}else{_7e.appendChild(_80[0]);}}b.innerHTML="";b=null;},deleteRows:function(dm,_84,_85){if(dm.getRowCount()<1){this.fireEvent("beforerefresh",this);this.mainBody.update("");this.lockedBody.update("");this.fireEvent("refresh",this);}else{this.fireEvent("beforerowsdeleted",this,_84,_85);var bt=this.getBodyTable();var _87=bt.firstChild;var _88=bt.rows;for(var _89=_84;_89<=_85;_89++){_87.removeChild(_88[_84]);}this.stripeRows(_84);this.fireEvent("rowsdeleted",this,_84,_85);}},updateRows:function(_8a,_8b,_8c){var s=this.getScrollState();this.refresh();this.restoreScroll(s);},handleSort:function(_8e,_8f,_90,_91){if(!_91){this.refresh();}this.updateHeaderSortState();},getScrollState:function(){var sb=this.scroller.dom;return {left:sb.scrollLeft,top:sb.scrollTop};},stripeRows:function(_93){if(!this.grid.stripeRows||this.ds.getCount()<1){return;}_93=_93||0;var _94=this.getBodyTable().rows;var _95=this.getLockedTable().rows;var cls=" x-grid-row-alt ";for(var i=_93,len=_94.length;i<len;i++){var row=_94[i],_9a=_95[i];var _9b=((i+1)%2==0);var _9c=(" "+row.className+" ").indexOf(cls)!=-1;if(_9b==_9c){continue;}if(_9b){row.className+=" x-grid-row-alt";}else{row.className=row.className.replace("x-grid-row-alt","");}if(_9a){_9a.className=row.className;}}},restoreScroll:function(_9d){var sb=this.scroller.dom;sb.scrollLeft=_9d.left;sb.scrollTop=_9d.top;this.syncScroll();},syncScroll:function(){var sb=this.scroller.dom;var sh=this.mainHd.dom;var bs=this.mainBody.dom;var lv=this.lockedBody.dom;sh.scrollLeft=bs.scrollLeft=sb.scrollLeft;lv.scrollTop=bs.scrollTop=sb.scrollTop;},handleScroll:function(e){this.syncScroll();var sb=this.scroller.dom;this.grid.fireEvent("bodyscroll",sb.scrollLeft,sb.scrollTop);e.stopEvent();},handleWheel:function(e){var d=e.getWheelDelta();this.scroller.dom.scrollTop-=d*22;this.lockedBody.dom.scrollTop=this.mainBody.dom.scrollTop=this.scroller.dom.scrollTop;e.stopEvent();},renderRows:function(_a7,_a8){var g=this.grid,cm=g.colModel,ds=g.dataSource,_ac=g.stripeRows;var _ad=cm.getColumnCount();if(ds.getCount()<1){return ["",""];}var cs=[];for(var i=0;i<_ad;i++){var _b0=cm.getDataIndex(i);cs[i]={name:typeof _b0=="undefined"?ds.fields.get(i).name:_b0,renderer:cm.getRenderer(i),id:cm.getColumnId(i),locked:cm.isLocked(i)};}_a7=_a7||0;_a8=typeof _a8=="undefined"?ds.getCount()-1:_a8;var rs=ds.getRange(_a7,_a8);return this.doRender(cs,rs,ds,_a7,_ad,_ac);},doRender:Ext.isGecko?function(cs,rs,ds,_b5,_b6,_b7){var ts=this.templates,ct=ts.cell,rt=ts.row;var buf="",_bc="",cb,lcb,c,p={},rp={},r;for(var j=0,len=rs.length;j<len;j++){r=rs[j],cb="",lcb="",rowIndex=(j+_b5);for(var i=0;i<_b6;i++){c=cs[i];p.cellId="x-grid-cell-"+rowIndex+"-"+i;p.id=c.id;p.css=p.attr="";p.value=c.renderer(r.data[c.name],p,r,rowIndex,i,ds);if(p.value==undefined||p.value===""){p.value="&#160;";}if(r.dirty&&typeof r.modified[c.name]!=="undefined"){p.css+=p.css?" x-grid-dirty-cell":"x-grid-dirty-cell";}var _c6=ct.apply(p);if(!c.locked){cb+=_c6;}else{lcb+=_c6;}}var alt=[];if(_b7&&((rowIndex+1)%2==0)){alt[0]="x-grid-row-alt";}if(r.dirty){alt[1]=" x-grid-dirty-row";}rp.cells=lcb;if(this.getRowClass){alt[2]=this.getRowClass(r,rowIndex);}rp.alt=alt.join(" ");_bc+=rt.apply(rp);rp.cells=cb;buf+=rt.apply(rp);}return [_bc,buf];}:function(cs,rs,ds,_cb,_cc,_cd){var ts=this.templates,ct=ts.cell,rt=ts.row;var buf=[],_d2=[],cb,lcb,c,p={},rp={},r;for(var j=0,len=rs.length;j<len;j++){r=rs[j],cb=[],lcb=[],rowIndex=(j+_cb);for(var i=0;i<_cc;i++){c=cs[i];p.cellId="x-grid-cell-"+rowIndex+"-"+i;p.id=c.id;p.css=p.attr="";p.value=c.renderer(r.data[c.name],p,r,rowIndex,i,ds);if(p.value==undefined||p.value===""){p.value="&#160;";}if(r.dirty&&typeof r.modified[c.name]!=="undefined"){p.css+=p.css?" x-grid-dirty-cell":"x-grid-dirty-cell";}var _dc=ct.apply(p);if(!c.locked){cb[cb.length]=_dc;}else{lcb[lcb.length]=_dc;}}var alt=[];if(_cd&&((rowIndex+1)%2==0)){alt[0]="x-grid-row-alt";}if(r.dirty){alt[1]=" x-grid-dirty-row";}rp.cells=lcb;if(this.getRowClass){alt[2]=this.getRowClass(r,rowIndex);}rp.alt=alt.join(" ");rp.cells=lcb.join("");_d2[_d2.length]=rt.apply(rp);rp.cells=cb.join("");buf[buf.length]=rt.apply(rp);}return [_d2.join(""),buf.join("")];},renderBody:function(){var _de=this.renderRows();var bt=this.templates.body;return [bt.apply({rows:_de[0]}),bt.apply({rows:_de[1]})];},refresh:function(_e0){this.fireEvent("beforerefresh",this);this.grid.stopEditing();var _e1=this.renderBody();this.lockedBody.update(_e1[0]);this.mainBody.update(_e1[1]);if(_e0===true){this.updateHeaders();this.updateColumns();this.updateSplitters();this.updateHeaderSortState();}this.syncRowHeights();this.layout();this.fireEvent("refresh",this);},handleColumnMove:function(cm,_e3,_e4){this.indexMap=null;var s=this.getScrollState();this.refresh(true);this.restoreScroll(s);this.afterMove(_e4);},afterMove:function(_e6){if(this.enableMoveAnim&&Ext.enableFx){this.fly(this.getHeaderCell(_e6).firstChild).highlight(this.hlColor);}},updateCell:function(dm,_e8,_e9){var _ea=this.getColumnIndexByDataIndex(_e9);if(typeof _ea=="undefined"){return;}var cm=this.grid.colModel;var _ec=this.getCell(_e8,_ea);var _ed=this.getCellText(_e8,_ea);var p={cellId:"x-grid-cell-"+_e8+"-"+_ea,id:cm.getColumnId(_ea),css:_ea==cm.getColumnCount()-1?"x-grid-col-last":""};var _ef=cm.getRenderer(_ea);var val=_ef(dm.getValueAt(_e8,_e9),p,_e8,_ea,dm);if(typeof val=="undefined"||val===""){val="&#160;";}_ed.innerHTML=val;_ec.className=this.cellClass+" "+p.cellId+" "+p.css;this.syncRowHeights(_e8,_e8);},calcColumnWidth:function(_f1,_f2){var _f3=0;if(this.grid.autoSizeHeaders){var h=this.getHeaderCellMeasure(_f1);_f3=Math.max(_f3,h.scrollWidth);}var tb,_f6;if(this.cm.isLocked(_f1)){tb=this.getLockedTable();_f6=_f1;}else{tb=this.getBodyTable();_f6=_f1-this.cm.getLockedCount();}if(tb&&tb.rows){var _f7=tb.rows;var _f8=Math.min(_f2||_f7.length,_f7.length);for(var i=0;i<_f8;i++){var _fa=_f7[i].childNodes[_f6].firstChild;_f3=Math.max(_f3,_fa.scrollWidth);}}return _f3+5;},autoSizeColumn:function(_fb,_fc,_fd){if(this.cm.isHidden(_fb)){return;}if(_fc){var cid=this.cm.getColumnId(_fb);this.css.updateRule(this.colSelector+cid,"width",this.grid.minColumnWidth+"px");if(this.grid.autoSizeHeaders){this.css.updateRule(this.hdSelector+cid,"width",this.grid.minColumnWidth+"px");}}var _ff=this.calcColumnWidth(_fb);this.cm.setColumnWidth(_fb,Math.max(this.grid.minColumnWidth,_ff),_fd);if(!_fd){this.grid.fireEvent("columnresize",_fb,_ff);}},autoSizeColumns:function(){var cm=this.grid.colModel;var _101=cm.getColumnCount();for(var i=0;i<_101;i++){this.autoSizeColumn(i,true,true);}if(cm.getTotalWidth()<this.scroller.dom.clientWidth){this.fitColumns();}else{this.updateColumns();this.layout();}},fitColumns:function(_103){var cm=this.grid.colModel;var _105=cm.getColumnCount();var cols=[];var _107=0;var i,w;for(i=0;i<_105;i++){if(!cm.isHidden(i)&&!cm.isFixed(i)){w=cm.getColumnWidth(i);cols.push(i);cols.push(w);_107+=w;}}var _10a=Math.min(this.scroller.dom.clientWidth,this.el.getWidth());if(_103){_10a-=17;}var frac=(_10a-cm.getTotalWidth())/_107;while(cols.length){w=cols.pop();i=cols.pop();cm.setColumnWidth(i,Math.floor(w+w*frac),true);}this.updateColumns();this.layout();},onRowSelect:function(_10c){var row=this.getRowComposite(_10c);row.addClass("x-grid-row-selected");},onRowDeselect:function(_10e){var row=this.getRowComposite(_10e);row.removeClass("x-grid-row-selected");},onCellSelect:function(row,col){var cell=this.getCell(row,col);if(cell){Ext.fly(cell).addClass("x-grid-cell-selected");}},onCellDeselect:function(row,col){var cell=this.getCell(row,col);if(cell){Ext.fly(cell).removeClass("x-grid-cell-selected");}},updateHeaderSortState:function(){var _116=this.ds.getSortState();if(!_116){return;}this.sortState=_116;var _117=this.cm.findColumnIndex(_116.field);if(_117!=-1){var _118=_116.direction;var sc=this.sortClasses;var hds=this.el.select(this.headerSelector).removeClass(sc);hds.item(_117).addClass(sc[_118=="DESC"?1:0]);}},handleHeaderClick:function(g,_11c){if(this.headersDisabled){return;}var dm=g.dataSource,cm=g.colModel;if(!cm.isSortable(_11c)){return;}g.stopEditing();dm.sort(cm.getDataIndex(_11c));},destroy:function(){if(this.colMenu){this.colMenu.removeAll();Ext.menu.MenuMgr.unregister(this.colMenu);this.colMenu.getEl().remove();delete this.colMenu;}if(this.hmenu){this.hmenu.removeAll();Ext.menu.MenuMgr.unregister(this.hmenu);this.hmenu.getEl().remove();delete this.hmenu;}if(this.grid.enableColumnMove){var dds=Ext.dd.DDM.ids["gridHeader"+this.grid.container.id];if(dds){for(var dd in dds){if(!dds[dd].config.isTarget&&dds[dd].dragElId){var elid=dds[dd].dragElId;dds[dd].unreg();Ext.get(elid).remove();}else{if(dds[dd].config.isTarget){dds[dd].proxyTop.remove();dds[dd].proxyBottom.remove();dds[dd].unreg();}}if(Ext.dd.DDM.locationCache[dd]){delete Ext.dd.DDM.locationCache[dd];}}delete Ext.dd.DDM.ids["gridHeader"+this.grid.container.id];}}this.bind(null,null);Ext.EventManager.removeResizeListener(this.onWindowResize,this);},handleLockChange:function(){this.refresh(true);},onDenyColumnLock:function(){},onDenyColumnHide:function(){},handleHdMenuClick:function(item){var _123=this.hdCtxIndex;var cm=this.cm,ds=this.ds;switch(item.id){case "asc":ds.sort(cm.getDataIndex(_123),"ASC");break;case "desc":ds.sort(cm.getDataIndex(_123),"DESC");break;case "lock":var lc=cm.getLockedCount();if(cm.getColumnCount(true)<=lc+1){this.onDenyColumnLock();return;}if(lc!=_123){cm.setLocked(_123,true,true);cm.moveColumn(_123,lc);this.grid.fireEvent("columnmove",_123,lc);}else{cm.setLocked(_123,true);}break;case "unlock":var lc=cm.getLockedCount();if((lc-1)!=_123){cm.setLocked(_123,false,true);cm.moveColumn(_123,lc-1);this.grid.fireEvent("columnmove",_123,lc-1);}else{cm.setLocked(_123,false);}break;default:_123=cm.getIndexById(item.id.substr(4));if(_123!=-1){if(item.checked&&cm.getColumnCount(true)<=1){this.onDenyColumnHide();return false;}cm.setHidden(_123,item.checked);}}return true;},beforeColMenuShow:function(){var cm=this.cm,_128=cm.getColumnCount();this.colMenu.removeAll();for(var i=0;i<_128;i++){this.colMenu.add(new Ext.menu.CheckItem({id:"col-"+cm.getColumnId(i),text:cm.getColumnHeader(i),checked:!cm.isHidden(i),hideOnClick:false}));}},handleHdCtx:function(g,_12b,e){e.stopEvent();var hd=this.getHeaderCell(_12b);this.hdCtxIndex=_12b;var ms=this.hmenu.items,cm=this.cm;ms.get("asc").setDisabled(!cm.isSortable(_12b));ms.get("desc").setDisabled(!cm.isSortable(_12b));if(this.grid.enableColLock!==false){ms.get("lock").setDisabled(cm.isLocked(_12b));ms.get("unlock").setDisabled(!cm.isLocked(_12b));}this.hmenu.show(hd,"tl-bl");},handleHdOver:function(e){var hd=this.findHeaderCell(e.getTarget());if(hd&&!this.headersDisabled){if(this.grid.colModel.isSortable(this.getCellIndex(hd))){this.fly(hd).addClass("x-grid-hd-over");}}},handleHdOut:function(e){var hd=this.findHeaderCell(e.getTarget());if(hd){this.fly(hd).removeClass("x-grid-hd-over");}},handleSplitDblClick:function(e,t){var i=this.getCellIndex(t);if(this.grid.enableColumnResize!==false&&this.cm.isResizable(i)&&!this.cm.isFixed(i)){this.autoSizeColumn(i,true);this.layout();}},render:function(){var cm=this.cm;var _138=cm.getColumnCount();if(this.grid.monitorWindowResize===true){Ext.EventManager.onWindowResize(this.onWindowResize,this,true);}var _139=this.renderHeaders();var body=this.templates.body.apply({rows:""});var html=this.templates.master.apply({lockedBody:body,body:body,lockedHeader:_139[0],header:_139[1]});this.updateColumns();this.grid.container.dom.innerHTML=html;this.initElements();this.scroller.on("scroll",this.handleScroll,this);this.lockedBody.on("mousewheel",this.handleWheel,this);this.mainBody.on("mousewheel",this.handleWheel,this);this.mainHd.on("mouseover",this.handleHdOver,this);this.mainHd.on("mouseout",this.handleHdOut,this);this.mainHd.on("dblclick",this.handleSplitDblClick,this,{delegate:"."+this.splitClass});this.lockedHd.on("mouseover",this.handleHdOver,this);this.lockedHd.on("mouseout",this.handleHdOut,this);this.lockedHd.on("dblclick",this.handleSplitDblClick,this,{delegate:"."+this.splitClass});if(this.grid.enableColumnResize!==false&&Ext.grid.SplitDragZone){new Ext.grid.SplitDragZone(this.grid,this.lockedHd.dom,this.mainHd.dom);}this.updateSplitters();if(this.grid.enableColumnMove&&Ext.grid.HeaderDragZone){new Ext.grid.HeaderDragZone(this.grid,this.lockedHd.dom,this.mainHd.dom);new Ext.grid.HeaderDropZone(this.grid,this.lockedHd.dom,this.mainHd.dom);}if(this.grid.enableCtxMenu!==false&&Ext.menu.Menu){this.hmenu=new Ext.menu.Menu({id:this.grid.id+"-hctx"});this.hmenu.add({id:"asc",text:this.sortAscText,cls:"xg-hmenu-sort-asc"},{id:"desc",text:this.sortDescText,cls:"xg-hmenu-sort-desc"});if(this.grid.enableColLock!==false){this.hmenu.add("-",{id:"lock",text:this.lockText,cls:"xg-hmenu-lock"},{id:"unlock",text:this.unlockText,cls:"xg-hmenu-unlock"});}if(this.grid.enableColumnHide!==false){this.colMenu=new Ext.menu.Menu({id:this.grid.id+"-hcols-menu"});this.colMenu.on("beforeshow",this.beforeColMenuShow,this);this.colMenu.on("itemclick",this.handleHdMenuClick,this);this.hmenu.add("-",{id:"columns",text:this.columnsText,menu:this.colMenu});}this.hmenu.on("itemclick",this.handleHdMenuClick,this);this.grid.on("headercontextmenu",this.handleHdCtx,this);}if((this.grid.enableDragDrop||this.grid.enableDrag)&&Ext.grid.GridDragZone){this.dd=new Ext.grid.GridDragZone(this.grid,{ddGroup:this.grid.ddGroup||"GridDD"});}for(var i=0;i<_138;i++){if(cm.isHidden(i)){this.hideColumn(i);}if(cm.config[i].align){this.css.updateRule(this.colSelector+i,"textAlign",cm.config[i].align);this.css.updateRule(this.hdSelector+i,"textAlign",cm.config[i].align);}}this.updateHeaderSortState();this.beforeInitialResize();this.layout(true);this.renderPhase2.defer(1,this);},renderPhase2:function(){this.refresh();if(this.grid.autoSizeColumns){this.autoSizeColumns();}},beforeInitialResize:function(){},onColumnSplitterMoved:function(i,w){this.userResized=true;var cm=this.grid.colModel;cm.setColumnWidth(i,w,true);var cid=cm.getColumnId(i);this.css.updateRule(this.colSelector+cid,"width",(w-this.borderWidth)+"px");this.css.updateRule(this.hdSelector+cid,"width",(w-this.borderWidth)+"px");this.updateSplitters();this.layout();this.grid.fireEvent("columnresize",i,w);},syncRowHeights:function(_141,_142){if(this.grid.enableRowHeightSync===true&&this.cm.getLockedCount()>0){_141=_141||0;var _143=this.getBodyTable().rows;var _144=this.getLockedTable().rows;var len=_143.length-1;_142=Math.min(_142||len,len);for(var i=_141;i<=_142;i++){var m=_143[i],l=_144[i];var h=Math.max(m.offsetHeight,l.offsetHeight);m.style.height=l.style.height=h+"px";}}},layout:function(_14a,_14b){var g=this.grid;var auto=g.autoHeight;var _14e=16;var c=g.container,cm=this.cm,_151=g.autoExpandColumn,gv=this;if(!c.dom.offsetWidth){if(_14a){this.lockedWrap.show();this.mainWrap.show();}return;}var _153=this.cm.isLocked(0);var tbh=this.headerPanel.getHeight();var bbh=this.footerPanel.getHeight();if(auto){var ch=this.getBodyTable().offsetHeight+tbh+bbh+this.mainHd.getHeight();var _157=ch+c.getBorderWidth("tb");if(g.maxHeight){_157=Math.min(g.maxHeight,_157);}c.setHeight(_157);}if(g.autoWidth){c.setWidth(cm.getTotalWidth()+c.getBorderWidth("lr"));}var s=this.scroller;var _159=c.getSize(true);this.el.setSize(_159.width,_159.height);this.headerPanel.setWidth(_159.width);this.footerPanel.setWidth(_159.width);var _15a=this.mainHd.getHeight();var vw=_159.width;var vh=_159.height-(tbh+bbh);s.setSize(vw,vh);var bt=this.getBodyTable();var _15e=_153?Math.max(this.getLockedTable().offsetWidth,this.lockedHd.dom.firstChild.offsetWidth):0;var _15f=bt.offsetHeight;var _160=_15e+bt.offsetWidth;var _161=false,_162=false;this.scrollSizer.setSize(_160,_15f+_15a);var lw=this.lockedWrap,mw=this.mainWrap;var lb=this.lockedBody,mb=this.mainBody;setTimeout(function(){var t=s.dom.offsetTop;var w=s.dom.clientWidth,h=s.dom.clientHeight;lw.setTop(t);lw.setSize(_15e,h);mw.setLeftTop(_15e,t);mw.setSize(w-_15e,h);lb.setHeight(h-_15a);mb.setHeight(h-_15a);if(_14b!==true&&!gv.userResized&&_151){var ci=cm.getIndexById(_151);var tw=cm.getTotalWidth(false);var _16c=cm.getColumnWidth(ci);var cw=Math.min(Math.max(((w-tw)+_16c-2)-(w<=s.dom.offsetWidth?0:18),g.autoExpandMin),g.autoExpandMax);if(_16c!=cw){cm.setColumnWidth(ci,cw,true);gv.css.updateRule(gv.colSelector+_151,"width",(cw-gv.borderWidth)+"px");gv.css.updateRule(gv.hdSelector+_151,"width",(cw-gv.borderWidth)+"px");gv.updateSplitters();gv.layout(false,true);}}if(_14a){lw.show();mw.show();}},10);},onWindowResize:function(){if(!this.grid.monitorWindowResize||this.grid.autoHeight){return;}this.layout();},appendFooter:function(_16e){return null;},sortAscText:"Sort Ascending",sortDescText:"Sort Descending",lockText:"Lock Column",unlockText:"Unlock Column",columnsText:"Columns"});