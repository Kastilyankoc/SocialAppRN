// helper functions to work with SQLite.

import * as SQLite from 'expo-sqlite';

// open a database.
const db = SQLite.openDatabaseSync('places.db');

// initialize the database.
export async function initDB() {
  return await db.execAsync(
    `CREATE TABLE IF NOT EXISTS places (
      id INTEGER PRIMARY KEY NOT NULL,
      title TEXT NOT NULL,
      imageUri TEXT NOT NULL,
      address TEXT NOT NULL,
      lat REAL NOT NULL,
      lng REAL NOT NULL
    )`
  );
}

// insert a place into the database.
export async function insertPlace(place) {
  const result = await db.runAsync(
    `INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?)`,
    [place.title, place.imageUri, place.address, place.location.lat, place.location.lng]
  );
  return result.lastInsertRowId; // return the id of the inserted place.
}

// fetch all places from the database.
export async function fetchPlaces() {
  return await db.getAllAsync(`SELECT * FROM places`);
}

// fetch a single place from the database.
export async function fetchPlace(id) {
  return await db.getFirstAsync(`SELECT * FROM places WHERE id = ?`, [id]);
}

// delete a place from the database.
export async function deletePlace(id) {
  return await db.runAsync(`DELETE FROM places WHERE id = ?`, [id]);
}