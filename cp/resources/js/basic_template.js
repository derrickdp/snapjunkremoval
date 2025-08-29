function parse_basic_js_template(routput_tpl,rvars_tpl) {
    var rvars = rvars_tpl;
    var routput = routput_tpl.trim();

    // Parse Embedded Templates
	for(var k in rvars) {
	    if(typeof(rvars[k])=="object") {
	        var routparts = routput.split("<tpl-" + k + ">");
	        var new_routput = routparts[0];
	        for(var r=1; r<routparts.length; r++) {
	            var rinnerparts = routparts[r].split("</tpl-" + k + ">");
	            if(rinnerparts.length > 1) {
	                var rinner_tpl = rinnerparts[0];
	                for(var x in rvars[k]) {
	                    var rinner_vars = rvars[k][x];
	                    
						//if(!('index' in rinner_vars)) {
						//	rinner_vars['index'] = x;
						//}
	                    
	                    if(typeof(rinner_vars)=="object") {
    	                    new_routput += parse_basic_js_template(rinner_tpl,rinner_vars);
	                    } else {
	                        var rpckeys = get_basic_js_template_var_keys(k,rinner_vars);
	                        for(kk in rpckeys) {
                        		var regex = new RegExp("\\[" + kk + "\\]", "g");
    	                        new_routput += rinner_tpl.replace(regex,rpckeys[kk]);//rinner_vars);
	                        }
	                    }
	                }
	                new_routput += rinnerparts[1];
	            }
	        }
	        routput = new_routput;
	    }
	}
    
    // Parse Conditional Displays
	var routparts = routput.split('<display:');
	var new_routput = routparts[0];
	for(var r=1; r<routparts.length; r++) {
	    var rdisep = routparts[r].indexOf('>');
	    var rdisplayvar = routparts[r].substring(0,rdisep);
	    var rdisplaystr = routparts[r].substring(rdisep + 1);
	    var rinnerparts = rdisplaystr.split("</display>");
	    if(rinnerparts.length > 1) {
	        var rifyes = rinnerparts[0];
	        var rifno = "";
	        var relseparts = rinnerparts[0].split("<else>");
	        if(relseparts.length > 1) {
	            rifyes = relseparts[0];
	            rifno = relseparts[1];
	        }
	        var relseparts = rifyes.split("<else:");
	        var rifyes = relseparts[0];
	        
	        if(parse_basic_js_template_condition(rdisplayvar,rvars)) {
	            new_routput += rifyes;
	        } else {
	            var relse_condition_found = false;
    	        for(var s=1; s<relseparts.length; s++) {
    	            if(!relse_condition_found) {
        	            var relsesep = relseparts[s].indexOf('>');
        	            var relsedisplayvar = relseparts[s].substring(0,relsesep);
        	            var relsedisplaystr = relseparts[s].substring(relsesep + 1);
            	        if(parse_basic_js_template_condition(relsedisplayvar,rvars)) {
            	            rifno = relsedisplaystr;
            	        }
    	            }
    	        }
	            new_routput += rifno;
	        }
	        new_routput += rinnerparts[1];
	    }
	}
	routput = new_routput;
	
	if(typeof current_foldername != "undefined") {
    	routput = routput.replace(/\[folder\]/ig,current_foldername);
	}
	
	var find_terms = new Array();
	var term_parts = routput.split("[term:");
	for(var t=1; t<term_parts.length; t++) {
	    var inner_term_parts = term_parts[t].split("]");
	    if(inner_term_parts.length > 1) {
	        var inner_term_str = inner_term_parts[0];
	        if(inner_term_str.length < 40) {
	            find_terms.push(inner_term_str);
	        }
	    }
	}
	for(var t=0; t<find_terms.length; t++) {
		var regex = new RegExp("\\[term\:" + find_terms[t] + "\\]", "g");
	    routput = routput.replace(regex,rterm(find_terms[t]));
	}
	if(typeof erstouchstart_method=="function") {
	    if(erstouchstart_method()=="ontouchstart") {
    	    var regex = new RegExp(" onclick\\=\\'", "g");
	        var new_click_code = " ontouchstart='basic_tpl_start_element_touch(this,event)' ontouchend='if(!basic_tpl_allow_element_touch(this,event)) return; ";
    	    routput = routput.replace(regex,new_click_code);
	    } else {
    	    var regex = new RegExp(" onclick\\=", "g");
	        var new_click_code = " " + erstouchstart_method() + "=";
    	    routput = routput.replace(regex,new_click_code);
	    }
	}
	
	// Parse Regular String Variables
	for(var k in rvars) {
	    if(typeof(rvars[k])!="object") {
            var rpckeys = get_basic_js_template_var_keys(k,rvars[k]);
            for(kk in rpckeys) {
        		var regex = new RegExp("\\[" + kk + "\\]", "g");
        		routput = routput.replace(regex,rpckeys[kk]);//rvars[k]);
            }
	    }
	}
	return routput;
}

tpl_touch_obj_scrollTop = 0;
tpl_touch_obj_top = 0;
tpl_touch_pos_left = 0;
tpl_touch_pos_top = 0;
function basic_tpl_start_element_touch(elem_obj,event) {
    event.stopPropagation();
    tpl_touch_obj_scrollTop = document.body.scrollTop;
    tpl_touch_obj_top = getObjPosition(elem_obj,'top');
    tpl_touch_pos_left = event.pageX;
    tpl_touch_pos_top = event.pageY;
}
function basic_tpl_allow_element_touch(elem_obj,event) {
	var scrollTop_diff = Math.abs(document.body.scrollTop - tpl_touch_obj_scrollTop) * 1;
	var objTop_diff = Math.abs(getObjPosition(elem_obj,'top') - tpl_touch_obj_top) * 1;
	var posLeft_diff = Math.abs(event.pageX - tpl_touch_pos_left) * 1;
	var posTop_diff = Math.abs(event.pageY - tpl_touch_pos_top) * 1; 
	if(scrollTop_diff < 2 && objTop_diff < 2 && posLeft_diff < 2 && posTop_diff < 2) {
        return true;
	} else {
	    return false;
	}
}
function parse_basic_js_template_condition(rdisplayvar,rvars) {
    var rdisplayvar_parts = rdisplayvar.split('=');
    if(rdisplayvar_parts.length==2) {
        rdisplayvar_k = rdisplayvar_parts[0];
        rdisplayvar_v = rdisplayvar_parts[1];
        
        if(rdisplayvar_k in rvars && rvars[rdisplayvar_k]==rdisplayvar_v) {
            return true;
        }
        else {
            return false;
        }
    }
    else if((rdisplayvar in rvars && rvars[rdisplayvar]!="") || (typeof current_foldername != "undefined" && current_foldername==rdisplayvar && rdisplayvar.length >= 3)) {
        return true;
    } else {
        return false;
    }
}
function get_basic_js_template_var_keys(k,rinner_vars) {
    var varkeys = new Array();
    varkeys[k] = rinner_vars;
    if(typeof rinner_vars != "undefined") {
        if(k.indexOf('cost') > -1 || k.indexOf('price') > -1 || k.indexOf('amount') > -1) {
            varkeys['format:' + k] = display_money(rinner_vars);
        } else if(k.indexOf('picture') > -1 || k.indexOf('image') > -1) {
            varkeys['format:' + k] = display_picture_path(rinner_vars);
        } else if(k.indexOf('time') > -1) {
            varkeys['format:' + k] = display_time(rinner_vars.replace(/\:/ig,''));
        }
    }
    return varkeys;
}
function basic_display_time(d_tstr) {
    return display_time(d_tstr.replace(/\:/ig,''));
}
function display_money(num) {
    if(num + '' == "" || num * 1 == "NaN") return ""; 
	var p = parseFloat(num).toFixed(2).split(".");
	return "$" + p[0].split("").reverse().reduce(function(acc, num, i, orig) {
		return  num + (i && !(i % 3) ? "," : "") + acc;
	}, "") + "." + p[1];
}
function display_picture_path(pstr) {
    if(pstr=="") return "/cp/resources/images/items/med/no_picture.png";
    else return pstr;
}

