import Mapoverlay from "@/components/mapoverlay"


const newTrip = () => {

    const checkpoints = [
  { lat: 28.6139, lon: 77.2090 }, // New Delhi
  { lat: 19.0760, lon: 72.8777 }, // Mumbai
  { lat: 12.9716, lon: 77.5946 }, // Bangalore
  { lat: 13.0827, lon: 80.2707 }, // Chennai, Tamil Nadu
  { lat: 11.0168, lon: 76.9558 }, // Coimbatore, Tamil Nadu
  { lat: 9.9252, lon: 78.1198 },  // Madurai, Tamil Nadu
];

  return (
    <div>
        <Mapoverlay checkpoints={checkpoints} />
    </div>
  )
}

export default newTrip
