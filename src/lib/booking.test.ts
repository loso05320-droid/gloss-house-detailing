import { describe, expect, it } from "vitest";
import { buildBookingMessage, smsLink, validateBooking, type BookingRequest } from "./booking";

const base: BookingRequest = {
  name: "Jane",
  phone: "612-555-0100",
  vehicle: "",
  service: "Interior Detail",
  date: "",
  time: "",
  notes: "",
};

describe("booking", () => {
  it("texts the request to Gloss House's number +16123864237", () => {
    expect(smsLink("hi")).toBe("sms:+16123864237?&body=hi");
  });

  it("requires name, phone and service before building a request", () => {
    expect(validateBooking({ ...base, name: "", phone: " ", service: "" })).toEqual([
      "name",
      "phone",
      "service",
    ]);
    expect(validateBooking(base)).toEqual([]);
  });

  it("includes the customer's details in the request", () => {
    const msg = buildBookingMessage({ ...base, vehicle: "2021 Audi Q5" });
    expect(msg).toContain("Name: Jane");
    expect(msg).toContain("Service: Interior Detail");
    expect(msg).toContain("Vehicle: 2021 Audi Q5");
    expect(msg).not.toContain("Notes:");
  });
});
