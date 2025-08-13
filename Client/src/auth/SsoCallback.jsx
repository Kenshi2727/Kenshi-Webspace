// for production
import React from "react";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";

export default function SsoCallback() {
    return <AuthenticateWithRedirectCallback />;
}
