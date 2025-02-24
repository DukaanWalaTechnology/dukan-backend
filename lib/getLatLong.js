import axios from 'axios';

export const getLatLong = async (address, pincode) => {
    try {
        const query = `${address}, ${pincode}, India`; // Ensure country is included
        const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json`;

        console.log("Fetching coordinates for:", query);
        
        const response = await axios.get(url);

        if (!response.data || response.data.length === 0) {
            console.log("No location found for:", query);
            return null;
        }

        const { lat, lon } = response.data[0];  // Get first result
        console.log("Fetched location:", { lat, lon });

        return { lat: parseFloat(lat), lon: parseFloat(lon) };
    } catch (error) {
        console.error("Error fetching coordinates:", error.message);
        return null;
    }
};
