const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsJsonPath = path.join(__dirname, "./db/contacts.json");

const getContacts = async () => {
  const contactsBuffer = await fs.readFile(contactsJsonPath);
  return JSON.parse(contactsBuffer);
};

const getContactsById = async (id) => {
  const contacts = await getContacts();
  return contacts.find((contact) => contact.id === id) || null;
};

const addNewContact = async (data) => {
  const contacts = await getContacts();
  const newContact = {
    id: nanoid(),
    ...data,
  };

  contacts.push(newContact);
  await fs.writeFile(contactsJsonPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

const updateById = async (id, data) => {
  const contacts = await getContacts();
  const index = contacts.findIndex((contact) => contact.id === id);
  if (!index) return null;
  contacts[index] = { id, ...data };
  await fs.writeFile(contactsJsonPath, JSON.stringify(contacts, null, 2));
  return contacts[index];
};

const deleteContact = async (id) => {
  const contacts = await getContacts();
  const index = contacts.findIndex((contact) => contact.id === id);
  if (!index) return null;
  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsJsonPath, JSON.stringify(contacts, null, 2));
  return result;
};

module.exports = {
  getContacts,
  getContactsById,
  addNewContact,
  updateById,
  deleteContact,
};
