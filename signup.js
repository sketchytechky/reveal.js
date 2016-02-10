/**
 * Setup signup special
 */
function setupSignup () {

	var signUpCls = ".signupForm";

	$(signUpCls).submit(function () {
		debugger;
		// setup the value for the gi
		


	});

	$(signUpCls + " input").keydown(function(event) {
	    if (event.keyCode == 13) {
	        event.preventDefault();
	        $(signUpCls).submit();
	    }
	});

}