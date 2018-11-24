// Get venue ID
export const getFourSquareVenueID = (lat, lng, name) => {
  return fetch(`https://api.foursquare.com/v2/venues/search?client_id=CXKH1EGY1G5CKFK1I2OTHS4GKIFMSRN3FLSLPH5QNBP3YWV3&client_secret=EEFMX2QAOHSKBC0MGMDIBHIYDUP4M50PVMXB1LDVD0XEPGGS&v=20181101&limit=1&ll=${lat},${lng}&query=${name}`)
  .then((response) => response.json())
  .then((response) => response.response.venues[0].id);
}

// Get venue info data using the venue's ID
export const getFourSquareVenueInfo = (venueId) => {
  return fetch(`https://api.foursquare.com/v2/venues/${venueId}?client_id=CXKH1EGY1G5CKFK1I2OTHS4GKIFMSRN3FLSLPH5QNBP3YWV3&client_secret=EEFMX2QAOHSKBC0MGMDIBHIYDUP4M50PVMXB1LDVD0XEPGGS&v=20181101`)
  .then((response) => response.json())
  .then((response) => response.response.venue);
}
