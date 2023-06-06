// Execute the script only when DOM is loaded
$(document).ready(function () {
  // send a post request to places_search endpoint
  $.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    contentType: 'application/json',
    data: JSON.stringify({}),
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
});
