const mongoose = require('mongoose');
const { Faker, en } = require('@faker-js/faker');
const connectDB = require('../config/database/mongoose');
const User = require('../models/User');
const Listing = require('../models/Listing');
const Booking = require('../models/Booking');
const { mongoUri } = require('../config/env');
const getRandomImage = require('./imageLinks');

const faker = new Faker({ locale: [en] });

function getRandomItems(array, min, max) {
  const count = Math.floor(Math.random() * (max - min + 1)) + min;
  const shuffled = array.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function generateUsers(count) {
  const users = [];
  const usedEmails = new Set();
  for (let i = 0; i < count; i++) {
    let email;
    do {
      email = `${faker.internet.username()}_${i}@${faker.internet.domainName()}`;
    } while (usedEmails.has(email));
    usedEmails.add(email);

    const isHost = i < count * 0.1;
    users.push({
      name: faker.person.fullName(),
      email,
      password: 'password123',
      isHost,
      createdAt: new Date(),
    });
  }
  return users;
}

async function generateListings(count, hostIds) {
  const amenities = ['WiFi', 'Kitchen', 'Parking', 'Air Conditioning', 'Pool', 'TV', 'Washer', 'Dryer'];
  const cities = ['Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Aurangabad', 'Solapur', 'Kolhapur', 'Satara', 'Sangli', 'Amravati'];
  const listings = [];

  for (let i = 0; i < count; i++) {
    const city = cities[Math.floor(Math.random() * cities.length)];
    const hostId = hostIds[Math.floor(Math.random() * hostIds.length)];
    if (!hostId) continue;

    const imageUrl = getRandomImage() || 'https://via.placeholder.com/800x600';

    listings.push({
      title: `${faker.commerce.productAdjective()} ${faker.location.street()} Stay`,
      description: faker.lorem.paragraph(),
      location: `${city}, Maharashtra, India`,
      pricePerNight: parseFloat(faker.commerce.price({ min: 20, max: 500 })),
      images: [imageUrl],
      amenities: getRandomItems(amenities, 2, 5),
      host: hostId,
      createdAt: new Date(),
    });
  }
  return listings;
}

function generateBookings(count, userIds, listingDocs) {
  const bookings = [];
  for (let i = 0; i < count; i++) {
    const checkInDate = faker.date.between({ from: new Date(), to: new Date('2026-12-31') });
    const nights = Math.floor(Math.random() * 10) + 1;
    const checkOutDate = new Date(checkInDate);
    checkOutDate.setDate(checkInDate.getDate() + nights);
    const listing = listingDocs[Math.floor(Math.random() * listingDocs.length)];
    const totalPrice = parseFloat((nights * listing.pricePerNight).toFixed(2));

    bookings.push({
      listing: listing._id,
      user: userIds[Math.floor(Math.random() * userIds.length)],
      checkInDate,
      checkOutDate,
      totalPrice,
      createdAt: new Date(),
    });
  }
  return bookings;
}

async function seedDatabase() {
  let connection;
  try {
    connection = await connectDB();
    console.log('✅ Connected to MongoDB');

    console.log('🧹 Clearing database...');
    await Promise.all([
      User.deleteMany({}).then(() => console.log('✅ Users collection cleared')),
      Listing.deleteMany({}).then(() => console.log('✅ Listings collection cleared')),
      Booking.deleteMany({}).then(() => console.log('✅ Bookings collection cleared')),
    ]);
    console.log('✅ Database cleared');

    console.log('👤 Inserting users...');
    const users = generateUsers(10000);
    const userResult = await User.insertMany(users, { ordered: false });
    const userIds = userResult.map(user => user._id);
    const hostIds = userResult.filter(user => user.isHost).map(user => user._id);
    console.log(`✅ Inserted ${userIds.length} users (${hostIds.length} hosts)`);

    console.log('🏠 Generating and inserting listings...');
    const listings = await generateListings(5000, hostIds);
    console.log(`✅ Generated ${listings.length} listings`);

    if (listings.length === 0) {
      console.error('❌ No listings generated. Aborting.');
      process.exit(1);
    }

    try {
      const listingResult = await Listing.insertMany(listings, { ordered: false });
      console.log(`✅ Inserted ${listingResult.length} listings`);
    } catch (insertError) {
      console.error('❌ Error inserting listings:', insertError.message);
      if (insertError.writeErrors?.length) {
        insertError.writeErrors.slice(0, 5).forEach((e, idx) => {
          console.error(`  ${idx + 1}.`, e.err?.errmsg || e.err?.message || e);
        });
      }
      process.exit(1);
    }

    const listingDocs = await Listing.find({});
    console.log(`📦 Fetched ${listingDocs.length} listings from DB`);

    if (listingDocs.length === 0) {
      console.error('❌ No listings available to generate bookings.');
      process.exit(1);
    }

    console.log('📅 Generating and inserting bookings...');
    const bookings = generateBookings(20000, userIds, listingDocs);
    const bookingResult = await Booking.insertMany(bookings, { ordered: false });
    console.log(`✅ Inserted ${bookingResult.length} bookings`);

  } catch (err) {
    console.error('❌ Error seeding database:', err.message);
    process.exit(1);
  } finally {
    if (connection) {
      await mongoose.connection.close();
      console.log('🔌 Disconnected from MongoDB');
    }
  }
}

seedDatabase();
