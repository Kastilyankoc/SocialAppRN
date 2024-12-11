// helper functions to work with SQLite.

import * as SQLite from 'expo-sqlite';

import {Place} from '../data/Place';

// open a database.
const db = SQLite.openDatabaseSync('places.db');

// initialize the database.
export async function initDB() {
  try {
    // // Önce eski tabloyu sil
    // await db.execAsync(`DROP TABLE IF EXISTS places`);

    // Yeni tabloyu oluştur
    await db.execAsync(
      `CREATE TABLE IF NOT EXISTS places (
        id INTEGER PRIMARY KEY NOT NULL,
        title TEXT NOT NULL,
        imageUri TEXT NOT NULL,
        address TEXT NOT NULL,
        lat REAL NOT NULL,
        lng REAL NOT NULL,
        likes INTEGER DEFAULT 0,
        dislikes INTEGER DEFAULT 0
      )`
    );

    console.log("Database initialized successfully!");
  } catch (error) {
    console.error("Error initializing database:", error);
  }
}

// insert a place into the database.
export async function insertPlace(place) {
  const result = await db.runAsync(
    `INSERT INTO places (title, imageUri, address, lat, lng, likes, dislikes) VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      place.title,
      place.imageUri,
      place.address,
      place.location.lat,
      place.location.lng,
      place.likes,
      place.dislikes,
    ]
  );
  return result.lastInsertRowId; // return the id of the inserted place.
}

// fetch all places from the database.
// export async function fetchPlaces() {
//   return await db.getAllAsync(`SELECT * FROM places`);
// }
export async function fetchPlaces() {
  const places = await db.getAllAsync(`SELECT * FROM places`);
  return places.map(
    (p) =>
      new Place(p.title, p.imageUri, { address: p.address, lat: p.lat, lng: p.lng }, p.id, p.likes, p.dislikes)
  );
}

// fetch a single place from the database.
export async function fetchPlace(id) {
  return await db.getFirstAsync(`SELECT * FROM places WHERE id = ?`, [id]);
}

// update likes and dislikes.
export async function updateLikes(id, likes, dislikes) {
  return await db.runAsync(
    `UPDATE places SET likes = ?, dislikes = ? WHERE id = ?`,
    [likes, dislikes, id]
  );
}
// delete a place from the database.
export async function deletePlace(id) {
  return await db.runAsync(`DELETE FROM places WHERE id = ?`, [id]);
}
