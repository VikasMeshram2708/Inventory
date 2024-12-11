import { db } from ".";
import * as schema from "./schema";

const sample = [
  {
    id: 1,
    quantity: 500,
    amount: "9999.00",
    userId: 7,
    createdAt: "2024-12-09 16:41:48.652268",
    updatedAt: "2024-12-09 16:41:48.652268",
    title: "Smart Phone",
    description: "Latest Vivo Smart Phone",
  },
  {
    id: 2,
    quantity: 100,
    amount: "1000.00",
    userId: 7,
    createdAt: "2024-12-09 16:44:46.356787",
    updatedAt: "2024-12-09 16:44:46.356787",
    title: "Rice Bag",
    description: "Best quality rice",
  },
  {
    id: 3,
    quantity: 1000,
    amount: "999.00",
    userId: 7,
    createdAt: "2024-12-09 17:34:33.811737",
    updatedAt: "2024-12-09 17:34:33.811737",
    title: "Wheat Flour",
    description: "Best quality wheat flour originated from India",
  },
  {
    id: 4,
    quantity: 100,
    amount: "999.00",
    userId: 7,
    createdAt: "2024-12-09 17:45:03.881664",
    updatedAt: "2024-12-09 17:45:03.881664",
    title: "Smart Watch",
    description: "Latest model smart watch with health tracking",
  },
  {
    id: 5,
    quantity: 250,
    amount: "2499.00",
    userId: 7,
    createdAt: "2024-12-09 18:00:00.000000",
    updatedAt: "2024-12-09 18:00:00.000000",
    title: "Bluetooth Headphones",
    description: "Noise-cancelling Bluetooth headphones",
  },
  {
    id: 6,
    quantity: 300,
    amount: "1499.00",
    userId: 7,
    createdAt: "2024-12-09 18:15:00.000000",
    updatedAt: "2024-12-09 18:15:00.000000",
    title: "Laptop Stand",
    description: "Ergonomic laptop stand for better posture",
  },
  {
    id: 7,
    quantity: 150,
    amount: "2999.00",
    userId: 7,
    createdAt: "2024-12-09 18:30:00.000000",
    updatedAt: "2024-12-09 18:30:00.000000",
    title: "Gaming Mouse",
    description: ".High precision gaming mouse",
  },
  {
    id: 8,
    quantity: 80,
    amount: "$1999.99",
    userId: 7,
    createdAt: "2024-12-09T18:45:00Z",
    updatedAt: "2024-12-09T18:45:00Z",
    title: "Portable Charger",
    description: "High-capacity portable charger for devices",
  },
  {
    id: 9,
    quantity: 1000,
    amount: "1500.50",
    userId: 7,
    createdAt: "2024-12-09T19:00:00Z",
    updatedAt: "2024-12-09T19:00:00Z",
    title: "LED Desk Lamp",
    description: "Adjustable LED desk lamp with USB charging",
  },
  {
    id: 10,
    quantity: 500,
    amount: "7999.99",
    userId: 7,
    createdAt: "2024-12-09T19:15:00Z",
    updatedAt: "2024-12-09T19:15:00Z",
    title: "Smart TV",
    description: "55 inch Smart TV with HDR support",
  },
  {
    id: 11,
    quantity: 2500,
    amount: "4999.99",
    userId: 7,
    createdAt: "2024-12-09T19:30:00Z",
    updatedAt: "2024-12-09T19:30:00Z",
    title: "Office Chair",
    description: "Comfortable ergonomic office chair",
  },
  {
    id: 12,
    quantity: 1500,
    amount: "2999.99",
    userId: 7,
    createdAt: "2024-12-09T19:45:00Z",
    updatedAt: "2024-12-09T19:45:00Z",
    title: "External Hard Drive",
    description: "1TB external hard drive for storage",
  },
  {
    id: 13,
    quantity: 3000,
    amount: "1999.99",
    userId: 7,
    createdAt: "2024–12–09T20–00–00Z",
    updatedAt: "2024–12–09T20–00–00Z",
    title: "Wireless Router",
    description: "High-speed wireless router for home use",
  },
  {
    id: 14,
    quantity: 200,
    amount: "8999.99",
    userId: 7,
    createdAt: "2024–12–09T20–15–00Z",
    updatedAt: "2024–12–09T20–15–00Z",
    title: "Digital Camera",
    description: "High-resolution digital camera for photography",
  },
  {
    id: 15,
    quantity: 400,
    amount: "6499.99",
    userId: 7,
    createdAt: "2024–12–09T20–30–00Z",
    updatedAt: "2024–12–09T20–30–00Z",
    title: "Fitness Tracker",
    description: "Water-resistant fitness tracker with heart rate monitor",
  },
  {
    id: 16,
    quantity: 120,
    amount: "2999.99",
    userId: 7,
    createdAt: "2024–12–09T20–45–00Z",
    updatedAt: "2024–12–09T20–45–00Z",
    title: "Smart Thermostat",
    description: "Programmable smart thermostat for energy savings",
  },
  {
    id: 17,
    quantity: 50,
    amount: "4999.99",
    userId: 7,
    createdAt: "2024–12–09T21–00–00Z",
    updatedAt: "2024–12–09T21–00–00Z",
    title: "Home Security Camera",
    description: "1080p HD home security camera",
  },
  {
    id: 18,
    quantity: 75,
    amount: "3999.99",
    userId: 7,
    createdAt: "2024−12−09T21−15−00Z",
    updatedAt: "2024−12−09T21−15−00Z",
    title: "Smart Light Bulb",
    description: "Energy-efficient smart light bulb",
  },
  {
    id: 19,
    quantity: 200,
    amount: "1998.99",
    userId: 7,
    createdAt: "2024−12−09T21−30−00Z",
    updatedAt: "2024−12−09T21−30−00Z",
    title: "Electric Kettle",
    description: "Fast boiling electric kettle",
  },
  {
    id: 20,
    quantity: 100,
    amount: "1299.99",
    userId: 7,
    createdAt: "2024−12−09T21−45−00Z",
    updatedAt: "2024−12−09T21−45−00Z",
    title: "Food Processor",
    description: "Multi-functional food processor for kitchen use",
  },
];

function formatTimestamp(date: Date): string {
  const pad = (n: number) => n.toString().padStart(2, '0');
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());
  
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
async function main() {
  const sanitizeSample = sample.map((item) => ({
    ...item,
    amount: parseFloat(item.amount).toString(),
    createdAt: formatTimestamp(new Date(item.createdAt)),
    updatedAt: formatTimestamp(new Date(item.updatedAt)),
  }));

  for (const item of sanitizeSample) {
    await db.insert(schema.inventoryTable).values(item);
  }
}

main()
  .then(() => {
    console.log("Seeding Completed");
  })
  .catch((e) => {
    console.error(e);
    process.exit(0);
  });
