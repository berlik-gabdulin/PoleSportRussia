$(function() {

	//SVG Fallback
	if(!Modernizr.svg) {
		$("img[src*='svg']").attr("src", function() {
			return $(this).attr("src").replace(".svg", ".png");
		});
	};


	$(".contact-form__body input, .contact-form__body textarea").prop('required', true);


	//E-mail Ajax Send
	//Documentation & Example: https://github.com/agragregra/uniMail
	$("form").submit(function() { //Change
		var th = $(this),
			name = $('.contact-form__name').val(),
			email = $('.contact-form__email').val(),
			text = $('.contact-form__comment').val();
		$.ajax({
			type: "POST",
			url: "comment.php", //Change
			data: th.serialize(),
			success: function(){ 
				// $('.comments .row').append('<div class="comments__item col-md-4 col-sm-6 col-xs-12"><div class="comments__item-inner"><div class="comments__item-title"></div><div class="comments__item-email"></div><div class="comments__item-text"></div></div></div>');
				// $('.comments__item-title').append(name);
				// $('.comments__item-email').append(email);
				// $('.comments__item-text').append(text);
			}
		}).done(function() {
			$('.contact-form__success').fadeIn();
			setTimeout(function() {
				// Done Functions
				th.trigger("reset");
				$('.contact-form__success').fadeOut();
				}, 2000);
		});
		return false;
	});

	

	//Chrome Smooth Scroll
	try {
		$.browserSelector();
		if($("html").hasClass("chrome")) {
			$.smoothScroll();
		}
	} catch(err) {

	};

	
	$("img, a").on("dragstart", function(event) { event.preventDefault(); });

});
