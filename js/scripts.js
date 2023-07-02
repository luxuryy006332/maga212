jQuery(window).on("load", function() {
	"use strict";

	/* -----------------------------------------
	 FlexSlider Init
	 ----------------------------------------- */
	var homeSlider = jQuery('.home-slider');
	if ( homeSlider.length ) {
		homeSlider.flexslider({
			prevText: '',
			nextText: '',
			directionNav: false,
			start: function(slider) {
				slider.removeClass('loading');

				if ( jQuery(window).width() > 767 ) {
					positionSldNav();
				}
			}
		});
	}

	var portfolioSlider = jQuery('.portfolio-slider');
	if ( portfolioSlider.length ) {
		portfolioSlider.flexslider({
			prevText: '',
			nextText: '',
			directionNav: false,
			start: function(slider) {
				slider.removeClass('loading');
			}
		});
	}

	var testimonialSlider = jQuery('.testimonials');
	if ( testimonialSlider.length ) {
		testimonialSlider.flexslider( {
			directionNav: false,
			prevText  : '',
			nextText  : ''
		} );
	}

	function initParallax() {
		jQuery('.parallax').each(function() {
			var $self = jQuery(this),
				offsetCoords = $self.offset(),
				yPos = 0,
				topOffset = offsetCoords.top,
				speed = jQuery(this).data('speed');

			$self.css('backgroundPosition', '50% 0');
			var lastScrollTop = 0,
				$window = jQuery(window);

			$window.scroll(function() {
				// If this section is in view
				if ( ($window.scrollTop() + $window.height()) > (topOffset) && (( topOffset + $self.height()) > $window.scrollTop() )) {

					var current = $self.css('backgroundPosition').split(" ");
					current = current[1].replace('px', '');

					var st = jQuery(this).scrollTop();
					if (st > lastScrollTop) {
						// Down
						yPos = (parseInt(current, 10) - speed);
						if ( yPos > $self.height() ) { yPos = $self.height(); }
					} else {
						// Up
						yPos = (parseInt(current, 10) + speed);
						if ( yPos > 0 ) { yPos = 0; }
					}
					lastScrollTop = st;

					var coords = '50% '+ yPos + 'px';

					// Move the background
					$self.css({ backgroundPosition: coords });
				}
			});
		});
	}

	if ( jQuery(window).width() > 767 ) {
		initParallax();
	}

		/* -----------------------------------------
	 Filtering functionality
	 ----------------------------------------- */
	if ( jQuery(".filters-nav").length ) {
		var $container = jQuery('.item-list');
		$container.isotope();

		// filter items when filter link is clicked
		jQuery('.filters-nav li a').click(function(){
			var selector = jQuery(this).attr('data-filter');
			jQuery(this).parent().siblings().find('a').removeClass('selected');
			jQuery(this).addClass("selected");

			$container.isotope({
				filter: selector,
				animationOptions: {
					duration: 750,
					easing  : 'linear',
					queue   : false
				}
			});

			return false;
		});
	}

	/* -----------------------------------------
	 Equalize Heights
	 ----------------------------------------- */
	jQuery(".item-list").find("div[class^='col']").matchHeight();

});

jQuery(document).ready(function($) {
	"use strict";

	/* -----------------------------------------
	 Responsive Menus Init with mmenu
	 ----------------------------------------- */
	var mainNav = $("#navigation"),
			mobileNav = $("#mobilemenu");
	mainNav.clone().removeAttr('id').removeClass().appendTo(mobileNav);
	mobileNav.find('li').removeAttr('id');

	mobileNav.mmenu({
		offCanvas: {
			position: 'top',
			zposition: 'front'
		}
	});

	/* -----------------------------------------
	 Main Navigation Init
	 ----------------------------------------- */
	$('#navigation').superfish({
		delay:       300,
		animation:   { opacity:'show', height:'show' },
		speed:       'fast',
		dropShadows: false
	});

	/* -----------------------------------------
	 Responsive Videos with fitVids
	 ----------------------------------------- */
	$('.main').fitVids();

	/* -----------------------------------------
	 Hero Videos
	 ----------------------------------------- */
	$('.ci-video').mediaelementplayer();

	/* -----------------------------------------
	 Lightbox
	 ----------------------------------------- */
	$('.lightbox').fancybox();
});

function positionSldNav() {
	var offset = jQuery(".slide-content").offset(),
		nav = jQuery(".home-slider").find('.flex-control-nav');

	if ( nav.length ) {
		nav.css({
			"left": offset.left
		});

		if ( nav.not(":visible") ) {
			nav.fadeIn();
		}
	}
}

jQuery(window).on('resize', function() {
	if ( jQuery(window).width() > 767 ) {
		positionSldNav();
	}
});

