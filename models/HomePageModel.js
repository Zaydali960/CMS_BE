const mongoose = require('mongoose');

const { Schema, model, Types } = mongoose;

const BlockSchema = new Schema({
  metaTitle: {
    type: String,
    required: true
  },
  metaDescription: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true
  },
  components: [
    {
      type: {
        type: String
      },
      text: {
        type: String
      },

      coverImage: {
        type: String
      },

      cards: [
        {
          title: {
            type: String
          },
          description: {
            type: String
          },
          images: [
            {
              url: {
                type:String
              }
            }
          ],
          slug: {
            type: String,
            default:""
          }
        }
      ]

    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
}
);

module.exports = model('HomePageBlock', BlockSchema);