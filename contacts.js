const fs = require('fs').promises;
const contactsName = require('./filePath');

async function listContacts() {
    const info = await fs.readFile(contactsName);
    const allContacts = JSON.parse(info);
    console.log(allContacts);
    return allContacts;
}

async function getContactById(contactId) {
    const contacts = await listContacts();
    const contact = contacts.find(contact => contact.id === contactId);
    console.log(contact)
    return contact;
}

async function removeContact(contactId) {
    const allContacts = await listContacts();
    const updatedContacts = await allContacts.filter(contact => contact.id !== contactId);
    await fs.writeFile(contactsName, JSON.stringify(updatedContacts));
    console.log(updatedContacts);
}


async function addContact(name, email, phone ) {
    const data = {name,email,phone}
    const contacts = await listContacts();
    const id = contacts.length + 1;
    const newContact = { id, ...data };
    const isInList = contacts.find(contact => contact.phone === newContact.phone);
    if (isInList) {
        console.log('Contact is already in list');
        return
    };
    contacts.push(newContact);
    await fs.writeFile(contactsName, JSON.stringify(contacts));
    const updatedContactsList = await listContacts();
    console.log(newContact);
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
}