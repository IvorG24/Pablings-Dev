"use server";
import { format } from "date-fns";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { extras, services } from "@/lib/data";
import { queryClient } from "@/lib/query";

export async function AddWalkinClient(formdata: FormData) {
  const session = await auth();
  if (!session) {
    throw new Error("You are not authenticated");
  }
  const currentFormatted = format(new Date(), "yyyy-MM-dd");
  const fullname = formdata.get("fullname") as string | null;
  const email = formdata.get("email") as string | null;
  const service = formdata.get("service") as string;
  const extraServicesValue = formdata.get("extraServices") as string;
  const extraServicesArray = extraServicesValue
    ? extraServicesValue.split(",")
    : [];
  const voucher = formdata.get("voucher") as string | null;
  const barber = formdata.get("barber") as string;

  let servicePrice = 0;
  for (const category in services) {
    const serviceItem = services[category].find(
      (item) => item.name === service,
    );
    if (serviceItem) {
      servicePrice = serviceItem.price;
      break;
    }
  }
  let extraServicesPrice = 0;
  extraServicesArray.forEach((extraService) => {
    const extraServiceItem = extras.find((item) => item.value === extraService);
    if (extraServiceItem) {
      extraServicesPrice += extraServiceItem.price;
    }
  });

  // Calculate total price
  let totalPrice = servicePrice + extraServicesPrice;

  let discountPercentage = 0;
  if (voucher) {
    const voucherNumber = parseFloat(voucher);
    if (!isNaN(voucherNumber) && voucherNumber > 0 && voucherNumber <= 100) {
      discountPercentage = voucherNumber;
      const discountAmount = (totalPrice * discountPercentage) / 100;
      totalPrice -= discountAmount; // Apply discount to the total price
    } else {
      // If the voucher is invalid, you might want to throw an error or log it
      console.warn("Invalid voucher percentage. Must be between 0 and 100.");
    }
  }

  // Calculate staff sales and owner sales (assuming a 50/50 split)
  const staffSales = totalPrice * 0.5;
  const ownerSales = totalPrice * 0.5;

  try {
    const response = await prisma.sales.create({
      data: {
        userId: session.user.id,
        customer_name: fullname,
        customer_email: email,
        service: service,
        staff: barber,
        extraservices: extraServicesArray,
        staffsales: staffSales,
        ownersales: ownerSales,
        totalsales: totalPrice,
        trasactiondate: currentFormatted,
      },
    });
    await queryClient.invalidateQueries({
      queryKey: ["Sales", "SalesOverview", "ChartData"],
    });

    return response;
  } catch (e) {
    throw new Error(`${e}`);
  }
}
