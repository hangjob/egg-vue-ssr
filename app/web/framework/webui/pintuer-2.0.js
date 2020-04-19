/*!
 * Pintuer v2.0 (https://www.pintuer.com)
 * Copyright 2014-2020 pintuer.com
 */
if (typeof jQuery === 'undefined') {
  throw new Error('Pintuer Pintuer \'s JavaScript requires jQuery');
}

+function($){
  "use strict";
  var pintuer=function(el){
        $(el).on('click','[data-win="refresh"]',this.refresh);
      };
  pintuer.prototype.forward=function(){
    window.history.forward(1);
  };
  pintuer.prototype.back=function(){
    window.history.back(-1);
  };
  pintuer.prototype.top=function(){
    $('body,html').animate({scrollTop:0},1000);
  };
  pintuer.prototype.refresh=function(){
    window.location.reload();
  };
  pintuer.prototype.print=function(){
    window.print();
  };
  pintuer.prototype.close=function(){
    window.close();
  };
  $(document).on('click.pintuer-win','[data-win="forward"]',pintuer.prototype.forward)
    .on('click.pintuer-win','[data-win="back"]',pintuer.prototype.back)
    .on('click.pintuer-win','[data-win="top"]',pintuer.prototype.top)
    .on('click.pintuer-win','[data-win="refresh"]',pintuer.prototype.refresh)
    .on('click.pintuer-win','[data-win="print"]',pintuer.prototype.print)
    .on('click.pintuer-win','[data-win="close"]',pintuer.prototype.close);
}(jQuery);

+function($){
  "use strict";
  var pintuer=function(el){
        $(el).on('click','[data-dismiss="badge"]',this.badge);
      };
  pintuer.prototype.badge=function(){
    $(this).find(".badge").fadeOut();
  };
  pintuer.prototype.alert=function(){
    $(this).closest(".alert").slideUp(function(){
      $(this).remove();
    });
  };
  pintuer.prototype.navswitch=function(){
    $(this).toggleClass("nav-open");
    $($(this).attr("data-navswitch")).slideToggle();
  };
  pintuer.prototype.toast=function(){
    $(this).closest(".toast").slideUp(function(){
      $(this).remove();
    });
  };
  pintuer.prototype.formclear=function(){
    var $this=$(this),$obj=$(this).next("span");
    $obj.css("visibility","visible");
    $obj.on("click",function(){
      $this.val("");
      $(this).css("visibility","hidden");
    });
  };
  pintuer.prototype.sidebar=function(){
    var $opt={},$obj;
    $opt=$.parseJSON($(this).attr("data-sidebar"));
    $obj=$($opt["target"]);
    $(this).toggleClass("nav-open");
    if($opt["max"]){
      if($obj.hasClass("sidebar-close")){
        $obj.css("width",$opt["max"]);
      }else{
        $obj.css("width",$opt["min"]);
      }
    };
    $obj.toggleClass("sidebar-close");
  };
  $(document).on('click.pintuer-badge','[data-dismiss="badge"]',pintuer.prototype.badge)
             .on('click.pintuer-alert','[data-dismiss="alert"]',pintuer.prototype.alert)
             .on('click.pintuer-toast','[data-dismiss="toast"]',pintuer.prototype.toast)
             .on('input.pintuer-formclear','[data-form="clear"]',pintuer.prototype.formclear)
             .on('click.pintuer-navswitch','[data-navswitch]',pintuer.prototype.navswitch)
             .on('click.pintuer-sidebar','[data-sidebar]',pintuer.prototype.sidebar);
}(jQuery);

+function($){
  "use strict";
  var toggle='[data-form="select"]',
  		pintuer=function(el){
  			$(el).on('click',toggle,this.select);
  		};
  pintuer.prototype.select=function(){
    var $option=$(this).children("select.input").find("option");
    var $list="";
    if(!$(this).find("div>ul>li").length){
      $option.each(function(){
        $list=$list+'<li data-option="'+$(this).val()+'">'+$(this).text().replace(/<[^>]+>/g,"")+'</li>';
  		});
      $(this).children("div").children("ul").html($list);
    };
    $(this).toggleClass("drop-open");
  };
  pintuer.prototype.option=function(){
    var $obj=$(this).closest(".input-select").children("select.input");
    $obj.val($(this).attr("data-option"));
  };
  $(document).on('click.pintuer-select',toggle,pintuer.prototype.select)
  .on('click.pintuer-option','[data-option]',pintuer.prototype.option);
}(jQuery);

+function($){
  "use strict";
  var toggle='[data-form="verify"]',
  		pintuer=function(el){
  			$(el).on('click',toggle,this.main);
  		};
  pintuer.prototype.main=function(){
    var $input=$(this).children("input");
    var $type=$input.attr("type").toLowerCase();
    var $val,$len=0,$value,$text;
    $input.focus();
    $len=$input.val().length;
    if(!$len){$len=1;};
    $(this).find("ul>li").eq($len-1).addClass("active");
    $input.on("input propertychange change",function(){
      $value=$(this).val();
      $len=$value.length;
      if($type==="password"){
        $text="•";
      }else{
        $text=$value.substring($len-1,$len);
      };
      if($value){
        $(this).siblings("ul").children("li").eq($len-1).addClass("active").text($text).siblings().removeClass("active");
      }
    }).on("keyup",function(e){
      if(e.keyCode === 8) {
        $(this).siblings("ul").children("li").eq($len).removeClass("active").text("");
      }
    }).on("blur",function(){
      $(this).siblings("ul").children("li").removeClass("active");
      if($input.closest(".dialog").length!==0){
        setTimeout(function(){
          $input.focus();
        },200);
      }
    });
  };
  $(document).on('click.pintuer-verify',toggle,pintuer.prototype.main);
}(jQuery);

+function($){
	'use strict';
	$.fn.wintop=function(){
		var $obj=this;
		$obj.hide();
		$(window).bind("scroll",function(){
			if($(window).scrollTop()>50){$obj.fadeIn();}else{$obj.fadeOut();}
		});
	};
}(jQuery);

+function($){
  "use strict";
  var toggle='[data-form="upfile"]',
      pintuer=function(el){
        $(el).on('change',toggle,this.upfile);
      };
  pintuer.prototype.validate=function($obj,$value,$opt){
    var $text=false;
    var $ext=$value.substr($value.lastIndexOf('.') + 1).toLowerCase();
    var $isIE=navigator.userAgent.indexOf("MSIE");
    var $size=$isIE > 0 ?  $obj.fileSize : $obj.size;
    if($opt['size'] && !eval(Number($size/1024)+$opt["size"])){
      $text=true;
    };
    if($opt['ext'] && $opt['ext'].indexOf($ext)<0){
      $text=true;
		};
    return $text;
  };
  pintuer.prototype.upfile=function(){
    var $file=$(this).val().lastIndexOf("\\");
    var $name=$(this).val().substring($file+1);
    var $opt=$.parseJSON($(this).attr("data-validate"));
    var $text=pintuer.prototype.validate(this.files[0],$(this).val(),$opt["file"]);
    if($text){
      $(this).parent().siblings("span").removeClass("text").addClass("text-danger").text($opt["invalid"]);
      return;
    };
    $(this).parent().siblings("span").addClass("text").removeClass("text-danger").text($name);
  };
  pintuer.prototype.upimage=function(){
    var $opt=$(this).attr("data-validate");
    var $note=$(this).parent().siblings("span");
    var $img=$(this).parent().siblings("img");
    var $root=$(this).parent().parent(".input-upimage");
    var $text=false;
    if($opt){
      $opt=$.parseJSON($opt);
      $text=pintuer.prototype.validate(this.files[0],$(this).val(),$opt["file"]);
    };
    if($text){
      $root.addClass("input-imgerror");
      $root.append('<i data-dismiss="upimage"></i>');
      $note.text($opt["invalid"]);
      return;
    };
    if(this.files && this.files[0]){
      var reader = new FileReader();
      reader.onload = function(evt){
				$img.attr("src",evt.target.result);
        $root.addClass("input-imgshow");
        $root.append('<i data-dismiss="upimage"></i>');
			};
      reader.readAsDataURL(this.files[0]);
    }else{
      $img.attr("src",$(this).val());
    }
  };
  pintuer.prototype.dismiss=function(){
    $(this).parent(".input-upimage").removeClass("input-imgerror input-imgnote input-imgshow");
    $(this).siblings("a").children("input").val("");
    $(this).siblings("img").removeAttr("src");
    $(this).siblings("span").text("");
    $(this).remove();
  };
  $(document).on('change.pintuer-file',toggle,pintuer.prototype.upfile)
             .on('change.pintuer-image','[data-form="upimage"]',pintuer.prototype.upimage)
             .on('click.pintuer-upimage','[data-dismiss="upimage"]',pintuer.prototype.dismiss);
}(jQuery);

+function($){
	'use strict';
	var pintuer=function(obj,option){
		this.obj=obj,
    this.return={},
    this.attr={},
    this.default={"delay":2,"toggle":"click"},
		this.opt=$.extend({},this.default,option);
	};
	pintuer.prototype.main=function(){
    var $this=this,
        $opt=this.opt,
        $obj=this.obj;
    var $text=$obj.val(),$disabled=false;
    if(!$text){$text=$obj.text();};
    if($obj.attr("disabled")){$disabled=true;}
    $this.attr={"text":$text,"class":$obj.attr("class"),"disabled":$disabled};
    if($opt['toggle']=="ready"){
      $this.list();
    }else{
      $obj.unbind($opt['toggle']).on($opt['toggle'],function(){
        $this.list();
      });
    }
	};
  pintuer.prototype.list=function(){
    var $obj=this.obj,
        $opt=this.opt,
        $validate=false,
        $this=this,
        $delay=$opt["delay"];
    this.status($obj,$opt['status']);
    $validate=this.validate($obj,$opt['validate']);
    if($validate){
      if($opt['confirm']){
        $this.attrs($opt['confirm']["attr"]);
        $opt['confirm']["dialog"]["onconfirm"]=function(){
          $this.ajax($obj,$opt['ajax'],0);
          if(!$opt['ajax']){
            $this.timer($obj,$opt['timer'],0);
          }
        };
        $opt['confirm']["dialog"]["oncancel"]=function(){
          $this.attrs($this.attr);
        };
        $().dialog($opt['confirm']["dialog"]);
        if( typeof($opt['confirm']['function'])==="function" ){
          $opt['confirm']['function']();
        }
      }else{
        if(!$opt['status']){$delay=0;};
        this.ajax($obj,$opt['ajax'],$delay);
        if(!$opt['ajax']){
          this.timer($obj,$opt['timer'],$delay);
        }
      }
    }
  };
  pintuer.prototype.status=function($obj,$opt){
    if(!$opt){return true;};
    this.attrs($opt['attr']);
    if( typeof($opt['function'])==="function" ){
      $opt['function']();
    }
  };
  pintuer.prototype.validate=function($obj,$opt){
    if(!$opt){return true;};
    var $this=this,$names=[],$invalid=0;
    $($opt["data"]).trigger("blur");
    $names=$opt["data"].split(",");
    for(var $i=0;$i<$names.length;$i++){
      var $h5check=$names[$i].replace("#","");
      var $jscheck=$($names[$i]).closest(".input-block").hasClass("input-invalid");
      $h5check=document.getElementById($h5check).checkValidity();
      if(!$h5check || $jscheck){
        $invalid++;
      }
    };
    if($invalid){
      $this.attrs($opt['attr']);
      if( typeof($opt['function'])==="function" ){
        $opt['function']();
      };
      setTimeout(function(){
        $this.attrs($this.attr);
      },2000);
      return false;
    };
    return true;
  };
  pintuer.prototype.ajax=function($obj,$opt,$delay){
    if(!$opt){return true;};
    var $this=this;
    var $data={},$return={};
    if($obj.val()){
      $data[$obj.attr("name")]=$obj.val();
    };
    if($opt["data"] && typeof($opt["data"])!=="object"){
      var $names=$opt["data"].split(",");
      for(var $i=0;$i<$names.length;$i++){
        var $name=$names[$i];
        var $ele=$($name);
        $name=$ele.attr("name");
        if($ele.attr("type")==="checkbox"){
          var $chked=$ele.closest("form").find('[name="'+$name+'"]:checked');
          var $chks;
          $chked.each(function(){
            if($chks){
              $chks=$chks+","+$(this).val();
            }else{
              $chks=$(this).val();
            }
          });
          if($chks){
            $data[$name]=$chks;
          }
        }else if($ele.attr("type")==="radio"){
          $data[$name]=$ele.closest("form").find('[name="'+$name+'"]:checked').val();
        }else{
          $data[$name]=$ele.val();
        }
      }
    };
    setTimeout(function(){
      $this.attrs($opt['attr']);
      $.ajaxSetup({async:false});
      $.getJSON($opt["url"],$data,function(data){
        $this.return=data;
      });
      setTimeout(function(){
        if( typeof($opt['function'])==="function" ){
          if(typeof($this.return)!=="object"){
            $this.return=$.parseJSON($this.return);
          };
          $opt['function']($this.return);
        };
        $this.timer($obj,$this.opt['timer'],$this.opt['delay']);
      },1000*$this.opt['delay']);
    },1000*$delay);
  };
  pintuer.prototype.timer=function($obj,$opt,$delay){
    if(!$opt){return true;};
    var $this=this;
    setTimeout(function(){
      $this.attrs($opt['attr']);
      var $count=parseInt($opt['second']);
      var $counttext=$opt['text'];
      var $countdown=setInterval(function(){
        $this.attrs({"text":$opt['text'].replace("#s#",$count)});
        if($count==0){
          clearInterval($countdown);
          if( typeof($opt['function'])==="function" ){
            $opt['function']($this.return);
          }
        }
        $count--;
      },1000);
    },1000*$delay);
  };
  pintuer.prototype.attrs=function($attr){
    if(!$attr){return true;};
    var $obj=this.obj;
    $.each($attr,function($key,$value){
      if($key=="text"){
        $obj.text($value);
        $obj.val($value);
        return true;
      };
      if($key=="disabled"){
        if($value){
          $obj.attr("disabled","disabled");
        }else{
          $obj.removeAttr("disabled")
        };
        return true;
      };
      $obj.attr($key,$value);
    });
  };
	$.fn.button=function(option){
		var button=new pintuer(this,option);
		return button.main();
	};
}(jQuery);

+function($){
	'use strict';
	var pintuer=function(obj,option){
		this.obj=obj,
    this.msg="",
    this.valid="",
    this.confirm=false,
    this.default={"async":0},
		this.opt=$.extend({},this.default,option);
	};
	pintuer.prototype.main=function(){
    var $this=this,
        $obj=this.obj,
        $opt=this.opt;
    $obj.on("blur","[data-validate]",function(){
      var $value=$(this).val().replace(/(^\s*)|(\s*$)/g, ""),
          $validate=$.parseJSON($(this).attr("data-validate"));
      $(this).nextAll('.input-validate').remove();
      if($value || $validate["required"] || $validate["least"]){
				$this.dovalid($(this),$value,$validate);
			}else{
        $(this).closest(".input-block").removeClass("input-valid input-invalid");
      }
    });
    $obj.find('input[type="file"]').on("change",function(){
			$(this).blur();
		});
		$obj.find('input[type="radio"],input[type="checkbox"]').on("click",function(){
			$(this).closest(".input-block").find("[data-validate]").blur();
		});
    $this.dosubmit($obj,$opt);
    $obj.on("reset",function(){
      $this.dorest($obj);
    });
	};
  pintuer.prototype.dovalid=function($input,$value,$validate){
    var $this=this,
        $invalid=false;
    $this.msg="";$this.valid="";
    $.each($validate,function($key,$val){
      if($key=="valid" || $key=="invalid"){
        return true;
      };
      if($val===true){
        if( !$this.types($input,$value,$key) ){
          $invalid=true;
          $this.msg=$validate["invalid"];
          return false;
        };
      }else{
        if( !$this.compare($input,$value,$key,$val) ){
          $invalid=true;
          if(!$this.msg){$this.msg=$validate["invalid"];};
          return false;
        };
      }
    });
    var $show=$input.closest('.input-block');
    $show.removeClass("input-valid input-invalid");
    $show.find('.input-validate').remove();
    if($invalid){
      $show.addClass("input-invalid");
      if($this.msg){
        $show.append('<div class="input-validate"></div>');
        $show.find(".input-validate").text($this.msg);
      }
    }else{
      if(!$this.valid){$this.valid=$validate["valid"]};
      if($this.valid){
        $show.append('<div class="input-validate"></div>');
        $show.find(".input-validate").text($this.valid);
      };
      $show.addClass("input-valid");
    }
  };
  pintuer.prototype.types=function($input,$value,$type){
    var $obj=this.obj;
    switch($type){
			case "required":return /[^(^\s*)|(\s*$)]/.test($value);
			case "chinese":return /^[\u0391-\uFFE5]+$/.test($value);
      case "cnen":return /^[\u4e00-\u9fa5_a-zA-Z ]+$/.test($val);
			case "number":return /^\d+$/.test($value);
			case "integer":return /^[-\+]?\d+$/.test($value);
			case "plusinteger":return /^[+]?\d+$/.test($value);
			case "double":return /^[-\+]?\d+(\.\d+)?$/.test($value);
			case "plusdouble":return /^[+]?\d+(\.\d+)?$/.test($value);
			case "english":return /^[A-Za-z]+$/.test($value);
			case "username":return /^[a-z]\w{3,}$/i.test($value);
      case "password":return /^(?![a-zA-Z]+$)(?![a-zA-Z0-9]+$)(?![a-zA-Z\W_!@#$%^&*`~()-+=]+$)(?![a-zA-Z0-9]+$)(?![a-zA-Z\W_!@#$%^&*`~()-+=]+$)(?![0-9\W_!@#$%^&*`~()-+=]+$)[a-zA-Z0-9\W_!@#$%^&*`~()-+=]{8,}$/.test($value);
			case "mobile":return /^1(3|4|5|6|7|8|9)\d{9}$/.test($value);
			case "phone":return /^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{4,7}(\-\d{1,4})?$/.test($value);
			case "tel":return /^1(3|4|5|6|7|8|9)\d{9}$/.test($value) || /^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{4,7}(\-\d{1,4})?$/.test($value);
			case "email":return /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test($value);
			case "url":return /^(http:|https:)\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/.test($value);
			case "ip":return /^[\d\.]{7,15}$/.test($value);
			case "qq":return /^[1-9]\d{4,10}$/.test($value);
			case "currency":return /^\d+(\.\d+)?$/.test($value);
			case "zip":return /^[1-9]\d{5}$/.test($value);
			case "idcard":return /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[0-2])(0[1-9]|[012]\d|3[0-3])\d{3}(\d|X)$/.test($value);
			case "radio":
				return eval($obj.find('input[name="'+$input.attr("name")+'"]:checked').length==1);
			default:return true;
		}
  };
  pintuer.prototype.compare=function($input,$value,$type,$opt){
    var $this=this,$obj=this.obj;
    switch($type){
      case "pattern":
        return /$opt/.test($value);
        break;
      case "repeat":
        return $value===$('input[name="'+$opt+'"]').eq(0).val();
        break;
      case "equal":
				if($input.attr("type")==="radio"){
					$value=$obj.find('input[name="'+$input.attr("name")+'"]:checked').val();
				};
				if( $value.toString()===$opt.toString() ){
					return true;
				};
				break;
      case "compare":
        return eval(Number($value)+$opt);
        break;
      case "least":
				var $names=$input.attr("name")+','+$opt;
				var $name=$names.split(",");
				var $str;
				for(var $i=0;$i<$name.length;$i++){
					$str=$str+$obj.find('[name="'+$name[$i]+'"]').val();
				};
				if($str!=="undefined"){return true;};
				break;
      case "length":
        var $len;
        if($input.attr("type")==="checkbox"){
          $len=$obj.find('input[name="'+$input.attr("name")+'"]:checked').length;
        }else{
          $len=$value.length;
        };
        return eval($len+$opt);
        break;
      case "ajax":
        var $data={},$return={};
        $data[$input.attr("name")]=$value;
        if($opt["data"]){
          var $names=$opt["data"].split(",");
          for(var $i=0;$i<$names.length;$i++){
            var $name=$names[$i];
            var $ele=$obj.find('[name="'+$name+'"]');
            if($name.substr(0,1)==="#"){
              $ele=$($name);
              $name=$ele.attr("name");
            };
            if($ele.attr("type")==="checkbox"){
							var $chked=$ele.closest("form").find('[name="'+$name+'"]:checked');
							var $chks;
							$chked.each(function(){
								if($chks){
									$chks=$chks+","+$(this).val();
								}else{
									$chks=$(this).val();
								}
							});
							if($chks){
                $data[$name]=$chks;
              }
						}else if($ele.attr("type")==="radio"){
              $data[$name]=$ele.closest("form").find('[name="'+$name+'"]:checked').val();
						}else{
              $data[$name]=$ele.val();
						}
          }
        }
        $.ajaxSetup({async:false});
        $.getJSON($opt["url"],$data,function(data){
          $return=data;
				});
        if(typeof($this.opt["ajax_"+$input.attr("id")])==="function"){
          $this.opt["ajax_"+$input.attr("id")]($return);
        };
        if($return['error'] && $return['msg']){$this.msg=$return['msg'];};
        if(!$return['error'] && $return['msg']){$this.valid=$return['msg'];};
        if($return['error']===0){return true;};
        break;
      case "file":
        var $file=$input[0].files[0];
        var $isIE=navigator.userAgent.indexOf("MSIE");
        var $name=$value.substring($value.lastIndexOf("\\")+1);
        var $size=$isIE > 0 ?  $file.fileSize : $file.size;
        var $ext=$value.substr($value.lastIndexOf('.') + 1).toLowerCase();
        var $check=true;
        if($opt["ext"] && $opt["ext"].indexOf($ext)<0){
          $check=false;
        };
        $size=$size/1024;
        if($opt["size"] && !eval(Number($size)+$opt["size"])){
          $check=false;
        };
        if($opt["type"]=="file"){
          $input.parent().siblings("span").addClass("text").text($name);
        };
        if($opt["type"]=="image" && $check){
          var $preview=$input.parent().siblings("img");
          var $root=$input.parent().parent(".input-upimage");
          if($input[0].files && $input[0].files[0]){
            var $reader = new FileReader();
            $reader.onload = function(evt){
              $preview.attr("src",evt.target.result);
              $root.addClass("input-imgshow");
              $root.append('<i data-dismiss="upimage"></i>');
            };
            $reader.readAsDataURL($input[0].files[0]);
          }else{
            $preview.attr("src",$value.replace(/<[^>]+>/g,""));
          }
        };
        return $check;
        break;
      default:return true;
    }
  };
  pintuer.prototype.dosubmit=function($obj,$opt){
    var $this=this;
    $obj.on("submit",function(){
      if($opt["toggle"]){$($opt["toggle"]).attr("disabled",true);};
      $obj.find("[data-validate]").trigger("blur");
      var $invalid=$obj.find(".input-invalid").not(".input-novalidate").length;
      if($invalid){
        if($opt["toggle"]){$($opt["toggle"]).removeAttr("disabled");};
        var $toinvalid=($obj.find(".input-invalid").first().offset().top)-120;
        $('body,html').animate({scrollTop:$toinvalid},1000);
        return false;
      };
      if($opt["confirm"]){
        $opt["confirm"]["onconfirm"]=function(){
          if($opt["async"]){
            $this.doasync($obj,$opt);
          }else{
            if( typeof($opt["onsubmit"])==="function" ){
              $opt["onsubmit"]();
            };
            $this.confirm=true;
            $obj.submit();
          }
        };
        $opt["confirm"]["oncancel"]=function(){
          if($opt["toggle"]){$($opt["toggle"]).removeAttr("disabled");}
        };
        $().dialog($opt["confirm"]);
      }else{
        if($opt["async"]){
          $this.doasync($obj,$opt);
        }else{
          if( typeof($opt["onsubmit"])==="function" ){
            $opt["onsubmit"]();
          };
          $this.confirm=true;
        }
      };
      if(!$this.confirm){
        return false;
      };
    });
  };
  pintuer.prototype.doasync=function($obj,$opt){
    var $action=$obj.attr("action");
    var $data=$obj.serialize();
    var $this=this;
    if( typeof($opt["onsubmit"])==="function" ){
      $opt["onsubmit"]();
    };
    $.ajax({
      url:$action,
      type:'POST',
      data:new FormData($obj[0]),
      processData:false,
      contentType:false,
      async:false,
      success:function($return){
        if(typeof($opt["success"])==="function"){
          if(typeof($return)!=="object"){
            $return=$.parseJSON($return);
          };
          $this.dorest($obj);
          $opt["success"]($return);
        }
      }
    });
  };
  pintuer.prototype.dorest=function($obj){
    $obj.find(".input-validate").remove();
    $obj.find(".input-valid").removeClass("input-valid");
    $obj.find(".input-invalid").removeClass("input-invalid");
  };
  $.fn.validate=function(option){
		var validate=new pintuer(this,option);
		return validate.main();
	};
}(jQuery);

+function($){
  "use strict";
  var click='[data-click="drop"]',
      dismiss='[data-dismiss="drop"]',
      hover='[data-hover="drop"]',
      leave='.drop-open',
      pintuer=function(el){
        $(el).on('click',click,this.show);
      };
  pintuer.prototype.show=function(){
    var $this=$(this),$dropdown,$show,$toggle;
    $toggle=$(this).attr("data-click");
    if(!$this.hasClass("drop")){$this=$this.closest('.drop');};
    $dropdown=$this.children(".dropdown");
    $show=$(window).scrollTop()+$(window).height()-$dropdown.outerHeight()-$this.outerHeight()-$this.offset().top;
    if($show<=0){$this.addClass("drop-auto");}else{$this.removeClass("drop-auto");};
    $this.addClass("drop-open");
    $("body").attr("data-dismiss","drop");
  };
  pintuer.prototype.close=function(e){
    if($(".drop").hasClass("drop-open") && $(e.target).closest(".dropdown").length===0){
      $(".drop.drop-open").removeClass("drop-open");
      $("body").removeAttr("data-dismiss");
    }
  };
  $(document).on('click.pintuer-drop',click,pintuer.prototype.show).on('click.pintuer-drop',dismiss,pintuer.prototype.close)
             .on('mouseover.pintuer-drop',hover,pintuer.prototype.show);
}(jQuery);

+function($){
  "use strict";
  var click='[data-click="tips"]',
      hover='[data-hover="tips"]',
      dismiss='[data-dismiss="tips"]',
      tips='<div id="tips#id#" class="tips tips-#show#">#content#</div>',
      popove='<div id="tips#id#" class="popove popove-#show#">#title#<div class="popove-body">#content#</div></div>',
  		pintuer=function(el){
  			$(el).on('click',click,this.main);
  		};
  pintuer.prototype.main=function(){
    var $this=$(this),$opt=$.parseJSON($this.attr("data-tips")),$opts={},$x=0,$y=0,$offset=6,$html=tips,$obj,$rand=0;
    if(!$opt || $this.attr("data-show")){return true;};
    if(!$opt["show"]){$opts["show"]="top";}else{$opts["show"]=$opt["show"].replace(/<[^>]+>/g,"");};
    if($opt["title"] || $opt["type"]=="popove"){$html=popove;$offset=10;};
    if($opt["title"]){
      $opts["title"]='<strong class="popove-title">'+$opt["title"].replace(/<[^>]+>/g,"")+'</strong>';
    }else{
      $opts["title"]='';
    };
    $opts["content"]=$opt["content"].replace(/<[^>]+>/g,"");
    $rand=parseInt(Math.random()*(99999999-10000000)+10000000);
    $opts['id']=$rand.toString();
    $.each($opts,function($key,$value){
      $html=$html.replace("#"+$key+"#",$value);
    });
    $("body").append($html);
    $obj=$("#tips"+$rand);
    switch($opts["show"]){
			case "top":
        $x=$this.offset().left + ( $this.outerWidth()-$obj.outerWidth() ) * 0.5;
        $y=$this.offset().top - $obj.outerHeight() - $offset;
        break;
      case "right":
        $x=$this.offset().left + $this.outerWidth() + $offset;
  			$y=$this.offset().top + ( $this.outerHeight()-$obj.outerHeight() ) * 0.5;
        break;
      case "bottom":
        $x=$this.offset().left + ( $this.outerWidth()-$obj.outerWidth() ) * 0.5;
        $y=$this.offset().top + $this.outerHeight() + $offset;
        break;
      case "left":
        $x=$this.offset().left - $obj.outerWidth() - $offset;
  			$y=$this.offset().top + ( $this.outerHeight()-$obj.outerHeight() ) * 0.5;
        break;
		};
    $obj.css({"left":$x,"top":$y}).stop(true,false).fadeIn();
    $this.attr("data-show",$rand);
    if($this.attr("data-click")=="tips"){$("body").attr("data-dismiss","tips");}
  };
  pintuer.prototype.close=function(e){
    var $tips=$(this).find("[data-show]"),$target=0;
    $tips.each(function(){
      var $show=$(this).attr("data-show");
      if($(e.target).attr("data-show")!=$show && $(e.target).closest(".tips").length===0 && $(e.target).closest(".popove").length===0){
        $("#tips"+$show).fadeOut(function(){
          $(this).remove();
        });
        $(this).removeAttr("data-show");
      }else{
        $target++;
      }
    });
    if($target==0){$("body").removeAttr("data-dismiss");}
  };
  pintuer.prototype.leave=function(){
    var $show=$(this).attr("data-show");
    $("#tips"+$show).fadeOut(function(){
      $("#tips"+$show).remove();
    });
    $(this).removeAttr("data-show");
  };
  $(document).on('click.pintuer-tips',click,pintuer.prototype.main).on('click.pintuer-tips',dismiss,pintuer.prototype.close)
             .on('mouseover.pintuer-tips',hover,pintuer.prototype.main).on('mouseleave.pintuer-tips',hover,pintuer.prototype.leave);
}(jQuery);

+function($){
	'use strict';
	var pintuer=function(obj,option){
    this.obj=obj,
    this.default={"min":0,"max":100,"value":0,"bg":"#fff","delay":10},
		this.opt=$.extend({},option);
	};
  pintuer.prototype.main=function(){
    var $this=this,$obj=this.obj,$set=this.opt;
    if(!this.obj){$obj=$(document).find("[data-ring]");};
    $obj.each(function(){
      var $ring=$.parseJSON($(this).attr("data-ring"));
      var $opt=$.extend({},$this.default,$ring,$set);
      if($set['value']>=0){
        $opt["value"]=$set["value"];
      };
      $ring=$.extend({},$ring,$set);
      $this.show($(this),$ring);
      $this.ring($(this),$opt);
    });
  };
  pintuer.prototype.show=function($obj,$opt){
    if(!$obj.find("i").length){
      $obj.append('<div class="ring-left"><i></i></div><div class="ring-right"><i></i></div><div class="ring-mask"><i>0</i><em>0</em><span>%</span></div>');
    };
    if($opt["unit"]){$obj.find("span").text($opt["unit"]);};
    if($opt["size"]){$obj.css("font-size",$opt["size"]);};
    if($opt["precent"]){$obj.css("background-color",$opt["precent"]);};
    if($opt["bg"]){$obj.find(".ring-mask").css("background-color",$opt["bg"]);};
    if($opt["ring"]){$obj.find(".ring-left>i").css("background-color",$opt["ring"]);$obj.find(".ring-right>i").css("background-color",$opt["ring"]);};
    if($opt["unit"] && $opt["unit"]!=="%"){$obj.find(".ring-mask>i").css("display","none");$obj.find(".ring-mask>em").css("display","inline-block");};
    $obj.find(".ring-mask>span").css("display","inline-block");
    if($opt["text"]){$obj.find(".ring-mask").css("color",$opt["text"]);}
  };
  pintuer.prototype.ring=function($obj,$opt){
    var $left=$obj.find('.ring-left>i');
    var $right=$obj.find('.ring-right>i');
    var $start=parseInt($obj.find(".ring-mask>i").html());
    var $end=parseInt(100*($opt["value"]-$opt["min"])/($opt["max"]-$opt["min"]));
    var $count=$start;
    var $loop=setInterval(function(){
      $obj.find(".ring-mask>i").html($count);
      $obj.find(".ring-mask>em").html(parseInt($opt["min"]+$count*($opt["max"]-$opt["min"])/100));
      if($count>=0 && $count<=50){
        $right.css({"transform":"rotate("+($count)*3.6+"deg)"});
      };
      if($count>=50 && $count<=100){
        $left.css({"transform":"rotate("+($count-50)*3.6+"deg)"});
      };
      if($count==$end){
        if($opt["finish"]){
          $obj.find(".ring-mask>i").css("display","none");
          $obj.find(".ring-mask>span").css("display","none");
          $obj.find(".ring-mask>em").html("<i></i>").css("display","inline-block");
          $obj.find(".ring-mask>em>i").addClass($opt["finish"].replace(/<[^>]+>/g,""));
        }else{
          $obj.find(".ring-mask>em").text($opt["value"]);
        };
        clearInterval($loop);
      };
      if($end>$start){
        $count++;
      }else{
        $count--;
      }
    },$opt["delay"]);
  };
  $.fn.ring=function(option){
		var ring=new pintuer(this,option);
		return ring.main();
	};
}(jQuery);

+function($){
	'use strict';
	var pintuer=function(obj,option){
    this.obj=obj,
		this.opt=option;
	};
  pintuer.prototype.main=function(){
    var $obj=this.obj,
        $opt=this.opt,
        $act=$obj.find('[data-action]');
    $act.each(function(){
      var $target=$(this).attr("data-action");
      $(this).on("click",function(){
        if( typeof($opt[$target])==="function" ){
          $opt[$target]();
        }
      });
    });
  };
  $.fn.action=function(option){
		var action=new pintuer(this,option);
		return action.main();
	};
}(jQuery);

+function($){
	'use strict';
	var pintuer=function(obj,option){
    this.obj=obj,
		this.opt=option;
	};
  pintuer.prototype.main=function(){
    var $this=this,$obj=this.obj,$opt=this.opt,$timer=0;
    $this.do($obj,$opt);
    $(window).resize(function(){
      if($timer){clearTimeout($timer);$timer=0;};
      $timer=setTimeout(function(){
        $this.do($obj,$opt);
      },300);
    });
  };
  pintuer.prototype.do=function($obj,$opt){
    var $width=$(window).width(),$attr;
    $.each($opt,function($key,$value){
      if($width>$key){
        $attr=$value;
      }
    });
    $.each($attr,function($k,$v){
      $obj.attr($k,$v);
    });
  };
  $.fn.auto=function(option){
		var auto=new pintuer(this,option);
		return auto.main();
	};
}(jQuery);

+function($){
	'use strict';
	var pintuer=function(ele,options){
		this.obj=ele,
		this.default={"mouse":"click","target_class":"active","toggle_class":"active"},
		this.opt=$.extend({},this.default,options);
	};
	pintuer.prototype.main=function(){
		var $opt=this.opt;
		$($opt["toggle"]).on($opt["mouse"],function(){
			var index=$(this).index();
			$(this).addClass($opt["toggle_class"]).siblings().removeClass($opt["toggle_class"]);
			$($opt["target"]).eq(index).addClass($opt["target_class"]).siblings().removeClass($opt["target_class"]);
		});
	};
	$.fn.tab=function(options){
		var tab=new pintuer(this,options);
		return tab.main();
	};
}(jQuery);

+function($){
	'use strict';
	var pintuer=function(ele,options){
		this.obj=ele,
		this.default={"mouse":"click","class":"active","open":0,"show":0},
		this.opt=$.extend({},this.default,options);
	};
	pintuer.prototype.show=function(){
		var $opt=this.opt;
		if($opt["show"]==1){
			$($opt["toggle"]).eq(0).parent().addClass($opt["class"]);
      $($opt["target"]).eq(0).css("display","block");
		}else if($opt["show"]==2){
			$($opt["toggle"]).parent().addClass($opt["class"]);
      $($opt["target"]).css("display","block");
		};
		$($opt["toggle"]).on($opt["mouse"],function(){
			if($(this).parent().hasClass($opt["class"])){
				if($opt["open"]===1){
					return false;
				}else{
					$(this).next().slideUp().end().parent().removeClass($opt["class"]);
				}
			}else{
				if($opt["open"]===2){
					$(this).next().slideDown().end().parent().addClass($opt["class"]);
				}else{
					$($opt["target"]).slideUp();
					$($opt["toggle"]).parent().removeClass($opt["class"]);
					$(this).next().slideDown().end().parent().addClass($opt["class"]);
				}
			}
		});
	};
	$.fn.fold=function(options){
		var fold=new pintuer(this, options);
		return fold.show();
	};
}(jQuery);

+function($){
	'use strict';
	var pintuer=function(ele,option){
    this.obj=ele,
    this.default={"confirm":"确认","mouse":"click","size":"w10 mini-w7 small-w5 big-w4 large-w3","mask":{"bg":'bg-black',"opacity":50},"cover":true,"dismiss":true},
		this.opt=$.extend({},this.default,option);
	};
  pintuer.prototype.main=function(){
    var $this=this;
    if(this.opt["close"]){
      $this.close($($this.opt["close"]),$this.opt["close"]+"-dialog-mask");
      return false;
    };
    if(!(this.obj.attr("id") || this.obj.attr("class"))){
      this.show();
    }else{
      this.obj.unbind(this.opt["mouse"]).on(this.opt["mouse"],function(){
        $this.show();
      });
    }
  };
  pintuer.prototype.show=function(){
    var $this=this,$opt=$this.opt,$html,$mask,$target,$getbody,$timer=0;
    var $index=$(".dialog.active").length;
    if($opt["target"]["id"]){
      var $optt=$opt["target"];
      if($(document).find("#"+$optt["id"]).length){return false;};
      $optt["break"] ? $optt["class_style"]=" dialog-content-break" : $optt["class_style"]="";
      $optt["dark"] ? $optt["class_style"]+=" dialog-content-dark" : $optt["class_style"]=$optt["class_style"];
      $optt["iframe"] ? $optt["class_style"]+=" dialog-content-iframe" : $optt["class_style"]=$optt["class_style"];
      $html='<div class="dialog dialog-found" id="'+$optt["id"]+'"><div class="dialog-body dialog-content'+$optt["class_style"]+'">';
      $optt["class_style"]="";
      if($optt["iframe"]){
        $html+='<ul class="nav nav-win"><li data-dismiss="dialog" class="close"></li><li data-minimize="dialog" class="minimize"></li><li data-maximize="dialog" class="maximize"></li></ul>';
        $optt["title_style"] ? $optt["title_style"]=$optt["title_style"] : $optt["title_style"]="";
        $html+='<div class="dialog-title '+$optt["title_style"]+'">'+$optt["title"]+'</div>';
        $html+='<iframe id="'+$optt["id"]+'_iframe" src="'+$optt["iframe"]+'" class="dialog-iframe" frameborder="0" width="100%" height="auto" vspace="0" hspace="0" scrolling="auto" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
        if($optt["submit"] || $optt["reset"]){
          $html+='<div class="dialog-button">';
          if($optt["submit"]){$html+='<div class="dialog-confirm" data-submit="dialog">'+$optt["submit"]+'</div>';};
          if($optt["reset"]){$html+='<div class="dialog-cancel" data-reset="dialog">'+$optt["reset"]+'</div>';};
          $html+='</div>';
        }
      }else{
        if($optt["close"]){$html+='<i class="dialog-close" data-dismiss="dialog">&times;</i>';};
        if($optt["title"]){$html+='<div class="dialog-title">'+$optt["title"]+'</div>';};
        $html+='<div class="dialog-text">'+$optt["text"]+'</div>';
        if($optt["confirm"]){$html+='<div class="dialog-confirm" data-confirm="dialog">'+$optt["confirm"]+'</div>';};
        if($optt["cancel"]){$html+='<div class="dialog-cancel" data-cancel="dialog">'+$optt["cancel"]+'</div>';};
      };
      $html+='</div></div>';

      $("body").append($html);
      $target=$(document).find("#"+$opt["target"]["id"]);
      $opt["maskid"]=$opt["target"]["id"];
    }else{
      $target=$($opt["target"]);
      $opt["maskid"]=$opt["target"].replace("#","");
      $opt["maskid"]=$opt["maskid"].replace(".","");
    };
    if($opt["cover"]){
      $getbody=$target.children(".dialog-body");
      if($opt["mask"]){
        $mask='<div class="dialog-mask '+$opt["mask"]["bg"]+'" id="'+$opt["maskid"]+'-dialog-mask" style="opacity:'+$opt["mask"]["opacity"]*0.01+';z-index:'+parseInt($index*100+1000)+';"></div>';
        $("body").append($mask);
      };
      $("body").addClass("dialog-open");
      var $barwidth=$this.barwidth();
      if($barwidth){
        $("body").css("padding-right",$barwidth);
      }
    }else{
      $getbody=$target;
      $target.addClass("dialog-uncover");
    };
    if($opt["ajax"]){
      $.post($opt["ajax"]["url"],$opt["ajax"]["data"],function($data){
        if(typeof($opt["ajax"]["callback"])==="function"){
          if(typeof($data)!=="object"){
            $data=$.parseJSON($data);
          };
          $opt["ajax"]["callback"]($data);
        }
      });
		};
    if($opt["target"]["iframe"]){
      var $maximize=$target.find('[data-maximize="dialog"]');
      $maximize.unbind("click").on("click",function(){
        $getbody.toggleClass("dialog-max").removeClass("dialog-min");
      });
      var $minimize=$target.find('[data-minimize="dialog"]');
      $minimize.unbind("click").on("click",function(){
        $getbody.toggleClass("dialog-min").removeClass("dialog-max");
      });
      var $reimize=$target.find('.dialog-title');
      $reimize.unbind("dblclick").on("dblclick",function(){
        $getbody.removeClass("dialog-min dialog-max");
      });
      var $submit=$target.find('[data-submit="dialog"]');
      $submit.unbind("click").on("click",function(){
        $target.find("#"+$opt["target"]["id"]+"_iframe").contents().find('[data-submit="form"]').click();
      });
      var $reset=$target.find('[data-reset="dialog"]');
      $reset.unbind("click").on("click",function(){
        $target.find("#"+$opt["target"]["id"]+"_iframe").contents().find('[data-reset="form"]').click();
      });
    };
    var $close=$target.find('[data-dismiss="dialog"],[data-confirm="dialog"],[data-cancel="dialog"]');
    $close.unbind("click").one("click",function(){
      $this.close($target,"#"+$opt["maskid"]+"-dialog-mask");
      if($(this).data("confirm") && typeof($opt["onconfirm"])==="function"){
        $opt["onconfirm"]();
      };
      if($(this).data("cancel") && typeof($opt["oncancel"])==="function"){
        $opt["oncancel"]();
      }
    });
    if($opt["dismiss"]){
      $target.one("click",function(e){
        e.preventDefault();
        if($(e.target).closest(".dialog-body").length===0){
          $this.close($target,"#"+$opt["maskid"]+"-dialog-mask");
        }
      });
    };
    if($opt["timer"]){
      setTimeout(function(){
        $this.close($target,"#"+$opt["maskid"]+"-dialog-mask");
      },$opt["timer"]*1000);
    };
    $(window).resize(function(){
			if($timer){clearTimeout($timer);$timer=0;};
			$timer=setTimeout(function(){
        $this.display($target);
      },300);
		});

    $target.css({"z-index":parseInt($index*100+1001),"display":"block"});
    $getbody.addClass($opt["show"]);
    $getbody.addClass($opt["size"]);
    $("#dialog-mask-"+$opt["maskid"]).fadeIn();
    $this.display($target);
  };
  pintuer.prototype.display=function($target){
    var $height=0,$winheight=0,$top=0,$left;
    $winheight=$(window).height();
    $height=$target.children(".dialog-body").outerHeight();
    $left=($(window).width()-$target.children(".dialog-body").outerWidth())*0.5;
    $top=($winheight-$height)*2/5;
    if($top<16){$top=16;};
    if($left<0){$top=0;};
    if(!this.opt["show"]){
      if(this.opt["cover"]){
        $target.children(".dialog-body").css("top",$top);
      }else{
        $target.css({"top":$top,"left":$left});
      }
    };
    if(this.opt["cover"] && this.opt["show"]=="fixed-bottom-center"){
      $target.children(".dialog-body").css({"left":$left});
    };
    if((this.opt["show"]=="fixed-left-center" || this.opt["show"]=="fixed-right-center")){
      if(this.opt["cover"]){
        $target.children(".dialog-body").css("top",$top);
      }else{
        $target.css({"top":$top});
      }
    };
    if(this.opt["target"]["iframe"]){
      var $iframe=52;
      if(this.opt["target"]["submit"] || this.opt["target"]["reset"]){
        $iframe=104;
      };
      if(!this.opt["cover"]){
        $target.find(".dialog-iframe").attr("height",$target.height()-$iframe);
      }else{
        $target.find(".dialog-iframe").attr("height",$target.children(".dialog-body").height()-$iframe);
      }
    };
    $target.addClass("active");
    if(this.opt["style"]){
      if(!this.opt["cover"]){
        $target.addClass(this.opt["style"]);
      }else{
        $target.children(".dialog-body").addClass(this.opt["style"]);
      }
    }
  };
  pintuer.prototype.close=function($target,$maskid){
    var $this=this,$getbody;
    $target.unbind();
    if($target.hasClass("dialog-found")){
      $target.removeClass("active").fadeOut(function(){
        $(this).remove();
      });
    }else{
      $target.removeClass("active").fadeOut(function(){
        if($this.opt["cover"]){
          $getbody=$(this).children(".dialog-body");
        }else{
          $getbody=$(this);
        };
        $getbody.removeClass($this.opt["show"]);
        $getbody.removeClass($this.opt["size"]);
        $getbody.removeClass($this.opt["style"]);
      });
    };
    $($maskid).fadeOut(function(){
      $(this).remove();
    });
    if(typeof($this.opt["onclose"])==="function"){
      $this.opt["onclose"]();
    };
    if($(document).find(".dialog.active").length<=1){
      $("body").removeClass("dialog-open").css("padding-right","");
    }
  };
  pintuer.prototype.barwidth=function(){
    var $div = document.createElement('div');
    $div.className = "dialog-barwidth";
    document.body.appendChild($div);
    var $barwidth = $div.getBoundingClientRect().width - $div.clientWidth;
    document.body.removeChild($div);
    return $barwidth;
  };
  $.fn.dialog=function(option){
		var dialog=new pintuer(this,option);
		return dialog.main();
	};
}(jQuery);

+function($){
	'use strict';
	var pintuer=function(ele,options){
		this.obj=ele,
    this.current=0,
    this.default={"effect":"scroll","autoplay":false,"interval":5,"toggle":{"class":"nav nav-turn","active":"active"},"touch":true,"space":0,"row":1,"column":1,"speed":500},
		this.opt=$.extend({},this.default,options);
	};
	pintuer.prototype.main=function(){
    var $this=this,$opt=$this.opt,$timer=0;
    if($opt["page"]){
      $this.toggle();
    };
    if($opt["prev"]){
      $this.prev();
    };
    if($opt["next"]){
      $this.next();
    };
    if($opt["autoplay"]){
      $this.auto();
    };
    if($opt["touch"]){
      $this.touch();
    };
    var $items=$this.items().length;
    var $num=$this.num();
    $num=$num[0]*$num[1]*($this.page()+1);
    if($items!==$num){
      for(var $i=0;$i<($num-$items);$i++){
        $this.obj.children(".flip-body").append('<div class="flip-item"></div>');
      }
    };
    var $chkboxwidth=setInterval(function(){
      if($this.boxwidth()){
        $this.show();
        clearInterval($chkboxwidth);
      }
    },10);
    $(window).resize(function(){
      if($timer){clearTimeout($timer);$timer=0;};
      $timer=setTimeout(function(){
        $this.show();
      },300);
    });
	};
  pintuer.prototype.show=function(){
    var $this=this,$obj=this.obj,$opt=this.opt,$box=0,$index=0,$xspace,$yspace;
    var $num=this.num();
    var $column=$num[0];
    var $row=$num[1];
    var $space=$num[2];
    var $width=this.width();
    var $height=0;
    var $items=this.items();
    if($column==1){$xspace=0;}else{$xspace=$space;};
    if($row==1){$yspace=0;}else{$yspace=$space;};
    $num=$column*$row;
    $box=$this.boxwidth()+$xspace;
    $obj.children(".flip-body").css({"transform":"translateX(-"+ $box +"px)"});
    if($column>1){
      $items.css({"width":$width,"margin-right":$xspace});
    };
    $items.hide();
    if($row>1){
      $obj.addClass("flip-rows");
      $height=this.height($row,$yspace);
      $items.css("height",$height);
      $items.each(function(){
        $index=$(this).index();
        if($index%$row){
          $(this).css("margin-top",$yspace);
        }
      });
    }
    for(var $i=0;$i<$num;$i++){
      $items.eq($i).css({"transform":"translateX("+$box+"px)"}).show();
    };
    $this.current=0;
  };
  pintuer.prototype.play=function($current,$x){
    if(this.current==$current){return true;};
    var $this=this;
    var $opt=this.opt;
    var $items=this.items();
    var $num=this.num();
    var $column=$num[0];
    var $row=$num[1];
    var $width=this.width();
    var $space=$num[2];
    var $box=0;
    var $optpage=$.extend($opt["toggle"],$opt["page"]);
    var $start=0;
    $num=$num[0]*$num[1];
    if($column==1){$space=0;};
    $box=$this.boxwidth()+$space;
    $start=$current*$num;
    $this.obj.find(".flip-page").children("li").css("transition","all "+$opt["speed"]+"ms linear").eq($current).addClass($optpage["active"]).siblings().removeClass($optpage["active"]);
    if($opt["effect"]=="fade"){
      $items.fadeOut($opt["speed"]).css("order","");
      for(var $i=0;$i<$num;$i++){
        if($x==2){
          if($current==0){
            $items.eq($start+$i).css({"order":"2"});
          };
          $items.eq($start+$i).css({"transform":""});
        }else{
          $items.eq($start+$i).css({"transform":"","order":"2"});
        };
        $items.eq($start+$i).stop(true,false).fadeIn($opt["speed"],function(){
          $(this).css({"transform":"translateX("+$box+"px)"});
          $this.current=$current;
        });
			}
    }else{
      if($x==2){
        $items.css({"transform":"translateX("+$box+"px)"});
      }else{
        $items.css({"transform":""});
      };
      for(var $i=0;$i<$num;$i++){
        if($x==2 && $current==0){
          $items.eq($start+$i).css({"order":"2"});
        };
        if($x==0 && $current==$this.page()){
          $items.eq($start+$i).css({"order":"-1"});
        };
        $items.eq($start+$i).show();
			};
      $this.obj.children(".flip-body").css({"transform":"translateX(-"+($box*$x)+"px)","transition-duration":$opt["speed"]+"ms"});
      setTimeout(function(){
        $items.css({"transform":"","order":""}).hide();
        for(var $i=0;$i<$num;$i++){
          $items.eq($start+$i).show().css({"transform":"translateX("+$box+"px)"});
        };
        $this.obj.children(".flip-body").css({"transform":"translateX(-"+($box)+"px)","transition-duration":"0ms"});
        $this.current=$current;
      },$opt["speed"]);
    }
  };
	pintuer.prototype.toggle=function(){
    var $this=this,$obj=$this.obj,$opt,$html,$toggle;
    $opt=$.extend(this.opt["toggle"],this.opt["page"]);
    $html='<ul class="flip-page">';
    for(var $i=0;$i<$this.page()+1;$i++){
      $html+='<li><a href="javascript:;"></a></li>';
    };
    $html+='</ul>';
    $obj.append($html);
    $obj.find(".flip-page>li").first().addClass($opt["active"]);
    $obj.find(".flip-page").addClass($opt["class"]);
    $this.tclick();
	};
  pintuer.prototype.tclick=function(){
    var $this=this,$li=$this.obj.find(".flip-page>li"),$index=0,$current=0;
    $li.on("click",function(){
      $index=$(this).index();
      $current=$this.current;
      if($index>$current){
        $this.play($index,2);
      }else if($index<$current){
        $this.play($index,0);
      }else{
        return false;
      }
    });
  };
	pintuer.prototype.prev=function(){
		var $this=this,$current=0,$page=this.page();
    if($page==0){return false;};
    $($this.opt["prev"]).on("click",function(){
      $current=$this.current;
      if($current===0){
        $this.play($page,0);
      }else{
        $this.play($current-1,0);
      }
    });
	};
	pintuer.prototype.next=function(){
		var $this=this,$current=0,$page=this.page();
    if($page==0){return false;};
    $($this.opt["next"]).on("click",function(){
      $current=$this.current;
      if($current===$page){
        $this.play(0,2);
      }else{
        $this.play($current+1,2);
      }
    });
	};
  pintuer.prototype.auto=function(){
    var $this=this,$current=0,$page=0,$opt=this.opt,$obj=$this.obj;
    var $autoplay=setInterval(function(){
      $current=$this.current;
      $page=$this.page();
      if($page==0){clearInterval($autoplay);};
      if($current===$page){
        $this.play(0,2);
      }else{
        $this.play($current+1,2);
      }
    },$opt["interval"]*1000);
    var $auto=function(){
      $autoplay=setInterval(function(){
        $current=$this.current;
        $page=$this.page();
        if($page==0){clearInterval($autoplay);};
        if($current===$page){
          $this.play(0,2);
        }else{
          $this.play($current+1,2);
        }
      },$opt["interval"]*1000);
    };
    var $pause=function(){clearInterval($autoplay);};
    $obj.hover($pause,$auto);
  };
  pintuer.prototype.touch=function(){
    var $this=this,$obj=this.obj,$dot,$start,$end;
    $obj.on("touchstart",function(e){
      e.preventDefault();
      $dot=e.targetTouches[0];
      $start={"x":$dot.pageX,"y":$dot.pageY,"time":+new Date()};
    });
    $obj.on("touchmove",function(e){
      e.preventDefault();
      $dot=e.targetTouches[0];
      $end={"x":$dot.pageX-$start["x"],"y":$dot.pageY-$start["y"],"time":+new Date()-$start["time"]};
    });
    $obj.on("touchend",function(){
      if(Math.abs($end["y"])>Math.abs($end["x"])){return;};
      if(Number($end["time"])<100){return;};
      var $current=$this.current,$page=$this.page();
      if($end["x"]>10){
        if($current===0){
          $this.play($page,0);
        }else{
          $this.play($current-1,0);
        }
      }else if($end["x"]<-10){
        if($current===$page){
          $this.play(0,2);
        }else{
          $this.play($current+1,2);
        }
      }
    });
  };
  pintuer.prototype.num=function(){
    var $opt=this.opt;
    var $win=$(window).width();
		var $column=$opt["column"];
    var $row=$opt["row"];
    var $space=$opt["space"];
    if($opt["auto"]){
      $.each($opt["auto"],function($key,$value){
        if($win>$key){
          if(typeof($value)==="object"){
            $value["column"] ? $column=$value["column"] : $column=$column;
            $value["row"] ? $row=$value["row"] : $row=$row;
            $value["space"] ? $space=$value["space"] : $space=$space;
          }else{
            $column=$value;
          }
        }
      });
    }
		return [$column,$row,$space];
  };
  pintuer.prototype.items=function(){
    return this.obj.children(".flip-body").children('.flip-item');
  };
	pintuer.prototype.page=function(){
    var $num=this.num();
		return Math.ceil(this.items().length/($num[0]*$num[1]))-1;
	};
  pintuer.prototype.boxwidth=function(){
    var $width=this.obj.width();
    if(!$width){
      var $div = document.createElement('div');
      $div.className = "truns-boxwidth";
      this.obj.append($div);
      $width = $div.clientWidth;
      this.obj.children(".truns-boxwidth").remove();
    };
    return $width;
	};
	pintuer.prototype.width=function(){
    var $num=this.num();
		return Math.ceil((this.obj.outerWidth()-($num[0]-1)*$num[2])/$num[0]);
	};
  pintuer.prototype.height=function($row,$space){
    var $height;
    $height=this.obj.height();
    $height=($height+$space-$row*$space)/$row;
		return $height;
	};
	$.fn.flip=function(options){
		var flip=new pintuer(this,options);
		return flip.main();
	};
}(jQuery);

+function($){
	'use strict';
	var pintuer=function(ele,option){
    this.obj=ele,
    this.min=[],
    this.height=0,
    this.page=0,
    this.delay=10,
    this.default={"space":16,"column":2,"pagination":"page","loading":"<div class=\"loader falls-loading\"><i></i></div>"},
		this.opt=$.extend({},this.default,option);
	};
  pintuer.prototype.main=function(){
    var $this=this,$timer=0;
    var $chkboxwidth=setInterval(function(){
      if($this.boxwidth()){
        $this.obj.children('.falls-item').css("width",$this.width());
        $this.get();
        $this.obj.find(".falls-boxwidth").remove();
        clearInterval($chkboxwidth);
      }
    },10);
    if(this.opt["toggle"]){
      $(this.opt["toggle"]).on("click",function(){
        $this.delay=10;
        $this.get();
      });
    }else if($this.opt["scroll"]){
      var $scroll=$($this.opt["scroll"]);
      if(!$scroll.html()){$scroll=$(window);};
      $scroll.bind("scroll",function(){
        if($timer){clearTimeout($timer);$timer=0;};
        $timer=setTimeout(function(){
          if(($scroll.scrollTop()+$scroll.height()+100)>$this.obj.outerHeight()){
            $this.delay=10;
            $this.get();
          }
        },500);
      });
    }
    $timer=0;
    $(window).resize(function(){
      if($timer){clearTimeout($timer);$timer=0;};
      $timer=setTimeout(function(){
        var $active=$this.obj.children(".falls-item.active").length;
        $this.obj.children(".falls-item").css({"width":$this.width(),"top":"","left":"","transition":""}).removeClass("active");
        $this.delay=0;
        $this.height=0;
        $this.show(0,$active);
      },200);
    });
  };
  pintuer.prototype.get=function(){
    if(this.opt["url"]){
      this.ajax();
    }else{
      this.setlist();
    }
  };
  pintuer.prototype.ajax=function(){
    var $this=this,$data,$opt=this.opt;
    var $pagination=$opt["pagination"]+"="+($this.page+1);
    var $url=$opt["url"];
    if($url.indexOf("?")>=0){
      $url=$url+"&"+$pagination;
    }else{
      $url=$url+"?"+$pagination;
    };
    $data=$.ajax({url:$url,async:false}).responseText;
    if($data){
      $this.obj.append($data);
      $this.page=$this.page+1;
      $this.setlist();
    }else{
      $this.none();
    }
  };
  pintuer.prototype.setlist=function(){
    var $this=this,$opt=this.opt,$obj=this.obj;
    var $img=this.obj.children(".falls-item").not(".active").find('img');
    $img.each(function(){
      $(this).attr("data-src",$(this).attr("src").replace(/<[^>]+>/g,"")).removeAttr("src");
    });
    var $active=$obj.children('.falls-item.active').length;
    var $list=$opt["list"];
    if($opt["url"]){
      $list=$obj.children(".falls-item").not(".active").length;
      $obj.children(".falls-item").not(".active").css("width",$this.width());
    };
    if(!$list){$list=this.list();};

    if($obj.children(".falls-item").not(".active").length){
      this.show($active,$list);
      if(!$opt["url"] && ($opt["toggle"] || $opt["scroll"]) && $active+$list>=$this.list()){
        $this.none();
      }
    };
  };
  pintuer.prototype.show=function($active,$list){
    var $this=this,$i=0;
    $this.obj.append($this.opt["loading"]);
    $($this.opt["toggle"]).css("opacity",0);

    var $display=setInterval(function(){
      if($this.chkimg($active+$i)){
        $this.display($active+$i,$i);
        $i++;
      };
      if($i==$list){
        $this.obj.find(".falls-loading").remove();
        if($this.opt["url"] || $active+$list!==$this.list()){
          $($this.opt["toggle"]).css({"opacity":1,"transition":"all 0.75s ease "+($i*$this.delay/100)+"s"});
        };
        clearInterval($display);
      };
    },50);
  };
  pintuer.prototype.display=function($active,$i){
    var $this=this;
    var $space=this.opt.space;
    var $delay=this.delay;
    var $item=this.obj.children('.falls-item').eq($active);
    var $itemwidth=this.width();
    var $itemheight=$item.outerHeight();
    if($active<this.column()){
      $this.min[$active]=$itemheight;
      $item.css({"top":0,"left":$i*($itemwidth+$space),"transition":"all 0.75s ease "+($i*$delay/100)+"s"});
    }else{
      var $minH=Math.min.apply(null,$this.min);
      var $minKey=this.findkey($this.min,$minH);
      $this.min[$minKey]+=$itemheight+$space;
      $item.css({"top":$minH+$space,"left":$minKey*($itemwidth+$space),"transition":"all 0.75s ease "+($i*$delay/100)+"s"});
    };
    $item.addClass("active");
    if(($minH+$space+$itemheight)>$this.height){
      $this.height=($minH+$space+$itemheight);
    };
    $this.obj.css({"height":$this.height,"transition":"all 0.1s ease"});
  };
  pintuer.prototype.none=function(){
    this.obj.find(".falls-loading").remove();
    $(this.opt["toggle"]).remove();
    if(this.opt["none"]){
      this.obj.after('<div class="hr align-center text-silver border-light size-mini"><span>'+this.opt["none"]+'</span></div>');
    };
  };
  pintuer.prototype.chkimg=function($active){
    var $check=true,$this=this,$datasrc;
    var $item=this.obj.children('.falls-item').eq($active);
    $item.find("img").each(function(){
      var $img=$(this);
      $datasrc=$img.attr("data-src");
      if($datasrc){
        $().imgsize({
          "ready":function(data){
            if(data){
              $img.attr({"src":$img.attr("data-src").replace(/<[^>]+>/g,""),"width":data[0],"height":data[1]}).removeAttr("data-src").addClass("img-auto");
            };
          },
          "src":$datasrc,
        });
        $check=false;
      };
    });
    return $check;
  };
  pintuer.prototype.column=function(){
    var $opt=this.opt;
    var $win=$(window).width();
		var $column=$opt.column;
    if($opt["auto"]){
      $.each($opt["auto"],function($key,$value){
        if($win>$key){
          $column=$value;
        }
      });
    }
		return $column;
  };
	pintuer.prototype.list=function(){
		return this.obj.children('.falls-item').length;
	};
  pintuer.prototype.boxwidth=function(){
    var $width=this.obj.width();
    if(!$width){
      var $div = document.createElement('div');
      $div.className = "falls-boxwidth";
      this.obj.append($div);
      $width = $div.clientWidth;
      this.obj.children(".falls-boxwidth").remove();
    };
    return $width;
	};
	pintuer.prototype.width=function(){
		return Math.ceil((this.obj.width()-(this.column()-1)*this.opt.space)/this.column());
	};
	pintuer.prototype.findkey=function($s,$v){
		for(var $k in $s){if($s[$k]===$v){return $k;}}
	};
  $.fn.falls=function(option){
		var falls=new pintuer(this,option);
		return falls.main();
	};
}(jQuery);

+function($){
	'use strict';
	var pintuer=function(ele,option){
    this.obj=ele,
    this.objtop=0,
    this.default={"target_class":"active","toggle":false,"toggle_class":"active","bottom":false,"full":false,"loop":false,"offset":0,"delay":15},
		this.opt=$.extend({},this.default,option);
	};
  pintuer.prototype.main=function(){
    var $this=this,$obj=$this.obj,$opt=$this.opt,$timer;
    if(!$obj.html()){
      $obj=$(window);
      $this.objtop=$this.wintop();
    };
    $this.show();
    $(window).resize(function(){
			if($timer){clearTimeout($timer);$timer=0;};
			$timer=setTimeout(function(){
        $this.show();
      },200);
		});
    if($opt["toggle"]){$this.nav();};
    $obj.bind("scroll",function(){
			if($timer){clearTimeout($timer);$timer=0;};
			$timer=setTimeout(function(){
        $this.scroll();
      },30);
		});
  };
  pintuer.prototype.wintop=function(){
    var $obj=this.obj;
    var $top=0;
    var $div = document.createElement('div');
    if(!$obj.html()){$obj=$("body");};
    $div.className = "scroll-offset";
    $obj.prepend($div);
    $top = parseInt($obj.children(".scroll-offset").offset().top);
    $obj.children(".scroll-offset").remove();
    return $top;
  };
  pintuer.prototype.show=function(){
    var $obj=this.obj,$opt=this.opt,$top=0;
    if(!$obj.html()){
      $obj=$(window);
      $top=this.objtop;
    }else{
      $top=parseInt($($opt["target"]).eq(0).offset().top);
    };
    setTimeout(function(){
      if($opt["fixed"]){
        $($opt["target"]).each(function(){
          $(this).attr("data-top",parseInt($(this).offset().top));
        });
      };
      if($opt["full"]){
        $($opt["target"]).css({"width":"100%","height":$obj.height()});
      };
      if($opt["bottom"] && !$opt["fixed"]){
        $($opt["target"]).each(function(){
          if(parseInt($(this).offset().top - $top) < parseInt($obj.height() - $opt["offset"])){
            $(this).addClass($opt["target_class"]);
          }
        });
      }
    },500);
  };
  pintuer.prototype.nav=function(){
    var $this=this,$obj=$this.obj,$opt=$this.opt,$show,$index=0,$top=0,$height=0;
    $($opt["toggle"]).on("click",function(){
      $index=$(this).index();
      if(!$obj.html()){
        $top=$this.objtop;
        $height=$(window).height();
      }else{
        $top=parseInt($($opt["target"]).eq(0).offset().top);
        $height=$obj.height();
      };
      $show=parseInt($($opt["target"]).eq($index).offset().top) - $top + $opt["offset"];
      if($opt["bottom"]){
        $show=$show - $height;
      };
      if(!$obj.html()){
				$('body,html').animate({scrollTop:$show},1000);
			}else{
				$obj.animate({scrollTop:$show},1000);
			}
    });
  };
  pintuer.prototype.scroll=function(){
    var $this=this,$obj=$this.obj,$opt=$this.opt,$scroll,$show,$list,$item,$delay=0,$current=0,$top=0;
    if(!$obj.html()){
      $obj=$(window);
      $top=$this.objtop;
    }else{
      $top=parseInt($($opt["target"]).eq(0).offset().top);
    };
    $list=$($opt["target"]).length;
    $scroll=$obj.scrollTop();
    for(var $i=0;$i<$list;$i++){
      $item=$($opt["target"]).eq($i);
      if($opt["fixed"]){
        if($opt["bottom"]){
          $show=$scroll + $obj.height() - $opt["offset"] - parseInt($item.attr("data-top"));
        }else{
          $show=$scroll + $opt["offset"] - parseInt($item.attr("data-top"));
        }
      }else{
        $show=$scroll + $top - parseInt($item.offset().top);
        if($opt["bottom"]){
          $show=$show + $obj.height() - $opt["offset"];
        }else{
          $show=$show + $opt["offset"];
        }
      };
      if($show>=0){
        if(!$item.hasClass($opt["target_class"])){
          $item.addClass($opt["target_class"]);
          if($opt["delay"]){
            $item.css("transition","all 0.5s ease "+($delay*$opt["delay"]/100)+"s");
            $delay++;
          }
        };
        if($opt["toggle"]){
          $($opt["toggle"]).eq($i).addClass($opt["toggle_class"]).siblings().removeClass($opt["toggle_class"]);
        }
      }else{
        if($opt["loop"]){
          $item.removeClass($opt["target_class"]).css("transition","");
        }
      };
    }
  };
  $.fn.scroll=function(option){
		var scroll=new pintuer(this,option);
		return scroll.main();
	};
}(jQuery);

+function($){
	'use strict';
	var pintuer=function(ele,option){
    this.obj=ele,
		this.opt=option;
	};
  pintuer.prototype.main=function(){
    var $this=this,$image,$w,$h,$width,$height,$opt=this.opt;
    if(!$opt["src"]){return;};
    $image=new Image();
    $image.src=$opt["src"];
    if($image.complete){
      $width=$image.width;
      $height=$image.height;
      $image=$image.onload=$image.onerror=null;
      $opt["ready"]([$width,$height]);
      return;
    };
    $image.onerror=function(){
      $width = -1;
      $height = -1;
      $image=$image.onload=$image.onerror=null;
      $opt["ready"]([$width,$height]);
      return;
    };
    $image.onload=function(){
      $width=$image.width;
      $height=$image.height;
      $image=$image.onload=$image.onerror=null;
      $opt["ready"]([$width,$height]);
      return;
    };
    if($image && $image!==null){
      $w=$image.width;
      $h=$image.height;
      var $chkimg=setInterval(function(){
        $width=$image.width;
        $height=$image.height;
        if($width!==$w || $height!==$h || $width*$height>1024){
          $image=null;
          $opt["ready"]([$width,$height]);
          clearInterval($chkimg);
          $chkimg=null;
        };
      },30);
    }
  };
  $.fn.imgsize=function(option){
		var imgsize=new pintuer(this,option);
		return imgsize.main();
	};
}(jQuery);
