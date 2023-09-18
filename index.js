const contactsJson = require("./db/contacts");
const { program } = require("commander");

const controller = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "read":
      const contacts = await contactsJson.getContacts();
      return console.log(contacts);
    case "getById":
      const contact = await contactsJson.getContactsById(id);
      return console.log(contact);
    case "addContact":
      const newContact = await contactsJson.addNewContact({
        name,
        email,
        phone,
      });
      return console.log(newContact);
    case "updateContact":
      const updateContact = await contactsJson.updateById(id, {
        name,
        email,
        phone,
      });
      return console.log(updateContact);
    case "deleteById":
      const deleteContact = await contactsJson.deleteContact(id);
      return console.log(deleteContact);
    default:
      return console.log("Unknown action, try again");
  }
};

program
  .option("-a, --action, <type>")
  .option("--id, <type>")
  .option("-n, --name, <type>")
  .option("-e, --email, <type>")
  .option("-p, --phone, <type>");
program.parse();
const options = program.opts();
controller(options);

// controller({ action: "read" });
// controller({ action: "getById", id: "Z5sbDlSpCzNsnAHLtDJd" });
// controller({
//   action: "addContact",
//   name: "Oleg",
//   email: "Oleg@gamil.com",
//   phone: "+5432434",
// });

// controller({
//   action: "updateContact",
//   id: "vMhagfaJ72ybx-1J3u3Nh",
//   name: "Oleg",
//   email: "Oleg@gamil.com",
//   phone: "+380713404679",
// });

// controller({ action: "deleteById", id: "vMhagfaJ72ybx-1J3u3Nh" });
