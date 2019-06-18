import { createRequest } from "../../utils";

const token = "bf9ada17469892",
  baseURL = `https://eu1.locationiq.com/v1/reverse.php?key=${token}`,
  req = createRequest({ baseURL });

const _getCurrentPosition = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      data => {
        const {
          coords: { latitude, longitude }
        } = data;
        resolve({ latitude, longitude });
      },
      err => {
        reject(err);
      }
    );
  });
};

const getAddress = async () => {
  const { latitude, longitude } = await _getCurrentPosition(),
    {
      address: { city, house_number, postcode, road, state }
    } = await req.get("", {
      lat: latitude,
      lon: longitude,
      format: "json"
    });

  return {
    state,
    city,
    road,
    house_number,
    postcode
  };
};

export default getAddress;
