const fs = require('fs').promises;
const contactsName = require('./filePath');
const { v4 } = require('uuid');

async function listContacts() {
    const info = await fs.readFile(contactsName);
    const allContacts = JSON.parse(info);
    console.table(allContacts);
    return allContacts;
}

async function getContactById(contactId) {
    const contacts = await listContacts();
    const contact = contacts.find(contact => contact.id === contactId);
    console.table(contact)
    return contact;
}

async function removeContact(contactId) {
    const allContacts = await listContacts();
    const objToRemove = await allContacts.find(contact => contact.id === contactId)
    const updatedContacts = await allContacts.filter(contact => contact.id !== contactId);
    await fs.writeFile(contactsName, JSON.stringify(updatedContacts));
    console.table(updatedContacts);
    console.table(objToRemove);
    return objToRemove;
}


async function addContact(name, email, phone ) {
    const data = {name,email,phone}
    const contacts = await listContacts();
    const newContact = { id: v4(), ...data };
    const isInList = contacts.find(contact => contact.phone === newContact.phone);
    if (isInList) {
        console.log('Contact is already in list');
        return
    };
    contacts.push(newContact);
    await fs.writeFile(contactsName, JSON.stringify(contacts));
    const updatedContactsList = await listContacts();
    console.table(newContact);
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
}