"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import RoleBasedNavigation from "@/components/RoleBasedNavigation";

export default function ConditionalNavigation() {
  const { user } = useAuth();
  useEffect(() => {
    if (user) {
      document.body.classList.add("user-logged-in");
    } else {
      document.body.classList.remove("user-logged-in");
    }

    return () => {
      document.body.classList.remove("user-logged-in");
    };
  }, [user]);

  if (user) {
    return <RoleBasedNavigation />;
  }
  return null;
}
