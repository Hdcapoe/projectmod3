const mongoose = require ("mongoose")

const Schema = mongoose.Schema

const MailSchema = new Schema ({
    
    name: { type: String },
    address: { type: String},
    zip: { type: String},

    

})

const Mail = mongoose.model("mails", MailSchema)

module.exports = Mail