import { useState } from "react";
import {GOOGLEAPI} from "../constants/constants";

const GOOGLE_SCRIPT_URL = GOOGLEAPI;
type PhoneCountry = "india" | "usa" | "other";

export default function ContactUs() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });

    const [phoneCountry, setPhoneCountry] =
        useState<PhoneCountry>("india");

    const [status, setStatus] = useState("");

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name } = e.target;
        let value = e.target.value;

        if (name === "phone") {
            if (phoneCountry === "india") {
                // Numbers only
                value = value.replace(/\D/g, "");

                // Maximum 10 digits
                value = value.slice(0, 10);
            } else if (phoneCountry === "usa") {
                // Numbers only
                value = value.replace(/\D/g, "");

                // Maximum 10 digits
                value = value.slice(0, 10);
            } else {
                // Other countries:
                // Allow +, numbers, spaces, -, (, )
                value = value.replace(/[^\d+\s()-]/g, "");

                // + is allowed only at the beginning
                if (value.includes("+")) {
                    value =
                        "+" +
                        value.slice(1).replace(/\+/g, "");
                }

                // Limit total input length
                value = value.slice(0, 20);
            }
        }

        setForm({
            ...form,
            [name]: value,
        });
    };

    const handleCountryChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const country = e.target.value as PhoneCountry;

        setPhoneCountry(country);

        // Clear previous phone number
        setForm({
            ...form,
            phone: "",
        });

        setStatus("");
    };

    const validatePhone = () => {
        const phone = form.phone;
        if (/^(\d)\1+$/.test(phone)) {
            return false;
        }

        // Reject obvious sequential numbers
        // Examples: 1234567890, 0123456789
        if (
            phone === "1234567890" ||
            phone === "0123456789"
        ) {
            return false;
        }

        if (phoneCountry === "india") {
            // Indian mobile number:
            // 10 digits starting with 6-9
            return /^[6-9][0-9]{9}$/.test(phone);
        }

        if (phoneCountry === "usa") {
            // US phone number:
            // 10 digits starting from any valid digit
            return /^[2-9][0-9]{9}$/.test(phone);
        }

        if (phoneCountry === "other") {
            // International format:
            // Must start with +
            // Country code + phone number
            //
            // Examples:
            // +447911123456
            // +61412345678
            // +971501234567
            const cleanedPhone = phone.replace(/[\s()-]/g, "");

            return /^\+[1-9][0-9]{6,14}$/.test(cleanedPhone);
        }

        return false;
    };

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        if (!validatePhone()) {

            if (phoneCountry === "india") {
                setStatus(
                    "Please enter a valid 10-digit Indian mobile number."
                );
            } else if (phoneCountry === "usa") {
                setStatus(
                    "Please enter a valid 10-digit US phone number."
                );
            } else {
                setStatus(
                    "Please enter a valid international phone number with country code, e.g. +447911123456."
                );
            }

            return;
        }

        setStatus("Sending...");

        try {
            await fetch(GOOGLE_SCRIPT_URL, {
                method: "POST",
                mode: "no-cors",
                headers: {
                    "Content-Type": "text/plain;charset=utf-8",
                },
                body: JSON.stringify({
                    ...form,
                    phoneCountry,
                }),
            });

            setStatus(
                "Thank you! Your message has been sent."
            );

            setForm({
                name: "",
                email: "",
                phone: "",
                message: "",
            });

            setPhoneCountry("india");
        } catch (error) {
            console.error(error);
            setStatus(
                "Something went wrong. Please try again."
            );
        }
    };

    return (
        <section id="contactus" className="contact">
            <h1>Contact Us</h1>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={form.name}
                    onChange={handleChange}
                    required
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                />

                {/* Phone Country */}
                <div className="phone-country">
                    <label>
                        <input
                            type="radio"
                            name="phoneCountry"
                            value="india"
                            checked={phoneCountry === "india"}
                            onChange={handleCountryChange}
                        />
                        India (+91)
                    </label>

                    <label>
                        <input
                            type="radio"
                            name="phoneCountry"
                            value="usa"
                            checked={phoneCountry === "usa"}
                            onChange={handleCountryChange}
                        />
                        USA (+1)
                    </label>

                    <label>
                        <input
                            type="radio"
                            name="phoneCountry"
                            value="other"
                            checked={phoneCountry === "other"}
                            onChange={handleCountryChange}
                        />
                        Other
                    </label>
                </div>

                {/* India */}
                {phoneCountry === "india" && (
                    <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number"
                        value={form.phone}
                        onChange={handleChange}
                        pattern="[6-9][0-9]{9}"
                        maxLength={10}
                        inputMode="numeric"
                        title="Please enter a valid 10-digit Indian mobile number"
                        required
                    />
                )}

                {/* USA */}
                {phoneCountry === "usa" && (
                    <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number"
                        value={form.phone}
                        onChange={handleChange}
                        pattern="[2-9][0-9]{9}"
                        maxLength={10}
                        inputMode="numeric"
                        title="Please enter a valid 10-digit US phone number"
                        required
                    />
                )}

                {/* Other Countries */}
                {phoneCountry === "other" && (
                    <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number (+447911123456)"
                        value={form.phone}
                        onChange={handleChange}
                        pattern="^\+[1-9][0-9]{6,14}$"
                        maxLength={20}
                        inputMode="tel"
                        title="Enter a valid international phone number with country code, e.g. +447911123456"
                        required
                    />
                )}

                <textarea
                    name="message"
                    placeholder="Your Message"
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    required
                />

                <button type="submit">
                    Send Message
                </button>
            </form>

            {status && <p>{status}</p>}
        </section>
    );
}
