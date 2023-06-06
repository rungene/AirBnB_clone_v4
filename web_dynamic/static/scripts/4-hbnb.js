// Variable to store the selected Amenity IDS
const selectedAmenities = {};
function searchPlaces () {
// send a post request to places_search endpoint
  $.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    contentType: 'application/json',
    data: JSON.stringify({
      amenities: Object.keys(selectedAmenities)
    }),
    success: function (response) {
      // Clear existing places
      $('.places').empty();

      // Loop through the result of the request and create place elements
      for (const place of response) {
        // Create article element
        const article = $('<article></article>');

        const title = $('<div class="title"></div>').text(place.name);
        const price = $('<div class="price_by_night">$' + place.price_by_night + '</div>');

        const info = $('<div class="information"></div>');
        const guestInfo = $('<div class="info"></div>').text(place.max_guest + ' Guest' + (place.max_guest !== 1 ? 's' : ''));
        const roomInfo = $('<div class="info"></div>').text(place.number_rooms + ' Room' + (place.number_rooms !== 1 ? 's' : ''));
        const bathroomInfo = $('<div class="info"></div>').text(place.number_bathrooms + ' Bathroom' + (place.number_bathrooms !== 1 ? 's' : ''));

        const description = $('<div class="description"></div>').text(place.description);

        info.append(guestInfo, roomInfo, bathroomInfo);
        article.append(title, price, info, description);
        $('.places').append(article);
      }
    }
  });
}
// Execute the script only when DOM is loaded
$(document).ready(function () {
  // Listen for changes on each input checkbox tag
  $('input["checkbox"]').change(function () {
    const amenityId = $(this).attr('data-id');
    const amenityName = $(this).attr('data-name');

    // Check if checkbox is checked
    if ($(this).is(':checked')) {
      // Store the Amenity ID if the variable
      selectedAmenities[amenityId] = amenityName;
    } else {
      // Remove the Amenity ID from the variable
      delete selectedAmenities[amenityId];
    }
    // Update the h4 tag inside the div Amenities with the list of checked Amenities
    const amenitiesList = Object.values(selectedAmenities).join(', ');
    $('.amenities h4').text(amenitiesList);
  });
  // Listen for click event on the button tag
  $('button').click(function () {
    // Make a Post request to search_place with the list of checked amenities
    searchPlaces();
  });
  // Initialise the place search when DOM is loaded
  searchPlaces();
});
