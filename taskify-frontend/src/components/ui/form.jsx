"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { Controller, FormProvider, useFormContext } from "react-hook-form";

const Form = FormProvider;
const FieldNameContext = React.createContext({ name: undefined });

function FormField(props) {
  const { name } = props;
  return (
    <FieldNameContext.Provider value={{ name }}>
      <Controller {...props} />
    </FieldNameContext.Provider>
  );
}

function FormItem({ className = "space-y-2", ...props }) {
  return <div className={className} {...props} />;
}

function FormLabel({
  className = "text-sm font-medium leading-none",
  ...props
}) {
  return <label className={className} {...props} />;
}

function FormControl({ children }) {
  return <>{children}</>;
}

function FormMessage({ className = "text-sm font-medium text-red-600" }) {
  const { name } = React.useContext(FieldNameContext);
  const { formState } = useFormContext();
  const error = name ? formState.errors?.[name] : undefined;
  if (!error) return null;
  return <p className={className}>{String(error.message || "")}</p>;
}

export { Form, FormField, FormItem, FormLabel, FormControl, FormMessage };
