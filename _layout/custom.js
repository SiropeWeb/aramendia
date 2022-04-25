

	$(window).resize(function(){	
		checkPageHeight();
	});
	
	
	$(function(){
	
		checkPageHeight();
		
		$(window).scroll();
		
		handle_contact_form();
		handle_navigation();
		handle_portfolio();
		handle_resume();
		
	});
	
	
	function handle_resume(){
		$('#resume-wrap .left a').hover(function(){
			$('#resume-wrap').addClass('lt');
		}, function(){
			$('#resume-wrap').removeClass('lt');
		});
		
		$('#resume-wrap .right a').hover(function(){
			$('#resume-wrap').addClass('rt');
		}, function(){
			$('#resume-wrap').removeClass('rt');
		});
	}
	
	
	//##
	//## Handle the portfolio behaviour - pagination, colorbox, hover
	//##
	function handle_portfolio(){
		
		
		//## Portfolio large preview using Colorbox
		//##
		$('.portfolio-items a').colorbox();	
		
		
		//## Portfolio hover effect
		//##
		$(".portfolio-items li").hover(function(){ 
			$('div', this).fadeIn(150);
		}, function(){
			$('div', this).fadeOut(150);
		});
		
		
		//## Portfolio pagination
		//##
		$('.pagination a').click(function(){
			var page = $(this).attr('rel');
			var lastPage = $('.pagination .active').attr('rel');
			
			if ($(this).hasClass('active')){
				return false;
			}
			
			$('.pagination .active').removeClass('active');
			$(this).addClass('active');
			
			animateStep(lastPage, page);
			
			return false;
		});
	}
	
	
	//##
	//## Attach the behaviour to pages navigation
	//##	
	function handle_navigation(){

		$('#navigation a').click(function(){
			var relatedID = $(this).attr('rel');
			var nextPage = this;
			
			if ($('#'+relatedID).hasClass('active') == false){
				$('#pages > div:visible').fadeOut('fast', function(){
					$(this).removeClass('active');
					
					$('#navigation .active').removeClass('active');
					$(nextPage).addClass('active');
					
					$('#pages > #'+relatedID).fadeIn('fast');
				});	
				
				//console.log('Show page:' + relatedID);
			}else{
				//console.log('Page already visible:' + relatedID);
			}
			
			
			return false;
		});
		
	}
	
		
	function animateStep(lastPage, page, order){

		if ($(".portfolio-items."+lastPage+" li:visible").size()){
				$(".portfolio-items li:visible").last().fadeOut(50, function(){
					animateStep(lastPage, page);
				});
		}else{
			$(".portfolio-items").removeClass(lastPage);
			
			//typeof(order)=='undefined') && 
			if ($(".portfolio-items li."+page+":hidden").size()) {
				$(".portfolio-items li."+page+":hidden").first().fadeIn(50, function(){
					animateStep(lastPage, page);
				});
			}else{
				$(".portfolio-items").addClass(page);
			}
		}
		
	}
	
	function setDefaultField(selector, default_value){
		$(selector).click(function(){
			selector_def_val = default_value;
			
			if ($(this).val() == selector_def_val){
				$(this).val('');
			}
		});
		
		$(selector).blur(function(){
			if ($(this).val() == ''){
				$(this).val(default_value);
				
				$(this).addClass('no-value');
			}else{
				$(this).removeClass('no-value').removeClass('error');
			}
		});
		
	}
	
	function handle_contact_form(){

	
			//##
			//## Set default values on fields
			//##
			
			setDefaultField('#frm-name', $('#frm-name').val() );
			setDefaultField('#frm-email', $('#frm-email').val() );
			setDefaultField('#frm-message', $('#frm-message').val() );
		
		
		
			//##
			//## Send message via contact form
			//##
			$('.contact-submit').click(function(){
				
				
				//## Form validation (comment this code if you want to remove the validation)
				if ($('.no-value').size()){
					$('.no-value').each(function(){
						$(this).addClass('error');
					});
					
					$('.frm-state').html('Please complete all the required fields!').removeClass('red').fadeIn();
					
					return false;
				}else{
					$('.frm-state').html(''); 
				}
				//## End form validation
				
				
				var frmName = $('#frm-name').attr('value');						//Get name field value
				var frmMail = $('#frm-email').attr('value');					//Get e-mail field value
				var frmMessage = $('#frm-message').attr('value');				//Get textarea message
				
				//##
				//## Send data using ajax
				//##
				$.post("mail.php", {action: "sendMail", name: frmName , mail: frmMail, message: frmMessage},
				function(data){ 
					if (data.success == '1'){
						//If the mail was sent show the "success" message
						$('.frm-state').html(data.message).removeClass('red').fadeIn();
 
						$('.frm-name').val('').blur();
						$('.frm-mail').val('').blur();
						$('.frm-message').val('').blur(); 
						
					}else{
						//If the mail has failed show the error message
						$('.frm-state').html(data.message).addClass('red').fadeIn();  
					}
				});
				
				return false;
			});
		
	}
	
	function checkPageHeight(){
		var remainingSpace = $('body').height() - ($('#layout-wrapper').height()+50);
		var currentHeight = $('#pages').height() + remainingSpace;
		
		//$('#pages').css('height', currentHeight+'px');
		
		var personHeight = $('#portrait').height();
		if (personHeight > 926){
			$('#portrait').addClass('extra');
		}else{
			$('#portrait').removeClass('extra');
		}
	}
	
	$(window).scroll(function () { 
	
	});
	
	function checkPageScroll(){
		if (typeof(jQuery.browser.msie) != "undefined"){ 
			$('#footer').addClass('expanded');
			$('body').addClass('ie');
			$(window).resize();
			
			return false;		
		}
		
		var footerOffset = window.pageYOffset + window.innerHeight;
		var fullWidth = $('#layout-wrapper').height()+50;
		
		if (fullWidth - footerOffset >= 60){
			$('#footer').addClass('expand').stop(true,true).animate({bottom:'0'});
		}else{
			$('#footer').removeClass('expand').stop(true,true).animate({bottom:'-60px'});
		}

	}
	
