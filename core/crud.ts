import fs from 'fs'

// const fs = require("fs");
const DB_FILE_PATH = "./core/db";

console.log("[CRUD]");

function create(content: string) {
  // salvar o content no sistema
  fs.writeFileSync(DB_FILE_PATH, content);
  return content;
}


function read(){
  const db = fs.readFileSync(DB_FILE_PATH, "utf-8")
  return db
}

// [SIMULATION]
// console.log(create("Arquivo 01"));
console.log(read())