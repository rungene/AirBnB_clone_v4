// Execute the script only when DOM is loaded
$(document).ready(function () {
  // Variable to store the selected Amenity ID
  const selectedAmenity = {};

  // Listen for changes on each input checkbox tag.
  $('input[type="checkbox"]').change(function () {
    const amenityId = $(this).attr('data-id');
    const amenityName = $(this).attr('data-name');

    // Check if checkbox is checked
    if ($(this).is(':checked')) {
      // Store the amenity ID in the variable
      selectedAmenity[amenityId] = amenityName;
    } else {
      // Remove the amenity ID from variable
      delete selectedAmenity[amenityId];
    }
    // Update the h4 tag inside the div Amenities with the list of checked Amenities
    const listAmenities = Object.values(selectedAmenity).join(', ');
    $('.amenities h4').text(listAmenities);
  });

  // Request API status
  $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
    // Check if the status is ok
    if (data.status === 'OK') {
      // Add the class available to div#api_status
      $('div#api_status').addClass('available');
    } else {
      // Remove the class
      $('div#api_status').removeClass('available');
    }
  });
});
