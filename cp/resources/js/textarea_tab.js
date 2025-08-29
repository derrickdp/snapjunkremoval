function setSelectionRange(input, selectionStart, selectionEnd) {
  if (input.setSelectionRange) {
    input.focus();
    input.setSelectionRange(selectionStart, selectionEnd);
  }
  else if (input.createTextRange) {
    var range = input.createTextRange();
    range.collapse(true);
    range.moveEnd('character', selectionEnd);
    range.moveStart('character', selectionStart);
    range.select();
  }
}

function replaceSelection (input, replaceString, shift_key_pressed) {
	if (input.setSelectionRange) {
		var selectionStart = input.selectionStart;
		var selectionEnd = input.selectionEnd;
		
		if (selectionStart != selectionEnd) {
			if(shift_key_pressed){
				var oldstr = input.value.substring(selectionStart,selectionEnd);
				var newstr = "";
				for(var i=0; i<oldstr.length; i++) {
					newchr = oldstr[i];
					if(i==0 && newchr=="\t") { }
					else if(i > 0 && oldstr[i - 1]=="\n" && newchr=="\t") { }
					else newstr += newchr;
				}
				replaceString = newstr;
			} else {
				var oldstr = input.value.substring(selectionStart,selectionEnd);
				var newstr = "";
				for(var i=0; i<oldstr.length; i++) {
					newchr = oldstr[i];
					if(i==0) { newstr += "\t" + newchr; }
					else if(i==(oldstr.length - 1)) { newstr += newchr; }
					else if(newchr=="\n") { newstr += newchr + "\t"; }
					else newstr += newchr;
				}
				replaceString = newstr;
				//replaceString = "\t" + input.value.substring(selectionStart,selectionEnd).replace(/\n/ig,"\n\t");
			}
		}
		
		input.value = input.value.substring(0, selectionStart)+ replaceString + input.value.substring(selectionEnd);
		    
		if (selectionStart != selectionEnd){ 
			setSelectionRange(input, selectionStart, selectionStart + replaceString.length);
		}else{
			setSelectionRange(input, selectionStart + replaceString.length, selectionStart + replaceString.length);
		}

	}else if (document.selection) {
	var range = document.selection.createRange();

		if (range.parentElement() == input) {
			var isCollapsed = range.text == '';
			range.text = replaceString;

			 if (!isCollapsed)  {
				range.moveStart('character', -replaceString.length);
				range.select();
			}
		}
	}
}


// We are going to catch the TAB key so that we can use it, Hooray!
function catchTab(item,e){
	if(navigator.userAgent.match("Gecko")){
		c=e.which;
	}else{
		c=e.keyCode;
	}
	if(c==9){
		replaceSelection(item,String.fromCharCode(9),e.shiftKey);
		setTimeout("document.getElementById('"+item.id+"').focus();",0);	
		return false;
	}
		    
}

function insertAtCaret(element, text)
{
    /*if (element.id == "editor")
    {
        var cke_editor = ersDE("cke_editor");
        if (cke_editor)
        {
            var cke_iframe = cke_editor.getElementsByClassName("cke_wysiwyg_frame")[0];
            if (cke_iframe)
            {
                var cke_selection = cke_iframe.contentDocument.getSelection();
                var cke_body = cke_iframe.contentDocument.body;
                if (cke_body)
                {
                    var sel_start = cke_selection.baseOffset;
                    var sel_end = cke_selection.extentOffset;
                    var html = cke_body.innerHTML;
                    cke_body.innerHTML = html.substring(0, sel_start) + text + html.substring(sel_end, html.length);;
                    return;
                }
            }
        }
    }*/

	if (document.selection) {
		element.focus();
		var sel = document.selection.createRange();
		sel.text = text;
		element.focus();
	} else if (element.selectionStart || element.selectionStart === 0) {
		var startPos = element.selectionStart;
		var endPos = element.selectionEnd;
		var scrollTop = element.scrollTop;
		element.value = element.value.substring(0, startPos) + text + element.value.substring(endPos, element.value.length);
		element.focus();
		element.selectionStart = startPos + text.length;
		element.selectionEnd = startPos + text.length;
		element.scrollTop = scrollTop;
	} else {
		element.value += text;
		element.focus();
	}
}	

function insertMergeFieldAtCaret(element, mftext) {
	var mstart = mftext.indexOf("mname_");
	var rstart = mftext.indexOf("_rname_");
	
	if(mstart >= 0 && rstart)
	{
		var mvalue = mftext.substring(mstart + 6,rstart);
		var rvalue = mftext.substring(rstart + 7);
		insertAtCaret(element,"[" + mvalue + ":" + rvalue + "]");
	}
}
