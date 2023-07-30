import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

const jateStore = async (permission = "readonly") => {
  const jateDb = await openDB("jate", 1);
  const tx = jateDb.transaction("jate", permission);
  const store = tx.objectStore("jate");
  return store;
};

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const store = await jateStore("readwrite");
  const res = await store.add({ text: content });
  return res;
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const store = await jateStore("readonly");
  const res = await store.getAll();
  return res;
};

initdb();
