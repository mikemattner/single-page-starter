export default class FormValidator {
    constructor() {

        // Letters only
        jQuery.validator.addMethod("lettersonly", function(value, element) {
            return this.optional(element) || /^[a-z ]+$/i.test(value);
            // return this.optional(element) || /^[a-z]+$/i.test(value);
        }, "Please enter letters only."); 

        // EMAIL VALIDATOR  
        $.validator.addMethod('customEmail', function (value) {
                return /^[a-zA-Z0-9.!#$%'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value);
        }, 'Valid email address required.');

        var Messages = {
            firstName: 'Please provide your first name',
            lastName: 'Please provide your last name',
            emailValidation: 'Please enter a valid email address'
        };

        const formSubmit = $('#club__form'),
            usCountry = document.querySelector("#in-us-cc"),
            caCountry = document.querySelector("#in-can-cc"),
            disclaimUsClub = document.querySelector("#disclaimer-cc-us"),
            disclaimCaClub = document.querySelector("#disclaimer-cc-ca");

        function disclaimCheck() {
            // hide both disclaimers, add class
            disclaimUsClub.classList.add("js-cc-hidden");
            disclaimCaClub.classList.add("js-cc-hidden");

            if (usCountry.checked) {
                $('input[name=Country]').val("United States");
                disclaimUsClub.classList.toggle("js-cc-hidden");
            } else {
                $('input[name=Country]').val("Canada");
                disclaimCaClub.classList.toggle("js-cc-hidden");
            }

        }

        if (usCountry && caCountry) {
            usCountry.addEventListener("change", disclaimCheck);
            caCountry.addEventListener("change", disclaimCheck);

            // Set country to US by default
            usCountry.checked = true;
            disclaimCheck();
        }

        formSubmit.validate({
            rules: {
                Firstname: {
                    required: true,
                    minlength: 2,
                    maxlength: 100,
                    lettersonly: true
                },
                Lastname: {
                    required: true,
                    minlength: 3,
                    maxlength: 50,
                    lettersonly: true
                },
                Email: {
                    required: true,
                    customEmail: true,
                    maxlength: 80
                }
            }
        });

        formSubmit.submit(function(e) {
            var email = $('input[name=Email]', this).val();
            var firstname = $('input[name=Firstname]', this).val();
            var lastname = $('input[name=Lastname]', this).val();
            var country = $('input[name=Country]', this).val();
            _etmc.push(["setOrgId", "7315546"]);
            _etmc.push(["setUserInfo", {
                "email": email,
                "details": {
                    "FirstName": firstname,
                    "LastName": lastname,
                    "Country": country
                }
            }]);
            _etmc.push(["trackPageView"]);
        });

    }
}