const mongoose = require('mongoose');

const ListingSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: [true, 'Title is required'], 
    trim: true 
  },
  description: { 
    type: String, 
    required: [true, 'Description is required'], 
    trim: true 
  },
  location: { 
    type: String, 
    required: [true, 'Location is required'], 
    trim: true 
  },
  pricePerNight: { 
    type: Number, 
    required: [true, 'Price per night is required'], 
    min: [0, 'Price cannot be negative'] 
  },
  images: [{ 
    type: String, 
   
  }],
  amenities: [{ 
    type: String, 
    trim: true 
  }],
  host: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: [true, 'Host is required'] 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Text index for case-insensitive location searches
ListingSchema.index({ location: 'text' });

// Single index for host lookups
ListingSchema.index({ host: 1 });

// Compound index for common queries (e.g., sorting by price or date)
ListingSchema.index({ pricePerNight: 1, createdAt: -1 });

// Static method for finding listings by location
ListingSchema.statics.findByLocation = async function (location) {
  return await this.find({ $text: { $search: location } })
    .populate('host', 'name')
    .sort({ score: { $meta: 'textScore' } });
};

// Static method for finding listings by host
ListingSchema.statics.findByHost = async function (hostId) {
  return await this.find({ host: hostId })
    .populate('host', 'name')
    .sort({ createdAt: -1 });
};

module.exports = mongoose.model('Listing', ListingSchema);