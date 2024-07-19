import { values } from "lodash";
import {
  TbCircleNumber1Filled,
  TbCircleNumber2Filled,
  TbCircleNumber3Filled,
  TbCircleNumber4Filled,
  TbCircleNumber5Filled,
  TbCircleNumber6Filled,
} from "react-icons/tb";
interface Service {
  name: string;
  price: number;
  description: string;
}

interface Services {
  [key: string]: Service[];
  Regular: Service[];
  "General Pablo Services": Service[];
}
export const services: Services = {
  Regular: [
    {
      name: "Tabas Pablings",
      price: 249,
      description: "A basic haircut service.",
    },
    {
      name: "Pablings Espesyial",
      price: 349,
      description: "Includes a haircut and a shampoo.",
    },
    {
      name: "Ginoong Pabian",
      price: 449,
      description: "Includes a haircut and a traditional straight razor shave.",
    },
    {
      name: "Pablo Gwapo",
      price: 649,
      description: "Includes a haircut and a charcoal facial mask treatment.",
    },
    // Add more regular services if needed
  ],
  "General Pablo Services": [
    {
      name: "General Pablo 1",
      price: 1299,
      description:
        "Includes a haircut, shampoo, and a basic hair dye application.",
    },
    {
      name: "General Pablo 2",
      price: 1299,
      description:
        "Includes a haircut, shampoo, hair treatment (type unspecified in the image), and a half-body massage.",
    },
    {
      name: "General Pablo 3",
      price: 1299,
      description:
        "Includes a haircut, shampoo, traditional straight razor shave, charcoal facial mask treatment, and a half-body massage.",
    },
  ],
};
export const extras = [
  {
    label: "Highlights",
    value: "Highlights",
    price: 2500,
    description: "Hair highlighting service. Starting price based on image.",
  },
  {
    label: "Bleach",
    value: "Bleach",
    price: 1500,
    description: "Hair bleaching service. Starting price based on image.",
  },
  {
    label: "Color",
    value: "Color",
    price: 2500,
    description: "Hair coloring service. Starting price based on image.",
  },
  {
    label: "Perm for Men",
    value: "Perm for Men",
    price: 2500,
    description: "Perming service for men. Starting price based on image.",
  },
  {
    label: "Beard Sculpt/Shave",
    value: "Beard Sculpt/Shave",
    price: 299,
    description: "Beard sculpting or traditional straight razor shave service.",
  },
  {
    label: "Charcoal Mask",
    value: "Charcoal Mask",
    price: 499,
    description: "Charcoal facial mask treatment.",
  },
  {
    label: "Anti-Dandruff",
    value: "Anti-Dandruff",
    price: 899,
    description: "Anti-dandruff treatment.",
  },
  {
    label: "Hair Dye Starts",
    value: "Hair Dye Starts",
    price: 1099,
    description: "Hair dye service. Starting price based on image.",
  },
  {
    label: "Hair Art Starts",
    value: "Hair Art Starts",
    price: 359,
    description: "Hair art service. Starting price based on image.",
  },

  {
    label: "Half Body Massage",
    value: "Half Body Massage",
    price: 299,
    description: "Half body massage service.",
  },
  {
    label: "Simple Hair Art",
    value: "Simple Hair Art",
    price: 100,
    description: "A simpler version of the hair art service.",
  },
  {
    label: "Eyebrow",
    value: "Eyebrow",
    price: 100,
    description: "Eyebrow grooming service.",
  },
  {
    label: "L'Oreal Real Treat",
    value: "L'Oreal Real Treat",
    price: 1999,
    description: "Likely a specific L'Oreal hair treatment product.",
  },
  {
    label: "L'Oreal Treatment",
    value: "L'Oreal Treatment",
    price: 1299,
    description: "Likely a different L'Oreal hair treatment product.",
  },
  {
    label: "Grooming",
    value: "Grooming",
    price: 150,
    description:
      "Unclear description in image. Potentially a men's grooming service.",
  },
  {
    label: "Blow Dry w/ Shampoo",
    value: "Blow Dry w/ Shampoo",
    price: 200,
    description: "Hair blow dry service with shampoo.",
  },
  {
    label: "Women Highlights",
    value: "Women Highlights",
    price: 2500,
    description:
      "Hair highlighting service for women. Starting price based on image.",
  },
  {
    label: "Perm Women Starts O",
    value: "Perm Women Starts O",
    price: 4000,
    description:
      "Perming service for women. Starting price based on image. Text cut off in image.",
  },
];

export const stepLabels = [
  {
    label: "Services",
    icon: TbCircleNumber1Filled,
  },
  {
    label: "Extra Services",
    icon: TbCircleNumber2Filled,
  },
  {
    label: "Staff",
    icon: TbCircleNumber3Filled,
  },
  {
    label: "Date and Time",
    icon: TbCircleNumber4Filled,
  },
  {
    label: "Personal Info",
    icon: TbCircleNumber5Filled,
  },
  {
    label: "Confirmation",
    icon: TbCircleNumber6Filled,
  },
];
export const barbers = [
  {
    barber_id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
  },
  {
    barber_id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "987-654-3210",
  },
  {
    barber_id: 3,
    name: "Jane qewqsxcz",
    email: "jane.smith@example.com",
    phone: "987-654-3210",
  },
];

export const availabilitySlots = [
  {
    slot_id: 1,
    barber_name: "Jane Smith",
    day_of_week: 1,
    start_time: "010:00",
    end_time: "08:30",
    is_available: true,
  },
  {
    slot_id: 2,
    barber_name: "Jane Smith",
    day_of_week: 1,
    start_time: "08:00",
    end_time: "08:30",
    is_available: true,
  },
  {
    slot_id: 3,
    barber_name: "Jane Smith",
    day_of_week: 1,
    start_time: "08:00",
    end_time: "08:30",
    is_available: true,
  },
  {
    slot_id: 4,
    barber_name: "Jane Smith",
    day_of_week: 2,
    start_time: "08:00",
    end_time: "08:30",
    is_available: true,
  },
  {
    slot_id: 5,
    barber_name: "Jane Smith",
    day_of_week: 2,
    start_time: "08:00",
    end_time: "08:30",
    is_available: true,
  },
  {
    slot_id: 6,
    barber_name: "Jane Smith",
    day_of_week: 2,
    start_time: "08:00",
    end_time: "08:30",
    is_available: true,
  },
  {
    slot_id: 7,
    barber_name: "Jane Smith",
    day_of_week: 3,
    start_time: "08:00",
    end_time: "08:30",
    is_available: true,
  },
  {
    slot_id: 8,
    barber_name: "Jane Smith",
    day_of_week: 3,
    start_time: "08:00",
    end_time: "08:30",
    is_available: true,
  },
  {
    slot_id: 9,
    barber_name: "Jane Smith",
    day_of_week: 3,
    start_time: "08:00",
    end_time: "08:30",
    is_available: true,
  },
  {
    slot_id: 10,
    barber_name: "Jane Smith",
    day_of_week: 4,
    start_time: "08:00",
    end_time: "08:30",
    is_available: true,
  },
  // Add more availability slots as needed
];

export const daysOfWeek = [
  { value: 1, label: "Monday" },
  { value: 2, label: "Tuesday" },
  { value: 3, label: "Wednesday" },
  { value: 4, label: "Thursday" },
  { value: 5, label: "Friday" },
  { value: 6, label: "Saturday" },
  { value: 7, label: "Sunday" },
];
