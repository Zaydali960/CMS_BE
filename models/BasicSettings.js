const mongoose = require('mongoose');

const BasicSettingsSchema = new mongoose.Schema({
  primaryColor: {
    type: String,
    default: '#000000',
  },
  secondaryColor: {
    type: String,
    default: '#ffffff',
  },
  tertiaryColor: {
    type: String,
    default: '#ffffff',
  },
  logo: {
    type: String,
    default: '',
  },
  whatsappNumber: {
    type: String,
    default: '',
  },
  contactNumber: {
    type: String,
    default: '',
  },
  metaTitle: {
    type: String,
    default: '',
  },
  metaDescription: {
    type: String,
    default: '',
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('BasicSettings', BasicSettingsSchema);
