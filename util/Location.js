const GOOGLE_API_KEY = 'AIzaSyAVSltTdR4Aq9e-3M62P9jOr2NGf7awY5g';

export default function getMapPreview(lat, lng, zoom = 14, size = "400x200", mapType = "roadmap") {
  if (!lat || !lng) {
    console.error("Invalid coordinates! Latitude and Longitude are required.");
    return null;
  }

  const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=${zoom}&size=${size}&maptype=${mapType}&markers=color:red%7Clabel:S%7C${lat},${lng}&key=${GOOGLE_API_KEY}`;
  return imagePreviewUrl;
}