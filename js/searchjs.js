$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

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
  


