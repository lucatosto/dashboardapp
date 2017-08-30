// Userlist data array for filling in info box
var customerListData = [];



// DOM Ready =============================================================
$(document).ready(function() {




    // Username link click
    $('#customerList table tbody').on('click', 'td a.linkshowcustomer', showCustomerInfo);

    // Populate the customer table on initial page load
    populateTable();


    // Add Customer button click
    $('#btnAddCustomer').on('click', addCustomer);

    // Delete Customer link click
    $('#customerList table tbody').on('click', 'td a.linkdeletecustomer', deleteCustomer);

});

// Functions =============================================================

// Fill table with data
function populateTable() {

};

// Show Customer Info   BUG
function showCustomerInfo(event) {



    // Prevent Link from Firing
    event.preventDefault();

    // Retrieve customername from link rel attribute
    var thisCustomerName = $(this).attr('rel');

    // Get Index of object based on id value  BUG arrayPosition = -1
    var arrayPosition = customerListData.map(function(arrayItem) {return arrayItem.id; }).indexOf(thisCustomerName);
    // Get our User Object
    var thisCustomerObject = customerListData[arrayPosition+1];


    $('#customerInfoName').text('->'+thisCustomerObject.name+'---->'+customerListData);
    $('#customerID').text('->'+thisCustomerObject.id);
    $('#customerInfoLink').text('->'+thisCustomerObject.link);

};

// Add Customer
function addCustomer(event) {
    event.preventDefault();

    // Super basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;
    $('#addCustomer input').each(function(index, val) {
        if($(this).val() === '') { errorCount++; }
    });

    // Check and make sure errorCount's still at zero
    if(errorCount === 0) {

        // If it is, compile all user info into one object
        var newCustomer = {
            'name': $('#addCustomer fieldset input#inputCustomerName').val(),
            'id': $('#addCustomer fieldset input#inputCustomerID').val(),
            'link': $('#addCustomer fieldset input#inputCustomerLink').val()
        }

        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: newCustomer,
            url: '/customers/addcustomer',
            dataType: 'JSON'
        }).done(function( response ) {

            // Check for successful (blank) response
            if (response.msg === '') {

                // Clear the form inputs
                $('#addCustomer fieldset input').val('');

                // Update the table
                populateTable();

            }
            else {

                // If something goes wrong, alert the error message that our service returned
                alert('Error: ' + response.msg);

            }
        });
    }
    else {
        // If errorCount is more than 0, error out
        alert('Please fill in all fields');
        return false;
    }
};

// Delete User
function deleteCustomer(event) {

    event.preventDefault();

    // Pop up a confirmation dialog
    var confirmation = confirm('Are you sure you want to delete this Customer?');

    // Check and make sure the user confirmed
    if (confirmation === true) {

        // If they did, do our delete
        $.ajax({
            type: 'DELETE',
            url: '/customers/deleteCustomer/' + $(this).attr('rel')
        }).done(function( response ) {

            // Check for a successful (blank) response
            if (response.msg === '') {
            }
            else {
                alert('Error: ' + response.msg);
            }

            // Update the table
            populateTable();

        });

    }
    else {

        // If they said no to the confirm, do nothing
        return false;

    }

};
