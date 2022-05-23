$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})



$(document).ready(function() {
	// Our services
  $(".homeBookSlide").owlCarousel({
      
      items : 5,
      itemsDesktop : [1199,4],
      itemsDesktopSmall : [979,4],
      itemsTablet: [768,3],
	  pagination: false,
	  navigation : true,
	  autoPlay : true,
	  stopOnHover: true,
	  
	  navigationText: ["<span class='fa fa-long-arrow-left'></span>","<span class='fa fa-long-arrow-right'></span>"]
  });


  // newBook
  $("#newBookList").owlCarousel({
      
      items : 2,
      itemsDesktop : [1199,2],
      itemsDesktopSmall : [979,2],
      itemsTablet: [768,2],
	  pagination: true,
	  navigation : false,
	  autoPlay : true,
	  stopOnHover: true,
	  
	  navigationText: ["<span class='fa fa-chevron-left'></span>","<span class='fa fa-chevron-right'></span>"]
  });

 
  
});
!function(a) {
	"use strict";
    a(document).ready(function() {
	    
	    
	    function c() {
            a(".select select").change(function() {
                var e = a(this)
                  , n = e.parent(".select").find("span")
                  , t = e.find("option:selected").text();
                n.text(t)
            })
        }
	    
        function d() {
            a(".form-field .field-input").on("keydown", function() {
                var e = a(this).parent(".form-field").find("label");
                0 == e.hasClass("forcus") && e.addClass("focus")
            }).on("keyup", function() {
                var e = a(this)
                  , n = e.parent(".form-field").find("label");
                "" != e.val() ? 0 == n.hasClass("forcus") && n.addClass("focus") : n.removeClass("focus")
            })
        }
        c(),
        d(),
        a(window).on("load resize", function() {
            
        })
    })
}(jQuery);

  // partner
  $("#partner").owlCarousel({
      
      items : 5,
      itemsDesktop : [1199,4],
      itemsDesktopSmall : [979,4],
      itemsTablet: [768,4],
	 pagination: false,
	 navigation : false,
	 autoPlay : true,
	 stopOnHover: true,
	 
	 navigationText: ["<span class='fa fa-chevron-left'></span>","<span class='fa fa-chevron-right'></span>"]
  });
  
  $("#slideBanner").owlCarousel({
  transitionStyle : "fade",
  pagination: true,
	 navigation : false,
  slideSpeed : 300,
  paginationSpeed : 400,
  singleItem : true,
  autoPlay: true,
  stopOnHover: true,
  lazyLoad : true,
  navigationText: ["<span class='glyphicon glyphicon-chevron-left'></span>","<span class='glyphicon glyphicon-chevron-right'></span>"],

  // "singleItem:true" is a shortcut for:
  // items : 1, 
  // itemsDesktop : false,
  // itemsDesktopSmall : false,
  // itemsTablet: false,
  // itemsMobile : false
  });


