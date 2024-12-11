// export class Place {
//     constructor(title, imageUri, location) {
//       this.title = title;
//       this.imageUri = imageUri;
//       this.address = location.address;
//       this.location = { lat: location.lat, lng: location.lng }; // { lat: 0.141241, lng: 127.121 }
//       this.id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
//     }
//   }
export class Place {
  constructor(title, imageUri, location, id, likes=0, dislikes=0) {
    this.title = title;
    this.imageUri = imageUri;
    this.address = location.address;
    this.location = { lat: location.lat, lng: location.lng }; // { lat: 0.0, lng: 0.0 }
    this.id = id;
    this.likes = likes;
    this.dislikes = dislikes;
  }
}
