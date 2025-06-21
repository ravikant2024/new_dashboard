const ShippingCharge = require('../models/ShippingCharge');

const delhiNCRCities = ['Delhi', 'Noida', 'Gurgaon', 'Faridabad', 'Ghaziabad'];
const otherIndianStates = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa',
  'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala',
  'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland',
  'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana',
  'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
];

// Create shipping charge entries for Delhi NCR, other Indian states, and international fallback
const create = async (req, res) => {
  const { delhi_ncr, india_other, international } = req.body;

  if (
    typeof delhi_ncr !== 'number' ||
    typeof india_other !== 'number' ||
    typeof international !== 'number'
  ) {
    return res.status(400).json({
      error: 'All three charges (delhi_ncr, india_other, international) are required and must be numbers'
    });
  }

  const entries = [];
  delhiNCRCities.forEach(city => {
    entries.push({
      city: city,
      state: 'n/a',
      country: 'India',
      shipping_charge: delhi_ncr
    });
  });

  otherIndianStates.forEach(state => {
    entries.push({
      city: 'n/a',
      state: state,
      country: 'India',
      shipping_charge: india_other
    });
  });

  entries.push({
    city: 'n/a',
    state: 'n/a',
    country: 'others',
    shipping_charge: international
  });

  try {
    // Find existing entries to avoid duplicates
    const existing = await ShippingCharge.find({
      $or: entries.map(e => ({
        city: e.city,
        state: e.state,
        country: e.country
      }))
    });

    const existingSet = new Set(
      existing.map(e => `${e.city}|${e.state}|${e.country}`)
    );

    const newEntries = entries.filter(
      e => !existingSet.has(`${e.city}|${e.state}|${e.country}`)
    );

    if (newEntries.length === 0) {
      return res.status(200).json({ message: 'No new entries inserted. All records already exist.' });
    }

    const result = await ShippingCharge.insertMany(newEntries);

    return res.status(201).json({
      message: 'New shipping charges inserted',
      insertedCount: result.length,
      insertedEntries: result
    });
  } catch (error) {
    console.error('Insert error:', error);
    return res.status(500).json({ error: 'Internal server error', details: error.message });
  }
};


// Core logic to get shipping charge by city/state/country with improved fallback
const getShippingChargeByAddressLogic = async ({ city, state, country }) => {
  try {
    const normalizedCity = city.trim().toLowerCase();
    const normalizedState = state.trim().toLowerCase();
    const normalizedCountry = country.trim().toLowerCase();

    // 1. Exact match: city + state + country
    let charge = await ShippingCharge.findOne({
      city: { $regex: `^${normalizedCity}$`, $options: 'i' },
      state: { $regex: `^${normalizedState}$`, $options: 'i' },
      country: { $regex: `^${normalizedCountry}$`, $options: 'i' }
    });
    if (charge) return charge.shipping_charge;

    // 2. City match only (state is 'n/a')
    charge = await ShippingCharge.findOne({
      city: { $ne: 'n/a', $regex: `^${normalizedCity}$`, $options: 'i' },
      state: 'n/a',
      country: { $regex: `^${normalizedCountry}$`, $options: 'i' }
    });
    if (charge) return charge.shipping_charge;

    // 3. State match only (city is 'n/a')
    charge = await ShippingCharge.findOne({
      city: 'n/a',
      state: { $regex: `^${normalizedState}$`, $options: 'i' },
      country: { $regex: `^${normalizedCountry}$`, $options: 'i' }
    });
    if (charge) return charge.shipping_charge;

    // 4. Fallback generic charge only for non-India countries
    if (normalizedCountry !== 'india') {
      charge = await ShippingCharge.findOne({
        city: 'n/a',
        state: 'n/a',
        country: 'others'
      });
      if (charge) return charge.shipping_charge;
    }

    // No match found, return 0
    return 0;

  } catch (err) {
    console.error('Error fetching shipping charge:', err);
    throw err;
  }
};


// API to fetch shipping charge based on user input
const fetchShippingCharge = async (req, res) => {
  const { city, state, country } = req.body;

  if (!city || !state || !country) {
    return res.status(400).json({ error: 'city, state, and country are required' });
  }

  try {
    const charge = await getShippingChargeByAddressLogic({ city, state, country });
    return res.status(200).json({ shipping_charge: charge });
  } catch (err) {
    console.error('Error in fetchShippingCharge:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};


// List all shipping charge entries sorted by country, state, city
const listShippingCharge = async (req, res) => {
  try {
    const areas = await ShippingCharge.find().sort({ country: 1, state: 1, city: 1 });
    return res.json(areas);
  } catch (err) {
    console.error('Error fetching shipping charges:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};


module.exports = {
  create,
  listShippingCharge,
  fetchShippingCharge
};
